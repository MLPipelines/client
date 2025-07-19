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

type EmbedDimFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function EmbedDimField({
  className,
  form,
  ...delegated
}: EmbedDimFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.MultiheadAttention.embed_dim"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Embedding Dimension</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
