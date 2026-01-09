import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";

// Validate image URL
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url) || url.includes("googleusercontent") || url.includes("imgur");
  } catch {
    return false;
  }
};

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
    contentAlignment: {
      type: "radio",
      label: "Content Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    ctaText: {
      type: "text",
      label: "CTA Button Text (Optional)",
    },
    ctaLink: {
      type: "text",
      label: "CTA Button Link",
    },
    ctaTarget: {
      type: "radio",
      label: "CTA Open in",
      options: [
        { label: "Same Tab", value: "_self" },
        { label: "New Tab", value: "_blank" },
      ],
    },
  },
  resolveFields: (data, { fields }) => {
    const { backgroundType = "image", ctaText = "" } = data.props || {};

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
      ctaLink: {
        ...fields.ctaLink,
        visible: !!ctaText,
      },
      ctaTarget: {
        ...fields.ctaTarget,
        visible: !!ctaText,
      },
    } as any;
  },
  defaultProps: {
    title: "Welcome to Our Site",
    subtitle: "Build amazing content with our visual editor",
    backgroundType: "image",
    backgroundImage: "https://lh3.googleusercontent.com/sitesv/AAzXCkc_NWaUif8F83QeGme_bB0SsfVFkeeuTRO9dLoJCI0cmBizzYQcoCABPDmIGEvSXalHjyh1HczcgTMy_37H6kaoPrdtlNvnioSk8dH78PBiVOUeIFemLNDFXgoMhDNvYKvIrx_ktmRjo0bhZr9wm3nKbUZhEwxXyq1roRBsjS3jZF6K7r4oIJjAaIU=w16383",
    backgroundColor: "bg-gray-900",
    height: "medium",
    overlayOpacity: 50,
    contentAlignment: "center",
    ctaText: "Get Started",
    ctaLink: "#",
    ctaTarget: "_self",
  },
  render: ({
    title,
    subtitle,
    backgroundType,
    backgroundImage,
    backgroundColor,
    height,
    overlayOpacity,
    contentAlignment = "center",
    ctaText,
    ctaLink,
    ctaTarget = "_self",
  }) => {
    const heightClass = {
      small: "h-64 md:h-80",
      medium: "h-96 md:h-[500px]",
      large: "h-[600px] md:h-[700px]",
      fullscreen: "h-screen",
    }[height];

    const alignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[contentAlignment];

    const isImage = backgroundType === "image";
    const imageValid = isImage && isValidImageUrl(backgroundImage);

    return (
      <div
        className={`relative ${heightClass} flex items-center justify-center overflow-hidden ${
          !isImage ? backgroundColor : "bg-gray-900"
        }`}
        style={
          imageValid
            ? {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}
        }
        role="banner"
      >
        {imageValid && (
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: overlayOpacity / 100 }}
            aria-hidden="true"
          />
        )}
        <div className={`relative z-10 text-white p-8 max-w-4xl mx-auto w-full ${alignmentClass}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
            {title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-95 drop-shadow-md">
            {subtitle}
          </p>
          {ctaText && ctaLink && (
            <a
              href={ctaLink}
              target={ctaTarget}
              rel={ctaTarget === "_blank" ? "noopener noreferrer" : undefined}
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 drop-shadow-md"
            >
              {ctaText}
            </a>
          )}
        </div>
      </div>
    );
  },
};
