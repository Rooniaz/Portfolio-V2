export type ProjectCategory = "all" | "game" | "web" | "app";

export interface EducationItem {
  id: string;
  degree: string;
  school: string;
  period: string;
  location: string;
  link?: string;
  description: string;
  program?: string;
  /** path ใน public/ หรือ URL โลโก้สถาบัน */
  logo?: string;
  /** ตัวย่อแสดงแทนโลโก้ถ้าโหลดรูปไม่ได้ */
  logoInitials?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: "game" | "web" | "app";
  href?: string;
  /** รูปพื้นหลังการ์ด (path ใน public/) */
  image?: string;
  /** คำอธิบายเต็มในหน้า detail */
  fullDescription?: string;
  /** tags แสดงบนหน้า detail */
  tags?: string[];
  /** GitHub URL */
  github?: string;
  /** รูป gallery ในหน้า detail (path ใน public/) */
  gallery?: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  duration: string;
  highlight: string;
  description: string;
  /** รูปพื้นหลังแบนเนอร์ (ใส่ path ใน public/) */
  bannerImage?: string;
  /** รูปในกริด "What I Do?" (ใส่ path ใน public/) */
  galleryImages?: string[];
}

export const navLinks = [
  { label: "home", href: "#home" },
  { label: "education", href: "#education" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "skills", href: "#skills" },
  { label: "contact", href: "#contact" },
] as const;

export const skills = {
  frontend: [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Cordova",
    "WordPress",
    "Bootstrap",
  ],
  backend: [
    "Node.js",
    "PostgreSQL",
    "SQL",
    "Java",
    "Spring Boot",
    "Flask",
  ],
  testing: ["Playwright (E2E Testing, UI Automation)"],
} as const;

export const hero = {
  name: "ROONIAZ",
  role: "GAME & WEB DEVELOPER",
};

export const education: EducationItem[] = [
  {
    id: "1",
    degree: "Bachelor's degree",
    school: "RMUTT",
    period: "2021 - 2025",
    location: "Pathum Thani, Thailand",
    link: "https://www.rmutt.ac.th/",
    description:
      "I developed an IoT automated watering system using Arduino and various web projects, including a clothing e-commerce site, a banknote detection support platform for the visually impaired (Final Project), a freelance interactive website, and a land tax calculation web app.",
    program: "Information Technology and Digital Communication",
    logo: "/logos/RMUTT.png",
    logoInitials: "RMUTT",
  },
  {
    id: "2",
    degree: "High School",
    school: "Thanyarat school",
    period: "2018 - 2021",
    location: "Pathum Thani, Thailand",
    link: "https://www.thanyarat.ac.th/",
    description: "",
    program: "Language - Arts (English) Program",
    logo: "/logos/TR.png",
    logoInitials: "TYR",
  },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Nice Dream",
    description: "Fashion e-commerce website with product browsing and social features",
    category: "web",
    image: "/activity/nice-dream/1.png",
    fullDescription:
      "Nice Dream is a fashion-focused e-commerce web application that allows users to browse trendy clothing collections inspired by street fashion. The platform features product listings, category filtering, and social sharing functionality. Built with a modern UI to deliver a smooth shopping experience.",
    tags: ["Angular", "Node.js", "PostgreSQL"],
    github: "",
    gallery: Array.from({ length: 14 }, (_, i) => `/activity/nice-dream/${i + 1}.png`),
  },
  {
    id: "2",
    title: "Unexpected Day",
    description: "Story-driven interactive web experience with anime-style visuals",
    category: "web",
    image: "/activity/unexpected-day/1.png",
    fullDescription:
      "Unexpected Day is a story-driven interactive web application featuring anime-style artwork and narrative gameplay elements. Users navigate through scenes and make choices that affect the story outcome. The project showcases creative UI design combined with interactive storytelling mechanics.",
    tags: ["React"],
    github: "",
    gallery: Array.from({ length: 6 }, (_, i) => `/activity/unexpected-day/${i + 1}.png`),
  },
  {
    id: "3",
    title: "Webglasses",
    description: "Smart glasses e-commerce platform with product catalog and filtering",
    category: "web",
    image: "/activity/webglasses/1.png",
    fullDescription:
      "Webglasses is an e-commerce platform specializing in smart glasses and eyewear. The site features a product catalog with detailed listings, category filtering, a shopping cart, and a clean responsive layout. Designed to highlight product imagery and deliver a seamless browsing experience.",
    tags: ["Angular", "TypeScript", "Bootstrap", "Flask", "Python"],
    github: "",
    gallery: Array.from({ length: 13 }, (_, i) => `/activity/webglasses/${i + 1}.png`),
  },
  {
    id: "5",
    title: "MCHost",
    description: "Web application for Minecraft server hosting management",
    category: "web",
    image: "/activity/mchost/1.png",
    fullDescription:
      "MCHost is a web application for managing Minecraft server hosting. The platform allows users to create, configure, and monitor their Minecraft servers through an intuitive dashboard interface.",
    tags: ["Next.js", "React", "Java", "Spring Boot", "PHP"],
    github: "",
    gallery: Array.from({ length: 10 }, (_, i) => `/activity/mchost/${i + 1}.png`),
  },
  {
    id: "4",
    title: "Webservice Land Tax",
    description: "Government web service for land tax calculation and management",
    category: "web",
    image: "/activity/webservice-land-tax/1.png",
    fullDescription:
      "Webservice Land Tax is a government-facing web application designed to streamline land tax calculation and data management. The system allows officers to input land details, compute tax amounts based on official regulations, and generate reports. Built with a focus on accuracy, reliability, and ease of use for administrative workflows.",
    tags: ["C#", "ASP.NET"],
    github: "",
    gallery: ["/activity/webservice-land-tax/1.png"],
  },
];

export const experience: ExperienceItem = {
  company: "PP & P ADVANCE",
  role: "FULL STACK DEVELOPER",
  duration: "MAY 2025 – PRESENT (1 YEAR)",
  highlight: "OUTSOURCED TO AIS",
  description:
    "Assigned to AIS (Advanced Info Service) project, developing and maintaining enterprise-grade Ticket Trouble System (TTS) and Workforce Management (WFM). Implemented intelligent task assignment logic matching field technicians to tasks based on GPS proximity, skills, and real-time availability. Developed the TTS Mobile (TTSM) application using Cordova, architected backend services with Java Spring Boot and EJB remote calls,  Managed end-to-end deployment of tts-web, wfm-web, and tts-app modules, and optimized SQL performance to meet AIS's SLAs.",
  bannerImage: undefined,
  galleryImages: [
    "/activity/nice-dream/1.png",
    "/activity/unexpected-day/1.png",
    "/activity/webglasses/1.png",
    "/activity/webservice-land-tax/1.png",
    "/activity/mchost/1.png",
    "/activity/nice-dream/2.png",
  ],
};

export const contactForm = {
  title: "Contact Me",
  subtitle: "Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.",
  submitLabel: "SUBMIT",
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
};
