import React from "react"
import { cn } from "~/utils/general"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import type { UseFormReturn } from "react-hook-form"
import type { PipelineDL } from "~/types/pipelineDL"
import { InputNumber } from "~/components/InputNumber"

type MaxNormFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function MaxNormField({
  className,
  form,
  ...delegated
}: MaxNormFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Embedding.max_norm"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Maximum Norm</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
