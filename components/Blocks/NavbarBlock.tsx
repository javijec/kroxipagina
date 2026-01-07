import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { useState } from "react";

const NavContent = ({
    logoText,
    links,
    backgroundColor,
    textColor,
    fixed,
}: Props["NavbarBlock"]) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav
            className={`${backgroundColor} ${textColor} ${fixed === "true" ? "fixed top-0 left-0 right-0 z-50" : "relative"
                } shadow-md`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 font-bold text-xl">{logoText}</div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.href}
                                    className={`px-3 py-2 rounded-md text-sm font-medium hover:opacity-80 transition-opacity`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none hover:bg-opacity-20 hover:bg-gray-500`}
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Hamburger Icon */}
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
                        {links.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-20 hover:bg-gray-500"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export const NavbarBlock: ComponentConfig<Props["NavbarBlock"]> = {
    fields: {
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
    },
    defaultProps: {
        logoText: "MyBrand",
        links: [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
        ],
        backgroundColor: "bg-white",
        textColor: "text-gray-900",
        fixed: "false",
    },
    render: (props) => <NavContent {...props} />,
};
