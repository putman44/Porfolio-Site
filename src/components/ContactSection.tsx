import { Facebook, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { cn } from "../lib/utils";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const ContactSection: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSuccess("Message sent successfully!");
      form.current.reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

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
                  href="mailto:taylorputman41@gmail.com"
                >
                  taylorputman41@gmail.com
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
                  Thornton, NH
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
                <a
                  target="_blank"
                  href="https://www.facebook.com/TdPutman/"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-primary transition-colors"
                >
                  <Facebook />
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
              ref={form}
              onSubmit={sendEmail}
            >
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  className="w-full placeholder:text-muted-foreground px-4 py-3 rounded-md border bg-background border-input focus:outline-hidden focus:ring-2 focus:ring-primary"
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="John Smith"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <input
                  className="w-full placeholder:text-muted-foreground px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="johnsmith@gmail.com"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="message"
                >
                  Your Message
                </label>
                <textarea
                  className="w-full placeholder:text-muted-foreground px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                  id="message"
                  name="message"
                  required
                  placeholder="Hello, this is a very nice website ;)"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={16} />
              </button>

              {success && <p className="text-primary mt-2">{success}</p>}
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
