import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { borderRadiusOptions } from "./options";
import Image from "next/image";

export const ImageBlock: ComponentConfig<Props["ImageBlock"]> = {
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
        <Image
          src={src}
          alt={alt}
          width={800}
          height={600}
          style={{ width }}
          className={`${aspectRatioClass} ${borderRadiusOptions[borderRadius]} object-cover`}
          unoptimized
        />
      </div>
    );
  },
};
