# Project Scope: Client Requirements Gathering Tool

**Project Name:** Applicreations Requirements Wizard
**Version:** 1.0
**Last Updated:** October 14, 2025

---

## ✅ IN SCOPE (What We're Building)

### Core Features

1. **Website Requirements Questionnaire** (Primary - MVP)
   - 6-section conversational form (20 minutes max completion time)
   - Smart branching logic (questions adapt based on previous answers)
   - Progress indicator and save/resume functionality
   - Mobile-responsive design (mobile-first approach)

2. **Application Requirements Questionnaire** (Secondary - Phase 2)
   - Alternative form option when starting new project
   - Similar structure to website version but app-focused questions

3. **AI Analysis Engine**
   - Processes client responses using Claude/GPT API
   - Generates tech stack recommendations with reasoning
   - Creates realistic timeline and budget estimates
   - Identifies potential risks and dependencies
   - Produces two versions of output (client-friendly + technical)

4. **Dual Report Generation**
   - **Client Version:** Plain English summary with next steps
   - **Technical Version:** Full SCOPE.md formatted for Cursor workflow
   - Both versions generated simultaneously from same data

5. **Email Delivery System**
   - Sends technical SCOPE.md to Applicreations email
   - Sends client version to client's email
   - Includes both as downloadable attachments

### Must-Have Requirements (MVP)

- Works perfectly on mobile devices (60%+ of small business owners use phones)
- Completion time under 20 minutes with all follow-ups
- No technical jargon in client-facing questions
- Visual, engaging UI (icons, progress bar, friendly copy)
- Save progress functionality (generates unique link to resume)
- Questions use checkboxes, radio buttons, and simple text fields (minimal typing)
- Conditional logic shows/hides questions based on selections
- All generated content is copy-paste ready (properly formatted markdown)
- Client version uses simple language, analogies, and clear expectations
- Technical version includes all details needed for Cursor workflow

### Success Criteria

- [ ] Non-technical user can complete website questionnaire in under 20 minutes
- [ ] AI generates accurate tech stack recommendation 90%+ of time
- [ ] Generated SCOPE.md requires minimal manual editing
- [ ] Client version is understandable to someone with zero tech knowledge
- [ ] Technical version contains all sections from Cursor workflow template
- [ ] Email delivery works 100% reliably
- [ ] Form can be completed entirely on mobile device
- [ ] Save/resume link works after page refresh or returning later

---

## 📋 QUESTIONNAIRE STRUCTURE

### Section 1: Your Business (3 mins)
- Business name
- One-sentence description
- Target customers (checkboxes)
- What makes them different (text)

### Section 2: Website Goals (5 mins)
- What visitors should be able to do (multi-select checkboxes with descriptions)
- Conditional follow-ups based on selections (e.g., if "order online" → ask about payment)

### Section 3: Pages & Content (3 mins)
- Which pages they need (pre-checked smart defaults)
- Content readiness status (have it / need help / have nothing)

### Section 4: Look & Feel (4 mins)
- Example websites they like (URL inputs)
- What they like about them (checkboxes)
- Desired emotional tone (pick 3)
- Logo status
- Color preferences

### Section 5: Technical (Simplified) (3 mins)
- Who will update the site
- How often things change
- Domain ownership status
- Professional email needs

### Section 6: Budget & Timeline (2 mins)
- Budget range (with explanations of what each gets)
- Launch timeline
- Reason for needing site now

---

## 🛠️ TECHNICAL IMPLEMENTATION

### Tech Stack
- **Frontend:** Next.js 14 (App Router) + React
- **Styling:** Tailwind CSS + Shadcn/ui components
- **Form Logic:** React Hook Form + Zod validation
- **AI Integration:** Anthropic Claude API (using existing credentials)
- **Email Service:** Resend (simple API, generous free tier)
- **Database:** Supabase (PostgreSQL + auth if needed later)
- **Hosting:** Vercel (Next.js optimized, free tier)

### File Structure
```
/app
  /page.tsx                    # Landing page
  /(form)
    /website/page.tsx          # Website questionnaire
    /application/page.tsx      # App questionnaire (Phase 2)
  /api
    /generate-scope/route.ts   # AI analysis endpoint
    /send-email/route.ts       # Email delivery endpoint
/components
  /form-sections/              # Individual form section components
  /ui/                         # Shadcn components
/lib
  /ai-prompts.ts               # Claude prompts for analysis
  /scope-template.ts           # SCOPE.md generation logic
  /validations.ts              # Zod schemas
```

### API Integrations
- **Anthropic Claude API:** For intelligent analysis and scope generation
- **Resend:** For reliable email delivery
- **Supabase (Optional):** For saving submissions and resume functionality

---

## ❌ OUT OF SCOPE (NOT Building in v1.0)

- ❌ **User authentication/login** - Not needed for v1.0, no repeat users expected
- ❌ **Admin dashboard** - Can view emails for now, build dashboard in v2.0
- ❌ **Payment processing** - This tool is free for clients, no payments
- ❌ **Digital signatures** - Just email approval for now, add e-signature later
- ❌ **Multi-language support** - English only for v1.0
- ❌ **Video tutorials** - Text instructions sufficient for launch
- ❌ **Client portal** - One-time form, no need for clients to log back in
- ❌ **Version control/revisions** - If client wants changes, they restart form
- ❌ **PDF generation** - Markdown output is sufficient, PDF is nice-to-have
- ❌ **Analytics dashboard** - Can add Google Analytics later
- ❌ **Template library** - Just website + app forms for now
- ❌ **White-label/licensing** - Build for Applicreations only first

---

## 🅿️ PARKING LOT (Great Ideas for v2.0)

1. **Admin Dashboard**
   - Why not now: Can manage via email for first 10-20 submissions
   - Revisit when: Processing 5+ forms per week
   - Would include: View all submissions, search, export to CSV

2. **Visual Example Gallery**
   - Why not now: Adds complexity to v1.0
   - Revisit when: Have collected 20+ example sites
   - Would include: Curated gallery of sites by style/industry

3. **PDF Export**
   - Why not now: Markdown is sufficient for technical version
   - Revisit when: Clients request it
   - Would include: Beautifully formatted PDF of client version

4. **Digital Signature Capture**
   - Why not now: Email approval works for now
   - Revisit when: Need legal enforceability
   - Would include: DocuSign-style signature flow

5. **AI-Powered Photo Analysis**
   - Why not now: Beyond MVP scope
   - Revisit when: v1.0 working smoothly
   - Would include: Client uploads photos, AI assesses quality/suitability

6. **Industry-Specific Templates**
   - Why not now: Website/app split is enough variation
   - Revisit when: Noticing patterns by industry
   - Would include: Restaurant, retail, service business, etc.

7. **Client Follow-Up Automation**
   - Why not now: Manual follow-up is fine for low volume
   - Revisit when: Processing 10+ forms per week
   - Would include: Auto-send reminder emails, schedule calls

8. **Pricing Calculator Integration**
   - Why not now: AI estimates are sufficient
   - Revisit when: Want dynamic pricing
   - Would include: Real-time price updates based on selections

---

## 📅 DEVELOPMENT PHASES

### Phase 1: MVP (Weeks 1-3)
**Goal:** Working website questionnaire with email delivery

**Week 1:**
- [ ] Project setup (Next.js, Tailwind, Supabase)
- [ ] Build basic UI components (progress bar, form sections)
- [ ] Create landing page
- [ ] Implement Section 1-2 of questionnaire

**Week 2:**
- [ ] Complete Sections 3-6 of questionnaire
- [ ] Add conditional logic and form validation
- [ ] Implement save/resume functionality
- [ ] Build AI analysis integration

**Week 3:**
- [ ] Create SCOPE.md generation logic
- [ ] Build email delivery system
- [ ] Test with 3-5 sample scenarios
- [ ] Deploy to Vercel
- [ ] Polish UI and copy

**Deliverable:** Live tool at applicreations-wizard.vercel.app

### Phase 2: Application Form (Week 4)
- [ ] Duplicate and modify form for application projects
- [ ] Add app-specific questions
- [ ] Update AI prompts for app analysis
- [ ] Test with 2 app scenarios
- [ ] Add form selection on landing page

### Phase 3: Polish & Real-World Testing (Week 5)
- [ ] Use with 3 real clients
- [ ] Collect feedback and iterate
- [ ] Fix bugs and edge cases
- [ ] Improve AI prompt accuracy
- [ ] Add analytics tracking

---

## 🎯 SAMPLE OUTPUTS

### Technical SCOPE.md Must Include:
- Project type and client info
- All IN SCOPE features with detailed descriptions
- OUT OF SCOPE items with reasons
- Parking lot for future ideas
- Recommended tech stack with reasoning
- Timeline with weekly milestones
- Budget breakdown (one-time + recurring)
- Client responsibilities checklist
- Risk assessment table
- Success criteria checkboxes
- Approval section placeholder

### Client Version Must Include:
- Business name and project summary
- Plain English list of pages/features
- Visual style description
- "What Happens Next" timeline
- Investment breakdown (avoid "cost", say "investment")
- What client needs to provide
- Next steps after approval
- Friendly, encouraging tone throughout

---

## 💰 PROJECT CONSTRAINTS

### Time Budget
- **Target completion:** 5 weeks (MVP + testing)
- **Daily time commitment:** 2-3 hours
- **Total estimated hours:** 70-105 hours

### Financial Budget
- **Domain:** $15/year (applicreationsrequirements.com)
- **Vercel Hosting:** $0 (free tier sufficient for v1.0)
- **Supabase:** $0 (free tier - 500MB database, 2GB bandwidth)
- **Resend Email:** $0 (free tier - 100 emails/day)
- **Anthropic API:** ~$20/month (estimated - 50 forms × $0.40/analysis)
- **Total Year 1:** ~$255

### Technical Constraints
- Must work in Cursor with AI assistance
- Use free/cheap services to minimize costs
- Mobile-first responsive design required
- No backend beyond API routes (serverless)
- Keep it simple - avoid over-engineering

---

## 🚨 KEY RISKS & MITIGATIONS

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| AI generates inaccurate recommendations | Medium | High | Test with 10+ scenarios, refine prompts, add human review step |
| Form too long/complex for clients | Medium | High | User test with 3 non-technical people, time them |
| Conditional logic breaks | Low | Medium | Comprehensive testing of all question paths |
| Email delivery fails | Low | High | Use reliable service (Resend), add retry logic, test thoroughly |
| AI API costs spike | Low | Medium | Set usage alerts, cache common responses, monitor costs weekly |
| Scope.md format incompatible with Cursor | Low | Medium | Use exact template from current workflow, test immediately |

---

## 📝 DEFINITION OF DONE

**MVP is complete when:**
- [ ] Landing page is live and professional
- [ ] Website questionnaire has all 6 sections working
- [ ] Conditional logic shows/hides questions correctly
- [ ] Save/resume generates working link
- [ ] Form validates all required fields
- [ ] AI generates coherent tech stack recommendations
- [ ] Technical SCOPE.md matches Cursor workflow format exactly
- [ ] Client version is in plain English with no jargon
- [ ] Email delivery works 100% of the time
- [ ] Tool works on mobile phone (iPhone and Android tested)
- [ ] 3 real clients have successfully used it
- [ ] Generated scopes required less than 15 minutes editing
- [ ] Deployed to production URL
- [ ] Domain pointed to deployment

---

## 🎓 LEARNING GOALS

This project helps me learn:
- Complex form state management in React
- Conditional logic and dynamic UIs
- AI API integration (Anthropic Claude)
- Email automation
- Database integration (Supabase)
- Deployment and hosting (Vercel)
- UX design for non-technical users
- Converting business requirements into technical specs

---

## 📞 SUCCESS METRICS (After 1 Month)

- **Usage:** 10+ forms completed
- **Completion Rate:** 80%+ finish once started
- **Time:** Average completion under 20 minutes
- **Accuracy:** 90%+ of scopes require minimal editing
- **Client Feedback:** 4.5+ stars on clarity and ease of use
- **Business Impact:** 2+ clients signed from using this tool

---

**Current scope locked:** ✅ Yes  
**Ready to start:** ✅ Yes  
**First task:** Project setup and landing page  

---

## 🚀 NEXT STEPS

1. Copy this SCOPE.md into project folder
2. Initialize Next.js project with TypeScript + Tailwind
3. Set up Cursor workflow files (STATUS.md with first task)
4. Begin with landing page design and implementation
5. Type `/init` in Cursor to start building!
