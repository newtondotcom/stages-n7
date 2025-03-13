"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { contactInternshipStudent } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

const contactFormSchema = z.object({
  message: z.string().min(10, "Le message doit comporter au moins 10 caractères"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

interface ContactInternFormProps {
  internshipId: string
}

export function ContactInternForm({ internshipId }: ContactInternFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)

    try {
      await contactInternshipStudent(internshipId, data.message)

      toast({
        title: "Message envoyé avec succès !",
        description: "L'étudiant sera informé de votre intérêt.",
      })

      form.reset()
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error)

      toast({
        title: "Une erreur est survenue",
        description: "Votre message n'a pas pu être envoyé. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Présentez-vous et expliquez pourquoi vous êtes intéressé par ce stage..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Votre email ENSEEIHT sera partagé avec l'étudiant.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
        </Button>
      </form>
    </Form>
  )
}

