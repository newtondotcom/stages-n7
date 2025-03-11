"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createInternship } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"

const internshipFormSchema = z.object({
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  subject: z.string().min(5, "Subject is required"),
  missions: z.string().min(10, "Please describe your missions"),
  tutor: z.string().min(2, "Tutor name is required"),
  duration: z.coerce.number().min(1).max(12),
  year: z.string().min(4, "Year is required"),
  canRefer: z.boolean().default(false),
  isPublic: z.boolean().default(true),
})

type InternshipFormValues = z.infer<typeof internshipFormSchema>

export function NewInternshipForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<InternshipFormValues>({
    resolver: zodResolver(internshipFormSchema),
    defaultValues: {
      company: "",
      location: "",
      subject: "",
      missions: "",
      tutor: "",
      duration: 3,
      year: new Date().getFullYear().toString(),
      canRefer: false,
      isPublic: true,
    },
  })

  async function onSubmit(data: InternshipFormValues) {
    setIsSubmitting(true)

    try {
      const result = await createInternship(data)

      toast({
        title: "Internship submitted successfully!",
        description: "Thank you for sharing your experience.",
      })

      router.push(`/internships/${result.id}`)
    } catch (error) {
      console.error("Error submitting internship:", error)

      toast({
        title: "Something went wrong",
        description: "Your internship couldn't be submitted. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder="Company name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="City, Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Internship subject or title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="missions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Missions</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your main tasks and responsibilities"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="tutor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tutor</FormLabel>
                <FormControl>
                  <Input placeholder="Supervisor name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration (months)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={12} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 5 }, (_, i) => {
                      const year = new Date().getFullYear() - i
                      return (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="canRefer"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Can Refer ("Pistonner")</FormLabel>
                  <FormDescription>Can you recommend new students for this internship?</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isPublic"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Make Public</FormLabel>
                  <FormDescription>Share this internship with all ENSEEIHT students</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Internship"}
        </Button>
      </form>
    </Form>
  )
}

