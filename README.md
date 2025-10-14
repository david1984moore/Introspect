# Introspect 🔍

An AI-powered requirements gathering tool that transforms client conversations into detailed project scopes, timelines, and technical recommendations.

## 🚀 What It Does

Introspect replaces lengthy discovery calls with an intelligent questionnaire that:
- Guides clients through structured questions about their project needs
- Uses AI to analyze responses and generate comprehensive project scopes
- Provides realistic timelines, budget breakdowns, and tech stack recommendations
- Delivers professional documentation ready for project kickoff

## 📋 Current Status

**🟢 MVP Complete** - Full form submission flow working with AI integration

### ✅ Completed Features
- **Complete 7-Section Form** - All questionnaire sections built and tested
  - Section 1: Your Business (business details, target customers, differentiators)
  - Section 2: Website Goals (visitor actions, conditional features)
  - Section 3: Pages & Content (page requirements and content readiness)
  - Section 4: Look & Feel (design preferences and inspiration)
  - Section 5: Technical Details (hosting, updates, integrations)
  - Section 6: Budget & Timeline (investment range and launch goals)
  - Section 7: Review & Submit (comprehensive review and submission)
- **AI Integration** - Claude API integration for scope generation
- **Project Setup** - Next.js 14 + TypeScript + Tailwind CSS + Shadcn/ui
- **Form Flow** - Progress tracking, validation, mobile-responsive design
- **API Endpoints** - Backend logic for processing form data and generating scopes

### 🚧 In Progress
- **Results Page** - Display generated project scope to users
- **Final Testing** - Polish and edge case handling

### 🔮 Next Phase Features
- Email delivery system for completed scopes
- PDF export functionality
- Admin dashboard for submission management
- Application questionnaire (mobile/web app projects)

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

Visit [http://localhost:3004](http://localhost:3004) to see the application.

## 📁 Project Structure

```
requirements-wizard/
├── src/
│   ├── app/
│   │   ├── (form)/
│   │   │   ├── website/          # Website questionnaire
│   │   │   │   ├── page.tsx      # Main form with all 7 sections
│   │   │   │   └── results/      # Results display page
│   │   │   └── application/      # App questionnaire (planned)
│   │   ├── api/
│   │   │   ├── generate-scope/   # AI analysis endpoint
│   │   │   └── send-email/       # Email delivery (planned)
│   │   └── page.tsx              # Landing page
│   ├── components/
│   │   ├── form-sections/        # Individual form components (7 sections)
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
| 3. Pages & Content | ✅ Complete | Page requirements, content readiness |
| 4. Look & Feel | ✅ Complete | Design preferences, inspiration sites |
| 5. Technical Details | ✅ Complete | Hosting, updates, integrations |
| 6. Budget & Timeline | ✅ Complete | Investment range, launch timeline |
| 7. Review & Submit | ✅ Complete | Form review and AI-powered submission |
| Results Page | 🚧 In Progress | Display generated project scope |

## 🤝 Contributing

This is currently a personal project in active development. Once the core features are complete, contribution guidelines will be added.

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ❤️ using Next.js and AI**
