#!/bin/bash

# 👻 Haunted VS Code Demo Script
# This script helps demonstrate the haunted extension features

echo "👻🎃 Welcome to the Haunted VS Code Demo! 🎃👻"
echo ""
echo "This extension adds spooky effects to your VS Code experience:"
echo ""
echo "🔧 Setup Instructions:"
echo "1. Open this folder in VS Code"
echo "2. Press F5 to launch the Extension Development Host"
echo "3. In the new window, open the TESTING.md file"
echo "4. Start experiencing the haunting!"
echo ""
echo "👻 Features to Test:"
echo "• Ghost cursor trails when you move around"
echo "• Random theme flickering with spooky messages"
echo "• Visual 'sound effects' when deleting code"
echo "• Type 'EXORCISE' to banish the spirits"
echo "• Use Ctrl+Shift+Alt+E for emergency exorcism"
echo ""
echo "⚙️ Configuration:"
echo "• Open VS Code settings and search for 'haunted'"
echo "• Adjust intensity level (1-10)"
echo "• Toggle individual effects on/off"
echo ""
echo "🎃 Happy Haunting!"
echo ""
echo "Press any key to continue..."
read -n 1 -s

# Open VS Code with this project
if command -v code &> /dev/null; then
    echo "Opening VS Code..."
    code .
else
    echo "VS Code command not found. Please open this folder manually in VS Code."
fi
