import type { SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import type { PipelineDL } from "~/types/pipelineDL";
import axios from 'axios'
import { apiServer } from "~/constants/general";
import { structurizePipelineDLFormData } from "~/helpers/structurizeData";


async function waitForServerReady(host: string, retries = 10, delay = 300): Promise<void> {
  for (let i = 0; i < retries; i++) {
  try {
    await axios.get(`${host}/health`, { timeout: 200 });
    console.log("Health OK");
    return;
  } catch (err) {
    console.log("Health retry", i, err);
    await new Promise(res => setTimeout(res, delay));
  }
}

  throw new Error("Server not responding");
}


export const submitToServer = async (values: PipelineDL) => {
  const serverCompliantConfig = structurizePipelineDLFormData(values);
  const host = await apiServer();
  console.log('Server host:', host);
  await waitForServerReady(host);
  const data = await axios.post(`${host}/generate`, serverCompliantConfig)

  return {
    pyCode: data.data.generated_code as string
  }
}

export const onError: SubmitErrorHandler<PipelineDL> = async (errors) => {

  // make a error component and render that instead of logging in future.
  console.log(
    'Form submition errors',
    errors
  )
}

