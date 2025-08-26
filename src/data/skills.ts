export const skills = [
    {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/></svg>`,
        title: "System Architecture & Design",
        description: "Architected scalable systems handling 15K requests/minute and 9+ billion requests. Expert in microservices, event-driven architecture, and platform rebuilding from technical debt.",
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 17l-5-5 5-5v3l-2 2 2 2v3zm8-10l5 5-5 5v-3l2-2-2-2V7z"/></svg>`,
        title: "Full-Stack Development",
        description: "End-to-end development with React/Next.js, Node.js/NestJS, and TypeScript. Built MVPs from scratch, real-time systems, and complex web applications.",
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3a3 3 0 110 6 3 3 0 010-6zm0 6v6m0 0a3 3 0 100 6 3 3 0 000-6zm0 0a3 3 0 10-6 0 3 3 0 006 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
        title: "APIs & Integration",
        description: "Designed REST APIs and integrated with Stripe, PayPal, Booking.com, AirBNB, and Google Maps. Expert in payment systems and third-party integrations.",
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7 3 4 4.79 4 7v10c0 2.21 3 4 8 4s8-1.79 8-4V7c0-2.21-3-4-8-4zm0 2c3.87 0 6 .93 6 2s-2.13 2-6 2-6-.93-6-2 2.13-2 6-2zm0 6c3.87 0 6 .93 6 2s-2.13 2-6 2-6-.93-6-2 2.13-2 6-2z"/></svg>`,
        title: "Database & Data Systems",
        description: "PostgreSQL, MongoDB, MySQL database design and optimization. Built flexible content parsing systems supporting 500+ data sources with various formats.",
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm-1 15l-4-4 1.41-1.41L11 14.17l6.59-6.59L19 9l-8 8z"/></svg>`,
        title: "Testing & Quality Assurance",
        description: "Implemented comprehensive testing frameworks with Playwright, Python Robot framework. Established code reviews and quality gates improving delivery timelines by 30-40%.",
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 18H6a4 4 0 010-8 5 5 0 019.9-1.5A4.5 4.5 0 1119 18z"/></svg>`,
        title: "DevOps & Cloud Infrastructure",
        description: "AWS, Docker, Kubernetes, ArgoCD expertise. Implemented DevOps pipelines reducing deployment time by 40%. Maintained 99%+ uptime across distributed systems.",
    },
    {
        icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 4l2.29 2.29-2.88 2.88 1.42 1.42 2.88-2.88L22 10V4h-6zM4 10l2.29-2.29 2.88 2.88 1.42-1.42L7.71 6.71 10 4H4v6zm6 8l-2.29-2.29 2.88-2.88-1.42-1.42-2.88 2.88L4 14v6h6zm8-2.29L16 20h6v-6l-2.29 2.29-2.88-2.88-1.42 1.42 2.88 2.88z"/></svg>`,
        title: "Team Leadership & Project Management",
        description: "Led teams of 3-7 members using Scrum methodology. Onboarded and trained developers, built high-performing teams. Rescued failed projects and delivered complex systems on time.",
    },
];

export type Skill = (typeof skills)[number];