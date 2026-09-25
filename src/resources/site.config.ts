/**
 * Site-wide constants for Mhitaryan
 * Update these values to change them across the entire site
 */

export const CONTACT_EMAIL = "hello@mhitaryan.com";
export const CONTACT_EMAIL_SV = "hej@mhitaryan.se";
export const LINKEDIN_URL = "https://www.linkedin.com/company/mhitaryan-consulting/";
export const LOCATION = "Stockholm, Sweden";
export const SHOW_GHOST_WORDMARK = false;

export const getContactEmail = (locale: string) => (locale === "sv" ? CONTACT_EMAIL_SV : CONTACT_EMAIL);

export const NETWORK_LINKS = [
  { label: "APCO Worldwide", href: "https://apcoworldwide.com/" },
  { label: "Sveriges Kommunikatörer", href: "https://www.sverigeskommunikatorer.se/" },
  { label: "OSINord Community", href: "https://www.osinord.com/" },
  { label: "High Impact Professionals", href: "https://www.highimpactprofessionals.org/" },
];

export const SITE_TITLE = "Mhitaryan";
export const SITE_DESCRIPTION =
  "Strategic research and communications for organizations navigating politics, policy and public opinion in the Nordics, the EU and the US.";
export const SITE_TAGLINE = "Mhitaryan | Strategic research & communications";
