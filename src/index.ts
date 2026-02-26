import { fetchEnv } from "./env";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

async function run() {
  console.log("working on cloning config...");

  try {
    const data = await fetchEnv();
    const config = {
      name: "My Workspace",
      image: "mcr.microsoft.com/devcontainers/base:ubuntu",
      customizations: {
        vscode: {
          extensions: data.extensions,
          settings: data.settings
        }
      }
    };

    const dirPath = join(process.cwd(), ".devcontainer");
    await mkdir(dirPath, { recursive: true });

    const filePath = join(dirPath, "devcontainer.json");
    await Bun.write(filePath, JSON.stringify(config, null, 2));

    console.log(`\ngenerated: ${filePath}`);
    console.log(`captured ${data.extensions.length} extensions.`);
    console.log(`captured ${Object.keys(data.settings).length} UI settings.`);
    
  } catch (error) {
    console.error("failed to generate devcontainer.json:", error);
  }
}

run();