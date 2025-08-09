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

  const existingPort = await invoke<number>('get_server_port');
  if (existingPort && existingPort !== 0) {
    cachedHost = `http://127.0.0.1:${existingPort}`;
    return cachedHost;
  }

  // Wait for event from Rust, with a failsafe to try port 8000 after timeout
  return new Promise((resolve, reject) => {
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        cachedHost = `http://127.0.0.1:8000`;
        resolved = true;
        resolve(cachedHost);
      }
    }, 2000); 

    listen<number>('server-port-ready', (event) => {
      if (resolved) return;
      const port = event.payload;
      if (!port || port === 0) {
        clearTimeout(timeout);
        resolved = true;
        reject(new Error('Invalid server port'));
        return;
      }
      clearTimeout(timeout);
      cachedHost = `http://127.0.0.1:${port}`;
      resolved = true;
      resolve(cachedHost);
    });
  });
};
