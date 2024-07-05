"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"

const items = [
  {
    id: "foodwaste",
    label: "Food Waste",
  },
  {
    id: "polythene",
    label: "Polythene",
  },
  {
    id: "paper",
    label: "Paper",
  },
  {
    id: "metal",
    label: "Metal",
  },
  {
    id: "glass",
    label: "Glass",
  },
]

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
})

export function GarbageCheckbox({ onChange }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  })

  return (
    <Form {...form} >
      <FormField
        control={form.control}
        name="items"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormDescription>
                Select the garbage type.
              </FormDescription>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, item.id]
                                : field.value?.filter(
                                    (value) => value !== item.id
                                  )
                              field.onChange(newValue)
                              onChange(newValue) 
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  )
}
export default GarbageCheckbox
