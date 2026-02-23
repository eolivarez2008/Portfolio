export interface TechItem {
  name: string;
  icon: string;
}
export interface RoadmapStep {
  title: string;
  date: string;
  active: boolean;
  placeholder?: boolean;
}
export interface AboutData {
  techStack: TechItem[];
  roadmapSteps: RoadmapStep[];
}
export interface JourneyItem {
  date: string;
  title: string;
  location: string;
  description: string;
  type: "work" | "edu";
  skills: string[];
}
export interface ArchiveDoc {
  name: string;
  file: string;
}
export interface ArchiveFolder {
  category: string;
  items: ArchiveDoc[];
}
export interface JourneyData {
  journey: JourneyItem[];
  archives: ArchiveFolder[];
}
export interface SiteContent {
  hero: { name: string; lastname: string; subtitle: string };
  quotes: { text: string; author: string; rotation: string }[];
  expertise: { title: string; description: string; icon: string }[];
  about: { bio: string[]; discipline: string; projects_description: string };
}
export interface LegalContent {
  lastUpdate: string;
  editor: { name: string; type: string; email: string };
  hosting: { type: string; details: string; proxy: string; location: string };
  privacy: {
    contact_form: string;
    analytics: string;
    logs: string;
    rights: string;
  };
  intellectual_property: string;
  security_warning: string;
  cookies: string;
}
export interface StatusConfig {
  idMap: Record<string, string>;
}
export interface AuditEntry {
  id: number;
  section: string;
  details: string;
  createdAt: string;
}
