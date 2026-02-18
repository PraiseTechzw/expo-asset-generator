'use client';

import { useState, useRef } from 'react';
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
  Smartphone,
  Layout,
  Palette,
  ArrowRight,
  Sparkles,
  Shield,
  FileText,
  MousePointer2,
  Check
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

  const presets = ['#0066FF', '#000000', '#FFFFFF', '#FF3B30', '#34C759', '#5856D6', '#FF9500'];

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
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to generate assets');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${appName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-assets.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccess(true);
      if (onSuccess) onSuccess(previewUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      <Card className="overflow-hidden glass-card border-white/10 shadow-2xl animate-fadeIn">
        <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg shadow-lg shadow-primary/20">
                <Layout className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-bold text-lg italic">Asset Generator</h3>
                <p className="text-xs text-muted-foreground italic tracking-tight">Generate everything in one click.</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-secondary/50 rounded-full border border-white/5">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-bold italic tracking-tighter">AI-OPTIMIZED</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* File Upload Section */}
          <div className="space-y-4">
            <Label className="text-sm font-bold flex items-center gap-2 italic">
              <Upload className="w-4 h-4 text-primary" />
              SOURCE LOGO
            </Label>

            <motion.div
              whileHover={{ y: -2 }}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-500
                ${file ? 'border-primary bg-primary/5 shadow-[0_0_30px_rgba(var(--primary),0.1)]' : 'border-border hover:border-primary/50 hover:bg-secondary/50'}
                p-12 text-center overflow-hidden
              `}
            >
              {/* Background accent for active state */}
              {file && <div className="absolute inset-0 bg-primary/5 animate-pulse" />}

              <AnimatePresence mode="wait">
                {file ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative z-10 space-y-6"
                  >
                    <div className="relative mx-auto w-32 h-32 group-hover:rotate-2 transition-transform duration-500">
                      <div className="absolute inset-[-4px] bg-gradient-to-br from-primary to-accent rounded-[2rem] opacity-50 blur-lg" />
                      <div className="relative h-full w-full rounded-2xl overflow-hidden border-4 border-white shadow-2xl">
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 p-2 bg-green-500 rounded-full shadow-lg border-2 border-white">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary italic tracking-tight">{file.name}</p>
                      <p className="text-xs text-muted-foreground italic mt-1">Ready to process. Click to replace.</p>
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
                    <div className="mx-auto w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center group-hover:bg-primary/20 group-hover:rotate-6 transition-all duration-300">
                      <Upload className="w-10 h-10 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-lg font-bold italic tracking-tight">Drop your PNG here</p>
                      <p className="text-sm text-muted-foreground italic mt-1">or click to browse local files</p>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-2">
                      <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 border border-border rounded">PNG</span>
                      <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 border border-border rounded">MIN 1024px</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <input ref={fileInputRef} type="file" accept="image/png" onChange={handleFileSelect} className="hidden" aria-label="Upload logo" />
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Color Config */}
            <div className="space-y-6">
              <Label className="text-sm font-bold flex items-center gap-2 italic tracking-tight">
                <Palette className="w-4 h-4 text-primary" />
                SPLASH BACKGROUND
              </Label>

              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative group p-0.5 rounded-xl border-2 border-white/5 bg-secondary/30 transition-all hover:border-primary/30">
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-14 h-14 p-1 rounded-lg bg-transparent cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      type="text"
                      value={backgroundColor.toUpperCase()}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="font-mono text-sm h-12 bg-secondary/50 border-white/5 uppercase italic"
                    />
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  {presets.map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setBackgroundColor(p)}
                      className={`w-7 h-7 rounded-lg border-2 border-white/10 transition-all hover:scale-125 hover:rotate-3 ${backgroundColor === p ? 'ring-2 ring-primary ring-offset-4 ring-offset-background scale-110' : 'opacity-60 hover:opacity-100'}`}
                      style={{ backgroundColor: p }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* App Settings */}
            <div className="space-y-6">
              <Label className="text-sm font-bold flex items-center gap-2 italic tracking-tight">
                <FileText className="w-4 h-4 text-primary" />
                APP METADATA
              </Label>
              <div className="space-y-4">
                <Input
                  placeholder="App Name (e.g. My App)"
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  className="h-14 bg-secondary/50 border-white/5 focus:ring-primary shadow-inner italic"
                />
                <div className="flex items-center gap-4 px-3 py-4 rounded-2xl bg-secondary/30 border border-white/5">
                  <Checkbox
                    id="splash"
                    checked={includeSplash}
                    onCheckedChange={(c) => setIncludeSplash(c as boolean)}
                    className="w-5 h-5 rounded-md"
                  />
                  <div className="space-y-0.5">
                    <label htmlFor="splash" className="text-sm font-bold italic block cursor-pointer">
                      Generate Splash Screen
                    </label>
                    <p className="text-[10px] text-muted-foreground italic font-medium tracking-tight">Center logo on colored background</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <Alert variant="destructive" className="bg-destructive/10 border-destructive/20 text-destructive rounded-2xl">
                  <AlertCircle className="w-4 h-4" />
                  <AlertDescription className="text-xs font-bold italic">{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {success && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <Alert className="bg-green-500/10 border-green-500/20 text-green-500 rounded-2xl p-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 mt-1" />
                    <div className="space-y-1">
                      <p className="font-bold italic text-lg tracking-tight">Success! ZIP Downloaded.</p>
                      <p className="text-xs font-medium italic opacity-70">Check your downloads folder for the ready-to-use assets.</p>
                      <div className="pt-3 flex gap-4">
                        <span className="flex items-center gap-1 text-[10px] font-bold"><Check className="w-3 h-3" /> APPS.JSON SNIPPET</span>
                        <span className="flex items-center gap-1 text-[10px] font-bold"><Check className="w-3 h-3" /> README INCLUDED</span>
                      </div>
                    </div>
                  </div>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            disabled={!file || loading}
            size="lg"
            className={`
              w-full h-16 text-xl font-black rounded-3xl transition-all duration-700 uppercase tracking-widest
              ${loading ? 'bg-secondary cursor-not-allowed' : 'bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_40px_rgba(var(--primary),0.5)] shadow-xl shadow-primary/20'}
            `}
          >
            {loading ? (
              <div className="flex items-center gap-3 italic">
                <Spinner className="w-6 h-6" />
                TRANSFORMING...
              </div>
            ) : (
              <div className="flex items-center gap-4 italic group">
                Generate & Export
                <Download className="w-6 h-6 group-hover:translate-y-1 group-hover:scale-110 transition-transform" />
              </div>
            )}
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-[9px] font-black italic tracking-[0.2em]">
              <Shield className="w-3 h-3 text-primary" /> EAS COMPLIANT
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black italic tracking-[0.2em]">
              <Smartphone className="w-3 h-3 text-primary" /> ANDROID READY
            </div>
            <div className="flex items-center gap-2 text-[9px] font-black italic tracking-[0.2em]">
              <Zap className="w-3 h-3 text-primary" /> INSTANT PROCESSING
            </div>
          </div>
        </form>
      </Card>

      {/* Trust Mini Banner */}
      <div className="flex items-center justify-between px-6 py-4 rounded-[2rem] bg-secondary/20 border border-white/5 backdrop-blur-sm animate-slideIn">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <p className="text-[10px] font-bold italic text-muted-foreground uppercase tracking-wider">Server Status: Online & Fast</p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="w-6 h-6 rounded-full border-2 border-background bg-secondary flex items-center justify-center text-[8px] font-bold text-muted-foreground overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
            </div>
          ))}
          <div className="w-6 h-6 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[8px] font-bold text-white">
            +1K
          </div>
        </div>
      </div>
    </div>
  );
}
