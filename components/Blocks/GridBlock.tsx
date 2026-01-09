import { DropZone, ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { gapOptions } from "./options";

export const GridBlock: ComponentConfig<Props["GridBlock"]> = {
  fields: {
    columns: {
      type: "number",
      label: "Number of Columns (desktop)",
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
    itemAlignment: {
      type: "select",
      label: "Items Alignment",
      options: [
        { label: "Start", value: "start" },
        { label: "Center", value: "center" },
        { label: "End", value: "end" },
        { label: "Stretch", value: "stretch" },
      ],
    },
    minColWidth: {
      type: "text",
      label: "Minimum Column Width (CSS, e.g., '200px')",
    },
  },
  defaultProps: {
    columns: 3,
    gap: "medium",
    responsive: "true",
    itemAlignment: "start",
    minColWidth: "200px",
  },
  render: ({
    columns,
    gap,
    responsive,
    itemAlignment = "start",
    minColWidth,
  }) => {
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

    const alignmentClass = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
    }[itemAlignment];

    const gridClass = isResponsive
      ? `grid grid-cols-1 md:grid-cols-2 ${lgColumnsMap[columns]} ${gapOptions[gap]} ${alignmentClass}`
      : `grid ${columnsMap[columns]} ${gapOptions[gap]} ${alignmentClass}`;

    return (
      <div className="p-4">
        <DropZone
          zone="grid-content"
          className={gridClass}
          style={{
            display: "grid",
            ...(minColWidth && !isResponsive && { gridAutoColumns: `minmax(${minColWidth}, 1fr)` }),
          }}
        />
      </div>
    );
  },
};
