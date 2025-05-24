# Digital Declutter

A modern web application to help you track, manage, and declutter your digital life. Built with React, TypeScript, and Supabase.

![Digital Declutter Dashboard](https://github.com/saunakd/Digital-Declutter/blob/main/Screenshot%202025-05-24%20164724.png)
)

## Features

- 📱 **Digital Inventory Management**: Track all your apps, accounts, devices, and subscriptions in one place
- 🔍 **Smart Health Checks**: Get insights into your digital footprint with automated analysis
- 📊 **Usage Analytics**: Visualize your digital habits and identify areas for improvement
- 🔐 **Secure Authentication**: Built-in email and password authentication with Supabase
- 🎨 **Modern UI**: Beautiful, responsive interface built with Tailwind CSS
- ⚡ **Real-time Updates**: Instant data synchronization powered by Supabase

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend & Auth**: Supabase
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Charts**: Chart.js with React Chartjs 2

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React context providers
├── lib/           # Utility functions and configurations
├── pages/         # Page components
└── main.tsx       # Application entry point
```

## Key Features

### Digital Inventory
- Track all your digital items in one place
- Categorize by type (app, account, device, subscription)
- Set importance levels and usage frequency
- Add notes and platform information

### Health Checks
- Automated analysis of your digital footprint
- Personalized recommendations
- Usage trends and patterns
- Decluttering suggestions

### Analytics Dashboard
- Visual representation of your digital habits
- Category distribution
- Usage frequency analysis
- Unused item identification

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev)
- UI components inspired by [Tailwind UI](https://tailwindui.com)
- Stock photos from [Pexels](https://www.pexels.com)

The project is hosted on https://digitaldeclutter.netlify.app/
