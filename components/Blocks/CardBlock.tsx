import { DropZone, ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { shadowOptions, borderRadiusOptions } from "./options";

export const CardBlock: ComponentConfig<Props["CardBlock"]> = {
  fields: {
    title: { type: "text", label: "Card Title" },
    description: { type: "textarea", label: "Card Description" },
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
  },
  defaultProps: {
    title: "Card",
    description: "Description",
    padding: 24,
    variant: "",
    bgColor: "bg-white",
    shadow: "medium",
    borderRadius: "medium",
  },
  render: ({
    title,
    description,
    padding,
    variant,
    bgColor,
    shadow,
    borderRadius,
  }) => (
    <div
      style={{ padding }}
      className={`${variant} ${bgColor} ${shadowOptions[shadow]} ${borderRadiusOptions[borderRadius]}`}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
      <DropZone zone="card-content" />
    </div>
  ),
};
