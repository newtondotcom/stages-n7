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
  message: z.string().min(10, "Message must be at least 10 characters"),
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
        title: "Message sent successfully!",
        description: "The student will be notified of your interest.",
      })

      form.reset()
    } catch (error) {
      console.error("Error sending message:", error)

      toast({
        title: "Something went wrong",
        description: "Your message couldn't be sent. Please try again.",
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
                  placeholder="Introduce yourself and explain why you're interested in this internship..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>Your ENSEEIHT email will be shared with the student.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </Form>
  )
}

