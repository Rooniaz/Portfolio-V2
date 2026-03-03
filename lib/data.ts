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
    "Angular",
    "TypeScript",
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
      "I worked on IOT projects such as FPGA, STM32, and Arduino. Website projects included product auction websites, sales websites, as well as developing games using SFML, Godot Engine.",
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
    description: "",
    category: "web",
    image: "/activity/nice-dream/1.png",
    fullDescription: "",
    tags: [],
    github: "",
    gallery: Array.from({ length: 14 }, (_, i) => `/activity/nice-dream/${i + 1}.png`),
  },
  {
    id: "2",
    title: "Unexpected Day",
    description: "",
    category: "web",
    image: "/activity/unexpected-day/1.png",
    fullDescription: "",
    tags: [],
    github: "",
    gallery: Array.from({ length: 6 }, (_, i) => `/activity/unexpected-day/${i + 1}.png`),
  },
  {
    id: "3",
    title: "Webglasses",
    description: "",
    category: "web",
    image: "/activity/webglasses/1.png",
    fullDescription: "",
    tags: [],
    github: "",
    gallery: Array.from({ length: 13 }, (_, i) => `/activity/webglasses/${i + 1}.png`),
  },
  {
    id: "4",
    title: "Webservice Land Tax",
    description: "",
    category: "web",
    image: "/activity/webservice-land-tax/1.png",
    fullDescription: "",
    tags: [],
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
  galleryImages: undefined,
};

export const contactForm = {
  title: "Contact Me",
  subtitle: "Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.",
  submitLabel: "SUBMIT",
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "",
};
