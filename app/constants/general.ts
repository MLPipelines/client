import { invoke } from '@tauri-apps/api/core';
import type { Theme } from "~/types/theme"
import { listen } from '@tauri-apps/api/event';

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



let cachedHost: string | null = null;
export const apiServer = async (): Promise<string> => {
  if (cachedHost) return cachedHost;
  cachedHost = `http://127.0.0.1:52713`;
  return cachedHost;
};
