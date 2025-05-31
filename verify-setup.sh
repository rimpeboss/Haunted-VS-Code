#!/bin/bash

echo "🔧 Verifying Haunted VS Code Extension Setup..."
echo ""

# Check if TypeScript compilation works
echo "📦 Testing TypeScript compilation..."
if npm run compile > /dev/null 2>&1; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Check if all output files exist
echo ""
echo "📁 Checking compiled output files..."
REQUIRED_FILES=("extension.js" "ghostCursor.js" "themeFlickerer.js" "spookySounds.js" "exorcism.js")

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "out/$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

# Check package.json versions
echo ""
echo "📋 Checking package.json configuration..."
VSCODE_ENGINE=$(grep '"vscode"' package.json | grep -o '"[^"]*"' | tail -1 | tr -d '"')
echo "✅ VS Code engine version: $VSCODE_ENGINE"

echo ""
echo "🎉 Extension is ready for testing!"
echo ""
echo "🚀 To test the extension:"
echo "   1. Open this folder in VS Code"
echo "   2. Press F5 to launch Extension Development Host"
echo "   3. In the new window, open TESTING.md"
echo "   4. Experience the haunting! 👻"
echo ""
echo "💡 Pro tip: If you see any module resolution errors in VS Code,"
echo "   try: Ctrl+Shift+P → 'TypeScript: Restart TS Server'"
