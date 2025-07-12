import * as z from "zod/v4"
import {
  pipelineDLImageSchema,
  imageTransformersSchema,
  imagePretrainedModelsSchema,
} from "./pipelineDL.image"
import {
  pipelineDLTextSchema,
  textTransformersSchema,
  textPretrainedModelsSchema,
} from "./pipelineDL.text"
import {
  pipelineDLAudioSchema,
  audioTransformersSchema,
  audioPretrainedModelsSchema,
} from "./pipelineDL.audio"
import { dataFileSchema, pipelineDLEarlyStoppingSchema, pipelineDLLossesSchema, pipelineDLLRSchedularSchema, pipelineDLMetricsSchema, pipelineDLMonitoringSchema, pipelineDLOptimizersSchema, trainingHyperParametersSchema } from "./pipelineDL.general"


// There is no need for discriminated unioin cz. at the last when we will submit form, 
// we will filter the in this object only those who are in schema.transformers array
export const pipelineDLTransformersSchema = z.object({
  ...imageTransformersSchema.shape,
  ...textTransformersSchema.shape,
  ...audioTransformersSchema.shape,
})

export const pipelineDLPretrainedModelsSchema = z.object({
  ...imagePretrainedModelsSchema.shape,
  ...textPretrainedModelsSchema.shape,
  ...audioPretrainedModelsSchema.shape,
})

import { pipelineDLCustomModelsSchema } from "./pipelineDL.general"


export const pipelineDLMainTaskDiscriminatedSchema = z.discriminatedUnion("mainTask", [
  pipelineDLImageSchema,
  pipelineDLTextSchema,
  pipelineDLAudioSchema,
])

/**
 * Format of keys goes like this:
 * - ✅ means it is part of mainTask discriminatedUnion
 * 1. mainTask ✅
 * 2. subTask ✅
 * 3. dataFormat ✅
 * 4. dataFile
 * 5. transformers ✅
 * 6. pretrainedModels ✅
 * 7. customModels ✅
 * 8. losses
 * 9. optimizers
 * 10. monitoring
 * 11. metrics
 * 12. trainingHyperParameters
 * 13. earlyStopping
 * 14. lrSchedular
 */
export const pipelineDLSchema = z
  .object({
    dataFile: dataFileSchema,
    losses: pipelineDLLossesSchema,
    optimizers: pipelineDLOptimizersSchema,
    monitoring: pipelineDLMonitoringSchema,
    metrics: pipelineDLMetricsSchema,
    trainingHyperParameters: trainingHyperParametersSchema,
    earlyStopping: pipelineDLEarlyStoppingSchema,
    lrSchedular: pipelineDLLRSchedularSchema,

    // these are object type to store all param values,
    // which at the end will be filtered. [these are data objects]
    transformersData: pipelineDLTransformersSchema,
    pretrainedModelsData: pipelineDLPretrainedModelsSchema,
    customModelsData: pipelineDLCustomModelsSchema
  })
  .and(pipelineDLMainTaskDiscriminatedSchema)

