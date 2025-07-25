import React from "react"
import { cn } from "~/utils/general"
import type { CustomModelsFieldProps } from "../../customModels-section.mapper"
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/Dialog"
import { Cog, RotateCwIcon } from "~/components/AnimatedIcons"
import { DModelField } from "./DModel.field"
import { NHeadField } from "./NHead.field";
import { NumEncoderLayersField } from "./NumEncoderLayers.field";
import { NumDecoderLayersField } from "./NumDecoderLayers.field";
import { DimFeedforwardField } from "./DimFeedforward.field";
import { DropoutField } from "./Dropout.field";
import { ActivationField } from "./Activation.field";

/**
 * delegated props are not applied
 */
export function TransformerSection({
  className,
  form,
  index,
  ...delegated
}: CustomModelsFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState(`customModels.${index}`, form.formState)

  const resetSection = React.useCallback(() => {
    form.resetField(`customModels.${index}`)
    setResetKey(k => k+1)
  }, [form, index])

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger className={cn("cursor-pointer text-base-content", className)}>
        <Cog className="w-[1.4rem]" />
      </DialogTrigger>
      <DialogContent
        className={cn("prose dark:prose-invert", "")}
      >
        <DialogHeader>
          <DialogTitle className="mt-0">Params of Transformer</DialogTitle>
          <DialogDescription className="sr-only">
            change params for custom model
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <DModelField form={form} index={index} />
          <NHeadField form={form} index={index} />
          <NumEncoderLayersField form={form} index={index} />
          <NumDecoderLayersField form={form} index={index} />
          <DimFeedforwardField form={form} index={index} />
          <DropoutField form={form} index={index} />
          <ActivationField form={form} index={index} />
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-col">
          <div className="flex items-center gap-1.5">
            <DialogClose className="w-full btn flex-3/4">
              Close
            </DialogClose>
            <button
              title="reset the values in this section"
              onClick={resetSection}
              className="btn btn-success"
            >
              <RotateCwIcon className="w-[1.3rem]" />
            </button>
          </div>

          {error && (
            <span className="italic text-sm text-red-600 dark:text-red-400">
              Fix the errors above or reset to continue
            </span>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
