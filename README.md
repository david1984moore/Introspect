# Introspect 🔍

An AI-powered requirements gathering tool that transforms client conversations into detailed project scopes, timelines, and technical recommendations.

## 🚀 What It Does

Introspect replaces lengthy discovery calls with an intelligent questionnaire that:
- Guides clients through structured questions about their project needs
- Uses AI to analyze responses and generate comprehensive project scopes
- Provides realistic timelines, budget breakdowns, and tech stack recommendations
- Delivers professional documentation ready for project kickoff

## 📋 Current Status

**🟢 In Active Development** - 2 of 6 sections complete

### ✅ Completed Features
- **Section 1: Your Business** - Business details, target customers, differentiators
- **Section 2: Website Goals** - Visitor actions, conditional features (e-commerce, booking, contact)
- **Project Setup** - Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui
- **Form Flow** - Progress tracking, validation, mobile-responsive design

### 🚧 In Progress
- **Section 3: Pages & Content** - Page requirements and content readiness
- **Section 4: Look & Feel** - Design preferences and inspiration
- **Section 5: Technical Details** - Hosting, updates, integrations
- **Section 6: Budget & Timeline** - Investment range and launch goals

### 🔮 Planned Features
- AI-powered scope generation using Claude API
- Email delivery system for completed scopes
- PDF export functionality
- Admin dashboard for submission management

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), React, TypeScript
- **Styling:** Tailwind CSS, Shadcn/ui components
- **AI Integration:** Anthropic Claude API
- **Email:** Resend API
- **Database:** Supabase (planned)
- **Hosting:** Vercel

## 🏃‍♂️ Quick Start

```bash
# Clone the repository
git clone https://github.com/david1984moore/Introspect.git
cd Introspect

# Navigate to the app directory
cd requirements-wizard

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
requirements-wizard/
├── src/
│   ├── app/
│   │   ├── (form)/
│   │   │   ├── website/          # Website questionnaire
│   │   │   └── application/      # App questionnaire (planned)
│   │   ├── api/
│   │   │   ├── generate-scope/   # AI analysis endpoint
│   │   │   └── send-email/       # Email delivery
│   │   └── page.tsx              # Landing page
│   ├── components/
│   │   ├── form-sections/        # Individual form components
│   │   └── ui/                   # Reusable UI components
│   └── lib/                      # Utilities and configurations
```

## 🎯 Target Users

- **Web Development Agencies** - Streamline client onboarding
- **Freelance Developers** - Professional requirements gathering
- **Product Managers** - Structured project scoping
- **Consultants** - Standardized discovery process

## 📈 Development Progress

| Section | Status | Description |
|---------|--------|-------------|
| 1. Your Business | ✅ Complete | Business info, customers, differentiators |
| 2. Website Goals | ✅ Complete | Visitor actions, e-commerce, booking |
| 3. Pages & Content | 🚧 Next | Page requirements, content readiness |
| 4. Look & Feel | ⏳ Planned | Design preferences, inspiration sites |
| 5. Technical Details | ⏳ Planned | Hosting, updates, integrations |
| 6. Budget & Timeline | ⏳ Planned | Investment range, launch timeline |

## 🤝 Contributing

This is currently a personal project in active development. Once the core features are complete, contribution guidelines will be added.

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using Next.js and AI**
