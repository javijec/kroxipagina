import { DropZone, ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { shadowOptions, borderRadiusOptions } from "./options";
import Image from "next/image";

export const CardBlock: ComponentConfig<Props["CardBlock"]> = {
  fields: {
    title: { type: "text", label: "Card Title", contentEditable: true },
    description: { type: "textarea", label: "Card Description", contentEditable: true },
    padding: { type: "number", label: "Padding (px)", min: 0, max: 64 },
    variant: {
      type: "select",
      label: "Card Variant",
      options: [
        { label: "Outline", value: "border border-gray-200" },
        { label: "Background", value: "" },
      ],
    },
    bgColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "White", value: "bg-white" },
        { label: "Gray 50", value: "bg-gray-50" },
        { label: "Blue 50", value: "bg-blue-50" },
        { label: "Red 50", value: "bg-red-50" },
        { label: "Yellow 50", value: "bg-yellow-50" },
        { label: "Green 50", value: "bg-green-50" },
      ],
    },
    shadow: {
      type: "select",
      label: "Shadow",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    borderRadius: {
      type: "select",
      label: "Border Radius",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    headerImage: {
      type: "text",
      label: "Header Image URL (optional)",
    },
    titleColor: {
      type: "select",
      label: "Title Color",
      options: [
        { label: "Gray 900", value: "text-gray-900" },
        { label: "Blue 600", value: "text-blue-600" },
        { label: "Gray 700", value: "text-gray-700" },
      ],
    },
    descriptionColor: {
      type: "select",
      label: "Description Color",
      options: [
        { label: "Gray 600", value: "text-gray-600" },
        { label: "Gray 500", value: "text-gray-500" },
      ],
    },
    hoverEffect: {
      type: "select",
      label: "Hover Effect",
      options: [
        { label: "None", value: "none" },
        { label: "Lift", value: "lift" },
        { label: "Glow", value: "glow" },
      ],
    },
  },
  defaultProps: {
    title: "Card",
    description: "Description",
    padding: 24,
    variant: "",
    bgColor: "bg-white",
    shadow: "medium",
    borderRadius: "medium",
    headerImage: "",
    titleColor: "text-gray-900",
    descriptionColor: "text-gray-600",
    hoverEffect: "lift",
    titleFontFamily: "sans",
    titleFontWeight: "bold",
    descriptionFontFamily: "sans",
    descriptionFontWeight: "normal",
  },
  render: ({
    title,
    description,
    padding,
    variant,
    bgColor,
    shadow,
    borderRadius,
    headerImage,
    titleColor = "text-gray-900",
    descriptionColor = "text-gray-600",
    titleFontFamily = "sans",
    titleFontWeight = "bold",
    descriptionFontFamily = "sans",
    descriptionFontWeight = "normal",
    hoverEffect = "none",
  }) => {
    const hoverClass = {
      none: "",
      lift: "hover:shadow-xl hover:-translate-y-1 transition-all duration-200",
      glow: "hover:shadow-xl hover:shadow-blue-200 transition-shadow duration-200",
    }[hoverEffect];

    return (
      <div
        className={`${variant} ${bgColor} ${shadowOptions[shadow]} ${borderRadiusOptions[borderRadius]} overflow-hidden ${hoverClass}`}
      >
        {headerImage && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={headerImage}
              alt={title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        )}
        <div style={{ padding }}>
          <h3 className={`text-xl mb-2 ${titleColor} ${
            { sans: "font-sans", serif: "font-serif", mono: "font-mono", fontin: "font-[Fontin]" }[titleFontFamily]
          } ${
            { thin: "font-thin", normal: "font-normal", medium: "font-medium", bold: "font-bold" }[titleFontWeight]
          }`}>{title}</h3>
          <p className={`${descriptionColor} mb-4 ${
            { sans: "font-sans", serif: "font-serif", mono: "font-mono", fontin: "font-[Fontin]" }[descriptionFontFamily]
          } ${
            { thin: "font-thin", normal: "font-normal", medium: "font-medium", bold: "font-bold" }[descriptionFontWeight]
          }`}>{description}</p>
          <DropZone zone="card-content" />
        </div>
      </div>
    );
  },
};
