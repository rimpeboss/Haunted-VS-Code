"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const ghostCursor_1 = require("./ghostCursor");
const themeFlickerer_1 = require("./themeFlickerer");
const spookySounds_1 = require("./spookySounds");
const exorcism_1 = require("./exorcism");
function activate(context) {
    console.log('👻 Haunted VS Code is awakening...');
    const ghostCursor = new ghostCursor_1.GhostCursor(context);
    const themeFlickerer = new themeFlickerer_1.ThemeFlickerer(context);
    const spookySounds = new spookySounds_1.SpookySounds(context);
    const exorcism = new exorcism_1.ExorcismCheatCode(context);
    // Show welcome message
    vscode.window.showInformationMessage('👻 The spirits have entered your editor... Type "EXORCISE" to banish them!', 'Embrace the Haunting', 'Exorcise Now').then(selection => {
        if (selection === 'Exorcise Now') {
            vscode.commands.executeCommand('haunted.disable');
        }
    });
    // Register commands
    const commands = [
        vscode.commands.registerCommand('haunted.enable', () => {
            enableHaunting();
            vscode.window.showInformationMessage('👻 The spirits have returned!');
        }),
        vscode.commands.registerCommand('haunted.disable', () => {
            disableHaunting();
            vscode.window.showInformationMessage('✨ The editor has been exorcised!');
        }),
        vscode.commands.registerCommand('haunted.toggleGhostCursor', () => {
            ghostCursor.toggle();
        }),
        vscode.commands.registerCommand('haunted.toggleFlickering', () => {
            themeFlickerer.toggle();
        }),
        vscode.commands.registerCommand('haunted.toggleSounds', () => {
            spookySounds.toggle();
        })
    ];
    context.subscriptions.push(...commands);
    function enableHaunting() {
        const config = vscode.workspace.getConfiguration('haunted');
        if (config.get('ghostCursor')) {
            ghostCursor.enable();
        }
        if (config.get('flickering')) {
            themeFlickerer.enable();
        }
        if (config.get('sounds')) {
            spookySounds.enable();
        }
        exorcism.enable();
    }
    function disableHaunting() {
        ghostCursor.disable();
        themeFlickerer.disable();
        spookySounds.disable();
        exorcism.disable();
    }
    // Auto-enable on startup if configured
    const config = vscode.workspace.getConfiguration('haunted');
    if (config.get('enabled')) {
        // Delay the haunting to let VS Code fully load
        setTimeout(() => {
            enableHaunting();
        }, 2000);
    }
    // Listen for configuration changes
    vscode.workspace.onDidChangeConfiguration(e => {
        if (e.affectsConfiguration('haunted')) {
            const config = vscode.workspace.getConfiguration('haunted');
            if (config.get('enabled')) {
                enableHaunting();
            }
            else {
                disableHaunting();
            }
        }
    });
}
exports.activate = activate;
function deactivate() {
    console.log('👻 The spirits are departing...');
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map