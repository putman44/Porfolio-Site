// src/components/LeadGenChatbot.tsx

import { useEffect, useRef, useState } from "react";

type Message = {
  sender: "bot" | "user";
  text: string;
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
};

const questions: {
  key: keyof LeadData;
  question: string;
  placeholder: string;
}[] = [
  {
    key: "projectType",
    question: "Hey! What are you looking to build or improve?",
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
];

export default function LeadGenChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [leadData, setLeadData] = useState<LeadData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: questions[0].question,
    },
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit() {
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
          text: "Perfect. Your project details were sent over. Taylor will follow up soon.",
        },
      ]);

      setIsComplete(true);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Something went wrong while sending your info. Please email Taylor directly.",
        },
      ]);
    } finally {
      setIsSubmitting(false);
    }
  }

  const currentPlaceholder =
    step < questions.length ? questions[step].placeholder : "";

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-[9999] rounded-full bg-black px-5 py-4 text-white shadow-lg"
      >
        {isOpen ? "Close" : "Chat"}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9999] flex h-[520px] w-[360px] max-w-[calc(100vw-2rem)] flex-col rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="rounded-t-2xl bg-black p-4 text-white">
            <div className="text-base font-semibold">Project Assistant</div>
            <p className="text-sm text-gray-300">
              Tell me what you want to build.
            </p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  message.sender === "bot"
                    ? "bg-gray-100 text-gray-900"
                    : "ml-auto bg-black text-white"
                }`}
              >
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                disabled={isSubmitting || isComplete}
                onChange={(event) => setInput(event.target.value)}
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
                className="rounded-lg bg-black px-4 py-2 text-sm text-white disabled:opacity-50"
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
