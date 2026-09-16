export const site = {
  name: "Philip Augustine B. Cadungog",
  shortName: "Philip Cadungog",
  headline: "Software Developer",
  subheadline: "Full stack web development and n8n automation",
  location: "Dumaguete City, Philippines",
  email: "hello@example.com",
  pitch:
    "I build web applications end to end and wire them into automated workflows with n8n — so the software does the work instead of the people using it.",
  links: {
    linkedin: "https://www.linkedin.com/in/philcads-dev/",
    github: "https://github.com/philcads-dev",
  },
  nav: [
    { label: "Projects", to: "/projects" },
    { label: "Services", to: "/services" },
    { label: "About", to: "/about" },
    { label: "Notes", to: "/notes" },
    { label: "Contact", to: "/contact" },
  ],
} as const;
