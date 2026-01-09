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
    overlayColor: {
      type: "select",
      label: "Overlay Color (for images)",
      options: [
        { label: "None", value: "transparent" },
        { label: "Black", value: "bg-black" },
        { label: "Dark Gray", value: "bg-gray-900" },
        { label: "Blue", value: "bg-blue-600" },
      ],
    },
    overlayOpacity: {
      type: "number",
      label: "Overlay Opacity (0-100)",
      min: 0,
      max: 100,
    },
    titleTextColor: {
      type: "select",
      label: "Title Text Color",
      options: [
        { label: "Gray 900", value: "text-gray-900" },
        { label: "Gray 700", value: "text-gray-700" },
        { label: "White", value: "text-white" },
        { label: "Blue 600", value: "text-blue-600" },
      ],
    },
    subtitleTextColor: {
      type: "select",
      label: "Subtitle Text Color",
      options: [
        { label: "Gray 600", value: "text-gray-600" },
        { label: "Gray 500", value: "text-gray-500" },
        { label: "Gray 100", value: "text-gray-100" },
      ],
    },
  },
  defaultProps: {
    title: "Section Title",
    subtitle: "",
    backgroundType: "color",
    backgroundImage: "https://lh3.googleusercontent.com/sitesv/AAzXCkeShCYMo0yFIVwwcU9ghVLkUYjxG54zKTA-hWQsQP6WWnapVgSUGgaFj4iZSXDrvH15lAHhZEaoNyjuZMN6IVfisUFGXGrCGd3Z9nF8Px_I1MSx0ujXzELAwlUyjkGspMgvxa9WLXawL3ZCHb4fGTH7dhyUxg_zfiI9fPxjkScW-xe4WJ4zZGJ0ntk=w16383",
    backgroundColor: "bg-white",
    padding: "medium",
    contentWidth: "wide",
    overlayColor: "transparent",
    overlayOpacity: 40,
    titleTextColor: "text-gray-900",
    subtitleTextColor: "text-gray-600",
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
      overlayColor: {
        ...fields.overlayColor,
        visible: backgroundType === "image",
      },
      overlayOpacity: {
        ...fields.overlayOpacity,
        visible: backgroundType === "image",
      },
    } as any;
  },
  render: ({
    title,
    subtitle,
    backgroundType,
    backgroundImage,
    backgroundColor,
    padding,
    contentWidth,
    overlayColor = "transparent",
    overlayOpacity = 40,
    titleTextColor = "text-gray-900",
    subtitleTextColor = "text-gray-600",
  }) => {
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
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : {};

    const bgClass = !isImage ? backgroundColor : "relative";
    const hasOverlay = isImage && overlayColor !== "transparent";

    return (
      <section
        className={`${bgClass} ${paddingOptions[padding]}`}
        style={bgStyle}
      >
        {hasOverlay && (
          <div
            className={`absolute inset-0 ${overlayColor}`}
            style={{ opacity: overlayOpacity / 100 }}
            aria-hidden="true"
          />
        )}
        <div className={`mx-auto px-4 ${widthOptions[contentWidth]} ${isImage ? "relative z-10" : ""}`}>
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2
                  className={`text-3xl md:text-4xl font-bold mb-4 ${titleTextColor} ${
                    isImage ? "drop-shadow-lg" : ""
                  }`}
                >
                  {title}
                </h2>
              )}
              {subtitle && (
                <p
                  className={`text-lg md:text-xl ${subtitleTextColor} ${
                    isImage ? "drop-shadow-md" : ""
                  }`}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
          <DropZone zone="section-content" />
        </div>
      </section>
    );
  },
};
