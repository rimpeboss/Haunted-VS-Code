"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GhostCursor = void 0;
const vscode = require("vscode");
class GhostCursor {
    constructor(context) {
        this.context = context;
        this.disposables = [];
        this.isEnabled = false;
        this.ghostTrails = [];
    }
    enable() {
        if (this.isEnabled)
            return;
        this.isEnabled = true;
        // Create webview for ghost cursor effects
        this.createGhostCursorWebview();
        // Listen for cursor movements
        const cursorListener = vscode.window.onDidChangeTextEditorSelection(e => {
            this.createGhostTrail(e.selections[0].active);
        });
        this.disposables.push(cursorListener);
    }
    disable() {
        this.isEnabled = false;
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
        this.clearGhostTrails();
        if (this.webviewPanel) {
            this.webviewPanel.dispose();
            this.webviewPanel = undefined;
        }
    }
    toggle() {
        if (this.isEnabled) {
            this.disable();
        }
        else {
            this.enable();
        }
    }
    createGhostCursorWebview() {
        this.webviewPanel = vscode.window.createWebviewPanel('ghostCursor', '👻 Ghost Cursor', vscode.ViewColumn.Beside, {
            enableScripts: true,
            retainContextWhenHidden: true
        });
        this.webviewPanel.webview.html = this.getGhostCursorHtml();
    }
    createGhostTrail(position) {
        if (!this.isEnabled)
            return;
        // Create a random ghost cursor that appears near the real cursor
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        // Clear previous trails to avoid too many ghosts
        this.clearGhostTrails();
        // Create multiple ghost cursors with delay
        for (let i = 0; i < 3; i++) {
            const timeout = setTimeout(() => {
                this.showGhostAtPosition(position, i);
            }, i * 200);
            this.ghostTrails.push(timeout);
        }
    }
    showGhostAtPosition(position, index) {
        if (!this.isEnabled)
            return;
        const editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
        // Create a decoration for the ghost cursor
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: `rgba(255, 255, 255, ${0.3 - index * 0.1})`,
            border: '1px solid rgba(200, 200, 200, 0.5)',
            borderRadius: '2px',
            after: {
                contentText: '👻',
                color: `rgba(255, 255, 255, ${0.8 - index * 0.2})`,
                fontWeight: 'bold',
                margin: '0 0 0 5px'
            }
        });
        const range = new vscode.Range(position, position.translate(0, 1));
        editor.setDecorations(decorationType, [range]);
        // Remove the ghost after a short time
        setTimeout(() => {
            decorationType.dispose();
        }, 1000 - index * 200);
    }
    clearGhostTrails() {
        this.ghostTrails.forEach(timeout => clearTimeout(timeout));
        this.ghostTrails = [];
    }
    getGhostCursorHtml() {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        background: transparent;
                        margin: 0;
                        padding: 20px;
                        font-family: monospace;
                        color: #888;
                        overflow: hidden;
                    }
                    .ghost-message {
                        position: absolute;
                        font-size: 12px;
                        opacity: 0;
                        animation: ghostFloat 3s infinite;
                        pointer-events: none;
                    }
                    @keyframes ghostFloat {
                        0% { opacity: 0; transform: translateY(0px); }
                        50% { opacity: 0.7; transform: translateY(-20px); }
                        100% { opacity: 0; transform: translateY(-40px); }
                    }
                    .floating-ghost {
                        position: absolute;
                        font-size: 20px;
                        animation: float 4s ease-in-out infinite;
                    }
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-10px); }
                    }
                </style>
            </head>
            <body>
                <div class="floating-ghost" style="top: 10px; left: 10px;">👻</div>
                <div class="floating-ghost" style="top: 50px; right: 20px; animation-delay: 1s;">🌙</div>
                <div class="floating-ghost" style="bottom: 30px; left: 50%; animation-delay: 2s;">💀</div>

                <script>
                    function createRandomGhost() {
                        const ghost = document.createElement('div');
                        ghost.className = 'ghost-message';
                        ghost.textContent = ['👻', '💀', '🌙', '🕷️', '🦇'][Math.floor(Math.random() * 5)];
                        ghost.style.left = Math.random() * window.innerWidth + 'px';
                        ghost.style.top = Math.random() * window.innerHeight + 'px';
                        document.body.appendChild(ghost);

                        setTimeout(() => {
                            document.body.removeChild(ghost);
                        }, 3000);
                    }

                    setInterval(createRandomGhost, 2000);
                </script>
            </body>
            </html>
        `;
    }
}
exports.GhostCursor = GhostCursor;
//# sourceMappingURL=ghostCursor.js.map