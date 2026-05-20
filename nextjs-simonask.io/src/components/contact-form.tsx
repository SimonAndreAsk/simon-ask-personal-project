"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { SiteIcon } from "@/components/site-icon";
import { linkedinProfileUrl } from "@/lib/contact";

const fieldClass =
  "w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-foreground shadow-sm transition-[border-color,box-shadow] placeholder:text-muted/80 focus:border-open-green/50 focus:outline-none focus:ring-2 focus:ring-open-green/20";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      const payload = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(payload.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="mt-8 max-w-lg">
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
          <label htmlFor="contact-company">Company</label>
          <input
            id="contact-company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="contact-name" className="text-sm text-foreground">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`${fieldClass} mt-1.5`}
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm text-foreground">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`${fieldClass} mt-1.5`}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="text-sm text-foreground">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className={`${fieldClass} mt-1.5 resize-y`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-foreground shadow-sm transition-[color,background-color,border-color,box-shadow] hover:border-open-green/40 hover:bg-surface/80 hover:text-open-green disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send"}
          </button>
          <a
            href={linkedinProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
          >
            LinkedIn
            <SiteIcon icon={ArrowRight} />
          </a>
        </div>

        {status === "success" ? (
          <p className="text-sm text-open-green" role="status">
            Thanks — your message was sent. I&apos;ll get back to you when I can.
          </p>
        ) : null}

        {status === "error" && errorMessage ? (
          <p className="text-sm text-red-700" role="alert">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </div>
  );
}
