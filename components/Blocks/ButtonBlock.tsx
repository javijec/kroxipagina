import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

const IconSvg = ({ icon, className }: { icon: string; className: string }) => {
  const icons: Record<string, JSX.Element> = {
    "arrow-right": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    ),
    "arrow-left": (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
      </svg>
    ),
    plus: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
  };
  return icons[icon] || null;
};

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
        { label: "Danger", value: "danger" },
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
    alignment: {
      type: "radio",
      label: "Button Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    icon: {
      type: "select",
      label: "Icon",
      options: [
        { label: "None", value: "none" },
        { label: "Arrow Right", value: "arrow-right" },
        { label: "Arrow Left", value: "arrow-left" },
        { label: "Plus", value: "plus" },
        { label: "Check", value: "check" },
      ],
    },
    iconPosition: {
      type: "radio",
      label: "Icon Position",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
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
    alignment: "center",
    icon: "none",
    iconPosition: "right",
  },
  resolveFields: (data, { fields }) => {
    const { icon = "none" } = data.props || {};

    return {
      ...fields,
      iconPosition: {
        ...fields.iconPosition,
        visible: icon !== "none",
      },
    } as any;
  },
  render: ({
    text,
    variant,
    size,
    link,
    target,
    fullWidth,
    alignment = "center",
    icon = "none",
    iconPosition = "right",
  }) => {
    const sizeClass = {
      small: "px-4 py-2 text-sm gap-2",
      medium: "px-6 py-3 text-base gap-2",
      large: "px-8 py-4 text-lg gap-2",
    }[size];

    const variantClass = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-gray-600 hover:bg-gray-700 text-white",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
      ghost: "text-blue-600 hover:bg-blue-50",
      danger: "bg-red-600 hover:bg-red-700 text-white",
    }[variant];

    const isFullWidth = fullWidth === "true";
    const alignmentClass = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }[alignment];

    const showIcon = icon !== "none";
    const iconSize = {
      small: "w-4 h-4",
      medium: "w-5 h-5",
      large: "w-6 h-6",
    }[size];

    return (
      <div className={`p-4 flex ${alignmentClass} ${isFullWidth ? "w-full" : ""}`}>
        <a
          href={link}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
          className={`inline-flex items-center rounded-lg font-semibold transition-colors text-center ${sizeClass} ${variantClass} ${
            isFullWidth ? "w-full justify-center" : ""
          }`}
        >
          {showIcon && iconPosition === "left" && (
            <IconSvg icon={icon} className={iconSize} />
          )}
          {text}
          {showIcon && iconPosition === "right" && (
            <IconSvg icon={icon} className={iconSize} />
          )}
        </a>
      </div>
    );
  },
};
