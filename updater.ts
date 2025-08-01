import { check } from "@tauri-apps/plugin-updater";
import { ask, message } from "@tauri-apps/plugin-dialog";
import { relaunch } from "@tauri-apps/plugin-process";

export async function checkForAppUpdates() {
  const update = await check();

  if (update) {
    const yes = await ask(
      `
      Update to ${update.version} is available!
      ${update.body && `Realease notes: ${update.body}`}
      `,
      {
        title: "Update Now!",
        kind: "info",
        okLabel: "Update",
        cancelLabel: "Cancel",
      }
    );

    if (yes) {
      await update.downloadAndInstall();
      await relaunch();
    }
  }
}