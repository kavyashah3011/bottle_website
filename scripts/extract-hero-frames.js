import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const VIDEO_PATH = 'C:/Users/KAVYA/OneDrive/Documents/bottle/video/Untitled ‑ Made with FlexClip-ezremove.mp4';
const FALLBACK_VIDEO = 'public/videos/hero_optimized.mp4';
const OUTPUT_BASE = 'public/hero-sequence';
const DESKTOP_DIR = path.join(OUTPUT_BASE, 'desktop');
const MOBILE_DIR = path.join(OUTPUT_BASE, 'mobile');
const TARGET_FPS = 15; // Optimal balance: ~438 frames for 29.18s, ultra-smooth scroll scrubbing & fast network loading
const WEBP_QUALITY = 78;

function run() {
  console.log('=== BOTVOR HERO SEQUENCE EXTRACTION PIPELINE ===\n');

  // 1. Locate Source Video
  let inputVideo = VIDEO_PATH;
  if (!fs.existsSync(inputVideo)) {
    console.warn(`Primary video not found at ${VIDEO_PATH}. Checking fallback...`);
    inputVideo = FALLBACK_VIDEO;
  }
  if (!fs.existsSync(inputVideo)) {
    console.error(`Error: No source video found!`);
    process.exit(1);
  }
  console.log(`Source Video: ${inputVideo}`);

  // 2. Read Metadata using ffprobe
  console.log('\n--- 1. Probing Video Metadata ---');
  const probeOutput = execSync(
    `ffprobe -v quiet -print_format json -show_format -show_streams "${inputVideo}"`,
    { encoding: 'utf-8' }
  );
  const metadata = JSON.parse(probeOutput);
  const videoStream = metadata.streams.find((s) => s.codec_type === 'video');
  const duration = parseFloat(metadata.format.duration || '29.18');
  const width = videoStream ? videoStream.width : 1280;
  const height = videoStream ? videoStream.height : 720;
  const sourceFps = videoStream && videoStream.r_frame_rate ? eval(videoStream.r_frame_rate) : 30;

  console.log(`Resolution: ${width}x${height}`);
  console.log(`Duration: ${duration.toFixed(2)}s`);
  console.log(`Source FPS: ${sourceFps}`);
  console.log(`Target FPS: ${TARGET_FPS} fps`);
  const estimatedFrames = Math.round(duration * TARGET_FPS);
  console.log(`Expected Frame Count: ~${estimatedFrames}`);

  // 3. Create Output Directories
  console.log('\n--- 2. Preparing Output Directories ---');
  [DESKTOP_DIR, MOBILE_DIR].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // 4. Extract Desktop WebP Frames
  console.log('\n--- 3. Extracting Desktop Sequence (WebP) ---');
  const desktopPattern = path.join(DESKTOP_DIR, 'frame-%05d.webp').replace(/\\/g, '/');
  const desktopCmd = `ffmpeg -y -i "${inputVideo}" -vf "fps=${TARGET_FPS},scale=1280:720:flags=lanczos" -c:v libwebp -quality ${WEBP_QUALITY} -compression_level 4 "${desktopPattern}"`;
  console.log(`Executing FFmpeg command for Desktop...`);
  execSync(desktopCmd, { stdio: 'inherit' });

  // 5. Extract Mobile WebP Frames (Smart portrait 9:16 crop)
  console.log('\n--- 4. Extracting Mobile Sequence (WebP Portrait Crop) ---');
  const mobilePattern = path.join(MOBILE_DIR, 'frame-%05d.webp').replace(/\\/g, '/');
  const mobileCmd = `ffmpeg -y -i "${inputVideo}" -vf "fps=${TARGET_FPS},scale=1280:720:flags=lanczos,crop=450:720:(in_w-out_w)/2:0" -c:v libwebp -quality 75 -compression_level 4 "${mobilePattern}"`;
  console.log(`Executing FFmpeg command for Mobile...`);
  execSync(mobileCmd, { stdio: 'inherit' });

  // 6. Generate High-Res Poster
  console.log('\n--- 5. Generating Poster ---');
  const posterPath = path.join(OUTPUT_BASE, 'poster.webp').replace(/\\/g, '/');
  execSync(`ffmpeg -y -i "${inputVideo}" -vframes 1 -c:v libwebp -quality 85 "${posterPath}"`, { stdio: 'inherit' });

  // 7. Calculate Statistics
  const desktopFiles = fs.readdirSync(DESKTOP_DIR).filter((f) => f.endsWith('.webp'));
  const mobileFiles = fs.readdirSync(MOBILE_DIR).filter((f) => f.endsWith('.webp'));

  let desktopTotalSize = 0;
  desktopFiles.forEach((f) => {
    desktopTotalSize += fs.statSync(path.join(DESKTOP_DIR, f)).size;
  });

  let mobileTotalSize = 0;
  mobileFiles.forEach((f) => {
    mobileTotalSize += fs.statSync(path.join(MOBILE_DIR, f)).size;
  });

  console.log('\n=== EXTRACTION SUMMARY ===');
  console.log(`Desktop Frames: ${desktopFiles.length} files`);
  console.log(`Desktop Total Size: ${(desktopTotalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Desktop Avg Frame: ${(desktopTotalSize / desktopFiles.length / 1024).toFixed(1)} KB`);
  console.log(`Mobile Frames: ${mobileFiles.length} files`);
  console.log(`Mobile Total Size: ${(mobileTotalSize / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Mobile Avg Frame: ${(mobileTotalSize / mobileFiles.length / 1024).toFixed(1)} KB`);

  // 8. Write Sequence Manifest
  const manifest = {
    fps: TARGET_FPS,
    duration,
    frameCount: desktopFiles.length,
    mobileFrameCount: mobileFiles.length,
    width,
    height,
    desktopPattern: '/hero-sequence/desktop/frame-%05d.webp',
    mobilePattern: '/hero-sequence/mobile/frame-%05d.webp',
    poster: '/hero-sequence/poster.webp',
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync(path.join(OUTPUT_BASE, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${path.join(OUTPUT_BASE, 'manifest.json')}`);
  console.log('Hero image sequence extraction complete!\n');
}

run();
