if ! command -v bun &> /dev/null; then
    echo "Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    echo "Bun installed. Reload your terminal to have changes take effect."
else
    echo "Bun is already installed."
fi
if ! command -v code &> /dev/null; then
    echo "Warning: 'code' CLI not found. Ensure VS Code is installed and in your PATH."
else
    echo "VS Code CLI detected."
fi
if [ -f "package.json" ]; then
    echo "Installing npm packages..."
    bun install
else
    echo "package.json not found. Run this in the project root."
fi