'use client';

import { Zap, Github, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 glass border-b border-border/40 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-1.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ExpoAsset
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
              How it works
            </Link>
            <Link href="#assets" className="text-muted-foreground hover:text-primary transition-colors">
              Assets
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-primary transition-colors">
              FAQ
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button className="hidden sm:flex bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 shadow-md">
              Try Pro
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
