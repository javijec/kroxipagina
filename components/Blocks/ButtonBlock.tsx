import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const ButtonBlock: ComponentConfig<Props["ButtonBlock"]> = {
  fields: {
    text: { type: "text", label: "Button Text", contentEditable: true },
    variant: {
      type: "select",
      label: "Button Style",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Secondary", value: "secondary" },
        { label: "Outline", value: "outline" },
        { label: "Ghost", value: "ghost" },
      ],
    },
    size: {
      type: "select",
      label: "Button Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    link: { type: "text", label: "Button Link" },
    target: {
      type: "radio",
      label: "Open Link",
      options: [
        { label: "Same Tab", value: "_self" },
        { label: "New Tab", value: "_blank" },
      ],
    },
    fullWidth: {
      type: "select",
      label: "Full Width",
      options: [
        { label: "No", value: "false" },
        { label: "Yes", value: "true" },
      ],
    },
  },
  defaultProps: {
    text: "Click Me",
    variant: "primary",
    size: "medium",
    link: "#",
    target: "_self",
    fullWidth: "false",
  },
  render: ({ text, variant, size, link, target, fullWidth }) => {
    const sizeClass = {
      small: "px-4 py-2 text-sm",
      medium: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg",
    }[size];

    const variantClass = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
      ghost: "text-blue-600 hover:bg-blue-50",
    }[variant];

    const isFullWidth = fullWidth === "true";

    return (
      <div className={`p-4 ${isFullWidth ? "w-full" : ""}`}>
        <a
          href={link}
          target={target}
          rel="noopener noreferrer"
          className={`inline-block rounded-lg font-semibold transition-colors text-center ${sizeClass} ${variantClass} ${isFullWidth ? "block w-full" : ""
            }`}
        >
          {text}
        </a>
      </div>
    );
  },
};
