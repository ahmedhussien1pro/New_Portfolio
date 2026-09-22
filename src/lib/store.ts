import fs from "fs";
import path from "path";
import {
  AHMED_PROFILE,
  CASE_STUDIES,
  EXPERIENCES,
  CERTIFICATES,
  ProjectCaseStudy,
  ExperienceRole,
  CertificateItem,
} from "./data";

export interface PortfolioStoreData {
  profile: typeof AHMED_PROFILE & {
    availabilityStatus?: "available" | "busy" | "contract_only";
    statusText?: string;
  };
  projects: ProjectCaseStudy[];
  experiences: ExperienceRole[];
  certificates: CertificateItem[];
  skills: {
    backend: string[];
    frontend: string[];
    cloud: string[];
    database: string[];
    workflows: string[];
  };
  lastUpdated: string;
}

const DATA_DIR = path.join(process.cwd(), "src", "data");
const STORE_PATH = path.join(DATA_DIR, "portfolio-store.json");

export function getInitialPortfolioData(): PortfolioStoreData {
  return {
    profile: {
      ...AHMED_PROFILE,
      availabilityStatus: "available",
      statusText: "Available for Senior Full Stack & Cloud Engineering Roles",
    },
    projects: CASE_STUDIES.map((p) => ({
      ...p,
      published: p.published !== false,
    })),
    experiences: EXPERIENCES.map((e) => ({
      ...e,
      published: e.published !== false,
    })),
    certificates: CERTIFICATES.map((c) => ({
      ...c,
      published: c.published !== false,
    })),
    skills: AHMED_PROFILE.technologies,
    lastUpdated: new Date().toISOString(),
  };
}

export function getPortfolioStore(): PortfolioStoreData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(STORE_PATH)) {
      const initialData = getInitialPortfolioData();
      fs.writeFileSync(STORE_PATH, JSON.stringify(initialData, null, 2), "utf8");
      return initialData;
    }

    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return parsed;
  } catch (err) {
    console.error("Error accessing portfolio store, falling back to static data:", err);
    return getInitialPortfolioData();
  }
}

export function savePortfolioStore(data: PortfolioStoreData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error saving portfolio store:", err);
    return false;
  }
}
