import { getCommands } from "./commands.js";

export function commandHelp(): void {
    console.log("Welcome to the Pokedex!");
    console.log("Usage: \n");
    const commands = getCommands();
    for (const key in commands) {
        console.log(`${commands[key].name}: ${commands[key].description}`);
    }
}
