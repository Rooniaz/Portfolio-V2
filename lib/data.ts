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
  name: "ROONIAZZ",
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
    title: "Dotnet Food",
    description: "Web application for ordering and delivering foods",
    category: "web",
    image: "/projects/dotnet-food.jpg",
    fullDescription:
      "A full-stack web application for ordering and delivering foods online. Users can browse menus, add items to cart, and place orders. Built with ASP.NET Core and integrated with a PostgreSQL database.",
    tags: ["ASP.NET", "PostgreSQL", "Bootstrap"],
    github: "https://github.com",
    gallery: [
      "/projects/dotnet-food.jpg",
    ],
  },
  {
    id: "2",
    title: "Quic Gear",
    description: "Web application for buying and auctioning gaming gear",
    category: "web",
    image: "/projects/quic-gear.jpg",
    fullDescription:
      "An e-commerce and auction platform for gaming peripherals and gear. Features real-time bidding, product listings, and secure checkout.",
    tags: ["Node.js", "PostgreSQL", "Angular"],
    github: "https://github.com",
    gallery: [
      "/projects/quic-gear.jpg",
    ],
  },
  {
    id: "3",
    title: "Bake A Cake",
    description: "The DFA game was made with Godot Engine 3.0",
    category: "game",
    image: "/projects/bake-a-cake.jpg",
    fullDescription:
      "A game created for the application of NFA DFA in playing games. By playing it, users must enter input to reach the finish line. Otherwise, the user will lose immediately due to the main goal of NFA DFA, called TRAP STATE. The game is in infinity mode. The more you play, the more challenging it will be.",
    tags: ["Godot 3.0", "DFA"],
    github: "https://github.com",
    gallery: [
      "/projects/bake-a-cake.jpg",
      "/projects/bake-a-cake-2.jpg",
      "/projects/bake-a-cake-3.jpg",
      "/projects/bake-a-cake-4.jpg",
      "/projects/bake-a-cake-5.jpg",
    ],
  },
  {
    id: "4",
    title: "Terra Craft",
    description: "Game tower defense made with Godot Engine 3.0",
    category: "game",
    image: "/projects/terra-craft.jpg",
    fullDescription:
      "A tower defense strategy game developed with Godot Engine 3.0. Players build and upgrade towers to defend against waves of enemies across multiple levels.",
    tags: ["Godot 3.0", "GDScript"],
    github: "https://github.com",
    gallery: [
      "/projects/terra-craft.jpg",
      "/projects/terra-craft-2.jpg",
      "/projects/terra-craft-3.jpg",
    ],
  },
  {
    id: "5",
    title: "My Note",
    description: "Application for note of your activity with expired time",
    category: "app",
    image: "/projects/my-note.jpg",
    fullDescription:
      "A mobile-friendly note application that allows users to log daily activities with expiry timestamps. Notes are automatically archived when they expire.",
    tags: ["Flutter", "Dart"],
    github: "https://github.com",
    gallery: [
      "/projects/my-note.jpg",
    ],
  },
  {
    id: "6",
    title: "Food Prediction",
    description: "Application for predicting your foods to eat",
    category: "app",
    image: "/projects/food-prediction.jpg",
    fullDescription:
      "A machine learning-powered application that predicts meal recommendations based on user preferences and dietary history.",
    tags: ["Flask", "Python", "ML"],
    github: "https://github.com",
    gallery: [
      "/projects/food-prediction.jpg",
    ],
  },
];

export const experience: ExperienceItem = {
  company: "SIAMCRAFT.NET",
  role: "DEVELOPER",
  duration: "MORE THAN 2 YEARS",
  highlight: "I AM DEVELOPER AT",
  description:
    "I am the developer of most of Siamcraft's systems and can support the number of simultaneous players greater than 300. Recently I have implemented an implementation of Jedis (Redis) to allow the game server to support more players. This is one of my achievements that I am very proud of.",
  // ใส่ path รูปใน public/ (เช่น "/experience-banner.jpg") เพื่อแสดงในแบนเนอร์
  bannerImage: undefined,
  // รูปในกริด "What I Do?" ใส่ path ใน public/ (เช่น ["/exp-1.jpg", "/exp-2.jpg", ...])
  galleryImages: undefined,
};

export const contactForm = {
  title: "Contact Me",
  subtitle: "Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.",
  submitLabel: "SUBMIT",
  web3formsKey: "2bc9bb11-3e08-4dbb-a6e7-d9192c2f1611",
};
