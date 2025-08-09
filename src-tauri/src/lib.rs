use std::sync::Mutex;
use tauri::{Manager, State};
use tauri_plugin_shell::process::CommandEvent;
use tauri_plugin_shell::ShellExt;
use tauri::Emitter;

struct ServerPort(Mutex<u16>);

#[tauri::command]
fn get_server_port(state: State<ServerPort>) -> u16 {
    let port = *state.inner().0.lock().unwrap();
    println!("[Rust] get_server_port called, current port: {}", port);
    port
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            let app_handle = app.handle();
            let window = app.get_webview_window("main").expect("main window not found");

            let sidecar_command = app_handle
                .shell()
                .sidecar("server")
                .unwrap()
                .args(["--port", "52713"]);
            println!("[Rust] Spawning sidecar...");
            let (mut rx, mut child) = sidecar_command
                .spawn()
                .expect("Failed to spawn sidecar");

            let window_clone = window.clone();
            let app_handle_clone = app_handle.clone();
            tauri::async_runtime::spawn(async move {
                while let Some(event) = rx.recv().await {
                    match event {
                        CommandEvent::Stdout(line_bytes) => {
                            let line = String::from_utf8_lossy(&line_bytes);
                            println!("[Rust] Sidecar stdout: {}", line);
                            window_clone
                                .emit("message", Some(format!("'{}'", line)))
                                .expect("failed to emit event");

                            if line.contains("Uvicorn running on") {
                                if let Some(port) = line
                                    .split(':')
                                    .last()
                                    .and_then(|s| s.trim_end_matches(|c| c == ')' || c == '\n').parse::<u16>().ok())
                                {
                                    let state = app_handle_clone.state::<ServerPort>();
                                    let mut lock = state.inner().0.lock().unwrap();
                                    *lock = port;
                                    println!("[Rust] Detected sidecar port: {}", port);
                                    // Notify frontend that port is ready
                                    app_handle_clone.emit("server-port-ready", 52713)
                                        .expect("failed to emit server port");
                                    println!("[Rust] Emitted 'server-port-ready' with port: {}", port);
                                }
                            }

                            let _ = child.write(b"message from Rust\n");
                        }
                        CommandEvent::Stderr(line_bytes) => {
                            let line = String::from_utf8_lossy(&line_bytes);
                            println!("[Rust] Sidecar stderr: {}", line);
                        }
                        _ => {}
                    }
                }
            });

            Ok(())
        })
        .manage(ServerPort(Mutex::new(52713)))
        .invoke_handler(tauri::generate_handler![get_server_port])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
