import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { useState } from "react";
import Image from "next/image";

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Extracted component to satisfy React Hook rules
const YouTubeEmbed = ({
  videoUrl,
  title,
}: {
  videoUrl: string;
  title: string;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasThumbnailError, setHasThumbnailError] = useState(false);
  const videoId = getYouTubeId(videoUrl);

  if (!videoId) {
    return (
      <div
        className="w-full p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg text-center text-yellow-700 font-semibold"
        role="alert"
      >
        ⚠️ Invalid YouTube URL. Please provide a valid YouTube link.
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div
        className="relative aspect-video w-full rounded-xl overflow-hidden shadow-lg bg-black"
        key={videoId}
      >
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="group relative w-full h-full block cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-400 rounded-xl"
            aria-label={`Play video: ${title}`}
            type="button"
          >
            {!hasThumbnailError ? (
              <Image
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt={title || "YouTube Video Thumbnail"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onError={() => setHasThumbnailError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <span className="text-gray-400">Video Thumbnail</span>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
              <div className="w-16 h-11 bg-red-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-focus:scale-110 shadow-xl">
                <svg
                  className="w-6 h-6 text-white fill-current ml-0.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        ) : (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title || "YouTube Video"}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0"
          />
        )}
      </div>
    </div>
  );
};

export const YouTubeBlock: ComponentConfig<Props["YouTubeBlock"]> = {
  fields: {
    videoUrl: {
      type: "text",
      label: "YouTube URL (Full Link, e.g., https://www.youtube.com/watch?v=...)",
    },
    title: {
      type: "text",
      label: "Video Title (for accessibility)",
    },
    titleTextColor: {
      type: "select",
      label: "Title Color",
      options: [
        { label: "White", value: "text-white" },
        { label: "Gray 900", value: "text-gray-900" },
      ],
    },
    titleFontFamily: {
      type: "select",
      label: "Title Font Family",
      options: [
        { label: "Sans", value: "sans" },
        { label: "Serif", value: "serif" },
        { label: "Mono", value: "mono" },
        { label: "Fontin", value: "fontin" },
      ],
    },
    titleFontWeight: {
      type: "select",
      label: "Title Font Weight",
      options: [
        { label: "Thin", value: "thin" },
        { label: "Normal", value: "normal" },
        { label: "Medium", value: "medium" },
        { label: "Bold", value: "bold" },
      ],
    },
  },
  defaultProps: {
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up",
    titleTextColor: "text-white",
    titleFontFamily: "sans",
    titleFontWeight: "bold",
  },
  render: ({ videoUrl, title, titleTextColor = "text-white", titleFontFamily = "sans", titleFontWeight = "bold" }) => {
    return (
      <div>
        {title && (
          <h3 className={`text-lg mb-4 ${titleTextColor} ${
            { sans: "font-sans", serif: "font-serif", mono: "font-mono", fontin: "font-[Fontin]" }[titleFontFamily]
          } ${
            { thin: "font-thin", normal: "font-normal", medium: "font-medium", bold: "font-bold" }[titleFontWeight]
          }`}>
            {title}
          </h3>
        )}
        <YouTubeEmbed videoUrl={videoUrl} title={title} />
      </div>
    );
  },
};
