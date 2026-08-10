import { CheckCircle2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type FormValues = {
  name: string;
  business: string;
  email: string;
  phone: string;
  leadProcess: string;
  website: string;
};

type VisibleField = Exclude<keyof FormValues, "website">;
type FormErrors = Partial<Record<VisibleField, string>>;

const initialValues: FormValues = {
  name: "",
  business: "",
  email: "",
  phone: "",
  leadProcess: "",
  website: "",
};

const fieldOrder: VisibleField[] = [
  "name",
  "business",
  "email",
  "phone",
  "leadProcess",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGIT_LIMIT = 10;

function phoneDigits(value: string): string {
  return value.replace(/\D/g, "").slice(0, PHONE_DIGIT_LIMIT);
}

function formatPhoneNumber(value: string): string {
  const digits = phoneDigits(value);

  if (digits.length < 3) return digits;
  if (digits.length === 3) return `(${digits})`;

  const areaCode = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const lineNumber = digits.slice(6);

  if (!lineNumber) return `(${areaCode}) ${prefix}`;
  return `(${areaCode}) ${prefix}-${lineNumber}`;
}

function cursorPositionAfterDigits(value: string, digitCount: number): number {
  if (digitCount <= 0) return 0;

  let digitsSeen = 0;
  for (let index = 0; index < value.length; index += 1) {
    if (/\d/.test(value[index])) digitsSeen += 1;
    if (digitsSeen === digitCount) return index + 1;
  }

  return value.length;
}

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const business = values.business.trim();
  const email = values.email.trim();
  const leadProcess = values.leadProcess.trim();

  if (!name) errors.name = "Please enter your name.";
  if (!business) errors.business = "Please enter your business name.";

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (values.phone && values.phone.length !== PHONE_DIGIT_LIMIT) {
    errors.phone = "Enter a 10-digit phone number.";
  }

  if (!leadProcess) {
    errors.leadProcess = "Please describe what happens to a new lead.";
  } else if (leadProcess.length < 10) {
    errors.leadProcess = "Please add a little more detail.";
  }

  return errors;
}

const RelayInquiryForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const submissionInProgress = useRef(false);
  const successHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successHeading.current?.focus();
  }, [submitted]);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSubmitError(null);

    if (field !== "website") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const updatePhone = (value: string) => {
    updateField("phone", phoneDigits(value));
  };

  const handlePhoneKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== "Backspace" && event.key !== "Delete") return;

    const input = event.currentTarget;
    const selectionStart = input.selectionStart;
    const selectionEnd = input.selectionEnd;
    if (
      selectionStart === null ||
      selectionEnd === null ||
      selectionStart !== selectionEnd
    ) {
      return;
    }

    const digitsBeforeCursor = phoneDigits(
      input.value.slice(0, selectionStart),
    ).length;
    const removalIndex =
      event.key === "Backspace" ? digitsBeforeCursor - 1 : digitsBeforeCursor;
    if (removalIndex < 0 || removalIndex >= values.phone.length) return;

    event.preventDefault();
    const nextPhone =
      values.phone.slice(0, removalIndex) +
      values.phone.slice(removalIndex + 1);
    const nextFormattedPhone = formatPhoneNumber(nextPhone);
    const nextDigitPosition =
      event.key === "Backspace"
        ? Math.max(0, digitsBeforeCursor - 1)
        : digitsBeforeCursor;

    updateField("phone", nextPhone);
    requestAnimationFrame(() => {
      const cursorPosition = cursorPositionAfterDigits(
        nextFormattedPhone,
        nextDigitPosition,
      );
      input.setSelectionRange(cursorPosition, cursorPosition);
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setSubmitError(null);

    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      document.getElementById(`relay-${firstInvalidField}`)?.focus();
      return;
    }

    submissionInProgress.current = true;
    setSubmitting(true);

    try {
      const response = await fetch("/api/relay-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          name: values.name.trim(),
          business: values.business.trim(),
          email: values.email.trim(),
          phone: values.phone.trim() || undefined,
          leadProcess: values.leadProcess.trim(),
          startedAt,
        }),
      });

      if (!response.ok) throw new Error("Relay inquiry submission failed");

      setSubmitted(true);
    } catch {
      setSubmitError(
        "We could not send your inquiry right now. Please try again shortly.",
      );
    } finally {
      submissionInProgress.current = false;
      setSubmitting(false);
    }
  };

  const fieldClassName =
    "mt-2 w-full rounded-xl border border-foreground/15 bg-background/80 px-4 py-3 text-foreground outline-none transition placeholder:text-foreground/40 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-65";

  const errorProps = (field: VisibleField) => ({
    "aria-describedby": errors[field] ? `relay-${field}-error` : undefined,
    "aria-invalid": errors[field] ? (true as const) : undefined,
  });

  return (
    <div
      id="relay-contact"
      className="scroll-mt-28 rounded-[1.5rem] border border-emerald-500/25 bg-background/75 p-6 shadow-xl shadow-black/5 backdrop-blur-sm sm:p-8 dark:shadow-black/20"
    >
      {submitted ? (
        <div className="flex min-h-80 flex-col items-start justify-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 aria-hidden="true" size={25} />
          </span>
          <h3
            ref={successHeading}
            tabIndex={-1}
            className="mt-6 text-2xl font-black tracking-[-0.03em] outline-none sm:text-3xl"
          >
            Your inquiry is on its way.
          </h3>
          <p className="mt-3 max-w-md leading-relaxed text-foreground/70">
            Thanks for sharing your current lead process. Taylor will follow up
            with you soon.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-7">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
              Relay inquiry
            </p>
            <h3 className="mt-2 text-2xl font-black tracking-[-0.03em] sm:text-3xl">
              Tell me how you handle new leads today.
            </h3>
          </div>

          <form aria-busy={submitting} noValidate onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold" htmlFor="relay-name">
                  Name
                </label>
                <input
                  {...errorProps("name")}
                  id="relay-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  disabled={submitting}
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  className={fieldClassName}
                />
                {errors.name && (
                  <p
                    id="relay-name-error"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="text-sm font-semibold"
                  htmlFor="relay-business"
                >
                  Business
                </label>
                <input
                  {...errorProps("business")}
                  id="relay-business"
                  name="business"
                  type="text"
                  autoComplete="organization"
                  required
                  maxLength={150}
                  disabled={submitting}
                  value={values.business}
                  onChange={(event) =>
                    updateField("business", event.target.value)
                  }
                  className={fieldClassName}
                />
                {errors.business && (
                  <p
                    id="relay-business-error"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {errors.business}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold" htmlFor="relay-email">
                  Email
                </label>
                <input
                  {...errorProps("email")}
                  id="relay-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  disabled={submitting}
                  value={values.email}
                  onChange={(event) => updateField("email", event.target.value)}
                  className={fieldClassName}
                />
                {errors.email && (
                  <p
                    id="relay-email-error"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm font-semibold" htmlFor="relay-phone">
                  Phone <span className="font-normal text-foreground/55">(optional)</span>
                </label>
                <input
                  {...errorProps("phone")}
                  id="relay-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={14}
                  disabled={submitting}
                  value={formatPhoneNumber(values.phone)}
                  onChange={(event) => updatePhone(event.target.value)}
                  onKeyDown={handlePhoneKeyDown}
                  className={fieldClassName}
                />
                {errors.phone && (
                  <p
                    id="relay-phone-error"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label
                className="text-sm font-semibold"
                htmlFor="relay-leadProcess"
              >
                How do you handle new leads today?
              </label>
              <textarea
                {...errorProps("leadProcess")}
                id="relay-leadProcess"
                name="leadProcess"
                autoComplete="off"
                required
                minLength={10}
                maxLength={3000}
                rows={6}
                disabled={submitting}
                value={values.leadProcess}
                onChange={(event) =>
                  updateField("leadProcess", event.target.value)
                }
                placeholder="Example: Website leads go to our office manager, who calls them back when available and follows up the next day if they don't answer."
                className={`${fieldClassName} resize-y`}
              />
              {errors.leadProcess && (
                <p
                  id="relay-leadProcess-error"
                  className="mt-2 text-sm text-red-700 dark:text-red-300"
                >
                  {errors.leadProcess}
                </p>
              )}
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
            >
              <label htmlFor="relay-website">Website</label>
              <input
                id="relay-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(event) => updateField("website", event.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-emerald-600 px-7 py-3 font-semibold text-white shadow-[0_12px_38px_rgba(5,150,105,0.18)] transition-all hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-[0_16px_44px_rgba(5,150,105,0.26)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-65 dark:bg-emerald-500 dark:text-emerald-950 dark:hover:bg-emerald-400"
            >
              {submitting ? "Sending inquiry…" : "Send Relay inquiry"}
              <Send aria-hidden="true" size={18} />
            </button>

            <div aria-live="polite" className="mt-4 min-h-6">
              {submitError && (
                <p role="alert" className="text-sm text-red-700 dark:text-red-300">
                  {submitError}
                </p>
              )}
            </div>
          </form>
        </>
      )}

      <p className="mt-5 text-sm leading-relaxed text-foreground/60">
        Prefer email? Reach Taylor at{" "}
        <a
          className="font-semibold text-emerald-700 underline decoration-emerald-500/40 underline-offset-4 transition hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
          href="mailto:automation@devbytaylor.com?subject=Relay%20lead%20process"
        >
          automation@devbytaylor.com
        </a>
        .
      </p>
    </div>
  );
};

export default RelayInquiryForm;
