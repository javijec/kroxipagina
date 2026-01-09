import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { useState, useEffect } from "react";
import Image from "next/image";
import AuthButton from "components/AuthButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavContent = ({
  logoImage,
  logoText,
  links,
  backgroundColor,
  textColor,
  fixed,
  showAuthButton = true,
  textFontFamily = "sans",
  textFontWeight = "normal",
}: Props["NavbarBlock"]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setImageError(false);
  }, [logoImage]);

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    return pathname.startsWith(href) && href !== "/";
  };

  return (
    <>
      {fixed === "true" && <div className="h-16" />}
      <nav
        className={`${backgroundColor} ${textColor} ${
          fixed === "true"
            ? "fixed top-0 left-0 right-0 z-50 w-full"
            : "relative"
        } shadow-md`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 font-bold text-xl flex items-center gap-3 hover:opacity-80 transition-opacity">
              {logoImage && !imageError ? (
                <Image
                  src={logoImage}
                  alt={logoText || "Logo"}
                  width={50}
                  height={50}
                  className="w-12 h-12 object-contain"
                  unoptimized
                  onError={() => setImageError(true)}
                  priority
                />
              ) : logoImage && imageError ? (
                <div
                  className="flex items-center justify-center w-12 h-12 bg-red-100 text-red-600 rounded text-xs text-center border border-red-300"
                  title="Invalid Image URL"
                >
                  ✕
                </div>
              ) : null}
              <span className={logoImage ? "hidden md:block" : ""}>
                {logoText}
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <div className="flex items-baseline space-x-4">
                {links.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={i}
                      href={link.href}
                      className={`px-3 py-2 rounded-md text-sm transition-opacity ${
                        active ? "opacity-100" : "opacity-80 hover:opacity-100"
                      } ${
                        { sans: "font-sans", serif: "font-serif", mono: "font-mono", fontin: "font-[Fontin]" }[textFontFamily]
                      } ${
                        { thin: "font-thin", normal: "font-normal", medium: "font-medium", bold: "font-bold" }[textFontWeight]
                      }`}
                      aria-current={active ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
              {showAuthButton && <AuthButton textColor={textColor} />}
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-current transition-opacity hover:opacity-80`}
                aria-expanded={isOpen}
                aria-label="Toggle menu"
                type="button"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={i}
                    href={link.href}
                    className={`block px-3 py-2 rounded-md text-base transition-opacity ${
                      active ? "opacity-100" : "opacity-80 hover:opacity-100"
                    } ${
                      { sans: "font-sans", serif: "font-serif", mono: "font-mono", fontin: "font-[Fontin]" }[textFontFamily]
                    } ${
                      { thin: "font-thin", normal: "font-normal", medium: "font-medium", bold: "font-bold" }[textFontWeight]
                    }`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
              {showAuthButton && (
                <div className="pt-2 border-t border-current border-opacity-20">
                  <AuthButton textColor={textColor} />
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export const NavbarBlock: ComponentConfig<Props["NavbarBlock"]> = {
  fields: {
    logoImage: { type: "text", label: "Logo Image URL" },
    logoText: { type: "text", label: "Logo Text", contentEditable: true },
    links: {
      type: "array",
      label: "Links",
      arrayFields: {
        label: { type: "text", label: "Label", contentEditable: true },
        href: { type: "text", label: "Link", contentEditable: true },
      },
    },
    backgroundColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "White", value: "bg-white" },
        { label: "Gray 800", value: "bg-gray-800" },
        { label: "Blue 600", value: "bg-blue-600" },
        { label: "Black", value: "bg-black" },
      ],
    },
    textColor: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "Gray 900", value: "text-gray-900" },
        { label: "White", value: "text-white" },
      ],
    },
    fixed: {
      type: "radio",
      label: "Fixed at Top",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
    },
    showAuthButton: {
      type: "radio",
      label: "Show Auth Button",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
    textFontFamily: {
      type: "select",
      label: "Text Font Family",
      options: [
        { label: "Sans", value: "sans" },
        { label: "Serif", value: "serif" },
        { label: "Mono", value: "mono" },
        { label: "Fontin", value: "fontin" },
      ],
    },
    textFontWeight: {
      type: "select",
      label: "Text Font Weight",
      options: [
        { label: "Thin", value: "thin" },
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Bold", value: "bold" },
      ],
    },
  },
  defaultProps: {
    logoImage: "",
    logoText: "Kroximatuz",
    links: [
      { label: "Home", href: "/" },
      { label: "Path of Exile 1", href: "/poe1" },
      { label: "Path of Exile 2", href: "/poe2" },
    ],
    backgroundColor: "bg-black",
    textColor: "text-white",
    fixed: "false",
    showAuthButton: true,
    textFontFamily: "sans",
    textFontWeight: "normal",
  },
  render: (props) => <NavContent {...props} />,
};
