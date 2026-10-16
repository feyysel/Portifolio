export const profile = {
  name: "Feysel Awel Mohammed",
  firstName: "Feysel",
  role: "Software Developer",
  tagline: "I build fast, clean web and mobile applications — from responsive frontends to Firebase and Supabase powered backends.",
  email: "feyselawel82@gmail.com",
  location: "Dire Dawa, Ethiopia",
  avatar: null,
  education: {
    degree: "BSc in Software Engineering",
    university: "Dire Dawa University",
    year: "4th Year",
  },
  socials: [
    { label: "GitHub", href: "https://github.com/feyysel", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/feysel-awel-39583a323", icon: "linkedin" },
    { label: "Telegram", href: "https://t.me/Feyyssel", icon: "telegram" },
  ],
  stats: [
    { value: 5, suffix: "+", label: "Projects Built" },
    { value: 8, suffix: "+", label: "Technologies" },
    { value: 2, suffix: "", label: "Platforms" },
    { value: 24, suffix: "h", label: "Response Time" },
  ],
  roles: [
    "Software Developer",
    "Web Developer",
    "Flutter Developer",
    "Backend Developer",
  ],
  about:
    "I'm Feysel, a 4th year Software Engineering student at Dire Dawa University who enjoys building practical software from start to finish. I work across the stack — crafting responsive frontends with HTML, CSS, and JavaScript, powering them with PHP, SQL, Firebase, and Supabase backends, and shipping cross-platform mobile apps with Flutter and Dart. I care about clean code and products that actually solve problems.",
  skills: [
    {
      category: "Web Development",
      icon: "code",
      items: [
        { name: "HTML", level: 92 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 88 },
        { name: "PHP", level: 82 },
      ],
    },
    {
      category: "Backend & Databases",
      icon: "cog",
      items: [
        { name: "SQL", level: 84 },
        { name: "Firebase", level: 86 },
        { name: "Supabase", level: 84 },
        { name: "Backend APIs", level: 85 },
      ],
    },
    {
      category: "Mobile Development",
      icon: "mobile",
      items: [
        { name: "Flutter", level: 86 },
        { name: "Dart", level: 84 },
      ],
    },
  ],
  projects: [
    {
      title: "Restaurant Management System",
      description:
        "An all-in-one restaurant platform that digitalizes the full flow — from browsing the menu and ordering to the kitchen display and final payment.",
      tags: ["Full Stack", "Menu", "Kitchen Display", "Payments"],
      icon: "utensils",
      link: "https://rms-full-ownership.vercel.app",
      featured: true,
      accent: "from-rose-500 to-amber-500",
    },
    {
      title: "Smart Parking Management System",
      description:
        "Helps drivers find, reserve, and pay for parking spots in real time, with a clean dashboard for lot owners.",
      tags: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
      icon: "car",
      link: "#",
      locked: true,
      featured: true,
      accent: "from-violet-500 to-fuchsia-500",
    },
    {
      title: "Immersive Birthday Gift Website",
      description:
        "A personalized, animated website built to deliver a birthday gift with an unforgettable unboxing experience.",
      tags: ["HTML", "CSS", "JavaScript"],
      icon: "gift",
      link: "#",
      featured: true,
      accent: "from-cyan-400 to-blue-500",
    },
    {
      title: "Intercity Ride Sharing App",
      description:
        "Ride-sharing application connecting passengers and drivers between Addis Ababa and Dire Dawa.",
      tags: ["Flutter", "Dart", "Firebase"],
      icon: "users",
      link: "#",
      locked: true,
      featured: true,
      accent: "from-emerald-400 to-teal-500",
    },
    {
      title: "Garment Inventory Application",
      description:
        "Manage garment stock — track items, quantities, and updates with a clean and simple interface.",
      tags: ["Flutter", "Dart", "Supabase"],
      icon: "layers",
      link: "#",
      locked: true,
      featured: false,
      accent: "from-amber-400 to-orange-500",
    },
    {
      title: "Portfolio Website",
      description:
        "This site — a responsive, animated personal portfolio built with React and styled with Tailwind CSS.",
      tags: ["React", "Vite", "Tailwind CSS", "JavaScript", "Framer Motion"],
      icon: "chart",
      link: "#",
      featured: true,
      accent: "from-sky-400 to-indigo-500",
    },
  ],
  experience: [
    {
      role: "Software Developer",
      company: "Freelance & Personal Projects",
      period: "Ongoing",
      points: [
        "Built responsive web applications with HTML, CSS, JavaScript, and PHP.",
        "Integrated Firebase and Supabase backend APIs into web and mobile apps.",
        "Developed cross-platform mobile applications with Flutter and Dart.",
      ],
    },
  ],
  services: [
    {
      title: "Web Development",
      description: "Responsive, modern websites and web apps built with HTML, CSS, JavaScript, and PHP.",
      icon: "code",
    },
    {
      title: "Mobile Apps (Flutter)",
      description: "Cross-platform mobile applications for Android and iOS with Flutter and Dart.",
      icon: "smartphone",
    },
    {
      title: "Backend & APIs",
      description: "REST APIs and real-time backends powered by Firebase and Supabase.",
      icon: "zap",
    },
    {
      title: "Database Design",
      description: "Structured SQL schemas and NoSQL data modeling that stay fast and easy to maintain.",
      icon: "database",
    },
  ],
}

export const assistantConfig = {
  name: "Zuri",
  greeting: "Hey! I'm Zuri, Feysel's AI assistant. Ask me about his projects, skills, or how to get in touch. 🤖",
  // Leave empty to fall back to OpenAI's API key stored in browser settings.
  endpoint: "",
  // "openai" (chat/completions) or "anthropic" (messages). Set in widget settings too.
  provider: "openai",
  systemPrompt:
    "You are Zuri, the AI assistant embedded in Feysel Awel Mohammed's portfolio website. " +
    "Answer questions about Feysel's skills, projects, and experience using the data provided. " +
    "Be friendly, concise, and professional. If asked something unrelated, politely steer back to Feysel.",
  suggestedQuestions: [
    "What projects has Feysel built?",
    "What are Feysel's skills?",
    "How can I contact Feysel?",
  ],
}

export const aiProviders = {
  openai: {
    label: "OpenAI",
    endpoint: "https://api.openai.com/v1/chat/completions",
    keyHint: "sk-...",
    buildBody: (messages) => ({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: messages.system },
        ...messages.history,
      ],
      temperature: 0.7,
      max_tokens: 600,
    }),
    extractText: (data) => data?.choices?.[0]?.message?.content || "",
  },
  anthropic: {
    label: "Anthropic",
    endpoint: "https://api.anthropic.com/v1/messages",
    keyHint: "sk-ant-...",
    buildBody: (messages) => ({
      model: "claude-3-5-sonnet-latest",
      max_tokens: 600,
      system: messages.system,
      messages: messages.history,
    }),
    extractText: (data) => data?.content?.[0]?.text || "",
  },
}
