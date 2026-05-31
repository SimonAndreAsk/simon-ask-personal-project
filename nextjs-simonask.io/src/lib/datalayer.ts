export type ContactClickLocation =
  | "hero"
  | "intro_inline"
  | "header_email"
  | "footer_email"
  | "footer_phone";

export type ContactFormLocation = "footer";

function pushToDataLayer(payload: Record<string, string>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
}

export function pushContactClick(button_location: ContactClickLocation): void {
  pushToDataLayer({ event: "contact_click", button_location });
}

export function pushContactFormSubmit(form_location: ContactFormLocation = "footer"): void {
  pushToDataLayer({ event: "contact_form_submit", form_location });
}
