#!/usr/bin/env node
import readline from 'readline';
import { DungeonDecoder } from './services/decoder.js';

class AvalonDungeonDecoder {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    this.init();
  }

  private showBanner(): void {
    console.log(`
    ██████╗██╗  ██╗██╗   ██╗███╗   ██╗██╗   ██╗
   ██╔════╝██║  ██║██║   ██║████╗  ██║╚██╗ ██╔╝
   ██║     ███████║██║   ██║██╔██╗ ██║ ╚████╔╝
   ██║     ██╔══██║██║   ██║██║╚██╗██║  ╚██╔╝
   ╚██████╗██║  ██║╚██████╔╝██║ ╚████║   ██║
    ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝
    `);
  }

  private showInstructions(): void {
    console.log('Parámetros del cheat engine:');
    console.log('Primer piso: AVA_TEMPLE_START_First_Level_01');
    console.log('Segundo piso: AVA_TEMPLE_START');
    console.log('\n\nPegue el texto codificado aquí:');
  }

  private processInput(input: string): void {
    try {
      const bosses = DungeonDecoder.decode(input);
      
      console.log('\nJefes en orden:');
      bosses.forEach((boss, index) => {
        console.log(`${index + 1}. ${boss.name} (Position: ${boss.position}): ${boss.color}`);
      });
    } catch (error) {
      console.error('Error:', (error as Error).message);
    }
  }

  private init(): void {
    this.showBanner();
    this.showInstructions();

    this.rl.on('line', (line: string) => {
      console.clear();
      this.showBanner();
      this.processInput(line);
      console.log('\nHecho con amor, y odio por @chuny-dev');
      console.log('\nPresione enter para salir...');
      this.rl.question('', () => {
        this.rl.close();
      });
    });
  }
}

new AvalonDungeonDecoder();