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

type ScaleFactorFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<"div">

export function ScaleFactorField({
  className,
  form,
  ...delegated
}: ScaleFactorFieldProps) {
  return (
    <FormField
      control={form.control}
      name="customModelsData.Upsample.scale_factor"
      render={({ field }) => (
        <FormItem className={cn("", className)} {...delegated}>
          <FormLabel>Scale Factor</FormLabel>
          <FormControl>
            <InputNumber field={field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
