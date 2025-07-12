import React from "react"
import { cn } from "~/utils/general"
import type { TransformerFieldProps } from "../../transformers-param-section.mapper"
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
import { StypeField } from "./Stype.field"
import { TopDBField } from "./TopDB.field"


/**
 * delegated props are not applied
 */
export function AmplitudeToDBSection({
  className,
  form,
  ...delegated
}: TransformerFieldProps) {
  const [open, setOpen] = React.useState(false)
  const [resetKey, setResetKey] = React.useState(0)

  const { error } = form.getFieldState("transformersData.AmplitudeToDB", form.formState)

  const resetSection = React.useCallback(() => {
    form.resetField("transformersData.AmplitudeToDB")
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
          <DialogTitle className="mt-0">Params of AmplitudeToDB</DialogTitle>
          <DialogDescription className="sr-only">
            change params of transformer
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6" key={resetKey}>
          <StypeField form={form} /> 
          <TopDBField form={form} />
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
