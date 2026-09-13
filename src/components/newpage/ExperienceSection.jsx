import ItemCard from '../ItemCard';

const EXPERIENCE = [
  {
    title: 'Agentic AI Engineer Intern — IDX Exchange',
    meta: 'Remote — Sep 2026 - Present',
    bullets: [
      'Designed a multi-agent architecture routing natural language queries to specialized agents, eliminating manual query routing and letting the system handle diverse real estate questions automatically.',
      'Implemented semantic property search (OpenAI embeddings + cosine similarity) and a RAG pipeline grounded in indexed MLS field definitions, giving agents faster, data-backed answers on pricing trends, days-on-market, and list-to-close ratios.',
      'Integrated WhatsApp and email interfaces with human-in-the-loop guardrails and parameterized MySQL query layers, making the system safely usable by non-technical staff without direct database access.',
    ],
    children: 'Skills: OpenAI API, LLMs, RAG, NLP, Agentic AI, MySQL',
  },
  {
    title: 'Software Engineer Intern — Silver-i',
    meta: 'Singapore (On-site) — Jun 2026 - Aug 2026',
    bullets: [
      "Worked under senior engineers on Silver-i Optimizer, a microservices-based fintech trading platform for structured products, contributing across frontend (React/TypeScript) and backend.",
      'Refactored four core backend/frontend services for type safety and standardized data-fetching/caching, resolving state management bugs that had been causing live market data to fall out of sync.',
      'Designed backend architecture and API response shaping for trade/portfolio data and structured products pricing logic, and built a training module translating those concepts for non-technical bankers.',
    ],
    children: 'Skills: TypeScript, Flask, REST APIs, Microservices, Full-Stack Dev, Financial Data Management',
  },
  {
    title: 'Undergraduate Research — Computer Vision Lab',
    meta: 'Orlando, FL — Jan 2025 - Jul 2026',
    bullets: [
      "Evaluated image captioning models on baseline architectures using PyTorch on UCF's HPC cluster with SLURM-managed jobs, establishing performance baselines used to guide ongoing lab research.",
      "Managed SLURM-scheduled training jobs on UCF's HPC cluster, running and tracking multiple model evaluations efficiently on shared compute resources.",
      'Designed and implemented a full data pipeline (collection, preprocessing, annotation) for evaluating open-vocabulary action detection models, cutting down manual data-prep work for other researchers in the lab.',
    ],
    children: (
      <>Skills: Python, PyTorch, Computer Vision, Data Pipelines, Data Analysis</>
    ),
  },
  {
    title: 'Sunrise Coffee Co.',
    meta: 'Santa Rosa Beach, FL — 2022 - 2024',
    bullets: [
      "Delivered clear, friendly, and efficient customer service in a fast-paced environment, strengthening communication skills through constant interaction with a diverse customer base",
      "Managed time effectively while multitasking across order preparation, register operations, and customer requests during high-volume periods",
      "Collaborated with team members and supported supply operations, contributing to smooth daily workflow and consistent service quality"
    ],
    children: (
      <>Skills: Communication, Team Leadership, Time Management, Customer Service, Supply Operations</>
    ),
  },
];

const ExperienceSection = () => {
  return (
    <section className="mc-section mc-section--experience" id="experience">
      <div className="mc-section-body">
        <p className="mc-eyebrow">Experience</p>
        <h2>Where I've put in the work</h2>
        {EXPERIENCE.map(({ title, meta, bullets, children }) => (
          <ItemCard key={title} title={title} meta={meta} bullets={bullets}>
            {children}
          </ItemCard>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
