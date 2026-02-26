import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";

export function fetchSettings(): Record<string, any> {
    const home = homedir();
    const roots = [
        join(home, ".vscode-remote/data/User"),
        join(home, ".vscode-server/data/User"),
        join(home, ".local/share/code-server/User")
    ];

    for (const root of roots) {
        if (!existsSync(root)) {
            continue;
        }
        const standard = join(root, "settings.json");
        if (existsSync(standard)) {
            return JSON.parse(readFileSync(standard, "utf-8"));
        }

        const historyDir = join(root, "History");
        if (existsSync(historyDir)) {
            const newestFile = fetchJSON(historyDir);
            if (newestFile) {
                return JSON.parse(readFileSync(newestFile, "utf-8"));
            }
        }
    }

    return {};
}

function fetchJSON(dir: string): string | null {
    let newestFile: string | null = null;
    let newestMtime = 0;

    const files = readdirSync(dir, { recursive: true }) as string[];

    for (const file of files) {
        if (!file.endsWith(".json")) continue;
        const fullPath = join(dir, file);
        try {
            const stats = statSync(fullPath);
            if (stats.mtimeMs > newestMtime) {
                const content = readFileSync(fullPath, "utf-8");
                if (content.includes("workbench.colorTheme")) {
                    newestMtime = stats.mtimeMs;
                    newestFile = fullPath;
                }
            }
        } catch (e) { }
    }
    return newestFile;
}
