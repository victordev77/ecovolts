# EcoVolts

**Renewable Energy | Software Development | Technology & Entrepreneurship**

A web application prototype that explores more accessible solar energy adoption through modular solutions, financial simulations and alternative acquisition models.

**🚀 State-Level Qualifier — Desafio Liga Jovem 2026 | SEBRAE**

💻 **[Source Code](https://github.com/victordev77/ecovolts)**

🌐 **[Launch Live Application](https://ecovolts.vercel.app/)**

## Overview

**EcoVolts** is a renewable energy and technology project developed to address financial and informational barriers to solar energy adoption, particularly for lower-income households and small businesses.

The project combines modular solar energy concepts, alternative acquisition models and a digital platform for exploring potential energy savings, affordability and customer journeys. Developed for **Desafio Liga Jovem 2026**, it connects software development, entrepreneurship and social impact.

## The Problem

Solar energy can reduce long-term electricity costs, but adoption may be difficult due to:

- High initial investment costs.
- Limited access to appropriate financing.
- Difficulty estimating potential electricity savings.
- Limited access to understandable technical and financial information.
- Uncertainty about installation, affordability and support.

## Proposed Solution

EcoVolts explores an integrated approach built around three elements:

### Modular Solar Solutions

- **Basic:** designed around smaller energy needs.
- **Intermediate:** for expanded household or small-business consumption.
- **Advanced:** for higher electricity demand.

Actual equipment sizing would require a qualified technical assessment.

### Acquisition Models

- **Pay with Savings:** explores installment affordability relative to projected electricity savings.
- **Financing:** illustrative acquisition scenarios involving potential financial partners.
- **Upfront Payment:** direct acquisition concept.
- **EcoVolts Social:** proposed access initiatives supported by partnerships and contributions.

### Digital Platform

A web prototype that brings together energy diagnostics, recommendations, acquisition scenarios and service journeys.

## Features

### Energy Diagnostic

Collect consumption-related inputs and generate illustrative diagnostic results.

### Solution Recommendations

Explore suggested solar configurations based on diagnostic inputs and modeled assumptions.

### Financial Simulator

Compare acquisition scenarios using inputs such as:

- Down payment and financing term.
- Estimated installments.
- Projected energy savings.
- Affordability indicators.

### Demo Mode

Explore the application with demonstration data through the `/demo` route, without requiring a login.

### Customer Journey

The prototype includes pages and flows for acquisition, installation, support and EcoVolts Care concepts.

### Responsive Interface

A web interface designed for different screen sizes.

## Technology Stack

| Technology | Role |
|---|---|
| React 18 | Component-based user interface |
| TypeScript | Typed application development |
| Vite 5 | Development and production build |
| React Router | Client-side navigation |
| Zustand | Application state management |
| React Hook Form + Zod | Form handling and validation |
| Recharts | Data visualization |
| Framer Motion | Interface animations |
| Supabase | Optional backend integration |
| Vitest | Automated testing |
| ESLint | Static code analysis |

## Project Architecture

The application separates its interface, state, business calculations and service integrations:

```text
src/
├── components/
│   └── ui/
├── config/
├── engines/
│   └── __tests__/
├── layouts/
├── pages/
├── services/
├── store/
├── styles/
├── types/
└── utils/
```

### Calculation and Business Logic

The `src/engines/` directory includes:

- `DiagnosticEngine.ts` — energy diagnostic calculations.
- `RecommendationEngine.ts` — solution recommendation logic.
- `FinancialEngine.ts` — acquisition and financial scenarios.
- `SocialScenarioEngine.ts` — social-access scenario calculations.
- `CareDashboard.ts` — Care-related dashboard logic.

The application uses Zustand for shared state and separates service integrations under `src/services/`.

## Getting Started

### Requirements

- Node.js and npm.
- Git.

### Installation

Clone the repository:

```bash
git clone https://github.com/victordev77/ecovolts.git
```

Enter the project directory:

```bash
cd ecovolts
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite (normally `http://localhost:5173`). For the demonstration experience, visit:

```text
http://localhost:5173/demo
```

### Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm test` | Run Vitest tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint |

### Optional Supabase Configuration

The repository contains an `.env.example` file and optional Supabase integration. Copy the example file to `.env.local` and configure the public client variables when using that integration:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Never put a Supabase service-role key or other private credentials in frontend environment variables.

## Testing

Automated test files are included for the diagnostic, financial and social scenario engines:

```text
src/engines/__tests__/
├── DiagnosticEngine.test.ts
├── FinancialEngine.test.ts
└── SocialScenarioEngine.test.ts
```

Run the test suite with `npm test`. The presence of tests does not imply complete test coverage.

## Business Model

EcoVolts proposes a partnership-based model rather than manufacturing equipment directly. Potential revenue streams include:

- Commissions from completed transactions.
- Service and installation intermediation.
- EcoVolts Care+ support offerings.
- Partnerships and impact-oriented projects.

Equipment supply, financing and installation would depend on qualified external providers. These are proposed mechanisms, not confirmed commercial services.

## Recognition

### 🚀 Desafio Liga Jovem 2026 — State-Level Qualifier

EcoVolts advanced to the state stage of **Desafio Liga Jovem 2026**, an entrepreneurship and innovation competition promoted by SEBRAE.

The project explores how renewable energy, financial accessibility and digital technology can be combined to address barriers to solar adoption.

## Project Status & Limitations

**Version:** `0.2.0` (version recorded in the provided `package.json`)  
**Status:** Functional demonstration prototype

- Energy and financial projections are illustrative and depend on assumptions and user inputs.
- Estimated savings and affordability are not guaranteed.
- The prototype does not execute real purchases, financing agreements or installations.
- Social scenarios do not represent approved benefits or guaranteed eligibility.
- Real-world adoption requires professional technical, financial and regulatory evaluation.

## Vision

EcoVolts demonstrates how software engineering and entrepreneurship can help make complex energy and financial decisions easier to explore. Its long-term concept is to connect accessible information, solar solutions and responsible acquisition models.

---

**EcoVolts — Making solar energy more accessible through technology.**
