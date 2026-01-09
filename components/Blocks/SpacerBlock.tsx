import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const SpacerBlock: ComponentConfig<Props["SpacerBlock"]> = {
  fields: {
    height: { type: "number", label: "Desktop Height (px)", min: 0, max: 200 },
    mobileHeight: {
      type: "number",
      label: "Mobile Height (px, optional)",
      min: 0,
      max: 200,
    },
  },
  defaultProps: {
    height: 48,
    mobileHeight: 24,
  },
  render: ({ height, mobileHeight }) => (
    <>
      <div
        className="w-full hidden md:block"
        style={{ height: `${height}px` }}
        role="presentation"
        aria-hidden="true"
      />
      <div
        className="w-full md:hidden"
        style={{ height: `${mobileHeight || height}px` }}
        role="presentation"
        aria-hidden="true"
      />
    </>
  ),
};
