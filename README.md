# 🚀 Expo Asset Generator

One logo. Infinite assets. Generate production-ready branding assets for your Expo projects in seconds.

Developed by **Praise Masunga (PraiseTech)** with ❤️

---

## ✨ Features

- **Icon Generation**: Automatically resizes your logo to 1024x1024px for both iOS and Android.
- **Android Adaptive Icons**: Automatically applies the required 20% padding to ensure your icons aren't oddly cropped by Android's masking.
- **Splash Screen Engine**: Generates high-resolution splash screens with your logo perfectly centered on your chosen theme color.
- **Monochrome Support**: Creates specialized monochrome/alpha-only versions for Android's themed icons.
- **Web Optimized**: Generates multi-size favicons for Progressive Web Apps (PWAs).
- **Compliance First**: All dimensions and naming conventions follow the official Expo and React Native technical guidelines.
- **Instant Implementation**: Includes a ready-to-use `app.json` snippet and a specialized `README` inside every generated ZIP.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org) (App Router)
- **Image Processing**: [Sharp](https://sharp.pixelplumbing.com/) (High-performance Node.js image processing)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev)
- **Components**: Radix UI & Shadcn/UI
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (preferred) or `npm` / `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PraiseTech/expo-asset-generator.git
   cd expo-asset-generator
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How to Use

1. **Upload**: Drop a high-resolution square PNG (at least 1024x1024px) into the generator.
2. **Configure**: Select your splash screen background color using the color picker or presets. Enter your App Name.
3. **Generate**: Click "Generate & Export". A ZIP file containing all assets will download automatically.
4. **Deploy**:
   - Extract the contents to your Expo project's `assets/` folder.
   - Open the included `app.json.snippet`.
   - Copy and merge the configuration into your project's `app.json`.
   - Run `eas build` to see your new branding in action!

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/PraiseTech/expo-asset-generator/issues).

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Developed By

**Praise Masunga (PraiseTech)**
- Website: [praisetech.com](https://praisetech.com)
- Twitter: [@PraiseTech](https://twitter.com/PraiseTech)
- GitHub: [PraiseTech](https://github.com/PraiseTech)

---

*Disclaimer: This tool is not officially affiliated with Expo or 650 Industries. It is built by developers to simplify the Expo ecosystem workflow.*
