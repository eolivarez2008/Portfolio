export interface JourneyItem {
  date: string;
  title: string;
  location: string;
  description: string;
  icon: "work" | "edu";
  type: "work" | "edu";
  skills?: string[];
}

export interface ArchiveFolder {
  category: string;
  items: {
    name: string;
    file: string;
  }[];
}

export const JOURNEY: JourneyItem[] = [
  {
    date: "OCTOBRE 2025",
    title: "Stage développement web (Terminale Pro CIEL)",
    location: "Lycée Louis de Cormontaigne, Metz",
    description:
      "Conception d'expériences interactives WebGL (3D) avec A-Frame et Three.js. Présentation sur la cybersécurité.",
    icon: "work",
    type: "work",
    skills: ["WebGL", "Three.js", "Cyber"],
  },
  {
    date: "MARS 2025",
    title: "Stage Maintenance & Vente (1ère Pro CIEL)",
    location: "ID Phone, Maizières-lès-Metz",
    description:
      "Diagnostic et réparation d'ordinateurs portables. Accueil et conseil client sur les solutions informatiques.",
    icon: "work",
    type: "work",
    skills: ["Maintenance", "Hardware", "Vente"],
  },
  {
    date: "NOVEMBRE 2024",
    title: "Stage Maintenance & Vente (1ère Pro CIEL)",
    location: "ID Phone, Maizières-lès-Metz",
    description:
      "Diagnostic matériel et gestion des stocks. Suivi des commandes clients.",
    icon: "work",
    type: "work",
    skills: ["Stock", "Diagnostic"],
  },
  {
    date: "JUIN 2024",
    title: "Stage Électrotechnicien (2e Pro FM TNE)",
    location: "Kappeler, Strasbourg",
    description:
      "Montage d'enseignes lumineuses LED. Câblage et soudure de précision.",
    icon: "work",
    type: "work",
    skills: ["LED", "Soudure"],
  },
  {
    date: "JANVIER 2024",
    title: "Stage Plombier (2e Pro FM TNE)",
    location: "Sanifrance, Metz",
    description:
      "Installation de canalisations et découverte des outils techniques de chantier.",
    icon: "work",
    type: "work",
    skills: ["Installation", "Chantier"],
  },
  {
    date: "2026",
    title: "Bac Pro CIEL",
    location: "Lycée Louis de Cormontaigne, Metz",
    description:
      "Successeur du Bac Pro SN (Systèmes Numériques), le Bac Pro CIEL est spécialisé en Cybersécurité, Informatique Electronique et Réseaux.",
    icon: "edu",
    type: "edu",
  },
  {
    date: "2023",
    title: "Brevet des Collèges",
    location: "Collège Jean Rostand, Metz",
    description:
      "Diplôme National du Brevet (Série Générale). Validation du socle commun de compétences avec Mention Très Bien.",
    icon: "edu",
    type: "edu",
  },
];

export const ARCHIVES: ArchiveFolder[] = [
  {
    category: "Collège",
    items: [
      {
        name: "Bulletin 3e trimestre 1",
        file: "/Bulletins/bulletin-3e-trimestre-1.pdf",
      },
      {
        name: "Bulletin 3e trimestre 2",
        file: "/Bulletins/bulletin-3e-trimestre-2.pdf",
      },
      {
        name: "Bulletin 3e trimestre 3",
        file: "/Bulletins/bulletin-3e-trimestre-3.pdf",
      },
      {
        name: "Bulletin 4e trimestre 1",
        file: "/Bulletins/bulletin-4e-trimestre-1.pdf",
      },
      {
        name: "Bulletin 4e trimestre 2",
        file: "/Bulletins/bulletin-4e-trimestre-2.pdf",
      },
      {
        name: "Bulletin 4e trimestre 3",
        file: "/Bulletins/bulletin-4e-trimestre-3.pdf",
      },
      {
        name: "Bulletin 5e trimestre 1",
        file: "/Bulletins/bulletin-5e-trimestre-1.pdf",
      },
      {
        name: "Bulletin 5e trimestre 2",
        file: "/Bulletins/bulletin-5e-trimestre-2.pdf",
      },
      {
        name: "Bulletin 6e trimestre 1",
        file: "/Bulletins/bulletin-6e-trimestre-1.pdf",
      },
      {
        name: "Bulletin 6e trimestre 2",
        file: "/Bulletins/bulletin-6e-trimestre-2.pdf",
      },
      {
        name: "Bulletin 6e trimestre 3",
        file: "/Bulletins/bulletin-6e-trimestre-3.pdf",
      },
    ],
  },
  {
    category: "Lycée (Bac Pro CIEL)",
    items: [
      {
        name: "Bulletin Terminale Semestre 1",
        file: "/Bulletins/bulletin-terminale-semestre-1.pdf",
      },
      {
        name: "Bulletin 1ère Semestre 1",
        file: "/Bulletins/bulletin-1ere-semestre-1.pdf",
      },
      {
        name: "Bulletin 1ère Semestre 2",
        file: "/Bulletins/bulletin-1ere-semestre-2.pdf",
      },
      {
        name: "Bulletin 2nde Semestre 1",
        file: "/Bulletins/bulletin-2nde-semestre-1.pdf",
      },
      {
        name: "Bulletin 2nde Semestre 2",
        file: "/Bulletins/bulletin-2nde-semestre-2.pdf",
      },
    ],
  },
  {
    category: "Diplômes & Certifs",
    items: [
      { name: "Diplôme du Brevet", file: "/diplome-national-du-brevet.pdf" },
      { name: "Certification PIX", file: "/certification-pix.pdf" },
    ],
  },
];
