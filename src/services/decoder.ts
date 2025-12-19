import { Boss } from '../types/boss.js';
import { bosses } from '../config/bosses.js';
import { cleanText, hexToStr } from '../utils/text.js';

/**
 * Mapeo real de Albion:
 * layer interno → tier real
 */
const LAYER_TO_TIER: Record<number, number> = {
  1: 6,
  2: 7,
  3: 8,
  4: 9
};

export class DungeonDecoder {
  /**
   * Decodifica el texto HEX del cheat engine
   * y retorna los jefes en orden de aparición
   */
  static decode(encodedData: string): Boss[] {
    try {
      // 1️⃣ Limpiar HEX
      const hexData = encodedData.replace(/\s/g, '');

      // 2️⃣ HEX → string
      const stringData = hexToStr(hexData);

      // 3️⃣ Normalizar texto
      const cleanedText = cleanText(stringData.toLowerCase());

      const bossPositions: Boss[] = [];

      // 4️⃣ Buscar cada boss en el texto
      Object.keys(bosses).forEach((bossKey) => {
        const regex = new RegExp(`layer(\\d{1,2}).*?${bossKey}`, 'gi');
        let match: RegExpExecArray | null;

        while ((match = regex.exec(cleanedText)) !== null) {
          const layer = parseInt(match[1], 10);
          const tier = LAYER_TO_TIER[layer];

          bossPositions.push({
            name: bosses[bossKey].name,
            position: match.index,
            layer,
            color: bosses[bossKey][tier] ?? 'Desconocido'
          });
        }
      });

      // 5️⃣ Ordenar por aparición real
      return bossPositions.sort((a, b) => a.position - b.position);
    } catch {
      throw new Error('Error al decodificar la información del calabozo');
    }
  }
}
