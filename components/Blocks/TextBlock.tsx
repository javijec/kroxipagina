import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const TextBlock: ComponentConfig<Props["TextBlock"]> = {
  fields: {
    content: { type: "textarea", label: "Text Content", contentEditable: true },
    textColor: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "Gray 900", value: "text-gray-900" },
        { label: "Gray 700", value: "text-gray-700" },
        { label: "Gray 500", value: "text-gray-500" },
        { label: "Blue 600", value: "text-blue-600" },
      ],
    },
    fontSize: {
      type: "select",
      label: "Font Size",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
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
    textColor: "text-gray-700",
    fontSize: "medium",
    lineHeight: "normal",
  },
  render: ({ content, textColor, fontSize, lineHeight }) => {
    const fontSizeClass = {
      small: "text-sm",
      medium: "text-base",
      large: "text-lg",
    }[fontSize];

    const lineHeightClass = {
      tight: "leading-tight",
      normal: "leading-normal",
      relaxed: "leading-relaxed",
    }[lineHeight];

    return (
      <div className="p-4">
        <p className={`${textColor} ${fontSizeClass} ${lineHeightClass}`}>
          {content}
        </p>
      </div>
    );
  },
};
