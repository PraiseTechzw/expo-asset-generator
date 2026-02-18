import { NextRequest, NextResponse } from 'next/server';
import JSZip from 'jszip';
import {
  generateAssets,
  validateFile,
  generateAppJsonSnippet,
  generateReadmeContent,
} from '@/lib/image-utils';

export const maxDuration = 60;
export const runtime = 'nodejs';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

interface ErrorResponse {
  error: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<ErrorResponse | Blob>> {
  try {
    let formData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { error: 'Request body is too large or invalid' },
        { status: 413 },
      );
    }

    const file = formData.get('file') as File | null;
    const backgroundColor = formData.get('backgroundColor') as string | null;
    const includeSplash = formData.get('includeSplash') === 'true';
    const appName = (formData.get('appName') as string) || 'My App';

    // Validate inputs
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!backgroundColor || !/^#[0-9A-F]{6}$/i.test(backgroundColor)) {
      return NextResponse.json({ error: 'Invalid background color format' }, { status: 400 });
    }

    // Client-side validation check
    const validation = validateFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds 5MB limit (${(file.size / 1024 / 1024).toFixed(2)}MB)` },
        { status: 413 },
      );
    }

    // Convert file to buffer
    let fileBuffer: Buffer;
    try {
      fileBuffer = Buffer.from(await file.arrayBuffer());
    } catch {
      return NextResponse.json({ error: 'Failed to read file data' }, { status: 400 });
    }

    // Check image dimensions
    let metadata;
    try {
      const sharp = await import('sharp');
      metadata = await sharp.default(fileBuffer).metadata();
    } catch {
      return NextResponse.json({ error: 'Invalid or corrupted PNG file' }, { status: 400 });
    }

    if (!metadata.width || !metadata.height) {
      return NextResponse.json({ error: 'Unable to read image dimensions' }, { status: 400 });
    }

    // Validate square aspect ratio
    if (metadata.width !== metadata.height) {
      return NextResponse.json(
        {
          error: `Image must be square. Current: ${metadata.width}x${metadata.height}px. Please provide a square image.`,
        },
        { status: 400 },
      );
    }

    // Validate minimum size
    if (metadata.width < 1024 || metadata.height < 1024) {
      return NextResponse.json(
        {
          error: `Image must be at least 1024x1024px. Current: ${metadata.width}x${metadata.height}px. Please upload a larger image.`,
        },
        { status: 400 },
      );
    }

    // Generate assets
    let assets;
    try {
      assets = await generateAssets(fileBuffer, backgroundColor, includeSplash);
    } catch {
      return NextResponse.json({ error: 'Failed to process image assets' }, { status: 500 });
    }

    // Create ZIP file
    let zip: JSZip;
    try {
      zip = new JSZip();
    } catch {
      return NextResponse.json({ error: 'Failed to create ZIP file' }, { status: 500 });
    }

    const brandingFolder = zip.folder('assets/branding');

    if (!brandingFolder) {
      return NextResponse.json({ error: 'Failed to create ZIP structure' }, { status: 500 });
    }

    // Add all asset files
    brandingFolder.file('icon.png', assets.icon);
    brandingFolder.file('adaptive-icon-foreground.png', assets.adaptiveIconForeground);
    brandingFolder.file('adaptive-icon-background.png', assets.adaptiveIconBackground);
    brandingFolder.file('android-icon-monochrome.png', assets.androidIconMonochrome);

    if (includeSplash && assets.splash.length > 0) {
      brandingFolder.file('splash.png', assets.splash);
    }

    brandingFolder.file('favicon.png', assets.favicon);

    // Add app.json snippet
    const appJsonSnippet = generateAppJsonSnippet(backgroundColor, appName);
    zip.file('app.json.snippet', appJsonSnippet);

    // Add README
    const readme = generateReadmeContent(appName);
    zip.file('README.txt', readme);

    // Generate ZIP blob
    let zipBuffer: ArrayBuffer;
    try {
      zipBuffer = await zip.generateAsync({ type: 'arraybuffer' });
    } catch {
      return NextResponse.json({ error: 'Failed to generate ZIP file' }, { status: 500 });
    }

    // Return ZIP file
    return new NextResponse(zipBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="expo-assets.zip"',
      },
    });
  } catch (error) {
    console.error('Asset generation error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  }
}
