'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Upload,
  Zap,
  FileCheck,
  Smartphone,
  Layout,
  Palette,
  ArrowRight,
  Sparkles,
  Shield
} from 'lucide-react';

interface AssetFormProps {
  onSuccess?: (previewUrl: string, splashUrl?: string) => void;
}

export function AssetForm({ onSuccess }: AssetFormProps = {}): JSX.Element {
  const [file, setFile] = useState<File | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>('#0066FF');
  const [appName, setAppName] = useState<string>('My App');
  const [includeSplash, setIncludeSplash] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragOverRef = useRef<HTMLDivElement>(null);

  const presets = ['#0066FF', '#000000', '#FFFFFF', '#FF3B30', '#34C759', '#5856D6'];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFile(droppedFiles[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError(`File size exceeds 5MB limit (${(selectedFile.size / 1024 / 1024).toFixed(2)}MB)`);
      setFile(null);
      return;
    }
    if (!selectedFile.type.includes('png')) {
      setError('Only PNG files are supported');
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError('');

    // Create preview
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!file) {
      setError('Please select a PNG file');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('backgroundColor', backgroundColor);
      formData.append('appName', appName);
      formData.append('includeSplash', includeSplash.toString());

      const response = await fetch('/api/generate-assets', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to generate assets');
      }

      setSuccess(true);

      // Download ZIP
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'expo-assets.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden glass-card border-white/10 shadow-2xl">
      <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20">
            <Layout className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Asset Configuration</h3>
            <p className="text-xs text-muted-foreground italic">Customize how your app branding will look.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        {/* Dropzone */}
        <div className="space-y-4">
          <Label className="text-sm font-bold flex items-center gap-2 italic">
            <Upload className="w-4 h-4 text-primary" />
            LOGO SOURCE
          </Label>

          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300
              ${file ? 'border-primary/50 bg-primary/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}
              p-10 text-center
            `}
          >
            <AnimatePresence mode="wait">
              {file ? (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-4"
                >
                  <div className="relative mx-auto w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                    <img fill src={previewUrl} alt="Preview" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary italic">{file.name}</p>
                    <p className="text-xs text-muted-foreground">Click to change logo</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="mx-auto w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div>
                    <p className="text-sm font-bold italic">Drag & Drop or Click</p>
                    <p className="text-xs text-muted-foreground mt-1 underline italic decoration-primary/30">1024x1024 PNG recommended</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png"
              onChange={handleFileSelect}
              className="hidden"
            />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Background settings */}
          <div className="space-y-4">
            <Label className="text-sm font-bold flex items-center gap-2 italic">
              <Palette className="w-4 h-4 text-primary" />
              SPLASH COLOR
            </Label>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-12 h-12 p-1 rounded-lg bg-transparent border-border"
                />
                <Input
                  type="text"
                  value={backgroundColor.toUpperCase()}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="font-mono text-xs uppercase"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {presets.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setBackgroundColor(p)}
                    className={`w-6 h-6 rounded-full border border-white/20 transition-transform hover:scale-125 ${backgroundColor === p ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                    style={{ backgroundColor: p }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* App name */}
          <div className="space-y-4">
            <Label className="text-sm font-bold flex items-center gap-2 italic">
              <Smartphone className="w-4 h-4 text-primary" />
              APP NAME
            </Label>
            <Input
              placeholder="e.g. My Awesome App"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="h-12 bg-secondary/50 border-white/5 focus:ring-primary shadow-inner"
            />
            <div className="flex items-center gap-2 px-2">
              <Checkbox
                id="splash"
                checked={includeSplash}
                onCheckedChange={(c) => setIncludeSplash(c as boolean)}
              />
              <label htmlFor="splash" className="text-xs text-muted-foreground cursor-pointer italic">
                Include splash screen?
              </label>
            </div>
          </div>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription className="text-xs font-bold italic">{error}</AlertDescription>
            </Alert>
          </motion.div>
        )}

        {success && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Alert className="bg-green-500/10 border-green-500/20 text-green-500">
              <CheckCircle2 className="w-4 h-4" />
              <AlertDescription className="text-xs font-bold italic">Assets downloaded successfully!</AlertDescription>
            </Alert>
          </motion.div>
        )}

        <Button
          type="submit"
          disabled={!file || loading}
          className={`
            w-full h-14 text-lg font-bold rounded-2xl transition-all duration-500
            ${loading ? 'bg-secondary cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] shadow-lg shadow-primary/20'}
          `}
        >
          {loading ? (
            <div className="flex items-center gap-2 italic">
              <Spinner className="w-5 h-5" />
              Optimizing...
            </div>
          ) : (
            <div className="flex items-center gap-2 italic">
              Generate Assets
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </Button>

        <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground font-mono uppercase tracking-widest pt-2">
          <span className="flex items-center gap-1 italic"><Shield className="w-3 h-3" /> Secure</span>
          <span className="w-1 h-1 bg-border rounded-full" />
          <span className="flex items-center gap-1 italic"><Zap className="w-3 h-3" /> Instant</span>
          <span className="w-1 h-1 bg-border rounded-full" />
          <span className="flex items-center gap-1 italic"><Sparkles className="w-3 h-3" /> Optimized</span>
        </div>
      </form>
    </Card>
  );
}
