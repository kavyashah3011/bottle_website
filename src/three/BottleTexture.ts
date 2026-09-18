import * as THREE from 'three';

let cachedTexture: THREE.CanvasTexture | null = null;

export function createBottleLabelTexture(): THREE.CanvasTexture {
  if (cachedTexture) {
    return cachedTexture;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // Transparent background
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Front label zone (centered)
    const centerX = canvas.width / 2;

    // 1. Apex Monogram "VM"
    ctx.save();
    ctx.strokeStyle = '#FFFFFF';
    ctx.fillStyle = '#FFFFFF';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'miter';

    // Outer Monogram box/frame
    ctx.beginPath();
    ctx.arc(centerX, 310, 55, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Stylized "VM"
    ctx.font = 'bold 55px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('VM', centerX, 312);
    ctx.restore();

    // 2. Brand Wordmark "BOTVOR"
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 65px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '9px';
    ctx.fillText('B O T V O R', centerX, 420);

    // 3. Sub-title
    ctx.fillStyle = 'rgba(212, 175, 55, 0.9)'; // Subtle gold
    ctx.font = '600 18px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.letterSpacing = '6px';
    ctx.fillText('ALPINE MINERAL WATER', centerX, 458);

    // 4. Subtle decorative botanical line
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(centerX - 90, 485);
    ctx.lineTo(centerX + 90, 485);
    ctx.stroke();

    // Diamond center
    ctx.fillStyle = '#D4AF37';
    ctx.beginPath();
    ctx.arc(centerX, 485, 3, 0, Math.PI * 2);
    ctx.fill();

    // 5. Heritage Crest & Text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'italic 500 24px "Cormorant Garamond", Georgia, serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('Vital Elixir', centerX, 525);

    // 6. Metrics & Specs
    ctx.fillStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.font = '500 15px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('500 ML  •  pH 7.85  •  TDS 42 MG/L', centerX, 560);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.font = '400 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('SOURCE: VAL D’AOSTA  •  ALPS (2,840M)', centerX, 585);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.colorSpace = THREE.SRGBColorSpace;
  cachedTexture = texture;
  return texture;
}
