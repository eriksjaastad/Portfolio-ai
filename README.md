
<!-- SCAFFOLD:START - Do not edit between markers -->
# portfolio-ai

Brief description of the project's purpose

## Quick Start

```bash
# Setup
pip install -r requirements.txt

# Run
python main.py
```

## Documentation

See the `.agent/rules/` directory for detailed documentation.

## Status

- **Current Phase:** Foundation
- **Status:** #status/active

<!-- SCAFFOLD:END - Custom content below is preserved -->
# Erik Sjaastad's Portfolio

A modern, responsive portfolio website showcasing Erik Sjaastad's skills and experience. Built with React, TypeScript, and Tailwind CSS, this project aims to provide a clean and engaging user experience across various devices.

## 🚀 Features

- **Modern, Responsive Design:** Adapts seamlessly to different screen sizes and devices.
- **Dark Mode Support:** Offers a comfortable viewing experience in low-light environments.
- **Interactive Animations:** Employs Framer Motion for smooth and engaging animations.
- **TypeScript:** Leverages TypeScript for enhanced type safety and code maintainability.
- **Tailwind CSS:** Utilizes Tailwind CSS for rapid and consistent styling.
- **Vite:** Uses Vite for fast development and optimized production builds.
- **Clear Project Structure:** Organizes code into reusable components and sections.
- **Easy Deployment:** Designed for easy deployment to platforms like Vercel.

## 🛠️ Tech Stack

- **React 18:** A JavaScript library for building user interfaces.
- **TypeScript:** A superset of JavaScript that adds static typing.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **Framer Motion:** A production-ready motion library for React.
- **Vite:** A fast build tool and development server for modern web projects.

## 💻 Getting Started

Follow these steps to run the portfolio locally:

### Prerequisites

- Node.js (version 16 or higher)
- npm (Node Package Manager) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone [YOUR_REPOSITORY_URL]
   cd [YOUR_REPOSITORY_DIRECTORY]
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

This will start the development server, and you can view the portfolio in your browser at `http://localhost:3000` (or the port specified by Vite).

### Building for Production

```bash
npm run build
# or
yarn build
```

This will create an optimized production build in the `dist` directory.

## 📁 Project Structure

```
/
├── src/
│   ├── components/          # Reusable UI components
│   │   └── sections/       # Sections of the portfolio (Hero, About, etc.)
│   │       ├── Hero.tsx     # Hero section component
│   │       ├── About.tsx    # About section component
│   │       ├── Skills.tsx   # Skills section component
│   │       ├── Projects.tsx # Projects section component
│   │       ├── Experience.tsx # Experience section component
│   │       └── Contact.tsx  # Contact section component
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Entry point for the React application
├── public/                # Static assets (images, fonts, etc.)
├── index.html             # Main HTML file
├── package.json           # Project dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration file
├── tsconfig.json          # TypeScript configuration file
└── vite.config.ts         # Vite configuration file
```

## 🌐 Deployment

This project is deployed on Vercel with automatic deployments from the `main` branch.  Any push to the `main` branch will trigger a new deployment. You can configure your own Vercel deployment by connecting your repository to Vercel.

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## ➕ Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any bugs or feature requests.

## 📧 Contact

For any questions or inquiries, please contact Erik Sjaastad at [YOUR_EMAIL_ADDRESS].

---