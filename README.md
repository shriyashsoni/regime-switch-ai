<div align="center">

# 🧠 RegimeSwitcher.AI

### AI-Driven Algorithmic Trading for Market Regimes

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Convex](https://img.shields.io/badge/Convex-FF6B6B?style=for-the-badge&logo=convex&logoColor=white)](https://convex.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**Dynamically adapt trading strategies based on real-time market regime detection**

[🚀 Live Demo](#) • [📖 Documentation](#features) • [🤝 Contributing](#contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Market Regimes](#-market-regimes)
- [Trading Strategies](#-trading-strategies)
- [Wallet Integration](#-wallet-integration)
- [API Reference](#-api-reference)
- [Database Schema](#-database-schema)
- [Simulation Engine](#-simulation-engine)
- [Performance Metrics](#-performance-metrics)
- [Theming & Customization](#-theming--customization)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🎯 Overview

**RegimeSwitcher.AI** is an intelligent algorithmic trading system that uses AI to detect market regimes (Bull, Bear, Sideways, Volatile) and automatically switches between optimal trading strategies. Built for the modern crypto trader, it combines Hidden Markov Models (HMM) and LSTM neural networks to maximize alpha and minimize drawdown.

### 🌟 Key Highlights

- 🤖 **AI-Powered Regime Detection** - Real-time market state classification using HMM and LSTM
- ⚡ **Dynamic Strategy Switching** - Automatic rotation between Trend Following, Mean Reversion, and Capital Preservation
- 🔒 **Web3 Native** - MetaMask & Phantom wallet integration for seamless authentication
- 📊 **Real-Time Analytics** - Live performance metrics, PnL tracking, and win rate analysis
- 🎨 **Cyberpunk UI** - Dark, modern interface with smooth Framer Motion animations
- 📈 **Backtesting Ready** - Historical performance analysis and strategy comparison
- 🔄 **Auto-Refresh** - Continuous market simulation with 5-second update intervals
- 💾 **Export Functionality** - Download trade history as CSV for external analysis

---

## ✨ Features

### 🧠 AI & Machine Learning

- **Hidden Markov Models (HMM)** for regime state detection
- **LSTM Neural Networks** for price prediction within regimes
- **Ensemble Voting** mechanism for robust decision-making
- **50+ Technical Indicators** extracted in real-time
- **Confidence Scoring** for each regime classification
- **Adaptive Learning** from historical market patterns

### 📊 Trading & Analytics

- ✅ Real-time market data simulation (BTC-USD)
- ✅ Automated signal generation based on regime
- ✅ Mock trade execution with realistic PnL tracking
- ✅ Win rate, profit factor, and drawdown metrics
- ✅ Strategy performance comparison charts
- ✅ CSV export for trade history
- ✅ Portfolio value tracking with initial balance
- ✅ Average win/loss calculation
- ✅ Active trade monitoring

### 🎨 User Experience

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Framer Motion animations throughout
- ✅ Auto-refresh every 5 seconds
- ✅ Dark cyberpunk theme with neon accents
- ✅ Interactive charts with Recharts
- ✅ Toast notifications (Sonner) for all actions
- ✅ Smooth scroll navigation
- ✅ Loading states and skeleton screens
- ✅ Animated feature cards and icons

### 🔐 Security & Web3

- ✅ MetaMask wallet integration
- ✅ Phantom wallet integration
- ✅ No private key storage
- ✅ Persistent wallet connection via localStorage
- ✅ Protected dashboard routes
- ✅ Wallet address truncation for privacy
- ✅ Automatic connection verification on mount

---

## 🛠 Tech Stack

### Frontend

- **React 19** - UI framework with latest features
- **TypeScript** - Type safety and developer experience
- **Vite** - Lightning-fast build tool & dev server
- **React Router v7** - Client-side routing with lazy loading
- **Tailwind CSS v4** - Utility-first styling with custom theme
- **Shadcn UI** - Beautiful, accessible component library
- **Framer Motion** - Production-ready animation library
- **Recharts** - Composable charting library for data visualization
- **Lucide Icons** - Beautiful, consistent icon library
- **Sonner** - Toast notification system

### Backend & Database

- **Convex** - Backend-as-a-Service with real-time capabilities
- **Convex Auth** - Authentication system (optional, wallet-first)
- **Real-time Subscriptions** - Live data updates via WebSocket
- **Cron Jobs** - Scheduled market simulation every 5 minutes
- **TypeScript Validators** - Runtime type checking with Convex validators

### Web3

- **MetaMask** - Ethereum wallet provider
- **Phantom** - Solana wallet provider
- **ethers.js** - Ethereum library (via MetaMask)
- **Web3 Provider Detection** - Automatic wallet detection

### Development Tools

- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting with TypeScript support
- **Prettier** - Code formatting for consistency
- **TypeScript Compiler** - Type checking and compilation
- **Vite Plugin React** - Fast refresh and JSX support

---

## 🏗 Architecture


