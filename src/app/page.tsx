import {
  SiGithub,
  SiLinkedin,
  SiYoutube,
} from "@icons-pack/react-simple-icons";
import { ArrowUpRight, Copy, Download, Send } from "lucide-react";
import Link from "next/link";
import { ReactNode, FC } from "react";

interface Link {
  name: string;
  description?: string;
  url: string;
  icon?: ReactNode;
}

const externalLinks: Link[] = [
  {
    name: "LinkedIn",
    description: "follow my career",
    url: "https://linkedin.com/in/marcoswferreira",
    icon: <SiLinkedin className="fill-[#0077B5] dark:fill-zinc-200" />,
  },
  {
    name: "GitHub",
    description: "see my code",
    url: "https://github.com/marcoswferreira",
    icon: <SiGithub />,
  },
];

const ExternalLink: FC<Link> = (link) => {
  return (
    <a
      key={link.description}
      href={link.url}
      target="_blank"
      className="group flex items-center justify-between p-4 transition-all sm:hover:bg-zinc-200 sm:dark:hover:bg-zinc-800"
    >
      <span className="flex items-center gap-4">
        {link.icon} {link.name}
        <span className="-translate-x-4 text-zinc-500 opacity-0 transition-all max-sm:hidden sm:group-hover:translate-x-0 sm:group-hover:opacity-100 dark:text-zinc-400">
          {link.description}
        </span>
      </span>
      <ArrowUpRight
        strokeWidth={1.4}
        className="size-5 shrink-0 text-zinc-800 transition-all sm:group-hover:rotate-45 dark:text-zinc-200"
      />
    </a>
  );
};

export default function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm">
        Senior Software Engineer with 4+ years of experience designing and delivering high-impact backend systems in large-scale, mission-critical environments.
      </p>
      <p className="text-sm">
        Specialized in scalable and resilient distributed systems, with strong background in the financial sector, including payment solutions (PayIn/Payout), Pix, banking integrations, QR Code generation and processing, and high-concurrency, low-latency APIs. Most recently embedded at Western Union, one of the world&apos;s largest financial services companies, where I developed high-throughput APIs and async workers processing millions of daily requests, and designed microservices for high-availability enterprise applications.
      </p>

      <div className="text-sm">
        <p className="mb-2 font-semibold">What I bring:</p>
        <ul className="list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>Backend expertise: C#, ASP.NET Core, Java, Spring Boot</li>
          <li>Frontend fluency: React, Angular, TypeScript</li>
          <li>Data layer: SQL Server, OracleDB, PostgreSQL, MongoDB, Redis</li>
          <li>Cloud: Azure (AZ-900, DP-900, SC-900); experienced with cloud-native architectures</li>
          <li>Testing: XUnit, JUnit, test-driven development practices</li>
        </ul>
      </div>

      <div className="text-sm">
        <p className="mb-2 font-semibold">Key highlights:</p>
        <ul className="list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
          <li>High-performance payment service development</li>
          <li>QR Code platforms for instant payments</li>
          <li>Integrations with Matera and core banking systems</li>
          <li>Legacy system modernization</li>
          <li>Performance optimization and production troubleshooting</li>
          <li>Domain modeling for financial systems</li>
        </ul>
      </div>

      <p className="text-sm">
        Passionate about software engineering, architecture, and solving complex problems at scale. I also invest in technical mentorship and knowledge sharing within engineering teams.
      </p>

      <p className="text-sm">
        Open to senior engineering roles at companies building high-impact products.
      </p>

      <div className="mt-4 divide-y divide-zinc-400 overflow-hidden rounded ring-1 ring-zinc-400 dark:divide-zinc-500 dark:ring-zinc-500">
        {externalLinks.map((link: Link) => (
          <ExternalLink key={link.url} {...link} />
        ))}
      </div>
      <div className="flex justify-center gap-6 max-sm:flex-col-reverse sm:justify-between">
        <div className="flex flex-col justify-center gap-4 max-sm:items-center">
          <div className="group -m-8 flex select-all items-center gap-3 p-8 transition-all">
            marcosfw7@outlook.com
            <div className="inline-flex items-center gap-3">
              <a
                href="mailto:marcosfw7@outlook.com"
                className="text-zinc-800 dark:text-zinc-200"
              >
                <Send strokeWidth={1.4} className="size-4" />
              </a>
            </div>
          </div>
          <span className="-mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-600 ring-1 ring-green-500 dark:bg-transparent dark:text-emerald-500 dark:ring-emerald-500">
            <div className="size-2 animate-pulse rounded-full bg-green-500 dark:bg-emerald-500" />
            Online
          </span>
        </div>
      </div>
    </div>
  );
}
