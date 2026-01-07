import { DropZone, ComponentConfig } from "@measured/puck";
import { Props } from "./types";

export const SectionBlock: ComponentConfig<Props["SectionBlock"]> = {
  fields: {
    title: { type: "text", label: "Section Title", contentEditable: true },
    subtitle: { type: "textarea", label: "Section Subtitle", contentEditable: true },
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
};
