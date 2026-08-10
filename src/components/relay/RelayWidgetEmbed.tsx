import { useEffect, useRef, useState } from "react";

type RelayWidgetConfig = {
  businessName: string;
  eyebrow?: string;
  headline?: string;
  intro?: string;
  services: string[];
  serviceAreas?: string[];
  primaryColor?: string;
  successTitle?: string;
  successMessage?: string;
  webhookUrl?: string;
  consentText?: string;
};

type RelayWidgetMountOptions = {
  target: string | HTMLElement;
  clientId: string;
  config?: RelayWidgetConfig;
  configUrl?: string;
};

type RelayWidgetApi = {
  mount: (options: RelayWidgetMountOptions) => Promise<void>;
  mountAll: () => Promise<void>;
};

declare global {
  interface Window {
    AILeadWidget?: RelayWidgetApi;
  }
}

const WIDGET_SCRIPT_ID = "relay-widget-v1-script";
const WIDGET_SCRIPT_SRC = "/relay/widget/v1/ai-lead-widget.js";

const demoConfig: RelayWidgetConfig = {
  businessName: "Mesa Home Comfort Demo",
  eyebrow: "Interactive Relay demo",
  headline: "How can we help?",
  intro:
    "Share a few details to preview how Relay captures a new service inquiry.",
  services: [
    "Cooling repair",
    "Heating repair",
    "Maintenance",
    "Installation estimate",
    "Indoor air quality",
    "Other",
  ],
  primaryColor: "#0f766e",
  successTitle: "Demo request captured.",
  successMessage:
    "This simulated request was not sent to a real business or webhook.",
  consentText:
    "I understand this is a demonstration and no real service request will be submitted.",
  webhookUrl: "demo://success",
};

let widgetScriptPromise: Promise<RelayWidgetApi> | null = null;

function loadWidgetScript(): Promise<RelayWidgetApi> {
  if (window.AILeadWidget) return Promise.resolve(window.AILeadWidget);
  if (widgetScriptPromise) return widgetScriptPromise;

  widgetScriptPromise = new Promise((resolve, reject) => {
    const resolveWidget = () => {
      if (window.AILeadWidget) {
        resolve(window.AILeadWidget);
      } else {
        widgetScriptPromise = null;
        reject(new Error("Relay widget loaded without exposing its mount API."));
      }
    };

    const rejectWidget = () => {
      widgetScriptPromise = null;
      reject(new Error("Relay widget script could not be loaded."));
    };

    const existingScript = document.getElementById(
      WIDGET_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      if (existingScript.dataset.loaded === "true") {
        resolveWidget();
        return;
      }

      existingScript.addEventListener("load", resolveWidget, { once: true });
      existingScript.addEventListener("error", rejectWidget, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = WIDGET_SCRIPT_ID;
    script.src = WIDGET_SCRIPT_SRC;
    script.async = true;
    script.addEventListener(
      "load",
      () => {
        script.dataset.loaded = "true";
        resolveWidget();
      },
      { once: true },
    );
    script.addEventListener("error", rejectWidget, { once: true });
    document.head.appendChild(script);
  });

  return widgetScriptPromise;
}

const RelayWidgetEmbed: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  useEffect(() => {
    let isActive = true;

    void loadWidgetScript()
      .then(async (widget) => {
        const target = targetRef.current;
        if (!isActive || !target) return;

        if (target.dataset.relayMounted !== "true") {
          await widget.mount({
            target,
            clientId: "relay-public-demo",
            config: demoConfig,
          });
        }

        if (isActive) setStatus("ready");
      })
      .catch((error: unknown) => {
        console.error("[Relay Demo] Widget failed to load:", error);
        if (isActive) setStatus("error");
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="relative min-h-[36rem]">
      <div
        ref={targetRef}
        id="relay-public-demo-widget"
        className="min-h-[36rem]"
        aria-busy={status === "loading"}
      />

      {status === "loading" && (
        <div
          className="absolute inset-0 grid place-items-center bg-[#f7f3e9] text-center text-sm text-slate-500"
          role="status"
        >
          Loading the interactive demo…
        </div>
      )}

      {status === "error" && (
        <div
          className="absolute inset-0 grid place-items-center bg-[#f7f3e9] px-6 text-center text-sm text-red-800"
          role="alert"
        >
          The interactive demo could not be loaded. Please refresh and try
          again.
        </div>
      )}
    </div>
  );
};

export default RelayWidgetEmbed;
