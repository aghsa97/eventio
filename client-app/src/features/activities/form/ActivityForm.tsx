import { CalendarDaysIcon } from "@heroicons/react/24/solid"
import { useNavigate, useLocation } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { format } from "date-fns"
import { useEffect } from "react"
import { z } from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useStore } from "@/app/stores/store"
import { cn } from "@/lib/utils"
import { v4 as uuid } from "uuid"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    category: z.string().min(1, {
        message: "Category is required.",
    }),
    date: z.date({
        required_error: "Date is required.",
    }),
    city: z.string().min(1, {
        message: "City is required.",
    }),
    venue: z.string().min(1, {
        message: "Venue is required.",
    }),
})

function ActivityForm() {
    const { activityStore } = useStore()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { selectedActivity, submitting: isSubmitting, createActivity, updateActivity } = activityStore
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            date: new Date(),
            city: "",
            venue: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const date = values.date.toISOString()
        if (selectedActivity) {
            updateActivity({ ...selectedActivity, ...values, date })
        } else {
            const id = uuid()
            const createdActivity = await createActivity({ ...values, date, id })
            navigate(`/activities/${createdActivity?.id}`)
        }
    }

    useEffect(() => {
        if (selectedActivity && !pathname.includes("createActivity")) {
            form.reset({
                title: selectedActivity.title,
                description: selectedActivity.description,
                category: selectedActivity.category,
                date: new Date(selectedActivity.date),
                city: selectedActivity.city,
                venue: selectedActivity.venue,
            })
        } else {
            form.reset({
                title: "",
                description: "",
                category: "",
                date: new Date(),
                city: "",
                venue: "",
            })
        }
    }, [selectedActivity, form, pathname])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Euro 2024" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input placeholder="The next European Championship" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Input placeholder="Sport" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Date</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[240px] pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                            <CalendarDaysIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="Munich" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="venue"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Venue</FormLabel>
                            <FormControl>
                                <Input placeholder="Allianz Arena" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" disabled={isSubmitting}>Submit</Button>
            </form>
        </Form>
    )
}

export default ActivityForm