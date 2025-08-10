import { readdirSync, statSync } from "fs";
import { join, extname, basename } from "path";

// Carga recursiva de archivos .ts en un directorio
function loadFilesRecursively(dir: string): string[] {
  let results: string[] = [];
  const list = readdirSync(dir);
  list.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(loadFilesRecursively(filePath));
    } else if (extname(file) === ".js" && !file.endsWith(".d.js")) {
      results.push(filePath);
    }
  });
  return results;
}

export function loadCommands(commandsPath: string) {
  const files = loadFilesRecursively(commandsPath);
  const commands = [];
  for (const file of files) {
    const mod = require(file.replace(/\\/g, "/"));
    for (const key in mod) {
      if (typeof mod[key] === "object" && mod[key].name) {
        commands.push(mod[key]);
        console.log(`[COMMAND] Cargado: ${mod[key].name} (${basename(file)})`);
      }
    }
  }
  return commands;
}

export function loadEvents(eventsPath: string, client: any) {
  const files = loadFilesRecursively(eventsPath);
  for (const file of files) {
    const event = require(file.replace(/\\/g, "/"));
    if (event.default && typeof event.default === "function") {
      event.default(client);
      console.log(`[EVENT] Cargado: ${basename(file, ".ts")}`);
    }
  }
}
