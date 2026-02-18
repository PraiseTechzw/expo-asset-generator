'use client';

import { Header } from '@/components/header';
import { AssetForm } from '@/components/asset-form';
import { motion } from 'framer-motion';
import { Check, Shield, Zap, Sparkles, Smartphone, Download, Layers } from 'lucide-react';
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
              <span>AI-Powered Asset Optimization</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
              One logo. <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
                Every asset you need.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Generate production-ready app icons, splash screens, and adaptive assets for Expo in seconds. No more manual resizing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:opacity-90 shadow-xl shadow-primary/20">
                Get Started Free
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg glass hover:bg-white/5">
                View Examples
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main App Content */}
      <section className="relative py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side: Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <AssetForm />
            </motion.div>

            {/* Right side: Why Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Why use ExpoAsset?</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: <Zap className="w-6 h-6 text-primary" />,
                    title: "Instant Results",
                    desc: "Upload once, get 10+ optimized asset formats instantly."
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-primary" />,
                    title: "Expo Compliant",
                    desc: "Perfect margins and dimensions for both Android and iOS."
                  },
                  {
                    icon: <Smartphone className="w-6 h-6 text-primary" />,
                    title: "Adaptive Icons",
                    desc: "Full support for Android adaptive icons with background colors."
                  },
                  {
                    icon: <Layers className="w-6 h-6 text-primary" />,
                    title: "Transparent PNGs",
                    desc: "Maintain transparency where it matters for a clean look."
                  }
                ].map((feature, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-lg group"
                  >
                    <div className="mb-4 p-3 rounded-xl bg-primary/10 w-fit group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>

              {/* Progress Indicator Mockup */}
              <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
                  <Download className="w-20 h-20 text-primary" />
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="font-semibold italic">98% Faster than manual generation</span>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    Trusted by developers from Top SaaS companies for their Expo projects.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer info/FAQ mock */}
      <section className="py-20 border-t border-border/40">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-bold italic">Frequently Asked Questions</h2>
          <div className="grid gap-4 text-left">
            {[
              { q: "What file formats are supported?", a: "We currently support high-resolution PNG files (minimum 1024x1024)." },
              { q: "Are the assets optimized for EAS Build?", a: "Yes, all assets follow the official Expo and React Native guidelines." },
              { q: "Is this free to use?", a: "The core generator is free. Pro plans offer advanced splash screen templates." }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-xl border border-border/50 hover:bg-secondary/20 transition-colors">
                <h4 className="font-bold mb-2 italic">{faq.q}</h4>
                <p className="text-sm text-muted-foreground italic">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 border-t border-border/40 bg-secondary/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <span className="font-bold italic">ExpoAsset</span>
          </div>
          <p className="text-sm text-muted-foreground italic">
            © 2024 Expo Asset Generator. Not affiliated with Expo or 650 Industries.
          </p>
        </div>
      </footer>
    </div>
  );
}
