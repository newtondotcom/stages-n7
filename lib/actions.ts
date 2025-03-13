"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

export async function createInternship(data: {
  company: string;
  location: string;
  subject: string;
  missions: string;
  tutor: string;
  duration: number;
  year: string;
  type: "1A" | "2A" | "3A" | "Césure";
  canRefer: boolean;
  isPublic: boolean;
}) {
  // Get the current user from the session
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être connecté pour créer un stage");
  }

  try {
    // Create the internship in the database
    const newInternship = await db.internship.create({
      data: {
        ...data,
        studentId: session.user.id,
      },
    });

    // Revalidate the internships page to show the new internship
    revalidatePath("/internships");

    return newInternship;
  } catch (error) {
    console.error("Error creating internship:", error);
    throw new Error("Échec de la création du stage");
  }
}

export async function contactInternshipStudent(
  internshipId: string,
  message: string,
) {
  // Get the current user from the session
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être connecté pour contacter un étudiant");
  }

  try {
    // Verify the internship exists and can be referred
    const internship = await db.internship.findUnique({
      where: { id: internshipId },
      select: { canRefer: true, studentId: true },
    });

    if (!internship) {
      throw new Error("Stage non trouvé");
    }

    if (!internship.canRefer) {
      throw new Error("Ce stage n'est pas disponible pour une recommandation");
    }

    // Create a new message
    const newMessage = await db.message.create({
      data: {
        content: message,
        internshipId,
        senderId: session.user.id,
      },
    });

    // In a real app, you might want to send an email notification here

    return { success: true, messageId: newMessage.id };
  } catch (error) {
    console.error("Error contacting student:", error);
    throw new Error("Échec de l'envoi du message");
  }
}

export async function getUserInternships() {
  const session = await auth();
  if (!session) {
    throw new Error("Vous devez être connecté pour voir vos stages");
  }

  try {
    const internships = await db.internship.findMany({
      where: { studentId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    return internships;
  } catch (error) {
    console.error("Error fetching user internships:", error);
    throw new Error("Échec de la récupération des stages");
  }
}

export async function getUserMessages() {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être connecté pour voir vos messages");
  }

  try {
    // Get internships created by the user
    const userInternships = await db.internship.findMany({
      where: { studentId: session.user.id },
      select: { id: true },
    });

    const internshipIds = userInternships.map((i) => i.id);

    // Get messages for those internships
    const messages = await db.message.findMany({
      where: {
        OR: [
          { senderId: session.user.id }, // Messages sent by the user
          { internshipId: { in: internshipIds } }, // Messages for user's internships
        ],
      },
      include: {
        internship: {
          select: {
            id: true,
            subject: true,
            company: true,
            student: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return messages;
  } catch (error) {
    console.error("Error fetching user messages:", error);
    throw new Error("Échec de la récupération des messages");
  }
}

export async function markMessageAsRead(messageId: string) {
  const session = await auth();

  if (!session) {
    throw new Error("Vous devez être connecté");
  }

  try {
    // Get the message
    const message = await db.message.findUnique({
      where: { id: messageId },
      include: {
        internship: {
          select: {
            studentId: true,
          },
        },
      },
    });

    if (!message) {
      throw new Error("Message non trouvé");
    }

    // Check if the user is the recipient of the message
    if (message.internship.studentId !== session.user.id) {
      throw new Error(
        "Vous n'avez pas la permission de marquer ce message comme lu",
      );
    }

    // Mark the message as read
    await db.message.update({
      where: { id: messageId },
      data: { isRead: true },
    });

    return { success: true };
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw new Error("Échec du marquage du message comme lu");
  }
}
