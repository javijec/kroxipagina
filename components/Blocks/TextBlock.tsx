import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const TextBlock: ComponentConfig<Props["TextBlock"]> = {
  fields: {
    content: { type: "textarea", label: "Text Content", contentEditable: true },
    colorMode: {
      type: "radio",
      label: "Color Mode",
      options: [
        { label: "Preset", value: "preset" },
        { label: "Custom Hex", value: "custom" },
      ],
    },
    textColor: {
      type: "select",
      label: "Text Color (Preset)",
      options: [
        { label: "Gray 900", value: "text-gray-900" },
        { label: "Gray 700", value: "text-gray-700" },
        { label: "Gray 500", value: "text-gray-500" },
        { label: "Blue 600", value: "text-blue-600" },
        { label: "Red 600", value: "text-red-600" },
        { label: "White", value: "text-white" },
      ],
    },
    customColor: {
      type: "text",
      label: "Custom Color (Hex)",
    },
    fontFamily: {
      type: "select",
      label: "Font Family",
      options: [
        { label: "Sans-Serif", value: "sans" },
        { label: "Serif", value: "serif" },
        { label: "Monospace", value: "mono" },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Extra Large", value: "xl" },
      ],
    },
    lineHeight: {
      type: "select",
      label: "Line Height",
      options: [
        { label: "Tight", value: "tight" },
        { label: "Normal", value: "normal" },
        { label: "Relaxed", value: "relaxed" },
      ],
    },
  },
  defaultProps: {
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    colorMode: "preset",
    textColor: "text-gray-700",
    customColor: "#000000",
    fontFamily: "sans",
    fontSize: "medium",
    lineHeight: "normal",
  },
  resolveFields: (data, { fields }) => {
    const { colorMode = "preset" } = data.props || {};

    return {
      ...fields,
      textColor: {
        ...fields.textColor,
        visible: colorMode === "preset",
      },
      customColor: {
        ...fields.customColor,
        visible: colorMode === "custom",
      },
    } as any;
  },
  render: ({ content, colorMode, textColor, customColor, fontFamily, fontSize, lineHeight }) => {
    const fontSizeClass = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
      xl: "text-xl",
    }[fontSize];

    const lineHeightClass = {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    }[lineHeight];

    const fontClass = {
      sans: "font-sans",
      serif: "font-serif",
      mono: "font-mono",
    }[fontFamily || "sans"];

    const isCustom = colorMode === "custom";

    return (
      <div className="p-4">
        <p
          className={`${!isCustom ? textColor : ""} ${fontSizeClass} ${lineHeightClass} ${fontClass}`}
          style={isCustom ? { color: customColor } : {}}
        >
          {content}
        </p>
      </div>
    );
  },
};
