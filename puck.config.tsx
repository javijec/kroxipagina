import { DropZone, type Config } from "@measured/puck";

type Props = {
  HeadingBlock: {
    title: string;
    level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    alignment: "left" | "center" | "right";
    textColor: string;
  };
  GridBlock: {
    columns: number;
    gap: "none" | "small" | "medium" | "large";
    responsive: "true" | "false";
  };
  CardBlock: {
    title: string;
    description: string;
    padding: number;
    variant: string;
    bgColor: string;
    shadow: "none" | "small" | "medium" | "large";
    borderRadius: "none" | "small" | "medium" | "large";
  };
  HeroBlock: {
    title: string;
    subtitle: string;
    backgroundImage: string;
    height: "small" | "medium" | "large" | "fullscreen";
    overlayOpacity: number;
    buttonText: string;
    buttonLink: string;
    buttonVariant: "primary" | "secondary" | "outline";
  };
  SectionBlock: {
    title: string;
    subtitle: string;
    backgroundColor: string;
    padding: "none" | "small" | "medium" | "large";
    contentWidth: "narrow" | "medium" | "wide" | "full";
  };
  ButtonBlock: {
    text: string;
    variant: "primary" | "secondary" | "outline" | "ghost";
    size: "small" | "medium" | "large";
    link: string;
    target: "_self" | "_blank";
    fullWidth: "true" | "false";
  };
  SpacerBlock: {
    height: number;
    mobileHeight?: number;
  };
  ImageBlock: {
    src: string;
    alt: string;
    width: string;
    aspectRatio: "original" | "square" | "video" | "portrait";
    borderRadius: "none" | "small" | "medium" | "large";
  };
  TextBlock: {
    content: string;
    textColor: string;
    fontSize: "small" | "medium" | "large";
    lineHeight: "tight" | "normal" | "relaxed";
  };
  DividerBlock: {
    style: "solid" | "dashed" | "dotted";
    color: string;
    thickness: number;
    spacing: "small" | "medium" | "large";
  };
};

const gapOptions: Record<string, string> = {
  none: "gap-0",
  small: "gap-2",
  medium: "gap-4",
  large: "gap-8",
};

const shadowOptions: Record<string, string> = {
  none: "",
  small: "shadow-sm",
  medium: "shadow-md",
  large: "shadow-lg",
};

const borderRadiusOptions: Record<string, string> = {
  none: "rounded-none",
  small: "rounded-sm",
  medium: "rounded-md",
  large: "rounded-lg",
};

export const config: Config<Props> = {
  components: {
    HeadingBlock: {
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
            <HeadingTag className={`font-bold ${textColor}`}>
              {title}
            </HeadingTag>
          </div>
        );
      },
    },
    GridBlock: {
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
        const gridClass = isResponsive
          ? `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} ${gapOptions[gap]}`
          : `grid grid-cols-${columns} ${gapOptions[gap]}`;

        return (
          <div className={`p-4 ${gridClass}`}>
            <DropZone zone="grid-content" />
          </div>
        );
      },
    },
    CardBlock: {
      fields: {
        title: { type: "text", label: "Card Title" },
        description: { type: "textarea", label: "Card Description" },
        padding: { type: "number", label: "Padding (px)", min: 0, max: 64 },
        variant: {
          type: "select",
          label: "Card Variant",
          options: [
            { label: "Outline", value: "border border-gray-200" },
            { label: "Background", value: "" },
          ],
        },
        bgColor: {
          type: "select",
          label: "Background Color",
          options: [
            { label: "White", value: "bg-white" },
            { label: "Gray 50", value: "bg-gray-50" },
            { label: "Blue 50", value: "bg-blue-50" },
            { label: "Red 50", value: "bg-red-50" },
            { label: "Yellow 50", value: "bg-yellow-50" },
            { label: "Green 50", value: "bg-green-50" },
          ],
        },
        shadow: {
          type: "select",
          label: "Shadow",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
        borderRadius: {
          type: "select",
          label: "Border Radius",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        title: "Card",
        description: "Description",
        padding: 24,
        variant: "",
        bgColor: "bg-white",
        shadow: "medium",
        borderRadius: "medium",
      },
      render: ({ title, description, padding, variant, bgColor, shadow, borderRadius }) => (
        <div
          style={{ padding }}
          className={`${variant} ${bgColor} ${shadowOptions[shadow]} ${borderRadiusOptions[borderRadius]}`}
        >
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
          <DropZone zone="card-content" />
        </div>
      ),
    },
    HeroBlock: {
      fields: {
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "textarea", label: "Hero Subtitle" },
        backgroundImage: { type: "text", label: "Background Image URL" },
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
        buttonText: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
        buttonVariant: {
          type: "select",
          label: "Button Style",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
          ],
        },
      },
      defaultProps: {
        title: "Welcome to Our Site",
        subtitle: "Build amazing content with our visual editor",
        backgroundImage: "",
        height: "medium",
        overlayOpacity: 50,
        buttonText: "Get Started",
        buttonLink: "#",
        buttonVariant: "primary",
      },
      render: ({ title, subtitle, backgroundImage, height, overlayOpacity, buttonText, buttonLink, buttonVariant }) => {
        const heightClass = {
          small: "h-64 md:h-80",
          medium: "h-96 md:h-[500px]",
          large: "h-[600px] md:h-[700px]",
          fullscreen: "h-screen",
        }[height];

        const buttonClass = {
          primary: "bg-blue-600 hover:bg-blue-700 text-white",
          secondary: "bg-gray-600 hover:bg-gray-700 text-white",
          outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
        }[buttonVariant];

        return (
          <div
            className={`relative ${heightClass} flex items-center justify-center overflow-hidden`}
            style={
              backgroundImage
                ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
                : { backgroundColor: "#f3f4f6" }
            }
          >
            {backgroundImage && (
              <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity / 100 }} />
            )}
            <div className="relative z-10 text-center text-white p-8 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{title}</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">{subtitle}</p>
              {buttonText && (
                <a
                  href={buttonLink}
                  target={buttonLink.startsWith("http") ? "_blank" : "_self"}
                  rel={buttonLink.startsWith("http") ? "noopener noreferrer" : ""}
                  className={`inline-block px-8 py-3 rounded-lg font-semibold transition-colors ${buttonClass}`}
                >
                  {buttonText}
                </a>
              )}
            </div>
          </div>
        );
      },
    },
    SectionBlock: {
      fields: {
        title: { type: "text", label: "Section Title" },
        subtitle: { type: "textarea", label: "Section Subtitle" },
        backgroundColor: {
          type: "select",
          label: "Background Color",
          options: [
            { label: "White", value: "bg-white" },
            { label: "Gray 50", value: "bg-gray-50" },
            { label: "Gray 100", value: "bg-gray-100" },
            { label: "Blue 50", value: "bg-blue-50" },
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
        backgroundColor: "bg-white",
        padding: "medium",
        contentWidth: "wide",
      },
      render: ({ title, subtitle, backgroundColor, padding, contentWidth }) => {
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

        return (
          <section className={`${backgroundColor} ${paddingOptions[padding]}`}>
            <div className={`mx-auto px-4 ${widthOptions[contentWidth]}`}>
              {(title || subtitle) && (
                <div className="text-center mb-12">
                  {title && <h2 className="text-3xl font-bold mb-4">{title}</h2>}
                  {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
                </div>
              )}
              <DropZone zone="section-content" />
            </div>
          </section>
        );
      },
    },
    ButtonBlock: {
      fields: {
        text: { type: "text", label: "Button Text" },
        variant: {
          type: "select",
          label: "Button Style",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
            { label: "Ghost", value: "ghost" },
          ],
        },
        size: {
          type: "select",
          label: "Button Size",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
        link: { type: "text", label: "Button Link" },
        target: {
          type: "radio",
          label: "Open Link",
          options: [
            { label: "Same Tab", value: "_self" },
            { label: "New Tab", value: "_blank" },
          ],
        },
        fullWidth: {
          type: "select",
          label: "Full Width",
          options: [
            { label: "No", value: "false" },
            { label: "Yes", value: "true" },
          ],
        },
      },
      defaultProps: {
        text: "Click Me",
        variant: "primary",
        size: "medium",
        link: "#",
        target: "_self",
        fullWidth: "false",
      },
      render: ({ text, variant, size, link, target, fullWidth }) => {
        const sizeClass = {
          small: "px-4 py-2 text-sm",
          medium: "px-6 py-3 text-base",
          large: "px-8 py-4 text-lg",
        }[size];

        const variantClass = {
          primary: "bg-blue-600 hover:bg-blue-700 text-white",
          secondary: "bg-gray-600 hover:bg-gray-700 text-white",
          outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
          ghost: "text-blue-600 hover:bg-blue-50",
        }[variant];

        const isFullWidth = fullWidth === "true";

        return (
          <div className={`p-4 ${isFullWidth ? "w-full" : ""}`}>
            <a
              href={link}
              target={target}
              rel={target === "_blank" ? "noopener noreferrer" : ""}
              className={`inline-block rounded-lg font-semibold transition-colors text-center ${sizeClass} ${variantClass} ${isFullWidth ? "block w-full" : ""}`}
            >
              {text}
            </a>
          </div>
        );
      },
    },
    SpacerBlock: {
      fields: {
        height: { type: "number", label: "Desktop Height (px)", min: 0, max: 200 },
        mobileHeight: { type: "number", label: "Mobile Height (px, optional)", min: 0, max: 200 },
      },
      defaultProps: {
        height: 48,
        mobileHeight: 24,
      },
      render: ({ height, mobileHeight }) => (
        <div className="w-full" style={{ height: `${mobileHeight || height}px` }} />
      ),
    },
    ImageBlock: {
      fields: {
        src: { type: "text", label: "Image URL" },
        alt: { type: "text", label: "Alt Text" },
        width: {
          type: "select",
          label: "Image Width",
          options: [
            { label: "Auto", value: "auto" },
            { label: "50%", value: "50%" },
            { label: "75%", value: "75%" },
            { label: "100%", value: "100%" },
          ],
        },
        aspectRatio: {
          type: "select",
          label: "Aspect Ratio",
          options: [
            { label: "Original", value: "original" },
            { label: "Square (1:1)", value: "square" },
            { label: "Video (16:9)", value: "video" },
            { label: "Portrait (3:4)", value: "portrait" },
          ],
        },
        borderRadius: {
          type: "select",
          label: "Border Radius",
          options: [
            { label: "None", value: "none" },
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        src: "https://via.placeholder.com/800x600",
        alt: "Image",
        width: "100%",
        aspectRatio: "original",
        borderRadius: "none",
      },
      render: ({ src, alt, width, aspectRatio, borderRadius }) => {
        const aspectRatioClass = {
          original: "",
          square: "aspect-square",
          video: "aspect-video",
          portrait: "aspect-[3/4]",
        }[aspectRatio];

        return (
          <div className="p-4">
            <img
              src={src}
              alt={alt}
              style={{ width }}
              className={`${aspectRatioClass} ${borderRadiusOptions[borderRadius]} object-cover`}
            />
          </div>
        );
      },
    },
    TextBlock: {
      fields: {
        content: { type: "textarea", label: "Text Content" },
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
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    },
    DividerBlock: {
      fields: {
        style: {
          type: "select",
          label: "Line Style",
          options: [
            { label: "Solid", value: "solid" },
            { label: "Dashed", value: "dashed" },
            { label: "Dotted", value: "dotted" },
          ],
        },
        color: {
          type: "select",
          label: "Line Color",
          options: [
            { label: "Gray 200", value: "border-gray-200" },
            { label: "Gray 300", value: "border-gray-300" },
            { label: "Blue 200", value: "border-blue-200" },
          ],
        },
        thickness: { type: "number", label: "Thickness (px)", min: 1, max: 10 },
        spacing: {
          type: "select",
          label: "Spacing",
          options: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
            { label: "Large", value: "large" },
          ],
        },
      },
      defaultProps: {
        style: "solid",
        color: "border-gray-200",
        thickness: 1,
        spacing: "medium",
      },
      render: ({ style, color, thickness, spacing }) => {
        const spacingClass = {
          small: "my-4",
          medium: "my-8",
          large: "my-12",
        }[spacing];

        const borderStyle = style === "solid" ? "border-solid" : style === "dashed" ? "border-dashed" : "border-dotted";

        return (
          <div className={`w-full ${spacingClass}`}>
            <hr
              className={`${color} ${borderStyle}`}
              style={{ borderWidth: `${thickness}px` }}
            />
          </div>
        );
      },
    },
  },
};

export default config;