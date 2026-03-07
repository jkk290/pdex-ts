import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";
import { commandExit } from "./command_exit";
import { initState } from "./state.js";

export async function startREPL() {
    const state = initState();
    const rl = state.rl;
    const commands = state.commands;

    rl.prompt();
    rl.on("line", async (input) => {
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }
        const commandName = words[0];
        const command = commands[commandName];
        if (command) {
            try {
                await command.callback(state);
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
