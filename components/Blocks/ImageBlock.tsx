import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { borderRadiusOptions } from "./options";
import Image from "next/image";

// Validate image URL
const isValidImageUrl = (url: string): boolean => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const ImageBlock: ComponentConfig<Props["ImageBlock"]> = {
  fields: {
    src: { type: "text", label: "Image URL" },
    alt: { type: "text", label: "Alt Text (important for accessibility)" },
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
    caption: {
      type: "text",
      label: "Image Caption (optional)",
    },
    alignment: {
      type: "radio",
      label: "Image Alignment",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    lazy: {
      type: "radio",
      label: "Lazy Loading",
      options: [
        { label: "Enabled", value: true },
        { label: "Disabled", value: false },
      ],
    },
  },
  defaultProps: {
    src: "https://via.placeholder.com/800x600",
    alt: "Placeholder image",
    width: "100%",
    aspectRatio: "original",
    borderRadius: "medium",
    caption: "",
    alignment: "center",
    lazy: true,
  },
  render: ({
    src,
    alt,
    width,
    aspectRatio,
    borderRadius,
    caption,
    alignment = "center",
    lazy = true,
  }) => {
    const aspectRatioClass = {
      original: "",
      square: "aspect-square",
      video: "aspect-video",
      portrait: "aspect-[3/4]",
    }[aspectRatio];

    const alignmentClass = {
      left: "mr-auto",
      center: "mx-auto",
      right: "ml-auto",
    }[alignment];

    const isValid = isValidImageUrl(src);

    if (!isValid) {
      return (
        <div className="p-4">
          <div className="bg-gray-100 border-2 border-gray-300 rounded-lg p-8 text-center text-gray-500">
            <p>Invalid image URL</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-4">
        <figure className={alignmentClass} style={{ width }}>
          <Image
            src={src}
            alt={alt}
            width={800}
            height={600}
            style={{ width: "100%", height: "auto" }}
            className={`${aspectRatioClass} ${borderRadiusOptions[borderRadius]} object-cover`}
            unoptimized
            loading={lazy ? "lazy" : "eager"}
          />
          {caption && (
            <figcaption className="mt-2 text-sm text-gray-600 text-center">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    );
  },
};
