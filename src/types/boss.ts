export interface Boss {
  name: string;
  position: number; // ← obligatorio
  layer: number;
  color: string;
}


export interface BossConfig {
  name: string;
  [key: string | number]: string;
}

