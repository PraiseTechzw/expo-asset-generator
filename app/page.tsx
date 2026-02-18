'use client';

import { Header } from '@/components/header';
import { AssetForm } from '@/components/asset-form';
import { motion } from 'framer-motion';
import {
  Check,
  Shield,
  Zap,
  Sparkles,
  Smartphone,
  Download,
  Layers,
  Image as ImageIcon,
  Chrome,
  MousePointer2,
  Package,
  ArrowRight,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-[20%] right-[10%] w-[25rem] h-[25rem] bg-accent/20 rounded-full blur-[100px] animate-pulse delay-700" />
          <div className="absolute bottom-[20%] left-[20%] w-[20rem] h-[20rem] bg-primary/10 rounded-full blur-[80px] animate-pulse delay-1000" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Free for Expo Developers</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
              One logo. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Infinite Assets.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Generate production-ready app icons, splash screens, and adaptive assets for Expo in seconds. Optimized, compliant, and ready for EAS build.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" asChild className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:opacity-90 shadow-xl shadow-primary/20">
                <a href="#generator">Start Generating <ArrowRight className="ml-2 w-5 h-5" /></a>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg glass hover:bg-white/5">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main App Content */}
      <section id="generator" className="relative py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side: Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-24"
            >
              <AssetForm />
            </motion.div>

            {/* Right side: Detailed Asset Info */}
            <div className="space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-primary">
                  <Package className="w-5 h-5" />
                  <span className="text-sm font-bold uppercase tracking-widest">In the Package</span>
                </div>
                <h2 className="text-4xl font-bold italic">What you get.</h2>
                <p className="text-muted-foreground italic">Every asset is precisely calculated to meet Apple and Google's strict requirements.</p>
              </motion.div>

              <div className="grid gap-4">
                {[
                  {
                    icon: <Smartphone className="w-5 h-5" />,
                    title: "Main App Icons",
                    specs: "1024x1024 PNG",
                    desc: "Perfectly resized main branding icon for iOS and universal display."
                  },
                  {
                    icon: <Layers className="w-5 h-5" />,
                    title: "Adaptive Foreground",
                    specs: "1024x1024 PNG • 20% Padding",
                    desc: "Strictly follows Android's safety zone to prevent awkward masking."
                  },
                  {
                    icon: <Zap className="w-5 h-5" />,
                    title: "Adaptive Background",
                    specs: "1024x1024 Solid PNG",
                    desc: "Clean solid color background for Android's multi-layer icon system."
                  },
                  {
                    icon: <ImageIcon className="w-5 h-5" />,
                    title: "Branded Splash",
                    specs: "1242x2436 @3x",
                    desc: "High-resolution launch screen with your logo perfectly centered."
                  },
                  {
                    icon: <Shield className="w-5 h-5" />,
                    title: "Monochrome Icon",
                    specs: "1024x1024 Alpha",
                    desc: "Specialized monochrome version for Android's themed icon support."
                  },
                  {
                    icon: <Chrome className="w-5 h-5" />,
                    title: "Web Favicons",
                    specs: "48x48 Multi-size",
                    desc: "Web-optimized favicons for your PWA and browser tabs."
                  }
                ].map((asset, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group flex gap-6 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:bg-secondary/20"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      {asset.icon}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-bold italic">{asset.title}</h3>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{asset.specs}</span>
                      </div>
                      <p className="text-sm text-muted-foreground italic leading-relaxed">{asset.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Requirement Strip */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold italic">Ready for EAS Build?</h4>
                    <p className="text-sm text-muted-foreground italic">Our assets are named and structured to be drop-in ready for your Expo app.json.</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-green-500 italic">
                      <Check className="w-4 h-4" /> COMPLIANT
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-primary italic">
                      <MousePointer2 className="w-4 h-4" /> NO-COST
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section id="how-it-works" className="py-24 border-t border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-black italic tracking-tighter">Three steps to production.</h2>
            <p className="text-muted-foreground italic text-lg">No configuration hell. Just dragging and dropping.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload & Style",
                desc: "Drop your 1024px logo and pick a theme color for your splash screen.",
                icon: <Upload className="w-8 h-8" />
              },
              {
                step: "02",
                title: "Auto-Generate",
                desc: "Our engine optimizes every variant, adding required padding and formats.",
                icon: <Zap className="w-8 h-8" />
              },
              {
                step: "03",
                title: "Drop in Project",
                desc: "Extract the ZIP to your assets folder and merge the app.json snippet.",
                icon: <Package className="w-8 h-8" />
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative p-8 rounded-3xl bg-secondary/20 border border-white/5 space-y-6"
              >
                <div className="text-6xl font-black text-primary/10 absolute top-4 right-8 select-none">{step.step}</div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  {step.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold italic">{step.title}</h3>
                  <p className="text-muted-foreground italic text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Quote */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex justify-center gap-1 text-accent">
              {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-3xl md:text-4xl font-semibold italic italic tracking-tight text-foreground/90 leading-tight block">
              "The only asset generator that actually handles <span className="italic underline decoration-primary/30">Android adaptive padding</span> correctly. A total lifesaver for Expo devs."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full border border-primary/20 bg-secondary flex items-center justify-center font-bold text-primary">JD</div>
              <div className="text-left">
                <p className="font-bold text-sm italic">Jordan Dev</p>
                <p className="text-xs text-muted-foreground italic">Lead Engineer @ CloudStack</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/40 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-2xl font-black italic">ExpoAsset</span>
              </div>
              <p className="text-sm text-muted-foreground italic max-w-sm">
                Built by developers for developers. We simplify the branding workflow so you can focus on building great features.
              </p>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase italic tracking-widest">Resources</h5>
              <ul className="space-y-2 text-sm text-muted-foreground italic">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Expo Docs</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">EAS Build Guide</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold text-sm uppercase italic tracking-widest">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground italic">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border/40 text-center text-xs text-muted-foreground italic">
            © 2024 Expo Asset Generator. Not affiliated with Expo or 650 Industries. Built with Sharp & Next.js.
          </div>
        </div>
      </footer>
    </div>
  );
}
