"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Briefcase,
  Download,
  FileText,
  Filter,
  Lock,
  LogOut,
  Mail,
  Phone,
  Search,
  Users,
  X,
} from "lucide-react";
import { COMPANY } from "@/lib/config";
import { SECTOR_ICONS, type SectorId } from "@/lib/sectors";
import {
  MOCK_APPLICATIONS,
  MOCK_EMPLOYER_REQUESTS,
  type ApplicationStatus,
  type MockApplication,
} from "@/lib/mock/applications";
import { formatBytes } from "@/lib/upload";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const INDUSTRY_LABELS: Record<SectorId, string> = {
  transport: "Transport & Logistik",
  crafts: "Handwerk & Bau",
  care: "Gesundheit & Pflege",
  industry: "Industrie & Technik",
  it: "IT & Glasfaser",
  gastro: "Gastronomie & Hotellerie",
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
  new: "Neu",
  review: "In Prüfung",
  interview: "Interview",
  placed: "Vermittelt",
  rejected: "Abgelehnt",
};

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  new: "bg-amber-100 text-amber-700",
  review: "bg-navy-100 text-navy",
  interview: "bg-blue-100 text-blue-700",
  placed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const GERMAN_LEVELS: Record<MockApplication["germanLevel"], string> = {
  none: "Keine",
  a1: "A1",
  a2: "A2",
  b1: "B1",
  b2: "B2",
  c1: "C1+",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function countryName(code: string) {
  try {
    return new Intl.DisplayNames(["de"], { type: "region" }).of(code) ?? code;
  } catch {
    return code;
  }
}

/** Banner that makes the mock nature of this screen impossible to miss. */
function MockWarning() {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-relaxed text-navy ring-1 ring-inset ring-amber-300">
      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
      <p>
        <strong className="font-semibold">Demo-Ansicht ohne Backend.</strong>{" "}
        Diese Oberfläche zeigt Beispieldaten. Es findet keine echte
        Authentifizierung statt und es werden keine Dokumente gespeichert oder
        ausgeliefert. Vor dem Produktivbetrieb müssen Login, Datenbank und
        privater, verschlüsselter Dokumentenspeicher angebunden werden.
      </p>
    </div>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-white">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="text-2xl font-bold text-navy">Interner Bereich</h1>
          <p className="mt-1.5 text-sm text-muted">{COMPANY.name}</p>
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onLogin();
          }}
          className="rounded-card border border-line bg-white p-6 shadow-card sm:p-8"
        >
          <div className="mb-5">
            <label
              htmlFor="admin-email"
              className="mb-1.5 block text-sm font-semibold text-navy"
            >
              E-Mail
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoComplete="username"
              defaultValue="demo@german-jobkonnektor.de"
              className="w-full rounded-xl border border-line px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="admin-password"
              className="mb-1.5 block text-sm font-semibold text-navy"
            >
              Passwort
            </label>
            <input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              defaultValue="demo"
              className="w-full rounded-xl border border-line px-4 py-3 text-sm focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10"
            />
          </div>

          <Button type="submit" variant="navy" size="lg" className="w-full">
            Anmelden
          </Button>

          <p className="mt-5 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-navy ring-1 ring-inset ring-amber-200">
            <strong className="font-semibold">Attrappe:</strong> Dieses Formular
            prüft nichts. Beliebige Eingaben öffnen die Demo-Ansicht. Eine echte
            Authentifizierung ist vor dem Produktivbetrieb zwingend erforderlich.
          </p>
        </form>
      </div>
    </div>
  );
}

function DetailDrawer({
  application,
  onClose,
}: {
  application: MockApplication;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="detail-title"
      className="fixed inset-0 z-50 flex justify-end bg-navy/50 backdrop-blur-sm"
    >
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-cardHover">
        <div className="sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-white p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted">
              {application.id}
            </p>
            <h2 id="detail-title" className="mt-1 text-xl font-bold text-navy">
              {application.firstName} {application.lastName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Schließen"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-navy"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="space-y-6 p-6">
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs text-muted">Branche</dt>
              <dd className="mt-0.5 font-medium text-navy">
                {INDUSTRY_LABELS[application.industry]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Status</dt>
              <dd className="mt-0.5">
                <span
                  className={cn(
                    "inline-block rounded-pill px-2.5 py-1 text-xs font-semibold",
                    STATUS_STYLES[application.status],
                  )}
                >
                  {STATUS_LABELS[application.status]}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Aufenthaltsland</dt>
              <dd className="mt-0.5 font-medium text-navy">
                {countryName(application.residence)}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Staatsangehörigkeit</dt>
              <dd className="mt-0.5 font-medium text-navy">
                {application.nationality}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Deutschkenntnisse</dt>
              <dd className="mt-0.5 font-medium text-navy">
                {GERMAN_LEVELS[application.germanLevel]}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted">Eingegangen</dt>
              <dd className="mt-0.5 font-medium text-navy">
                {formatDate(application.receivedAt)}
              </dd>
            </div>
          </dl>

          <div className="space-y-2 border-t border-line pt-5 text-sm">
            <a
              href={`mailto:${application.email}`}
              className="flex items-center gap-2.5 text-muted hover:text-amber"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              {application.email}
            </a>
            <a
              href={`tel:${application.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2.5 text-muted hover:text-amber"
            >
              <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
              {application.phone}
            </a>
          </div>

          <div className="border-t border-line pt-5">
            <h3 className="mb-3 text-sm font-bold text-navy">
              Dokumente ({application.documents.length})
            </h3>
            <ul className="space-y-2">
              {application.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center gap-3 rounded-xl border border-line p-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy-50 text-navy">
                    <FileText className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">
                      {doc.label}
                    </p>
                    <p className="text-xs text-muted">
                      {doc.type.toUpperCase()} · {formatBytes(doc.sizeBytes, "de")}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled
                    title="Erfordert Backend: privater Bucket + signierte URL"
                    className="flex h-9 w-9 shrink-0 cursor-not-allowed items-center justify-center rounded-lg text-navy-300"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    <span className="sr-only">Herunterladen (deaktiviert)</span>
                  </button>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Downloads sind deaktiviert. Im Produktivbetrieb liefert der Server
              hierfür kurzlebige, signierte URLs aus einem privaten,
              verschlüsselten Bucket aus.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminApp() {
  const [authenticated, setAuthenticated] = useState(false);
  const [tab, setTab] = useState<"candidates" | "employers">("candidates");
  const [industry, setIndustry] = useState<SectorId | "all">("all");
  const [status, setStatus] = useState<ApplicationStatus | "all">("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<MockApplication | null>(null);

  const applications = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return MOCK_APPLICATIONS.filter((application) => {
      if (industry !== "all" && application.industry !== industry) return false;
      if (status !== "all" && application.status !== status) return false;
      if (!needle) return true;
      return [
        application.firstName,
        application.lastName,
        application.email,
        application.id,
        application.nationality,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [industry, status, query]);

  const employerRequests = useMemo(() => {
    if (industry === "all") return MOCK_EMPLOYER_REQUESTS;
    return MOCK_EMPLOYER_REQUESTS.filter((r) => r.industry === industry);
  }, [industry]);

  if (!authenticated) {
    return <LoginScreen onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-line bg-white">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy font-display text-sm font-bold text-white">
              GJ
            </span>
            <span className="font-display text-sm font-bold text-navy">
              Verwaltung
            </span>
          </div>
          <button
            type="button"
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-navy"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Abmelden
          </button>
        </div>
      </header>

      <div className="container-page py-8">
        <MockWarning />

        {/* Tabs */}
        <div className="mt-8 flex gap-2 border-b border-line">
          {(
            [
              { id: "candidates", label: "Bewerbungen", icon: Users, count: MOCK_APPLICATIONS.length },
              { id: "employers", label: "Personalanfragen", icon: Briefcase, count: MOCK_EMPLOYER_REQUESTS.length },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors",
                tab === item.id
                  ? "border-amber text-navy"
                  : "border-transparent text-muted hover:text-navy",
              )}
            >
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
              <span className="rounded-pill bg-navy-50 px-2 py-0.5 text-xs text-navy">
                {item.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Name, E-Mail oder Vorgangsnummer suchen"
              aria-label="Suchen"
              className="w-full rounded-xl border border-line bg-white py-2.5 pe-4 ps-10 text-sm focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
            <select
              value={industry}
              onChange={(event) =>
                setIndustry(event.target.value as SectorId | "all")
              }
              aria-label="Nach Branche filtern"
              className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10"
            >
              <option value="all">Alle Branchen</option>
              {(Object.keys(INDUSTRY_LABELS) as SectorId[]).map((id) => (
                <option key={id} value={id}>
                  {INDUSTRY_LABELS[id]}
                </option>
              ))}
            </select>

            {tab === "candidates" ? (
              <select
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as ApplicationStatus | "all")
                }
                aria-label="Nach Status filtern"
                className="rounded-xl border border-line bg-white px-3 py-2.5 text-sm focus:border-navy focus:outline-none focus:ring-4 focus:ring-navy/10"
              >
                <option value="all">Alle Status</option>
                {(Object.keys(STATUS_LABELS) as ApplicationStatus[]).map((id) => (
                  <option key={id} value={id}>
                    {STATUS_LABELS[id]}
                  </option>
                ))}
              </select>
            ) : null}
          </div>
        </div>

        {/* Candidates table */}
        {tab === "candidates" ? (
          <div className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-3.5 text-start font-semibold">Name</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Branche</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Land</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Deutsch</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Dok.</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Status</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Eingang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {applications.map((application) => {
                    const Icon = SECTOR_ICONS[application.industry];
                    return (
                      <tr
                        key={application.id}
                        tabIndex={0}
                        role="button"
                        onClick={() => setSelected(application)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelected(application);
                          }
                        }}
                        className="cursor-pointer transition-colors hover:bg-surface focus:bg-surface focus:outline-none"
                      >
                        <td className="px-5 py-4">
                          <p className="font-medium text-navy">
                            {application.firstName} {application.lastName}
                          </p>
                          <p className="text-xs text-muted">{application.id}</p>
                        </td>
                        <td className="px-5 py-4">
                          <span className="flex items-center gap-2 text-muted">
                            <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                            {INDUSTRY_LABELS[application.industry]}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-muted">
                          {countryName(application.residence)}
                        </td>
                        <td className="px-5 py-4 text-muted">
                          {GERMAN_LEVELS[application.germanLevel]}
                        </td>
                        <td className="px-5 py-4 text-muted">
                          {application.documents.length}
                        </td>
                        <td className="px-5 py-4">
                          <span
                            className={cn(
                              "inline-block rounded-pill px-2.5 py-1 text-xs font-semibold",
                              STATUS_STYLES[application.status],
                            )}
                          >
                            {STATUS_LABELS[application.status]}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-xs text-muted">
                          {formatDate(application.receivedAt)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {applications.length === 0 ? (
              <p className="p-10 text-center text-sm text-muted">
                Keine Bewerbungen für diese Filterkombination.
              </p>
            ) : null}
          </div>
        ) : (
          /* Employer requests table */
          <div className="mt-6 overflow-hidden rounded-card border border-line bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-sm">
                <thead className="bg-surface text-xs uppercase tracking-wider text-muted">
                  <tr>
                    <th className="px-5 py-3.5 text-start font-semibold">Unternehmen</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Ansprechpartner</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Branche</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Anzahl</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Start</th>
                    <th className="px-5 py-3.5 text-start font-semibold">Eingang</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {employerRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-surface">
                      <td className="px-5 py-4">
                        <p className="font-medium text-navy">{request.company}</p>
                        <p className="text-xs text-muted">{request.id}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-muted">{request.contactPerson}</p>
                        <a
                          href={`mailto:${request.email}`}
                          className="text-xs text-muted hover:text-amber"
                        >
                          {request.email}
                        </a>
                      </td>
                      <td className="px-5 py-4 text-muted">
                        {INDUSTRY_LABELS[request.industry]}
                      </td>
                      <td className="px-5 py-4 font-medium text-navy">
                        {request.headcount}
                      </td>
                      <td className="px-5 py-4 text-muted">{request.startDate}</td>
                      <td className="px-5 py-4 text-xs text-muted">
                        {formatDate(request.receivedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {employerRequests.length === 0 ? (
              <p className="p-10 text-center text-sm text-muted">
                Keine Personalanfragen für diese Branche.
              </p>
            ) : null}
          </div>
        )}
      </div>

      {selected ? (
        <DetailDrawer
          application={selected}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  );
}
