export interface Product {
  id: string;
  name: string;
  volume: string;
  edition: string;
  tagline: string;
  description: string;
  source: string;
  ph: number;
  tds: number;
  price: string;
  specs: {
    material: string;
    cap: string;
    height: string;
    diameter: string;
    weightEmpty: string;
  };
  attributes: string[];
  image?: string;
}

export interface SceneMoment {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  timestamp: string;
  tag: string;
  image: string;
  stats?: { label: string; value: string }[];
}

export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  position: [number, number, number];
  cameraPosition: [number, number, number];
}
