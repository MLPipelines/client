import React from "react"
import { cn } from "~/utils/general"
import type { LossSectionProps } from "../../loss-param-section.mapper"
import { SizeAverageField } from "./SizeAverage.field"
import { WeightField } from "./Weight.field"
import { ReduceField } from "./Reduce.field"
import { ReductionField } from "./Reduction.field"
import { PosWeightField } from "./PosWeight.field"

export function BCEWithLogitsLossSection({
  form,
  className,
  ...delegated
}: LossSectionProps) {
  return (
    <div
      aria-description="form to change values"
      className={cn(className)}
      {...delegated}
    >
      <WeightField form={form} />
      <PosWeightField form={form} />
      <SizeAverageField form={form} />
      <ReduceField form={form} />
      <ReductionField form={form} />
    </div>
  )
}
