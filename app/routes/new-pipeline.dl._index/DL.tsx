import React from "react"
import { cn } from "~/utils/general"
import { SectionRouter } from "./SectionRouter"
import { sectionSlugToLabel, sectionSlugs, defaultTask } from "~/constants/pipelineDL"
import type { Theme } from "~/types/theme"
import {
  StepBackButton,
  StepNavigator,
  StepNextButton,
  useStepContext,
} from "~/components/StepNavigator"
import { Form as FormContext } from "~/components/Form"
import { useForm, type SubmitHandler, type UseFormHandleSubmit } from "react-hook-form"
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { pipelineDLSchema } from "~/schema/pipelineDL"
import type { PipelineDL } from "~/types/pipelineDL"
import { getDefaultPipelineDLSchema } from "~/helpers/pipelineDL"
import { onError, submitToServer } from "./helper"
import { FormErrorList } from "~/components/FormErrorShow/FormErrorList"
import { FormErrorProvider } from "~/components/FormErrorShow/FormErrorContext"
import { PyCodeResult } from "./PyCodeResult"

type DLProps = {} & React.ComponentProps<"div">

export function DL({ className, ...delegated }: DLProps) {
  const [pyCode, setPyCode] = React.useState<string | null>(null)
  const { currentStep } = useStepContext()
  const form = useForm<PipelineDL>({
    resolver: standardSchemaResolver(pipelineDLSchema),
    defaultValues: getDefaultPipelineDLSchema(defaultTask),
    mode: "onChange",
  })
  const mainTask = form.watch('mainTask')

  // This effect is imp. because other wise when mainTask is changed, defaultValues will still be for defaultTask, not the new one.
  React.useEffect(() => {
    form.reset(getDefaultPipelineDLSchema(mainTask))
  }, [mainTask])

  const onSubmit: SubmitHandler<PipelineDL> = React.useCallback(async (values) => {
    const { pyCode: retrievedPyCode } = await submitToServer(values)
    setPyCode(retrievedPyCode)
  }, [])

  if (pyCode) return (
    <PyCodeResult code={pyCode}/>
  )

  return (
    <FormErrorProvider>
    <section
      aria-description=""
      className={cn(
        "prose dark:prose-invert", 
        '!max-w-none',
        className
      )}
      {...delegated}
    >
      <StepNavigator slugToLabelMapper={sectionSlugToLabel} />
      <FormContext {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit, onError)}
        >
          <SectionRouter
            section={sectionSlugs[currentStep - 1]}
            form={form}
          />
        </form>
      </FormContext>
      <FormErrorList setFormError={form.setError} />
    </section>
    </FormErrorProvider>
  )
}
