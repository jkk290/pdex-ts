import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { commandExit } from "./command_exit";

export function startREPL() {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    rl.prompt();
    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }
        const commandName = words[0];
        const commands = getCommands();
        const command = commands[commandName];
        if (command) {
            try {
                command.callback(commands);
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                }
            }
        } else {
            console.log(`Unknown command: ${commandName}`);
        }
        rl.prompt();
    });
}

export function cleanInput(input: string): string[] {
    return input
        .trim()
        .toLowerCase()
        .split(" ")
        .filter((word) => word != "");
}
