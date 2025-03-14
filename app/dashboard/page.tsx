import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserInternships, getUserMessages } from "@/lib/actions";
import { DashboardInternships } from "@/components/dashboard-internships";
import { DashboardMessages } from "@/components/dashboard-messages";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await auth();
  if (!user) {
    redirect("/auth/signin");
  }

  const [internships, messages] = await Promise.all([
    getUserInternships(),
    getUserMessages(),
  ]);

  const unreadMessages = messages.filter(
    (message) => !message.isRead && message.internship.student.id === user.id,
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Mes stages</CardTitle>
            <CardDescription>Stages que vous avez déclarés</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{internships.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Messages</CardTitle>
            <CardDescription>
              Communication avec d'autres étudiants
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{messages.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Messages non lus</CardTitle>
            <CardDescription>
              Messages en attente de votre réponse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{unreadMessages.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="internships" className="space-y-4">
        <TabsList>
          <TabsTrigger value="internships">Mes stages</TabsTrigger>
          <TabsTrigger value="messages">
            Messages
            {unreadMessages.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs">
                {unreadMessages.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="internships" className="space-y-4">
          <DashboardInternships internships={internships} />
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          <DashboardMessages messages={messages} currentUserId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
