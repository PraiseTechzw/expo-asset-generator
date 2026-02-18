'use client';

import { Zap, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 border-t border-border/40 bg-card/60 backdrop-blur-md overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link href="/" className="flex items-center gap-2 group w-fit">
                            <div className="p-1.5 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg group-hover:scale-110 transition-transform">
                                <Zap className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <span className="text-2xl font-black italic bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                ExpoAsset
                            </span>
                        </Link>
                        <p className="text-muted-foreground italic leading-relaxed max-w-sm text-sm">
                            The ultimate asset generation engine for Expo developers.
                            Optimize your workflow and deliver polished apps with compliant branding
                            in seconds, not hours.
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 rounded-full border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                                <Github className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                                <Twitter className="h-4 w-4" />
                            </Link>
                            <Link href="#" className="p-2 rounded-full border border-border/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 transition-all">
                                <Linkedin className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="space-y-6">
                        <h5 className="text-sm font-bold uppercase italic tracking-[0.2em] text-foreground/90">Resources</h5>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#generator" className="text-sm text-muted-foreground italic hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-border rounded-full" /> Generator
                                </Link>
                            </li>
                            <li>
                                <Link href="#how-it-works" className="text-sm text-muted-foreground italic hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-border rounded-full" /> Documentation
                                </Link>
                            </li>
                            <li>
                                <a href="https://docs.expo.dev" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground italic hover:text-primary transition-colors flex items-center gap-2">
                                    <span className="w-1 h-1 bg-border rounded-full" /> Expo Docs
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h5 className="text-sm font-bold uppercase italic tracking-[0.2em] text-foreground/90">Legal</h5>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground italic hover:text-primary transition-colors flex items-center gap-2">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-sm text-muted-foreground italic hover:text-primary transition-colors flex items-center gap-2">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <p className="text-[10px] text-muted-foreground/60 italic leading-tight pt-2">
                                    Not affiliated with Expo or 650 Industries.
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-border/40">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-xs text-muted-foreground italic">
                            © {currentYear} ExpoAsset Generator. All rights reserved.
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground italic">
                            Developed by <span className="font-bold text-foreground">Praise Masunga (PraiseTech)</span> with <Heart className="h-3 w-3 text-destructive fill-current" />
                        </div>
                        <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground grayscale opacity-50">
                            <span className="italic">BUILT WITH SHARP</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span className="italic">NEXT.JS 15</span>
                            <span className="w-1 h-1 bg-border rounded-full" />
                            <span className="italic">TAILWIND 4</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
