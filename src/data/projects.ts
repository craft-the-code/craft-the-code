import OddleIcon from '../assets/logos/Oddle-logo.svg?raw';
import TagManagerIcon from '../assets/logos/Tagmanager-logo.svg?raw';
import MenuWiseIcon from '../assets/logos/MenuWise-logo.svg?raw';
import YourRentalsIcon from '../assets/logos/YourRentals-logo.svg?raw';
import ZaloIcon from '../assets/logos/Zalo-logo.svg?raw';

export const projects = [
    {
        title: "MenuWise - Recipe Management Platform",
        techStack: "NestJS • Next.js • React • PostgreSQL • Docker • Python ML",
        description: "Complete platform rebuild with recipe weight calculations, nested cost structures, and intelligent ingredient matching. Rescued from 4-year development failure to working system.",
        ctaText: "View Demo",
        ctaLink: "https://staging.menuwise.com",
        icon: MenuWiseIcon
    },
    {
        title: "Your.Rentals - Property Management Platform",
        techStack: "NestJS • React • AngularJS • PostgreSQL • AWS • Kubernetes",
        description: "Comprehensive vacation rental management platform with Stripe/PayPal payments, Booking.com/AirBNB integrations, and Spanish guest registration systems.",
        ctaText: "Try Platform",
        ctaLink: "https://app.your.rentals/sign-up/email",
        icon: YourRentalsIcon
    },
    {
        title: "Oddle Reservation System",
        techStack: "NodeJS • NextJS • TypeScript • AWS • PHP Laravel",
        description: "High-performance reservation system serving 1000+ merchants, handling 15,000 requests/minute during peak events with Google Maps Booking API integration.",
        ctaText: "Learn More",
        ctaLink: "https://www.oddle.me/sg/products/restaurant-reservation-system",
        icon: OddleIcon
    },
    {
        title: "GoClass.vn - Online Tutoring Platform",
        techStack: "NodeJS • VueJS • WebRTC • WebSocket • MongoDB • AWS",
        description: "MVP built from scratch in 3 months with real-time chat, video conferencing, learning analytics, and cross-platform mobile apps (iOS/Android).",
        ctaText: "View Project",
        ctaLink: "#",
        icon: TagManagerIcon
    },
    {
        title: "Zalo Media Crawler System",
        techStack: "Java • NodeJS • RabbitMQ • SQL Server • Microservices",
        description: "Scalable distributed crawler serving 9+ billion requests over 6 months with 99.99% availability. Flexible parsing system supporting 500+ content sources.",
        ctaText: "Case Study",
        ctaLink: "#",
        icon: ZaloIcon
    },
    {
        title: "Korean Educational Platform",
        techStack: "Java • PHP • VueJS • Moodle • MySQL • MongoDB",
        description: "Led development of educational platforms for Korean market. Helped achieve Moodle Silver Partner certification through delivery excellence and technical innovation.",
        ctaText: "Visit Platform",
        ctaLink: "https://www.unioncloud.org/",
        icon: TagManagerIcon
    },
];

export type Project = (typeof projects)[number];