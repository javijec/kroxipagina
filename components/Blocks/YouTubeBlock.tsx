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
const YouTubeEmbed = ({ videoUrl, title }: { videoUrl: string; title: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = getYouTubeId(videoUrl);

    if (!videoId) {
        return (
            <div className="w-full p-4 bg-gray-100 rounded-lg text-center text-gray-500">
                Enter a valid YouTube URL
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
                        className="group relative w-full h-full block cursor-pointer"
                        aria-label={`Play video: ${title}`}
                    >
                        <Image
                            src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                            alt={title || "YouTube Video Thumbnail"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-11 bg-red-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 group-focus:scale-110 shadow-xl">
                                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
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
            label: "YouTube URL (Full Link)",
        },
        title: {
            type: "text",
            label: "Video Title (for accessibility)",
        },
    },
    defaultProps: {
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        title: "Rick Astley - Never Gonna Give You Up",
    },
    render: ({ videoUrl, title }) => {
        return <YouTubeEmbed videoUrl={videoUrl} title={title} />;
    },
};
