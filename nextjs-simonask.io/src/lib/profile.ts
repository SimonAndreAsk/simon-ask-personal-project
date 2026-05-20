export type ProfileEntry = {
  title: string;
  subtitle?: string;
  period?: string;
  href?: string;
  details?: string[];
};

/** Aligns with IHM program page (YH-poäng, omfattning, examen). */
export const ihmDigitalAnalyticsProgramUrl =
  "https://www.ihm.se/utbildningar/marknadsforing/digital-analytics-specialist/";

export const education: ProfileEntry[] = [
  {
    title: "IHM Business School",
    subtitle: "Digital Analytics Specialist",
    period: "2024–2026",
    href: ihmDigitalAnalyticsProgramUrl,
    details: [
      "YH-program (yrkeshögskoleutbildning), 83 weeks full-time including LIA",
      "415 YH-poäng — Yrkeshögskoleexamen (SeQF/EQF level 5)",
    ],
  },
];

export const experience: ProfileEntry[] = [
  {
    title: "Hi3G Access AB (Tre)",
    subtitle: "Data Specialist · LIA",
    period: "Mar 2026–Jun 2026",
    details: [
      "Built metadata pipelines into Microsoft Purview so scattered data is easier to find, govern, and use as context for AI/ML.",
    ],
  },
  {
    title: "Nexer Group",
    subtitle: "Digital Analytics Specialist · LIA",
    period: "Sep 2025–Dec 2025",
    details: [
      "Audited GA4/GTM/CRM tracking, set up measurement plans, and tightened B2B lead attribution for Nexer and client properties.",
    ],
  },
  {
    title: "Skandinaviska Enskilda Banken (SEB)",
    subtitle: "Service Manager",
    period: "Jan 2022–Aug 2024",
    details: [
      "Managed 700+ banking cases and explained technical products clearly to customers, with consistently high satisfaction scores.",
    ],
  },
];
