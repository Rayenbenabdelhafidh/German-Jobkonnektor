import type { SectorId } from "../sectors";

/**
 * MOCK DATA — for building and reviewing the admin UI only.
 *
 * None of this is real. When the backend exists, replace this module with a
 * query against the applications table, and fetch documents through
 * short-lived signed URLs from a PRIVATE bucket — never a public path.
 */

export type ApplicationStatus = "new" | "review" | "interview" | "placed" | "rejected";

export interface MockDocument {
  id: string;
  label: string;
  sizeBytes: number;
  type: "pdf" | "jpg" | "png";
}

export interface MockApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  residence: string;
  nationality: string;
  germanLevel: "none" | "a1" | "a2" | "b1" | "b2" | "c1";
  industry: SectorId;
  status: ApplicationStatus;
  receivedAt: string;
  documents: MockDocument[];
}

const CV: MockDocument = { id: "cv", label: "Lebenslauf", sizeBytes: 412_000, type: "pdf" };
const PASS: MockDocument = { id: "passport", label: "Reisepass", sizeBytes: 1_850_000, type: "jpg" };
const DIPL: MockDocument = { id: "diplomas", label: "Zeugnisse", sizeBytes: 2_310_000, type: "pdf" };
const LIC_F: MockDocument = { id: "licenseFront", label: "Führerschein Vorderseite", sizeBytes: 980_000, type: "jpg" };
const LIC_B: MockDocument = { id: "licenseBack", label: "Führerschein Rückseite", sizeBytes: 960_000, type: "jpg" };
const CARD: MockDocument = { id: "driverCard", label: "Fahrerkarte", sizeBytes: 640_000, type: "png" };
const EXP: MockDocument = { id: "drivingExperience", label: "Nachweis Fahrpraxis", sizeBytes: 1_120_000, type: "pdf" };

export const MOCK_APPLICATIONS: MockApplication[] = [
  {
    id: "GJK-2026-0148",
    firstName: "Karim",
    lastName: "Aït Brahim",
    email: "k.aitbrahim@example.com",
    phone: "+216 20 000 000",
    residence: "TN",
    nationality: "Tunesisch",
    germanLevel: "a2",
    industry: "transport",
    status: "new",
    receivedAt: "2026-09-15T08:42:00Z",
    documents: [CV, PASS, DIPL, LIC_F, LIC_B, CARD, EXP],
  },
  {
    id: "GJK-2026-0147",
    firstName: "Amira",
    lastName: "Haddad",
    email: "a.haddad@example.com",
    phone: "+212 6 00 00 00 00",
    residence: "MA",
    nationality: "Marokkanisch",
    germanLevel: "b1",
    industry: "care",
    status: "review",
    receivedAt: "2026-09-14T16:05:00Z",
    documents: [CV, PASS, DIPL],
  },
  {
    id: "GJK-2026-0146",
    firstName: "Youssef",
    lastName: "Mansouri",
    email: "y.mansouri@example.com",
    phone: "+213 5 00 00 00 00",
    residence: "DZ",
    nationality: "Algerisch",
    germanLevel: "none",
    industry: "transport",
    status: "interview",
    receivedAt: "2026-09-13T11:20:00Z",
    documents: [CV, PASS, DIPL, LIC_F, LIC_B, EXP],
  },
  {
    id: "GJK-2026-0145",
    firstName: "Ibrahim",
    lastName: "Cissé",
    email: "i.cisse@example.com",
    phone: "+221 77 000 00 00",
    residence: "SN",
    nationality: "Senegalesisch",
    germanLevel: "a1",
    industry: "crafts",
    status: "new",
    receivedAt: "2026-09-12T09:15:00Z",
    documents: [CV, PASS, DIPL],
  },
  {
    id: "GJK-2026-0144",
    firstName: "Elena",
    lastName: "Petrova",
    email: "e.petrova@example.com",
    phone: "+373 60 000 000",
    residence: "MD",
    nationality: "Moldauisch",
    germanLevel: "b2",
    industry: "gastro",
    status: "placed",
    receivedAt: "2026-09-10T13:48:00Z",
    documents: [CV, PASS, DIPL],
  },
  {
    id: "GJK-2026-0143",
    firstName: "Rajesh",
    lastName: "Kumar",
    email: "r.kumar@example.com",
    phone: "+91 98 0000 0000",
    residence: "IN",
    nationality: "Indisch",
    germanLevel: "b1",
    industry: "it",
    status: "review",
    receivedAt: "2026-09-09T07:30:00Z",
    documents: [CV, PASS, DIPL],
  },
  {
    id: "GJK-2026-0142",
    firstName: "Ahmet",
    lastName: "Yılmaz",
    email: "a.yilmaz@example.com",
    phone: "+90 5 00 000 00 00",
    residence: "TR",
    nationality: "Türkisch",
    germanLevel: "a2",
    industry: "industry",
    status: "rejected",
    receivedAt: "2026-09-08T15:12:00Z",
    documents: [CV, PASS, DIPL],
  },
  {
    id: "GJK-2026-0141",
    firstName: "Fatima",
    lastName: "Zahra Benali",
    email: "f.benali@example.com",
    phone: "+212 6 11 11 11 11",
    residence: "MA",
    nationality: "Marokkanisch",
    germanLevel: "b1",
    industry: "care",
    status: "interview",
    receivedAt: "2026-09-07T10:02:00Z",
    documents: [CV, PASS, DIPL],
  },
];

export interface MockEmployerRequest {
  id: string;
  company: string;
  contactPerson: string;
  email: string;
  phone: string;
  industry: SectorId;
  headcount: number;
  startDate: string;
  receivedAt: string;
}

export const MOCK_EMPLOYER_REQUESTS: MockEmployerRequest[] = [
  {
    id: "REQ-2026-0032",
    company: "Bayern Logistik GmbH",
    contactPerson: "Andreas Huber",
    email: "a.huber@example.de",
    phone: "+49 89 000000",
    industry: "transport",
    headcount: 8,
    startDate: "2026-11-01",
    receivedAt: "2026-09-15T09:10:00Z",
  },
  {
    id: "REQ-2026-0031",
    company: "Pflegezentrum Isartal",
    contactPerson: "Sabine Wagner",
    email: "s.wagner@example.de",
    phone: "+49 89 111111",
    industry: "care",
    headcount: 4,
    startDate: "2026-12-01",
    receivedAt: "2026-09-13T14:25:00Z",
  },
  {
    id: "REQ-2026-0030",
    company: "Netzbau Süd AG",
    contactPerson: "Thomas Keller",
    email: "t.keller@example.de",
    phone: "+49 89 222222",
    industry: "it",
    headcount: 12,
    startDate: "2027-01-15",
    receivedAt: "2026-09-11T08:00:00Z",
  },
];
