import { DropZone, ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { gapOptions } from "./options";

export const GridBlock: ComponentConfig<Props["GridBlock"]> = {
  fields: {
    columns: {
      type: "number",
      label: "Number of Columns",
      min: 1,
      max: 6,
    },
    gap: {
      type: "select",
      label: "Gap Size",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    responsive: {
      type: "select",
      label: "Responsive Layout (stack on mobile)",
      options: [
        { label: "Enabled", value: "true" },
        { label: "Disabled", value: "false" },
      ],
    },
  },
  defaultProps: {
    columns: 3,
    gap: "medium",
    responsive: "true",
  },
  render: ({ columns, gap, responsive }) => {
    const isResponsive = responsive === "true";
    const gridClass = isResponsive
      ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} ${gapOptions[gap]}`
      : `grid grid-cols-${columns} ${gapOptions[gap]}`;

    return (
      <div className={`p-4 ${gridClass}`}>
        <DropZone zone="grid-content" />
      </div>
    );
  },
};
