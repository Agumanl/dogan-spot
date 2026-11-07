import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "sanity";
import { serif } from "@/lib/fonts";

// Studio'daki makale metnini sitenin renk ve yazı düzenine göre basar.
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-5 text-[1.0625rem] leading-8 text-[#2C1A1D]/85">
        {children}
      </p>
    ),
    h2: ({ children }) => (
      <h2
        className={`${serif.className} mt-12 text-3xl font-semibold leading-tight tracking-tight text-[#2C1A1D]`}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        className={`${serif.className} mt-9 text-2xl font-semibold leading-snug text-[#2C1A1D]`}
      >
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-7 rounded-r-xl border-l-4 border-[#8D6E63] bg-[#F5EBE0] px-5 py-4 text-lg leading-relaxed text-[#2C1A1D]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-[#8D6E63]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#8D6E63]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-1 text-[1.0625rem] leading-8 text-[#2C1A1D]/85">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="pl-1 text-[1.0625rem] leading-8 text-[#2C1A1D]/85">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-[#2C1A1D]">{children}</strong>
    ),
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = /^https?:\/\//.test(href);
      return (
        <a
          href={href}
          className="font-medium text-[#2C1A1D] underline decoration-[#8D6E63] decoration-2 underline-offset-4 hover:bg-[#F5EBE0]"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : undefined)}
        >
          {children}
        </a>
      );
    },
  },
};

interface ServiceBodyProps {
  value: PortableTextBlock[];
}

export function ServiceBody({ value }: ServiceBodyProps) {
  return (
    <div className="[&>*:first-child]:mt-0">
      <PortableText value={value} components={components} />
    </div>
  );
}
