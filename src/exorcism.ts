import * as vscode from 'vscode';

export class ExorcismCheatCode {
    private disposables: vscode.Disposable[] = [];
    private isEnabled = false;
    private keySequence: string = '';
    private cheatCodes = {
        'EXORCISE': 'Standard exorcism - banishes all spirits',
        'BANISH': 'Emergency banishment - immediate spirit removal',
        'PURIFY': 'Purification ritual - cleanses the editor',
        'SANCTIFY': 'Holy blessing - protects from future hauntings',
        'BEGONE': 'Forceful dismissal - spirits flee in terror'
    };
    private lastKeyTime = 0;
    private readonly SEQUENCE_TIMEOUT = 3000; // 3 seconds

    constructor(private context: vscode.ExtensionContext) {}

    enable() {
        if (this.isEnabled) return;
        this.isEnabled = true;

        // Listen for key presses in text editors
        const keyListener = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.contentChanges.length > 0) {
                e.contentChanges.forEach(change => {
                    if (change.text.length === 1) {
                        this.handleKeyPress(change.text.toUpperCase());
                    }
                });
            }
        });

        this.disposables.push(keyListener);
    }

    disable() {
        this.isEnabled = false;
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
        this.keySequence = '';
    }

    private handleKeyPress(key: string) {
        if (!this.isEnabled) return;

        const now = Date.now();

        // Reset sequence if too much time has passed
        if (now - this.lastKeyTime > this.SEQUENCE_TIMEOUT) {
            this.keySequence = '';
        }

        this.lastKeyTime = now;

        // Add key to sequence if it's a letter
        if (key.match(/[A-Z]/)) {
            this.keySequence += key;

            // Limit sequence length to prevent memory issues
            if (this.keySequence.length > 20) {
                this.keySequence = this.keySequence.slice(-20);
            }

            // Check for cheat codes
            this.checkForCheatCodes();
        }
    }

    private checkForCheatCodes() {
        for (const [code, description] of Object.entries(this.cheatCodes)) {
            if (this.keySequence.endsWith(code)) {
                this.executeExorcism(code, description);
                this.keySequence = ''; // Reset after successful execution
                break;
            }
        }

        // Also check for partial matches to give hints
        this.checkForHints();
    }

    private executeExorcism(code: string, description: string) {
        console.log(`Executing exorcism: ${code}`);

        // Show dramatic exorcism sequence
        this.showExorcismSequence(code, description);

        // Disable all haunting effects
        vscode.commands.executeCommand('haunted.disable');

        // Create protective barrier (temporary immunity)
        this.createProtectiveBarrier();
    }

    private async showExorcismSequence(code: string, description: string) {
        // Create a series of dramatic notifications
        const steps = [
            '✨ Incantation detected...',
            '🕯️ Lighting sacred candles...',
            '📿 Reciting protective words...',
            '⚡ Channeling purifying energy...',
            '👼 Angelic forces arriving...',
            '✨ The spirits are fleeing!',
            '🛡️ Editor sanctified!'
        ];

        for (let i = 0; i < steps.length; i++) {
            await new Promise(resolve => {
                vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: steps[i],
                    cancellable: false
                }, async (progress) => {
                    return new Promise(progressResolve => {
                        setTimeout(progressResolve, 800);
                    });
                }).then(resolve);
            });
        }

        // Final success message
        vscode.window.showInformationMessage(
            `✨ EXORCISM COMPLETE! ✨\n${description}`,
            'Blessed be!'
        );

        // Show the ASCII art in output channel
        this.showExorcismArt(code);
    }

    private showExorcismArt(code: string) {
        const outputChannel = vscode.window.createOutputChannel('👼 Exorcism Log');
        outputChannel.clear();
        outputChannel.appendLine('');
        outputChannel.appendLine('╔══════════════════════════════════════════════════════════╗');
        outputChannel.appendLine('║                    ✨ EXORCISM COMPLETE ✨                 ║');
        outputChannel.appendLine('╠══════════════════════════════════════════════════════════╣');
        outputChannel.appendLine('║                                                          ║');
        outputChannel.appendLine('║                        👼                                ║');
        outputChannel.appendLine('║                       /|\\                               ║');
        outputChannel.appendLine('║                        |                                 ║');
        outputChannel.appendLine('║                       / \\                               ║');
        outputChannel.appendLine('║                                                          ║');
        outputChannel.appendLine(`║  Cheat Code Used: ${code.padEnd(38)} ║`);
        outputChannel.appendLine('║                                                          ║');
        outputChannel.appendLine('║  The spirits have been banished from your editor!       ║');
        outputChannel.appendLine('║  Your code is now pure and protected.                   ║');
        outputChannel.appendLine('║                                                          ║');
        outputChannel.appendLine('║  May your functions be bug-free,                        ║');
        outputChannel.appendLine('║  May your variables be well-named,                      ║');
        outputChannel.appendLine('║  And may your commits always compile.                   ║');
        outputChannel.appendLine('║                                                          ║');
        outputChannel.appendLine('╚══════════════════════════════════════════════════════════╝');
        outputChannel.appendLine('');
        outputChannel.show();
    }

    private checkForHints() {
        // Give hints when user is close to typing a cheat code
        for (const code of Object.keys(this.cheatCodes)) {
            if (code.startsWith(this.keySequence) && this.keySequence.length >= 3) {
                const remaining = code.slice(this.keySequence.length);
                if (remaining.length <= 3 && remaining.length > 0) {
                    this.showHint(code, remaining);
                    break;
                }
            }
        }
    }

    private showHint(code: string, remaining: string) {
        const statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
        statusItem.text = `✨ Type "${remaining}" to complete: ${code}`;
        statusItem.tooltip = this.cheatCodes[code as keyof typeof this.cheatCodes];
        statusItem.color = '#ffff00';
        statusItem.show();

        setTimeout(() => {
            statusItem.dispose();
        }, 2000);
    }

    private createProtectiveBarrier() {
        // Create a temporary configuration that prevents re-enabling for a short time
        const config = vscode.workspace.getConfiguration('haunted');
        config.update('enabled', false, vscode.ConfigurationTarget.Global);

        // Show protection status
        const protectionItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
        protectionItem.text = '🛡️ Protected';
        protectionItem.tooltip = 'Editor is protected from spirits for 30 seconds';
        protectionItem.color = '#00ff00';
        protectionItem.show();

        // Remove protection after 30 seconds
        setTimeout(() => {
            protectionItem.dispose();
            vscode.window.showInformationMessage(
                '⚠️ The protective barrier is fading... The spirits may return.',
                'Renew Protection', 'Allow Haunting'
            ).then(selection => {
                if (selection !== 'Renew Protection') {
                    config.update('enabled', true, vscode.ConfigurationTarget.Global);
                }
            });
        }, 30000);
    }
}
