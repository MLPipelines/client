import React from "react"
import { cn } from "~/utils/general"
import type { TransformerFieldProps } from "../../transformers-param-section.mapper"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/Dialog"
import { Cog, RotateCwIcon } from "~/components/AnimatedIcons"
import { PField } from "./P.field"
import { ValueField } from "./Value.field"
import { ScaleField } from "./Scale.field"
import { RatioField } from "./Ratio.field"


export function RandomErasingSection({
  className,
  form,
  ...delegated
}: TransformerFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState("transformersData.RandomErasing", form.formState)

  const resetSection = React.useCallback(() => {
    form.resetField("transformersData.RandomErasing")
    setResetKey(k => k+1)
  }, [form])

  return (
    <Dialog
      open={error ? true : open}
      onOpenChange={(value) => {
        if (!error) setOpen(value)
      }}
    >
      <DialogTrigger className={cn("cursor-pointer ml-auto", className)}>
        <Cog className="text-base-content w-[1.4rem]" />
      </DialogTrigger>
      <DialogContent
        className={cn("prose dark:prose-invert", "")}
        showCloseButton={!error}
      >
        <DialogHeader>
          <DialogTitle className="mt-0">Params of RandomErasing</DialogTitle>
          <DialogDescription className="sr-only">
            change params of transformer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <PField form={form} />
          <ScaleField form={form} />
          <RatioField form={form} />
          <ValueField form={form} />
        </div>

        <DialogFooter className="mt-4 flex flex-col sm:flex-col">
          <div className="flex items-center gap-1.5">
            <DialogClose className="w-full btn flex-3/4" disabled={!!error}>
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
