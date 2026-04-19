<p align="center">
  <img src="assets/logo.png" alt="Leap Logo" width="120">
</p>

# Leap Client

Leap Client is the official web application for Leap, a provider-agnostic AI layer for .NET apps and agents. Built as a high-performance monorepo, it serves as a central hub for Leap documentation, interactive examples, and SDK resources.

## ⚙️ Project Links

- ⚙️ Repository → https://github.com/e89wrhi/leap-ai-sdk
## 🌟 Features

- **Provider-Agnostic Showcase**: Learn how to build AI-powered .NET apps with unified streaming, tool calling, and structured output.
- **Interactive Model Switching**: Dynamically test and compare responses between Claude, Gemini, GPT, and Grok.
- **Advanced Integrations**: Incorporating standard ASP.NET Core Identity authentication flows.
- **Modern Tech Stack**: Engineered with **Next.js 15**, **React 19**, **Tailwind CSS v4**, and **Lucide Icons**.
- **Premium UI/UX**: A highly-polished design system supporting seamless **Dark Mode**, fluid animations, and mobile responsiveness.

## 🏗️ Architecture

This repository is structured as a monorepo using [Turborepo](https://turbo.build/):

### Applications

- **`apps/web`**: The main user-facing application for the Leap landing page and interactive platform.

### Shared Packages

- **`packages/ui`**: Shared UI component library.
- **`packages/lib`**: Shared utilities and type definitions.
- **`packages/typescript-config`**: Shared TypeScript configurations.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) 10+

### Installation

1. Clone the repository and navigate into it:

   ```bash
   git clone https://github.com/your-org/leap-client.git
   cd leap-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development servers for all applications:

```bash
npm run dev
```

The web application runs on port `3000`.

## 🛠️ Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Tooling**: [Turborepo](https://turbo.build/), ESLint, Prettier
