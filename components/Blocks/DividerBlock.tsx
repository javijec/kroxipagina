import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const DividerBlock: ComponentConfig<Props["DividerBlock"]> = {
  fields: {
    style: {
      type: "select",
      label: "Line Style",
      options: [
        { label: "Solid", value: "solid" },
        { label: "Dashed", value: "dashed" },
        { label: "Dotted", value: "dotted" },
        { label: "Double", value: "double" },
      ],
    },
    color: {
      type: "select",
      label: "Line Color",
      options: [
        { label: "Gray 200", value: "border-gray-200" },
        { label: "Gray 300", value: "border-gray-300" },
        { label: "Blue 200", value: "border-blue-200" },
        { label: "Blue 400", value: "border-blue-400" },
        { label: "Red 200", value: "border-red-200" },
        { label: "Green 200", value: "border-green-200" },
      ],
    },
    thickness: { type: "number", label: "Thickness (px)", min: 1, max: 10 },
    spacing: {
      type: "select",
      label: "Spacing",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
  },
  defaultProps: {
    style: "solid",
    color: "border-gray-200",
    thickness: 1,
    spacing: "medium",
  },
  render: ({ style, color, thickness, spacing }) => {
    const spacingClass = {
      small: "my-4",
      medium: "my-8",
      large: "my-12",
    }[spacing];

    const borderStyle =
      style === "solid"
        ? "border-solid"
        : style === "dashed"
        ? "border-dashed"
        : style === "dotted"
        ? "border-dotted"
        : "border-double";

    return (
      <div className={`w-full ${spacingClass}`}>
        <hr
          className={`${color} ${borderStyle}`}
          style={{ borderWidth: `${thickness}px` }}
          role="presentation"
        />
      </div>
    );
  },
};
