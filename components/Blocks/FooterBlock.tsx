import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import Image from "next/image";

export const FooterBlock: ComponentConfig<Props["FooterBlock"]> = {
  fields: {
    text: { type: "textarea", label: "Footer Text" },
    textColor: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "White", value: "text-white" },
        { label: "Gray", value: "text-gray-300" },
        { label: "Black", value: "text-black" },
      ],
    },
    backgroundColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "Black", value: "bg-black" },
        { label: "Gray 900", value: "bg-gray-900" },
        { label: "Gray 800", value: "bg-gray-800" },
        { label: "Blue 900", value: "bg-blue-900" },
        { label: "White", value: "bg-white" },
      ],
    },
    socialLinks: {
      type: "array",
      getItemSummary: (item) => item.href || "Link",
      arrayFields: {
        icon: { type: "text", label: "Icon URL (Image)" },
        href: { type: "text", label: "Link URL" },
      },
      label: "Social Links",
    },
  },
  defaultProps: {
    text: "Sígueme en mis redes :)",
    textColor: "text-white",
    backgroundColor: "bg-black",
    socialLinks: [
      {
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968819.png",
        href: "https://twitch.tv",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
        href: "https://youtube.com",
      },
      {
        icon: "https://cdn-icons-png.flaticon.com/512/5968/5968756.png",
        href: "https://discord.com",
      },
    ],
  },
  render: ({ text, textColor, backgroundColor, socialLinks }) => {
    return (
      <footer className={`${backgroundColor} py-12 mt-auto`}>
        <div className="max-w-6xl mx-auto px-4">
          {/* Main content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
            <div className={`text-lg font-semibold ${textColor}`}>
              {text}
            </div>

            {/* Social Links */}
            {socialLinks && socialLinks.length > 0 && (
              <nav className="flex items-center gap-4" aria-label="Social media links">
                {socialLinks.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current rounded-lg p-1"
                    aria-label={`Follow on ${link.href}`}
                  >
                    <div className="relative w-10 h-10">
                      <Image
                        src={link.icon}
                        alt=""
                        width={40}
                        height={40}
                        className="object-contain"
                        unoptimized={
                          !link.icon.startsWith("https://cdn-icons-png.flaticon.com") &&
                          !link.icon.startsWith("/")
                        }
                        onError={(e) => {
                          // Fallback for broken image
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Divider */}
          <div
            className={`border-t border-current border-opacity-20 pt-8`}
          />

          {/* Footer info */}
          <div className={`text-sm ${textColor} text-opacity-70 text-center`}>
            <p>© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  },
};
