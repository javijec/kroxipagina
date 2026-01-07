import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const HeadingBlock: ComponentConfig<Props["HeadingBlock"]> = {
  fields: {
    title: { type: "text", label: "Title Text" },
    level: {
      type: "select",
      label: "Heading Level",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
        { label: "H5", value: "h5" },
        { label: "H6", value: "h6" },
      ],
    },
    alignment: {
      type: "radio",
      label: "Text Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    textColor: {
      type: "select",
      label: "Text Color",
      options: [
        { label: "Gray 900", value: "text-gray-900" },
        { label: "Gray 700", value: "text-gray-700" },
        { label: "Gray 500", value: "text-gray-500" },
        { label: "Blue 600", value: "text-blue-600" },
        { label: "Red 600", value: "text-red-600" },
        { label: "Green 600", value: "text-green-600" },
      ],
    },
  },
  defaultProps: {
    title: "Heading",
    level: "h2",
    alignment: "left",
    textColor: "text-gray-900",
  },
  render: ({ title, level, alignment, textColor }) => {
    const HeadingTag = level;
    const alignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[alignment];

    return (
      <div className={`p-4 ${alignmentClass}`}>
        <HeadingTag className={`font-bold ${textColor}`}>{title}</HeadingTag>
      </div>
    );
  },
};
