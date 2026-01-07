import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const HeroBlock: ComponentConfig<Props["HeroBlock"]> = {
  fields: {
    title: { type: "text", label: "Hero Title", contentEditable: true },
    subtitle: { type: "textarea", label: "Hero Subtitle", contentEditable: true },
    backgroundType: {
      type: "radio",
      label: "Background Type",
      options: [
        { label: "Image", value: "image" },
        { label: "Color", value: "color" },
      ],
    },
    backgroundImage: {
      type: "text",
      label: "Background Image URL",
    },
    backgroundColor: {
      type: "select",
      label: "Background Color",
      options: [
        { label: "White", value: "bg-white" },
        { label: "Gray 50", value: "bg-gray-50" },
        { label: "Gray 900", value: "bg-gray-900" },
        { label: "Blue 600", value: "bg-blue-600" },
        { label: "Red 600", value: "bg-red-600" },
        { label: "Green 600", value: "bg-green-600" },
      ],
    },
    height: {
      type: "select",
      label: "Hero Height",
      options: [
        { label: "Small (300px)", value: "small" },
        { label: "Medium (500px)", value: "medium" },
        { label: "Large (700px)", value: "large" },
        { label: "Fullscreen", value: "fullscreen" },
      ],
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity (0-100)",
      min: 0,
      max: 100,
    },
  },
  resolveFields: (data, { fields }) => {
    const { backgroundType = "image" } = data.props || {};

    return {
      ...fields,
      backgroundImage: {
        ...fields.backgroundImage,
        visible: backgroundType === "image",
      },
      overlayOpacity: {
        ...fields.overlayOpacity,
        visible: backgroundType === "image",
      },
      backgroundColor: {
        ...fields.backgroundColor,
        visible: backgroundType === "color",
      },
    } as any;
  },
  defaultProps: {
    title: "Welcome to Our Site",
    subtitle: "Build amazing content with our visual editor",
    backgroundType: "image",
    backgroundImage: "",
    backgroundColor: "bg-gray-900",
    height: "medium",
    overlayOpacity: 50,
  },
  render: ({
    title,
    subtitle,
    backgroundType,
    backgroundImage,
    backgroundColor,
    height,
    overlayOpacity,
  }) => {
    const heightClass = {
      small: "h-64 md:h-80",
      medium: "h-96 md:h-[500px]",
      large: "h-[600px] md:h-[700px]",
      fullscreen: "h-screen",
    }[height];

    const isImage = backgroundType === "image";

    return (
      <div
        className={`relative ${heightClass} flex items-center justify-center overflow-hidden ${!isImage ? backgroundColor : ""
          }`}
        style={
          isImage && backgroundImage
            ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
            : {}
        }
      >
        {isImage && backgroundImage && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
          />
        )}
        <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">{subtitle}</p>
        </div>
      </div>
    );
  },
};
