/**
 * Legal texts, German.
 *
 * NOTE FOR THE OPERATOR: these are structured placeholders that cover the
 * usual sections, not legal advice. Have them reviewed by a lawyer or a
 * data-protection officer before the site goes live, and fill in every
 * PLATZHALTER value (VAT ID, tax number, supervisory authority, hosting
 * provider, and — once the backend exists — the storage processor).
 */

import type { LegalDictionary } from "../types";

export const legalDe: LegalDictionary = {
  imprint: {
    title: "Impressum",
    intro: "Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz).",
    sections: [
      {
        heading: "Diensteanbieter",
        lines: [
          "German Jobkonnektor",
          "Inhaber: Mustapha Ben Belgacem",
          "Schneeheideanger 3",
          "80937 München",
          "Deutschland",
        ],
      },
      {
        heading: "Kontakt",
        lines: [],
        contact: true,
      },
      {
        heading: "Umsatzsteuer-Identifikationsnummer",
        paragraphs: [
          "Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: PLATZHALTER – bitte vor Veröffentlichung eintragen.",
          "Steuernummer: PLATZHALTER – bitte vor Veröffentlichung eintragen.",
        ],
      },
      {
        heading: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
        lines: [
          "Mustapha Ben Belgacem",
          "Schneeheideanger 3",
          "80937 München",
          "Deutschland",
        ],
      },
      {
        heading: "Erlaubnis und Aufsichtsbehörde",
        paragraphs: [
          "Zuständige Aufsichtsbehörde: PLATZHALTER – bitte die für den Sitz zuständige Behörde eintragen.",
          "Sofern für die Arbeitsvermittlung eine Erlaubnis oder Registrierung erforderlich ist, sind die entsprechenden Angaben hier zu ergänzen.",
        ],
      },
      {
        heading: "EU-Streitschlichtung",
        paragraphs: [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ],
      },
      {
        heading: "Haftung für Inhalte",
        paragraphs: [
          "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
          "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden entsprechender Rechtsverletzungen entfernen wir diese Inhalte umgehend.",
        ],
      },
      {
        heading: "Haftung für Links",
        paragraphs: [
          "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.",
          "Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von Rechtsverletzungen entfernen wir derartige Links umgehend.",
        ],
      },
      {
        heading: "Urheberrecht",
        paragraphs: [
          "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.",
        ],
      },
    ],
  },

  privacy: {
    title: "Datenschutzerklärung",
    updatedLabel: "Stand",
    updated: "September 2026",
    intro:
      "Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie darüber, welche Daten wir erheben, zu welchem Zweck wir sie verarbeiten und welche Rechte Ihnen zustehen. Grundlage ist die Datenschutz-Grundverordnung (DSGVO) sowie das Bundesdatenschutzgesetz (BDSG).",
    disclaimer:
      "Hinweis: Dieser Text ist eine strukturierte Vorlage. Bitte lassen Sie ihn vor der Veröffentlichung juristisch prüfen und ergänzen Sie alle mit PLATZHALTER markierten Angaben.",
    sections: [
      {
        heading: "1. Verantwortliche Stelle",
        paragraphs: [
          "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
        ],
        contact: true,
      },
      {
        heading: "2. Datenschutzbeauftragter",
        paragraphs: [
          "Sofern eine Benennungspflicht besteht, erreichen Sie unseren Datenschutzbeauftragten unter: PLATZHALTER.",
        ],
      },
      {
        heading: "3. Daten aus dem Kontaktformular",
        paragraphs: [
          "Wenn Sie uns über das Kontaktformular eine Nachricht senden, verarbeiten wir die von Ihnen angegebenen Daten (Name, E-Mail-Adresse, Telefonnummer, Betreff und Nachrichtentext), um Ihre Anfrage zu bearbeiten und zu beantworten.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) beziehungsweise Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).",
          "Die Daten werden gelöscht, sobald Ihre Anfrage abschließend bearbeitet ist und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.",
        ],
      },
      {
        heading: "4. Daten aus der Personalanfrage (Arbeitgeber)",
        paragraphs: [
          "Bei einer Personalanfrage verarbeiten wir Firmenname, Ansprechpartner, Kontaktdaten, Branche, Anzahl der benötigten Mitarbeiter, gewünschten Starttermin und Ihre Nachricht, um Ihren Personalbedarf zu prüfen und Ihnen ein Angebot zu unterbreiten.",
          "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO. Eine Weitergabe an Dritte erfolgt nicht ohne Ihre ausdrückliche vorherige Zustimmung.",
        ],
      },
      {
        heading: "5. Bewerberdaten und hochgeladene Dokumente",
        paragraphs: [
          "Wenn Sie sich über das Bewerbungsformular bei uns bewerben, verarbeiten wir Ihre Stammdaten (Vor- und Nachname, E-Mail-Adresse, Telefon- beziehungsweise WhatsApp-Nummer, Aufenthaltsland, Staatsangehörigkeit, Deutschkenntnisse, gewünschte Branche) sowie die von Ihnen hochgeladenen Dokumente.",
          "Zu diesen Dokumenten gehören je nach Branche Ihr Lebenslauf, eine Kopie der Hauptseite Ihres Reisepasses, Ihre Berufsabschlüsse und Zeugnisse sowie – bei Bewerbungen im Bereich Transport und Logistik – Ihr ausländischer Führerschein (Vorder- und Rückseite), Ihre Fahrerkarte beziehungsweise Tachografenkarte und Nachweise über Ihre gewerbliche Fahrpraxis.",
          "Ein Teil dieser Angaben kann besondere Kategorien personenbezogener Daten im Sinne des Art. 9 DSGVO berühren. Die Verarbeitung erfolgt daher ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung nach Art. 6 Abs. 1 lit. a und Art. 9 Abs. 2 lit. a DSGVO, die Sie im Bewerbungsformular durch das Setzen des entsprechenden Häkchens erteilen.",
          "Zweck der Verarbeitung ist die Vermittlung eines Arbeitsplatzes in Deutschland. Dazu gehört die Weitergabe Ihrer Daten und Dokumente an konkrete potenzielle Arbeitgeber sowie, soweit erforderlich, an Behörden im Visum- und Anerkennungsverfahren.",
          "Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt. Ein Widerruf genügt formlos per E-Mail an die oben genannte Adresse.",
          "Speicherdauer: Wir speichern Bewerbungsunterlagen für die Dauer des Vermittlungsprozesses und darüber hinaus für höchstens 24 Monate, sofern Sie einer längeren Speicherung nicht ausdrücklich zugestimmt haben. Danach werden die Daten und Dokumente gelöscht.",
        ],
      },
      {
        heading: "6. Sicherheit der hochgeladenen Dokumente",
        paragraphs: [
          "Hochgeladene Dokumente werden verschlüsselt und in einem nicht öffentlich zugänglichen Speicher abgelegt. Ein Zugriff ist ausschließlich autorisierten Mitarbeiterinnen und Mitarbeitern nach Anmeldung möglich; der Abruf erfolgt über kurzlebige, signierte Links. Die Dokumente sind zu keinem Zeitpunkt über eine öffentliche Adresse erreichbar.",
          "Die Übertragung dieser Website erfolgt durchgängig verschlüsselt über HTTPS (TLS).",
        ],
      },
      {
        heading: "7. Cookies und Einwilligungsverwaltung",
        paragraphs: [
          "Wir setzen technisch notwendige Cookies beziehungsweise vergleichbare Speichertechniken ein, um Ihre Sprachauswahl und Ihre Cookie-Entscheidung zu speichern. Rechtsgrundlage ist § 25 Abs. 2 TDDDG in Verbindung mit Art. 6 Abs. 1 lit. f DSGVO.",
          "Alle nicht notwendigen Inhalte – insbesondere die eingebettete Karte auf der Kontaktseite – werden erst nach Ihrer ausdrücklichen Einwilligung geladen. Rechtsgrundlage ist § 25 Abs. 1 TDDDG in Verbindung mit Art. 6 Abs. 1 lit. a DSGVO.",
          "Ihre Einwilligung können Sie jederzeit über den Link „Cookie-Einstellungen“ im Fußbereich der Website ändern oder widerrufen.",
          "Ein Tracking oder eine Webanalyse findet auf dieser Website nicht statt.",
        ],
      },
      {
        heading: "8. Google Maps",
        paragraphs: [
          "Auf der Kontaktseite binden wir eine Karte des Dienstes Google Maps ein. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.",
          "Die Karte wird ausschließlich nach Ihrer aktiven Einwilligung geladen. Erst dann wird eine Verbindung zu Servern von Google hergestellt und Ihre IP-Adresse sowie gegebenenfalls weitere Daten an Google übertragen. Eine Übermittlung in Drittländer kann dabei nicht ausgeschlossen werden.",
          "Weitere Informationen finden Sie in der Datenschutzerklärung von Google.",
        ],
      },
      {
        heading: "9. Server-Logfiles",
        paragraphs: [
          "Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Logfiles, die Ihr Browser übermittelt: Browsertyp und -version, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.",
          "Diese Daten werden nicht mit anderen Datenquellen zusammengeführt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem technisch fehlerfreien und sicheren Betrieb).",
          "Hosting-Anbieter: PLATZHALTER – bitte vor Veröffentlichung eintragen. Mit dem Anbieter besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO.",
        ],
      },
      {
        heading: "10. Empfänger und Auftragsverarbeiter",
        paragraphs: [
          "Eine Weitergabe Ihrer Daten erfolgt nur, soweit dies zur Erfüllung des Vermittlungszwecks erforderlich ist, Sie eingewilligt haben oder eine gesetzliche Verpflichtung besteht.",
          "Mögliche Empfänger sind potenzielle Arbeitgeber in Deutschland, deutsche Auslandsvertretungen und Ausländerbehörden, zuständige Anerkennungsstellen sowie unsere technischen Dienstleister für Hosting und Dokumentenspeicherung.",
          "Mit allen Auftragsverarbeitern bestehen Verträge nach Art. 28 DSGVO.",
        ],
      },
      {
        heading: "11. Ihre Rechte",
        paragraphs: ["Ihnen stehen als betroffene Person folgende Rechte zu:"],
        list: [
          "Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)",
          "Berichtigung unrichtiger Daten (Art. 16 DSGVO)",
          "Löschung Ihrer Daten (Art. 17 DSGVO)",
          "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
          "Datenübertragbarkeit (Art. 20 DSGVO)",
          "Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)",
          "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
        ],
        after: [
          "Zur Ausübung Ihrer Rechte genügt eine formlose Nachricht an die oben genannte E-Mail-Adresse.",
          "Unabhängig davon steht Ihnen ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu (Art. 77 DSGVO). Zuständig ist in der Regel die Aufsichtsbehörde Ihres gewöhnlichen Aufenthaltsortes oder des Sitzes des Verantwortlichen. Für unseren Sitz ist das Bayerische Landesamt für Datenschutzaufsicht zuständig.",
        ],
      },
      {
        heading: "12. Änderungen dieser Datenschutzerklärung",
        paragraphs: [
          "Wir passen diese Datenschutzerklärung an, sobald Änderungen unserer Leistungen oder der Rechtslage dies erfordern. Es gilt jeweils die auf dieser Seite veröffentlichte Fassung.",
        ],
      },
    ],
  },
};
