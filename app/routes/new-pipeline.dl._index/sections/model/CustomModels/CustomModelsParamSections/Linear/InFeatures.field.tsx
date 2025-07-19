import React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { cn } from "~/utils/general";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/Form"
import { InputNumberArray } from "~/components/InputNumberArray";

type InFeaturesFieldProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function InFeaturesField({ 
  className, 
  form,
  ...delegated
}: InFeaturesFieldProps) {
  
  return (
    <FormField
      control={form.control}
      name="customModelsData.Linear.in_features"
      render={({ field }) => (
        <FormItem className={cn('', className)} {...delegated}>
          <FormLabel>In features</FormLabel>
          <InputNumberArray
            field={field}
            placeholder="800, 600, 3"
            helperText="Enter numbers separated by commas (e.g., 800, 600, 3)"
          />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}