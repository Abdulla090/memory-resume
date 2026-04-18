export interface SampleMemory {
  id: string;
  persona: string;
  description: string;
  emoji: string;
  text: string;
}

export const SAMPLE_MEMORIES: SampleMemory[] = [
  {
    id: "engineer",
    persona: "Senior Software Engineer",
    description: "Backend-leaning full-stack engineer, 8 years experience",
    emoji: "💻",
    text: `User's name is Maya Okafor, lives in Berlin, originally from Lagos. Speaks English, German (B2), and Yoruba.
Currently Staff Software Engineer at Klarna, joined 2022. Before that: Senior Engineer at N26 (2019-2022), Backend Engineer at Zalando (2016-2019).
Studied Computer Science at TU Munich, graduated 2016.
Tech stack: TypeScript, Go, Rust (learning), Python, PostgreSQL, Kafka, Kubernetes, AWS, Terraform.
Led the migration of N26's payment ledger from monolith to event-sourced microservices — handled 12M transactions/day.
At Klarna, owns the BNPL risk-scoring service. Brought down p99 latency from 480ms to 65ms by rewriting hot path in Go.
Mentors 4 junior engineers. Runs an internal "Rust at Klarna" guild.
Side projects: maintains an open-source Postgres connection pooler (1.2k stars on GitHub).
Speaks at conferences — KubeCon EU 2023, GopherCon 2024.
Interested in: distributed systems, developer experience, eventually wants to be a Principal Engineer or start a dev-tools company.
Personality: direct, methodical, dislikes meetings, prefers async written communication. Strong opinions weakly held.
Goals: wants to either go deeper technical (Principal/Distinguished) or pivot to a founding engineer role at an early-stage infra startup.`,
  },
  {
    id: "designer",
    persona: "Product Designer",
    description: "Brand + product designer with startup roots",
    emoji: "🎨",
    text: `Name: Théo Laurent. Based in Paris, French and English fluent, conversational Spanish.
Senior Product Designer at Doctolib since 2021, leading design for the patient mobile app (8M MAU).
Previously: Product Designer at Qonto (2019-2021), Brand Designer at BlaBlaCar (2017-2019).
Started career as a freelance illustrator. Self-taught into product design via OpenClassrooms + a year at Ironhack bootcamp (2017).
Tools: Figma (advanced, builds plugins), Framer, After Effects, Webflow, Cursor for prototyping with AI.
Shipped: Doctolib's appointment-rescheduling flow that cut support tickets 34%. Designed Qonto's first mobile-first onboarding (raised activation 22%).
Loves: typography, brand systems, motion design, editorial layouts. Inspired by Pentagram, Mathieu Lehanneur, Dieter Rams.
Side: runs a Substack on design systems with 4k subscribers, sells Figma templates (~€800/month passive).
Personality: warm, opinionated about craft, hates "design by committee", thrives in small autonomous teams.
Wants next: Design Lead role at a Series B-C product company, OR join a 2-person founding team as design partner. Open to remote-first companies. Not interested in agencies anymore.`,
  },
  {
    id: "pm",
    persona: "Senior Product Manager",
    description: "B2B SaaS PM with growth + data background",
    emoji: "📊",
    text: `Priya Raman, San Francisco (open to remote). Indian-American, native English + Tamil + intermediate Mandarin.
Currently Senior Product Manager at Notion, on the AI team since 2023. Drove the launch of Notion Q&A → 2.1M weekly active users in 6 months.
Before Notion: PM at Stripe Billing (2021-2023), shipped usage-based pricing (now powers $400M+ ARR for customers). PM at Segment (2019-2021), owned the Personas product.
Started in growth: Growth Analyst at Airbnb (2017-2019). MBA from Wharton (2017). Undergrad in Statistics at UC Berkeley.
Strengths: data-driven discovery, SQL fluency, jobs-to-be-done framework, sharp written specs, comfortable in ambiguous AI/ML problem spaces.
Tools: SQL, Amplitude, Mixpanel, Figma (read-only), Linear, ChatGPT/Claude daily for research synthesis.
Has shipped LLM features end-to-end: prompt design, eval harnesses, latency/cost tradeoffs, RLHF basics.
Speaks at Mind the Product, Lenny's Podcast guest.
Personality: structured, high-agency, sometimes impatient, gives tough feedback kindly.
Goals: wants to be Director of Product at an AI-first company within 18 months, or co-found something in the AI productivity space. Strong interest in vertical AI (legal, healthcare). Avoiding crypto, ad-tech, and enterprise sales-led orgs.`,
  },
];
