import sharp from 'sharp';

export interface AssetFiles {
  icon: Buffer;
  adaptiveIconForeground: Buffer;
  adaptiveIconBackground: Buffer;
  androidIconMonochrome: Buffer;
  splash: Buffer;
  favicon: Buffer;
}

/**
 * Resize image to exact dimensions with no stretching
 */
async function resizeImage(
  buffer: Buffer,
  width: number,
  height: number,
): Promise<Buffer> {
  return sharp(buffer)
    .resize(width, height, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

/**
 * Add transparent padding to image (used for adaptive icon foreground)
 * Applies 20% padding around content
 */
async function addPaddingToImage(
  buffer: Buffer,
  size: number,
  paddingPercent: number = 20,
): Promise<Buffer> {
  const paddingPixels = Math.round((size * paddingPercent) / 100);
  const contentSize = size - paddingPixels * 2;

  // First resize to fit within content area
  const resized = await sharp(buffer)
    .resize(contentSize, contentSize, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Create transparent canvas and composite
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: resized,
        left: paddingPixels,
        top: paddingPixels,
      },
    ])
    .png()
    .toBuffer();
}

/**
 * Create solid color background image
 */
async function createColoredBackground(
  size: number,
  hexColor: string,
): Promise<Buffer> {
  const rgb = hexToRgb(hexColor);

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 3,
      background: rgb,
    },
  })
    .png()
    .toBuffer();
}

/**
 * Convert image to white monochrome version with transparency
 */
async function convertToMonochrome(buffer: Buffer, size: number): Promise<Buffer> {
  return sharp(buffer)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .greyscale()
    .normalize()
    .toColorspace('srgb')
    .composite([
      {
        input: Buffer.from(
          `<svg width="${size}" height="${size}"><rect fill="white" width="${size}" height="${size}"/></svg>`,
        ),
        blend: 'screen',
      },
    ])
    .png()
    .toBuffer();
}

/**
 * Create splash screen with background and centered logo
 */
async function createSplashScreen(
  logoBuffer: Buffer,
  size: { width: number; height: number },
  backgroundColor: string,
): Promise<Buffer> {
  const bgRgb = hexToRgb(backgroundColor);
  const logoWidth = Math.round(size.width * 0.4);
  const logoHeight = Math.round(size.height * 0.4);

  // Resize logo to 40% of width while maintaining aspect ratio
  const resizedLogo = await sharp(logoBuffer)
    .resize(logoWidth, logoHeight, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  // Create background and composite logo in center
  const centerX = Math.round((size.width - logoWidth) / 2);
  const centerY = Math.round((size.height - logoHeight) / 2);

  return sharp({
    create: {
      width: size.width,
      height: size.height,
      channels: 3,
      background: bgRgb,
    },
  })
    .composite([
      {
        input: resizedLogo,
        left: centerX,
        top: centerY,
      },
    ])
    .png()
    .toBuffer();
}

/**
 * Generate all required Expo assets
 */
export async function generateAssets(
  logoBuffer: Buffer,
  backgroundColor: string,
  includeSplash: boolean,
): Promise<AssetFiles> {
  const [icon, adaptiveIconForeground, adaptiveIconBackground, androidIconMonochrome, favicon] =
    await Promise.all([
      resizeImage(logoBuffer, 1024, 1024),
      addPaddingToImage(logoBuffer, 1024, 20),
      createColoredBackground(1024, backgroundColor),
      convertToMonochrome(logoBuffer, 1024),
      resizeImage(logoBuffer, 48, 48),
    ]);

  const splash = includeSplash
    ? await createSplashScreen(logoBuffer, { width: 1242, height: 2436 }, backgroundColor)
    : Buffer.alloc(0);

  return {
    icon,
    adaptiveIconForeground,
    adaptiveIconBackground,
    androidIconMonochrome,
    splash,
    favicon,
  };
}

/**
 * Convert hex color to RGB object
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

/**
 * Validate uploaded file
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.type !== 'image/png') {
    return { valid: false, error: 'File must be a PNG image' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'File is empty' };
  }

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: `File size exceeds 5MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)` };
  }

  return { valid: true };
}

/**
 * Generate app.json snippet
 */
export function generateAppJsonSnippet(backgroundColor: string, appName: string): string {
  return `{
  "expo": {
    "name": "${appName}",
    "icon": "./assets/branding/icon.png",
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/branding/adaptive-icon-foreground.png",
        "backgroundColor": "${backgroundColor}"
      }
    },
    "splash": {
      "image": "./assets/branding/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "${backgroundColor}"
    },
    "web": {
      "favicon": "./assets/branding/favicon.png"
    }
  }
}`;
}

/**
 * Generate README content
 */
export function generateReadmeContent(appName: string): string {
  return `# ${appName} - Expo Assets

This folder contains all the branding assets required for your Expo project.

## Installation

1. Copy the \`assets/branding\` folder into your Expo project root directory.

2. Merge the \`app.json.snippet\` content into your project's \`app.json\` file:
   - Copy the \`expo\` object properties from the snippet
   - Paste them into your existing \`app.json\`

3. Rebuild your app:
   \`\`\`bash
   eas build
   \`\`\`

## Asset Files

- **icon.png** (1024x1024) - Main app icon
- **adaptive-icon-foreground.png** (1024x1024) - Android adaptive icon foreground with 20% padding
- **adaptive-icon-background.png** (1024x1024) - Android adaptive icon background
- **android-icon-monochrome.png** (1024x1024) - Monochrome icon for Android
- **splash.png** (1242x2436) - Splash screen image
- **favicon.png** (48x48) - Web favicon

All images are optimized for Expo and follow official guidelines.

Generated with Expo Asset Generator`;
}
