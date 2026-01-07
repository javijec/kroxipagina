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

    const columnsMap: Record<number, string> = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };

    const lgColumnsMap: Record<number, string> = {
      1: "lg:grid-cols-1",
      2: "lg:grid-cols-2",
      3: "lg:grid-cols-3",
      4: "lg:grid-cols-4",
      5: "lg:grid-cols-5",
      6: "lg:grid-cols-6",
    };

    const gridClass = isResponsive
      ? `grid grid-cols-1 md:grid-cols-2 ${lgColumnsMap[columns]} ${gapOptions[gap]}`
      : `grid ${columnsMap[columns]} ${gapOptions[gap]}`;

    return (
      <div className="p-4">
        <DropZone
          zone="grid-content"
          className={gridClass}
          style={{ display: "grid" }}
        />
      </div>
    );
  },
};
