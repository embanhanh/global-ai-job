import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Briefcase, Github, Twitter, Linkedin } from "lucide-react";

export async function Footer() {
  const t = await getTranslations("Footer");
  const tCommon = await getTranslations("Common");

  const sections = [
    {
      title: t("product"),
      links: [
        { label: "Features", href: "/#features" },
        { label: "Jobs", href: "/jobs" },
        { label: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: t("company"),
      links: [
        { label: "About", href: "/about" },
        { label: "Carrers", href: "/carrers" },
        { label: "Blog", href: "/blog" },
      ],
    },
    {
      title: t("legal"),
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/cookies" },
      ],
    },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#050816] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">
                {tCommon("brand")}
              </span>
            </Link>
            <p className="text-white/40 text-sm max-w-xs leading-relaxed mb-6">
              {t("description")}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-white/20 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/20 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="#"
                className="text-white/20 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-white mb-6 uppercase tracking-wider text-xs">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            © 2026 {tCommon("brandFull")}. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
