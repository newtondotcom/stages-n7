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
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  location: z.string().min(2, "Le lieu est requis"),
  subject: z.string().min(5, "Le sujet est requis"),
  missions: z.string().min(10, "Veuillez décrire vos missions"),
  tutor: z.string().min(2, "Le nom du tuteur est requis"),
  duration: z.coerce.number().min(1).max(12),
  year: z.string().min(4, "L'année est requise"),
  type: z.enum(["1A", "2A", "3A", "Césure"], {
    required_error: "Le type de stage est requis",
  }),
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
      type: "3A",
      canRefer: false,
      isPublic: true,
    },
  })

  async function onSubmit(data: InternshipFormValues) {
    setIsSubmitting(true)

    try {
      const result = await createInternship(data)

      toast({
        title: "Stage soumis avec succès !",
        description: "Merci d'avoir partagé votre expérience.",
      })

      router.push(`/internships/${result.id}`)
    } catch (error) {
      console.error("Erreur lors de la soumission du stage:", error)

      toast({
        title: "Une erreur est survenue",
        description: "Votre stage n'a pas pu être soumis. Veuillez réessayer.",
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
                <FormLabel>Entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de l'entreprise" {...field} />
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
                <FormLabel>Lieu</FormLabel>
                <FormControl>
                  <Input placeholder="Ville, Pays" {...field} />
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
              <FormLabel>Sujet</FormLabel>
              <FormControl>
                <Input placeholder="Sujet ou titre du stage" {...field} />
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
                  placeholder="Décrivez vos principales tâches et responsabilités"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="tutor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tuteur</FormLabel>
                <FormControl>
                  <Input placeholder="Nom du superviseur" {...field} />
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
                <FormLabel>Durée (mois)</FormLabel>
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
                <FormLabel>Année</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner l'année" />
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

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de stage</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1A">1A</SelectItem>
                    <SelectItem value="2A">2A</SelectItem>
                    <SelectItem value="3A">3A</SelectItem>
                    <SelectItem value="Césure">Césure</SelectItem>
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
                  <FormLabel className="text-base">Peut pistonner</FormLabel>
                  <FormDescription>Pouvez-vous recommander de nouveaux étudiants pour ce stage ?</FormDescription>
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
                  <FormLabel className="text-base">Rendre public</FormLabel>
                  <FormDescription>Partager ce stage avec tous les étudiants de l'ENSEEIHT</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Soumission en cours..." : "Soumettre le stage"}
        </Button>
      </form>
    </Form>
  )
}

