import { $ } from "bun";
import { fetchSettings } from "./settings";

export async function fetchEnv() {
    const extensions = (await $`code --list-extensions`.text())
        .split("\n")
        .filter(line => line.trim() && !line.includes(" "));

    const settings = fetchSettings();
    const uiPrefixes = ["workbench.", "window.", "explorer.", "editor.", "terminal."];
    const filteredSettings = Object.fromEntries(
        Object.entries(settings).filter(([key]) =>
            uiPrefixes.some(p => key.startsWith(p))
        )
    );

    return { extensions, settings: filteredSettings };
}
