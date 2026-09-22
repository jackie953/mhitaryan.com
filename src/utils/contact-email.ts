const EMAIL_PARTS = ["contact", "mhitaryan.com"];

export function getContactEmail() {
  return EMAIL_PARTS.join("@");
}

export function openContactEmail() {
  window.location.href = "mailto:" + getContactEmail();
}
