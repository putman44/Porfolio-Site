// src/components/ContactSection.tsx
import { Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../lib/utils";

type FormValues = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type VisibleField = Exclude<keyof FormValues, "website">;
type FormErrors = Partial<Record<VisibleField, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
  website: "",
};

const fieldOrder: VisibleField[] = ["name", "email", "message"];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Please enter your name.";
  } else if (name.length > 100) {
    errors.name = "Please keep your name under 100 characters.";
  }

  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (email.length > 254 || !emailPattern.test(email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message) {
    errors.message = "Please enter a message.";
  } else if (message.length < 10) {
    errors.message = "Please add a little more detail.";
  } else if (message.length > 5000) {
    errors.message = "Please keep your message under 5,000 characters.";
  }

  return errors;
}

const ContactSection: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const submissionInProgress = useRef(false);
  const startedAt = useRef(Date.now());
  const feedback = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (success || error) feedback.current?.focus();
  }, [success, error]);

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setSuccess(null);
    setError(null);

    if (field !== "website") {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const sendMessage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionInProgress.current) return;

    const nextErrors = validateForm(values);
    setErrors(nextErrors);
    setSuccess(null);
    setError(null);

    const firstInvalidField = fieldOrder.find((field) => nextErrors[field]);
    if (firstInvalidField) {
      document.getElementById(`contact-${firstInvalidField}`)?.focus();
      return;
    }

    submissionInProgress.current = true;
    setLoading(true);

    try {
      const response = await fetch("/api/portfolio-contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          website: values.website,
          startedAt: startedAt.current,
        }),
      });

      if (!response.ok) throw new Error("Portfolio contact submission failed");

      setSuccess("Message sent successfully!");
      setValues(initialValues);
      startedAt.current = Date.now();
    } catch {
      setError("We could not send your message right now.");
    } finally {
      submissionInProgress.current = false;
      setLoading(false);
    }
  };

  const fieldClassName =
    "w-full placeholder:text-muted-foreground px-4 py-3 rounded-md border bg-background border-input focus:outline-hidden focus:ring-2 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-65";

  const errorProps = (field: VisibleField) => ({
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
    "aria-invalid": errors[field] ? (true as const) : undefined,
  });

  return (
    <section className="py-12 px-4 relative bg-secondary/10">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Get In <span className="text-primary"> Touch</span>
        </h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Fell free to reach out.
          I'm always open to discussing new opportunities.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="">
            <h3 className="text-2xl font-semibold mb-6">
              {" "}
              Contact Information
            </h3>
            <div className="gap-6 flex flex-col justify-items-start">
              <div className="w-full p-4 flex justify-center items-center gap-2 rounded-full bg-primary/10">
                <Mail className="h-6 w-6 text-primary" />
                <span className="hidden md:block font-medium">Email: </span>

                <a
                  className="hover:text-primary truncate transition-colors"
                  href="mailto:taylor@devbytaylor.com"
                >
                  taylor@devbytaylor.com
                </a>
              </div>

              <div className="w-full p-4 flex justify-center items-center gap-2 rounded-full bg-primary/10">
                <Phone className="h-6 w-6 text-primary" />{" "}
                <h4 className="font-medium hidden md:block">Phone: </h4>
                <a
                  className="truncate hover:text-primary transition-colors"
                  href="tel:+14807190795"
                >
                  +1 (480) 719-0795
                </a>
              </div>

              <div className="w-full p-4 flex justify-center items-center gap-2 rounded-full bg-primary/10">
                <MapPin className="h-6 w-6 text-primary" />

                <h4 className="font-medium hidden md:block"> Location</h4>
                <a className="truncate hover:text-primary transition-colors">
                  Santa Fe, NM
                </a>
              </div>
            </div>
            <div className="pt-8">
              <h4 className="font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-4 justify-center">
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/taylor-putman/"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <Linkedin className="" />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-primary/10 p-8 rounded-lg shadow-xs">
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            <form
              aria-busy={loading}
              id="contact"
              className="space-y-6"
              noValidate
              onSubmit={sendMessage}
            >
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="contact-name"
                >
                  Your Name
                </label>
                <input
                  {...errorProps("name")}
                  className={fieldClassName}
                  type="text"
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="John Smith"
                  disabled={loading}
                  value={values.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
                {errors.name && (
                  <p
                    id="contact-name-error"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="contact-email"
                >
                  Your Email
                </label>
                <input
                  {...errorProps("email")}
                  className={fieldClassName}
                  type="email"
                  id="contact-email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="johnsmith@gmail.com"
                  disabled={loading}
                  value={values.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                />
                {errors.email && (
                  <p
                    id="contact-email-error"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="contact-message"
                >
                  Your Message
                </label>
                <textarea
                  {...errorProps("message")}
                  className={`${fieldClassName} resize-y`}
                  id="contact-message"
                  name="message"
                  autoComplete="off"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={4}
                  placeholder="Hello, this is a very nice website ;)"
                  disabled={loading}
                  value={values.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="mt-2 text-sm text-red-700 dark:text-red-300"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[-10000px] top-auto h-px w-px overflow-hidden"
              >
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.website}
                  onChange={(event) =>
                    updateField("website", event.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2",
                )}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Send aria-hidden="true" size={16} />
              </button>

              <div
                ref={feedback}
                tabIndex={-1}
                aria-live="polite"
                aria-atomic="true"
                className="min-h-6 outline-none"
              >
                {success && (
                  <p role="status" className="text-primary">
                    {success}
                  </p>
                )}
                {error && (
                  <p role="alert" className="text-red-700 dark:text-red-300">
                    {error} You can also email me at{" "}
                    <a
                      className="font-semibold underline underline-offset-4"
                      href="mailto:taylor@devbytaylor.com"
                    >
                      taylor@devbytaylor.com
                    </a>
                    .
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
