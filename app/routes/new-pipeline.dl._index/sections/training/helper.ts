import type { UseFormReturn } from "react-hook-form"
import { pipelineDLSchema } from "~/schema/pipelineDL"
import type { PipelineDL } from "~/types/pipelineDL"

type isGoodToGoProps = {
  form: UseFormReturn<PipelineDL>
}
/**
 * 
 * @param form Form instnace of zod
 * @returns boolean to state weather this step is good to go or not.
 */
export function isGoodToGo({ form }: isGoodToGoProps) {

  // schema for this very step
  const schemaNonDiscriminated = pipelineDLSchema.def.left.pick({
    loss: true,
    lossesData: true,

    optimizer: true,
    optimizersData: true,

    metric: true,
    metricsData: true,

    lrSchedular: true,
    lrSchedularsData: true,

    monitoring: true,
    trainingHyperParameters: true,
    earlyStopping: true
  });


  const stepSchema = schemaNonDiscriminated

  const data = form.getValues()
  const result = stepSchema.safeParse(data);

  return result;
}