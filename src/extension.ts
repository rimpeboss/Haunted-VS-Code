import * as vscode from 'vscode';
import { GhostCursor } from './ghostCursor';
import { ThemeFlickerer } from './themeFlickerer';
import { SpookySounds } from './spookySounds';
import { ExorcismCheatCode } from './exorcism';

export function activate(context: vscode.ExtensionContext) {
    console.log('👻 Haunted VS Code is awakening...');

    const ghostCursor = new GhostCursor(context);
    const themeFlickerer = new ThemeFlickerer(context);
    const spookySounds = new SpookySounds(context);
    const exorcism = new ExorcismCheatCode(context);

    // Show welcome message
    vscode.window.showInformationMessage(
        '👻 The spirits have entered your editor... Type "EXORCISE" to banish them!',
        'Embrace the Haunting', 'Exorcise Now'
    ).then(selection => {
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
            } else {
                disableHaunting();
            }
        }
    });
}

export function deactivate() {
    console.log('👻 The spirits are departing...');
}
