import jobIconRaw from '../assets/icons/job-title-icon.svg?raw';
import companyIconRaw from '../assets/icons/company-icon.svg?raw';
import locationIconRaw from '../assets/icons/location-icon.svg?raw';
import { sanitizeToOutline } from '../lib/svg';

export const workIcons = {
    job: sanitizeToOutline(jobIconRaw, 15),
    company: sanitizeToOutline(companyIconRaw, 15),
    location: sanitizeToOutline(locationIconRaw, 15),
};

export const work = [
    {
        title: "Lead Software Developer",
        company: "MenuWise",
        region: "Hanoi, Vietnam",
        description:
            "Rescued project from 4-year development failure, delivering first feasible working system. Architected complete platform rebuild focusing on core recipe weight calculations and ingredient matching algorithms. Collaborated with dietitians and ML developers to transform domain expertise into scalable technical solutions.",
        technologies: [
            "Docker",
            "PostgreSQL",
            "NestJS",
            "Next.js",
            "React",
            "Python",
            "Playwright",
        ],
    },
    {
        title: "Lead Software Developer",
        company: "Your.Rentals",
        region: "Spain (Remote)",
        description:
            "Led team of 3 developers + 1 QA using Scrum methodology, delivered high-quality services with minimal user incidents. Architected integrations with Stripe, PayPal, Booking.com, and AirBNB. Managed feature operations maintaining 99%+ uptime.",
        technologies: [
            "AWS",
            "Docker",
            "Kubernetes",
            "ArgoCD",
            "NestJS",
            "TypeScript",
            "AngularJS",
            "ReactJS",
            "PostgreSQL",
        ],
    },
    {
        title: "Tech Lead",
        company: "Fetch Technology Hanoi",
        region: "Hanoi, Vietnam",
        description:
            "Led 7-member team delivering reservation system serving 1000+ merchants across multiple regions. Architected system handling 15,000 requests/minute during peak restaurant events. Integrated Google Maps Booking API with strict performance requirements.",
        technologies: [
            "NodeJS",
            "NextJS",
            "TypeScript",
            "AWS",
            "EC2",
            "RDS",
            "PHP",
            "Laravel",
            "GitLab CI/CD",
        ],
    },
    {
        title: "Senior Software Engineer",
        company: "Videa Edtech",
        region: "Hanoi, Vietnam",
        description:
            "Architected and built MVP from scratch in 3 months as solo developer. Built real-time chat and video conference system for online classroom sessions. Led 4-member team delivering Korean educational platform projects.",
        technologies: [
            "NodeJS",
            "C#",
            ".NET",
            "VueJS",
            "WebRTC",
            "WebSocket",
            "MongoDB",
            "AWS",
            "Java",
            "PHP",
            "MySQL",
        ],
    },
    {
        title: "Software Engineer",
        company: "Zalo",
        region: "Hanoi, Vietnam",
        description:
            "Architected scalable crawler system serving 9+ billion requests over 6 months with 99.99% availability. Built flexible content parsing system supporting 500+ content sources. Implemented microservices architecture splitting parsing logic into adaptable services.",
        technologies: [
            "Java",
            "NodeJS",
            "Memcached",
            "RabbitMQ",
            "SQL Server",
            "Thrift",
            "ZiDB",
            "Linux",
        ],
    },
];

export type WorkItem = (typeof work)[number];