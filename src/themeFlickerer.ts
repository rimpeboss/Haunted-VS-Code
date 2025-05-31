import * as vscode from 'vscode';

export class ThemeFlickerer {
    private disposables: vscode.Disposable[] = [];
    private isEnabled = false;
    private flickerInterval: NodeJS.Timeout | undefined;
    private originalTheme: string | undefined;
    private spookyThemes = [
        'Default Dark+',
        'Default High Contrast',
        'Monokai',
        'Quiet Light'
    ];

    constructor(private context: vscode.ExtensionContext) {}

    enable() {
        if (this.isEnabled) return;
        this.isEnabled = true;

        // Store the original theme
        const config = vscode.workspace.getConfiguration('workbench');
        this.originalTheme = config.get('colorTheme') as string;

        this.startFlickering();
    }

    disable() {
        this.isEnabled = false;
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];

        if (this.flickerInterval) {
            clearInterval(this.flickerInterval);
            this.flickerInterval = undefined;
        }

        // Restore original theme
        if (this.originalTheme) {
            this.setTheme(this.originalTheme);
        }
    }

    toggle() {
        if (this.isEnabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    private startFlickering() {
        if (!this.isEnabled) return;

        const intensity = vscode.workspace.getConfiguration('haunted').get('intensity', 5);
        const flickerDelay = Math.max(1000, 5000 - (intensity * 400)); // More intense = faster flickering

        this.flickerInterval = setInterval(() => {
            this.performFlicker();
        }, flickerDelay);
    }

    private async performFlicker() {
        if (!this.isEnabled) return;

        const originalTheme = vscode.workspace.getConfiguration('workbench').get('colorTheme') as string;

        // Quickly switch to a random spooky theme
        const randomTheme = this.spookyThemes[Math.floor(Math.random() * this.spookyThemes.length)];
        await this.setTheme(randomTheme);

        // Create a spooky visual effect
        this.showFlickerEffect();

        // Switch back after a brief moment
        setTimeout(async () => {
            if (this.isEnabled) {
                await this.setTheme(originalTheme);
            }
        }, 150 + Math.random() * 200);
    }

    private async setTheme(themeName: string) {
        try {
            await vscode.workspace.getConfiguration('workbench').update(
                'colorTheme',
                themeName,
                vscode.ConfigurationTarget.Global
            );
        } catch (error) {
            console.error('Failed to change theme:', error);
        }
    }

    private showFlickerEffect() {
        // Create a temporary status bar item to show the flicker
        const statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
        statusItem.text = '⚡👻 FLICKER';
        statusItem.color = '#ff0000';
        statusItem.show();

        setTimeout(() => {
            statusItem.dispose();
        }, 300);

        // Show a brief notification
        if (Math.random() < 0.3) { // 30% chance
            const messages = [
                '👻 The spirits are restless...',
                '⚡ Reality flickers...',
                '🌙 Something moves in the shadows...',
                '💀 The code grows cold...',
                '🕷️ Webs form in your functions...'
            ];
            const message = messages[Math.floor(Math.random() * messages.length)];

            vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: message,
                cancellable: false
            }, async (progress) => {
                return new Promise(resolve => {
                    setTimeout(resolve, 1000);
                });
            });
        }
    }
}
