import { type About, type Blog, type Home, type Newsletter, type Person, type Social, type Work, Services, Contact } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Jacqueline",
  lastName: "Mhitaryan",
  name: "Jacqueline Mhitaryan",
  role: "",
  avatar: "/images/avatar.jpg", // 1:1 image, e.g. 800x800px
  email: "jackie@mhitaryan.com",
  location: "Europe/Stockholm", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Swedish", "Spanish"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: true,
  title: <>Book a Discovery Call</>,
  description: <>Let&apos;s explore how we can work together - no obligation, no pitch.</>,
};

const social: Social = [
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/company/mhitaryan-consulting/",
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:contact@mhitaryan.com",
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: "Mhitaryan Consulting",
  description: "Strategic research and communications at the intersection of power, politics, and people.",
  headline: (
    <>
      Read the room.
      <br />
      Make your move.
    </>
  ),
  featured: {
    display: false,
    title: (
      <Row gap="12" vertical="center">
        <strong className="ml-4">Once UI</strong>{" "}
        <Line background="brand-alpha-strong" vert height="20" />
        <Text marginRight="4" onBackground="brand-medium">
          Featured work
        </Text>
      </Row>
    ),
    href: "/cases/building-once-ui-a-customizable-design-system",
  },
  subline: (
    <>
Strategic research and communications at the intersection of power, politics, and people.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: "About | Mhitaryan Consulting",
  description: "",
  tableOfContent: {
    display: true,
    subItems: true,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/mhitaryan",
  },

  // SECTION 1: Background
  aboutSection: {
    display: true,
    title: "Background",
    description: (
      <>
        <p>
        I have spent over a decade working across strategic research, communications, and public affairs — in consulting, civil society, and international contexts. Clients have included government agencies, trade associations, and Fortune 500 companies, alongside NGOs, think tanks, and smaller mission-driven organizations.
        </p>
        <p>
        Ultimately the work is an extension of who I am: someone who reads, thinks, writes, and builds things. I come from a culturally mixed background and have lived and worked across several countries. I am based in Stockholm and work in Swedish, English, and Spanish.
        </p>
      </>
    ),
  },

  // SECTION 2: (disabled)
  howItStarted: {
    display: false,
    title: "How It Started",
    description: (<></>),
  },

  // SECTION 3: Approach
  approach: {
    display: true,
    title: "Approach",
    description: (
      <>
        <p>
        I work with precision and without unnecessary complexity. Research is thorough, analysis is grounded, and communication is direct — adapted to context. Strategy and execution are not separate things; I do both.
        </p>
        <p>
        Most of my work sits at the boundary between sectors or disciplines: policy and communications, research and strategy, local context and international relevance. That's where I'm most useful — translating between worlds, identifying what others miss, and delivering work that holds up under scrutiny.
        </p>
      </>
    ),
  },

  // SECTION 4: (disabled)
  whyWorkWithUs: {
    display: false,
    title: "Why Work With Us",
    description: (<></>),
  },

  // SECTION 5: This is your existing 'work' section for Experience
  work: {
    display: false,
    title: "Background", // Updated title
    experiences: [
      {
        company: "APCO Worldwide",
        timeframe: "2021 - Present",
        role: "Associate",
        images: [],
        achievements: []
      },
      // ... your other experiences
    ],
  },

  // SECTION 6: (disabled)
  workingTogether: {
    display: false,
    title: "Working Together",
    description: (
      <>
        This is a placeholder for the 'Working Together' section.
      </>
    ),
  },

  // We are removing the old 'studies' and 'technical' sections for now.
  // You can add them back later if you need them.
  studies: { display: false, title: "Studies", institutions: [] },
  technical: { display: false, title: "Skills", skills: [] },
  intro: {
    display: false,
    title: "",
    description: undefined
  }
};

const services = {
  path: "/services",
  label: "Services",
  title: "Services | Mhitaryan Consulting",
  description: "Strategic research and communications services",
};

const contact = {
  path: "/contact",
  label: "Contact",
  title: "Contact | Mhitaryan Consulting",
  description: "Get in touch to discuss how we can help you",
};

const blog: Blog = {
  path: "/blog",
  label: "Insights",
  title: "Insights | Mhitaryan Consulting",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const cases: Work = {
  path: "/cases",
  label: "Cases",
  title: "Cases | Mhitaryan Consulting",
  description: "",
  tableOfContent: {
    display: true,
    subItems: false,
  },
};

export { person, social, newsletter, home, about, services, contact, blog, cases };