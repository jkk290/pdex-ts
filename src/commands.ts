import { commandCatch } from "./command_catch.js";
import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandInspect } from "./command_inspect.js";
import { commandMap, commandMapb } from "./command_map.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays the next 20 locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: commandMapb,
        },
        explore: {
            name: "explore",
            description: "Displays all Pokemon found in an area",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempts to catch specified Pokemon",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Displays information of specified Pokemon",
            callback: commandInspect,
        },
    };
}
