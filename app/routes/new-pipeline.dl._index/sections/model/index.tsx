import React from "react";
import { cn } from "~/utils/general";
import { sectionSlugToLabel } from "~/constants/pipelineDL";
import type { UseFormReturn } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import { SubmitSteps } from "../../SubmitSteps";
import { isGoodToGo } from "./helper";
import { useFormErrorContext } from "~/components/FormErrorShow/FormErrorContext";
import { UsePreTrainedCheckField } from "./UsePreTrainedCheck.field";
import { PreTrainedModelField } from "./PreTrainedModel/PreTrainedModel.field";
import { CustomModelField } from "./CustomModels/CustomModels.field";


type ModelSectionProps = {
  form: UseFormReturn<PipelineDL>
} & React.ComponentProps<'div'>

export function ModelSection({ className, form, ...delegated}: ModelSectionProps) {
  const { setError } = useFormErrorContext()
  const usePretrained = form.watch('usePreTrained')

  const handleNext = React.useCallback(() => {
    const { success, error } = isGoodToGo({ form });
    if (success) {
      setError(null);
      return true
    } else {
      setError(error);
      return false
    }
  }, [setError, form])

  return (
    <div
      aria-description=""
      className={cn(
        'prose dark:prose-invert',
        className,
      )}
      {...delegated}
    >
      <h1>{sectionSlugToLabel['model']}</h1>
      <div
        className={cn(
          "flex flex-col gap-8",
          'mb-11',
        )}
      >
        <UsePreTrainedCheckField 
          form={form}
          className="mx-auto"
        />
        {usePretrained ? (
          <PreTrainedModelField form={form} />
        ): (
          <CustomModelField form={form} />
        )}
      </div>
      <SubmitSteps 
        form={form}
        isGoodToGoCallback={handleNext} 
      />
    </div>
  )
}