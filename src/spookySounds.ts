import * as vscode from 'vscode';
import * as path from 'path';

export class SpookySounds {
    private disposables: vscode.Disposable[] = [];
    private isEnabled = false;
    private audioContext: any;
    private sounds: { [key: string]: any } = {};

    constructor(private context: vscode.ExtensionContext) {
        this.initializeAudioContext();
    }

    enable() {
        if (this.isEnabled) return;
        this.isEnabled = true;

        // Listen for text document changes (deletions)
        const deleteListener = vscode.workspace.onDidChangeTextDocument(e => {
            if (e.contentChanges.length > 0) {
                e.contentChanges.forEach(change => {
                    if (change.text === '' && change.rangeLength > 0) {
                        // Text was deleted
                        this.playDeleteSound();
                    } else if (change.text.length > 0) {
                        // Text was added - occasionally play typing sounds
                        if (Math.random() < 0.1) { // 10% chance
                            this.playTypingSound();
                        }
                    }
                });
            }
        });

        // Listen for editor changes
        const editorListener = vscode.window.onDidChangeActiveTextEditor(() => {
            if (Math.random() < 0.2) { // 20% chance
                this.playAmbientSound();
            }
        });

        this.disposables.push(deleteListener, editorListener);

        // Play welcome sound
        setTimeout(() => {
            this.playWelcomeSound();
        }, 500);
    }

    disable() {
        this.isEnabled = false;
        this.disposables.forEach(d => d.dispose());
        this.disposables = [];
    }

    toggle() {
        if (this.isEnabled) {
            this.disable();
        } else {
            this.enable();
        }
    }

    private initializeAudioContext() {
        // Create basic audio context for web audio
        try {
            // Note: In a real VS Code extension, you'd need to use the webview API
            // or external audio libraries. For this demo, we'll simulate with status messages
            console.log('Audio context initialized');
        } catch (error) {
            console.error('Failed to initialize audio context:', error);
        }
    }

    private playDeleteSound() {
        if (!this.isEnabled) return;

        const sounds = [
            '💀 *ghostly whisper*',
            '👻 *ethereal moan*',
            '🕷️ *sinister hiss*',
            '🦇 *bat screech*',
            '⚰️ *coffin creak*',
            '🌙 *wind howl*',
            '💀 *chain rattle*'
        ];

        const sound = sounds[Math.floor(Math.random() * sounds.length)];
        this.showSoundNotification(sound);

        // Create a spooky visual effect
        this.createDeleteEffect();
    }

    private playTypingSound() {
        if (!this.isEnabled) return;

        const sounds = [
            '👻 *spectral tap*',
            '🕷️ *web vibration*',
            '💀 *bone click*',
            '🌙 *mystic chime*'
        ];

        const sound = sounds[Math.floor(Math.random() * sounds.length)];

        // Only show occasionally to avoid spam
        if (Math.random() < 0.3) {
            this.showSoundNotification(sound, 500);
        }
    }

    private playAmbientSound() {
        if (!this.isEnabled) return;

        const ambientSounds = [
            '🌙 *distant thunder*',
            '👻 *whispers in the void*',
            '🦇 *wings in the darkness*',
            '🕷️ *ancient secrets*',
            '💀 *echoes from beyond*'
        ];

        const sound = ambientSounds[Math.floor(Math.random() * ambientSounds.length)];
        this.showSoundNotification(sound, 2000);
    }

    private playWelcomeSound() {
        if (!this.isEnabled) return;

        this.showSoundNotification('👻 *The spirits have awakened...*', 3000);
    }

    private showSoundNotification(sound: string, duration: number = 1000) {
        // Create a status bar item for the sound effect
        const statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1000);
        statusItem.text = `🔊 ${sound}`;
        statusItem.tooltip = 'Spooky sound effect';
        statusItem.show();

        setTimeout(() => {
            statusItem.dispose();
        }, duration);
    }

    private createDeleteEffect() {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        // Create a spooky decoration at the cursor
        const decorationType = vscode.window.createTextEditorDecorationType({
            backgroundColor: 'rgba(255, 0, 0, 0.2)',
            border: '1px solid rgba(255, 0, 0, 0.5)',
            borderRadius: '3px',
            after: {
                contentText: '💀',
                color: '#ff0000',
                fontWeight: 'bold',
                margin: '0 0 0 5px'
            }
        });

        const position = editor.selection.active;
        const range = new vscode.Range(position, position.translate(0, 1));
        editor.setDecorations(decorationType, [range]);

        // Remove after a short time
        setTimeout(() => {
            decorationType.dispose();
        }, 800);

        // Add particle effect simulation
        this.createParticleEffect();
    }

    private createParticleEffect() {
        // Simulate particles with multiple small decorations
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const particles = ['💀', '👻', '🕷️', '🦇'];
        const decorations: vscode.DecorationOptions[] = [];

        for (let i = 0; i < 5; i++) {
            const particle = particles[Math.floor(Math.random() * particles.length)];
            const decorationType = vscode.window.createTextEditorDecorationType({
                after: {
                    contentText: particle,
                    color: `rgba(255, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, 0.7)`,
                    fontWeight: 'bold',
                    margin: `0 0 0 ${Math.random() * 20}px`
                }
            });

            const position = editor.selection.active;
            const range = new vscode.Range(position, position);
            editor.setDecorations(decorationType, [range]);

            setTimeout(() => {
                decorationType.dispose();
            }, 1200 + i * 200);
        }
    }
}
