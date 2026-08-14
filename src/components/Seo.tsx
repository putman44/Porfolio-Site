// src/components/Seo.tsx
import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  noIndex?: boolean;
};

function setMeta(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function removeMeta(attribute: "name" | "property", key: string) {
  document.head
    .querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
    ?.remove();
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  canonical,
  noIndex = false,
}) => {
  useEffect(() => {
    document.title = title;

    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonicalLink =
      document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (canonical) {
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }

      canonicalLink.setAttribute("href", canonical);
      setMeta("property", "og:url", canonical);
    } else {
      canonicalLink?.remove();
      removeMeta("property", "og:url");
    }

    if (noIndex) {
      setMeta("name", "robots", "noindex");
    } else {
      removeMeta("name", "robots");
    }
  }, [canonical, description, noIndex, title]);

  return null;
};

export default Seo;
