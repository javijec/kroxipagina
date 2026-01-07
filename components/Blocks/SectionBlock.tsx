import { DropZone, ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const SectionBlock: ComponentConfig<Props["SectionBlock"]> = {
  fields: {
    title: { type: "text", label: "Section Title", contentEditable: true },
    subtitle: { type: "textarea", label: "Section Subtitle", contentEditable: true },
    backgroundType: {
      type: "radio",
      label: "Background Type",
      options: [
        { label: "Color", value: "color" },
        { label: "Image", value: "image" },
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
        { label: "Gray 100", value: "bg-gray-100" },
        { label: "Blue 50", value: "bg-blue-50" },
        { label: "Dark", value: "bg-gray-900" },
      ],
    },
    padding: {
      type: "select",
      label: "Section Padding",
      options: [
        { label: "None", value: "none" },
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
      ],
    },
    contentWidth: {
      type: "select",
      label: "Content Width",
      options: [
        { label: "Narrow", value: "narrow" },
        { label: "Medium", value: "medium" },
        { label: "Wide", value: "wide" },
        { label: "Full Width", value: "full" },
      ],
    },
  },
  defaultProps: {
    title: "Section Title",
    subtitle: "",
    backgroundType: "color",
    backgroundImage: "",
    backgroundColor: "bg-white",
    padding: "medium",
    contentWidth: "wide",
  },
  resolveFields: (data, { fields }) => {
    const { backgroundType = "color" } = data.props || {};

    return {
      ...fields,
      backgroundColor: {
        ...fields.backgroundColor,
        visible: backgroundType === "color",
      },
      backgroundImage: {
        ...fields.backgroundImage,
        visible: backgroundType === "image",
      },
    } as any;
  },
  render: ({ title, subtitle, backgroundType, backgroundImage, backgroundColor, padding, contentWidth }) => {
    const paddingOptions: Record<string, string> = {
      none: "py-0",
      small: "py-8",
      medium: "py-16",
      large: "py-24",
    };
    const widthOptions: Record<string, string> = {
      narrow: "max-w-2xl",
      medium: "max-w-4xl",
      wide: "max-w-6xl",
      full: "max-w-full",
    };

    const isImage = backgroundType === "image";
    const bgStyle = isImage && backgroundImage
      ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
      : {};

    const bgClass = !isImage ? backgroundColor : "relative";
    // For image backgrounds, we might want a default text color or overlay, but sticking to basics for now as requested.
    // Adding 'relative' to ensure z-index works if we added an overlay later.

    return (
      <section
        className={`${bgClass} ${paddingOptions[padding]}`}
        style={bgStyle}
      >
        <div className={`mx-auto px-4 ${widthOptions[contentWidth]}`}>
          {(title || subtitle) && (
            <div className={`text-center mb-12 ${isImage ? "text-white drop-shadow-md" : ""}`}>
              {/* Added text-white shadow for readability on images */}
              {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
              {subtitle && <p className={`text-lg ${isImage ? "text-gray-100" : "text-gray-600"}`}>{subtitle}</p>}
            </div>
          )}
          <DropZone zone="section-content" />
        </div>
      </section>
    );
  },
};
