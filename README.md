<div align="center">
  <h1>csync</h1>
  <p></p>Extract your VS Code extensions, settings, as well as UI preferences and layout into a <b>devcontainer.json</b> configuration file.</p>
</div>

---

## Dependencies
All dependencies must first be installed, like [Bun](https://bun.com), which can be installed regardless of kernel.

### Install on Linux, Unix, or Darwin
```powershell
$ bash ./dependencies.sh
```

### Install on Windows
In Command Prompt, use this command:
```powershell
powershell.exe -File "./dependencies.ps1"
```

In PowerShell, use this:
```powershell
./dependencies.ps1
```

---

## Exporting Your Config
Use the following command in the source directory to extract your VS Code config into a `.devcontainer/devcontainer.json` file in the same directory.
```powershell
bun start
```