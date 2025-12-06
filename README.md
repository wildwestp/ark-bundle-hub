# 🎯 Ark Bundle Hub

AI-Powered Bundle Intelligence for E-commerce

## Overview

Ark Bundle Hub is an intelligent Amazon bundle discovery tool powered by Claude AI. It helps sellers identify profitable bundle opportunities by analyzing market trends, competition, and consumer demand using real-time web search.

## Features

- 🤖 AI-powered bundle analysis using Claude Sonnet 4
- 🔍 Real-time web search integration for trending products
- 📊 Comprehensive market insights with BSR tracking
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast Next.js performance
- 🔐 Secure admin authentication
- 💾 Export data to CSV/JSON
- 📦 Create custom product bundles

## Tech Stack

- **Framework**: Next.js 14
- **UI**: React 18, Tailwind CSS
- **AI**: Anthropic Claude API with Web Search
- **Deployment**: Vercel
- **Icons**: Custom SVG components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key ([Get one here](https://console.anthropic.com))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/ark-bundle-hub.git
cd ark-bundle-hub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the root directory:
```bash
ANTHROPIC_API_KEY=your_api_key_here
```

4. Run development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Default Admin Password

```
Ark2024Global!
```

**⚠️ IMPORTANT**: Change this password in `app/page.js` before deploying to production!

## Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

### Manual Deployment

1. **Push to GitHub**:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/ark-bundle-hub.git
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: Your Anthropic API key
   - Click "Deploy"

3. **Access your app**:
   - Your app will be live at: `https://ark-bundle-hub.vercel.app`
   - Or configure a custom domain in Vercel settings

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key from console.anthropic.com | Yes |

## Usage

1. **Login**: Enter admin password (default: `Ark2024Global!`)
2. **Search**: 
   - Click category buttons for curated searches
   - Or enter custom search terms
3. **Discover Products**: AI finds trending products with:
   - Pricing data (cost, sell price, margins)
   - BSR rankings and trends
   - Viral scores and platform info
   - Bundle suggestions
4. **Create Bundles**:
   - Click "Add to Bundle" on products
   - Set bundle name and markup
   - Generate bundle with profit calculations
5. **Export Data**: Download results as CSV or JSON

## Categories

- 🔥 Trending
- 🍳 Kitchen
- 🏠 Home
- 🧹 Cleaning
- 💄 Beauty
- 📱 Tech
- 🐕 Pets
- 💪 Fitness
- 🎮 Toys
- 🚗 Car

## Features Deep Dive

### AI-Powered Search
- Uses Claude Sonnet 4 with web search tools
- Real-time product discovery from TikTok trends, Amazon BSR
- Intelligent bundle recommendations

### Product Cards
- Detailed pricing and margin analysis
- Viral score tracking
- BSR rank monitoring
- Direct links to Amazon, Alibaba, CJ Dropshipping

### Bundle Creator
- Combine multiple products
- Auto-calculate costs and margins
- Customizable markup multiplier
- Track all created bundles

## Security Notes

- Change default admin password before production deployment
- Never commit `.env.local` or API keys to Git
- Use Vercel environment variables for secrets
- Consider implementing rate limiting for production use

## Project Structure

```
ark-bundle-hub/
├── app/
│   ├── api/
│   │   └── search/
│   │       └── route.js          # API endpoint for Claude AI
│   ├── globals.css               # Tailwind styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Main application
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check Node.js version: `node --version` (should be 18+)
- Clear Next.js cache: `rm -rf .next`

### API Not Working
- Verify `ANTHROPIC_API_KEY` is set correctly
- Check API key is valid in Anthropic console
- Ensure environment variables are added in Vercel

### No Search Results
- Check browser console for errors
- Verify API endpoint is responding
- Try different search terms or categories

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues or questions:
- Open an issue on GitHub
- Check Vercel deployment logs
- Review Anthropic API documentation

## Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic API Docs](https://docs.anthropic.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

Built with ❤️ using Claude AI
