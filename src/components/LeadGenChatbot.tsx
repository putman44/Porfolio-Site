// src/components/LeadGenChatbot.tsx

import { useEffect, useRef, useState } from "react";

type Message = {
  sender: "bot" | "user";
  text: string;
  phoneHref?: string;
  phoneLabel?: string;
};

type LeadData = {
  projectType?: string;
  description?: string;
  timeline?: string;
  budget?: string;
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  phone?: string;
  Status?: string;
};

type ChatResponse = {
  success: boolean;
  reply?: string;
  error?: string;
};

type ChatMode = "chat" | "lead";

const questions: {
  key: keyof LeadData;
  question: string;
  placeholder: string;
}[] = [
  {
    key: "projectType",
    question: "Great — what are you looking to build or improve?",
    placeholder: "Website, web app, automation, AI chatbot, dashboard...",
  },
  {
    key: "description",
    question: "Can you briefly describe the project or problem?",
    placeholder: "Tell me what you need help with...",
  },
  {
    key: "timeline",
    question: "When are you hoping to start?",
    placeholder: "ASAP, this month, 1-3 months, just researching...",
  },
  {
    key: "budget",
    question: "Do you have a rough budget range?",
    placeholder: "$500-$1k, $2k-$5k, $5k+, not sure yet...",
  },
  {
    key: "name",
    question: "What’s your name?",
    placeholder: "Your name...",
  },
  {
    key: "email",
    question: "What’s the best email to reach you?",
    placeholder: "you@example.com",
  },
  {
    key: "company",
    question: "What company or organization is this for?",
    placeholder: "Company name, or freelance/personal...",
  },
  {
    key: "website",
    question: "Do you already have a website?",
    placeholder: "https://example.com or none yet...",
  },
  {
    key: "phone",
    question: "What’s the best phone number to reach you at?",
    placeholder: "555-555-5555",
  },
];

const initialMessages: Message[] = [
  {
    sender: "bot",
    text: "Hey! I can answer questions about Taylor’s services or help you start a project request.",
  },
];

function getOrCreateSessionId() {
  const existingSessionId = localStorage.getItem("leadGenChatSessionId");

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = crypto.randomUUID();
  localStorage.setItem("leadGenChatSessionId", newSessionId);

  return newSessionId;
}

function formatPhoneInput(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function LeadGenChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ChatMode>("chat");
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [leadData, setLeadData] = useState<LeadData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [sessionId, setSessionId] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    setSessionId(getOrCreateSessionId());
  }, []);

  function resetChat() {
    setMode("chat");
    setStep(0);
    setInput("");
    setLeadData({});
    setIsSubmitting(false);
    setIsComplete(false);
    setMessages(initialMessages);
  }

  function startLeadFlow() {
    setMode("lead");
    setStep(0);
    setInput("");
    setLeadData({});
    setIsComplete(false);

    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: questions[0].question,
      },
    ]);
  }

  async function handleChatSubmit(promptText?: string) {
    const userText = promptText || input.trim();

    if (!userText) return;

    const userMessage: Message = {
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        sender: "bot",
        text: "Let me check that...",
      },
    ]);

    setInput("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText, sessionId }),
      });

      if (!response.ok) {
        throw new Error("Failed to get chat response");
      }

      const data = (await response.json()) as ChatResponse;

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          sender: "bot",
          text:
            data.reply ||
            "I can help with websites, automations, dashboards, AI tools, and project planning.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          sender: "bot",
          text: "Something went wrong while getting an answer. You can still start a project request below or send an email to taylorputman41@gmail.com.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleLeadSubmit() {
    if (!input.trim()) return;

    const currentQuestion = questions[step];
    const updatedLeadData = {
      ...leadData,
      [currentQuestion.key]: input,
    };

    setLeadData(updatedLeadData);

    const userMessage: Message = {
      sender: "user",
      text: input,
    };

    const nextStep = step + 1;

    if (nextStep < questions.length) {
      const botMessage: Message = {
        sender: "bot",
        text: questions[nextStep].question,
      };

      setMessages((prev) => [...prev, userMessage, botMessage]);
      setStep(nextStep);
      setInput("");
      return;
    }

    setMessages((prev) => [
      ...prev,
      userMessage,
      {
        sender: "bot",
        text: "Thanks! I’m sending this over now.",
      },
    ]);

    setInput("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedLeadData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit lead");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Perfect — your project details were sent over. Want to move faster? Call my quick project intake line:",
          phoneHref: "tel:+19728128490",
          phoneLabel: "+1 (972) 812-8490",
        },
      ]);

      setIsComplete(true);

      setTimeout(() => {
        resetChat();
        setIsOpen(false);
      }, 15000);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong while sending your info. Please email Taylor directly at taylorputman41@gmail.com",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleSubmit() {
    if (mode === "lead") {
      handleLeadSubmit();
      return;
    }

    handleChatSubmit();
  }

  const currentPlaceholder =
    mode === "lead"
      ? questions[step]?.placeholder || ""
      : "Ask about services, pricing, automations, AI tools...";

  const currentQuestion = mode === "lead" ? questions[step] : null;
  const isPhoneQuestion = currentQuestion?.key === "phone";

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[9999] border border-amber-50 rounded-full bg-background px-5 py-4 text-secondary shadow-xl"
      >
        {isOpen ? "Close" : "Chat"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="rounded-t-2xl bg-background p-4 text-white">
            <div className="text-secondary font-semibold">
              Project Assistant
            </div>
            <p className="text-sm text-secondary">
              Ask a question or start a project request.
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] whitespace-pre-line rounded-xl px-3 py-2 text-sm ${
                  message.sender === "bot"
                    ? "bg-gray-100 text-gray-900"
                    : "ml-auto bg-background text-secondary"
                }`}
              >
                <span>{message.text}</span>

                {message.phoneHref && message.phoneLabel && (
                  <a
                    href={message.phoneHref}
                    className="mt-2 block font-semibold underline"
                  >
                    {message.phoneLabel}
                  </a>
                )}
              </div>
            ))}

            {mode === "chat" && messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {[
                  "What services do you offer?",
                  "Can you build an AI chatbot?",
                  "Do you build dashboards?",
                  "How does the process work?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleChatSubmit(prompt)}
                    disabled={isSubmitting}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}
            {mode !== "lead" && (
              <button
                onClick={startLeadFlow}
                disabled={isSubmitting}
                className="flex rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 hover:bg-gray-100 disabled:opacity-50"
              >
                Start a project request
              </button>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                type={isPhoneQuestion ? "tel" : "text"}
                inputMode={isPhoneQuestion ? "tel" : "text"}
                disabled={isSubmitting || isComplete}
                onChange={(event) => {
                  const value = event.target.value;

                  if (isPhoneQuestion) {
                    setInput(formatPhoneInput(value));
                    return;
                  }

                  setInput(value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSubmit();
                  }
                }}
                placeholder={currentPlaceholder}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none focus:border-black"
              />

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || isComplete}
                className="rounded-lg bg-background px-3 py-2 text-sm text-secondary disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
