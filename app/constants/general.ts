import { core } from '@tauri-apps/api'
import type { Theme } from "~/types/theme"
const invoke = core.invoke

  export const defaultThemeType: Theme = "light"

  /**
   *  Make sure that the named themes are defined in app.css with daisyUI configuration
   *  @usage use for docuemnt -> html setting. For other places, reference of light and dark is just OK.
   */
  export const themeTypeToName: Record<Theme, string> = {
    light: "retro",
    dark: "coffee",
  }

  export const formShakeErrorDuration = 0.4
  export const formVibrateErrorDuration = [100, 50, 100]


  export const apiServer = async (): Promise<string> => {
    const port = await invoke<number>('get_server_port');
    return `http://127.0.0.1:${port}`;
  };
