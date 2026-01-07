import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

// Helper to extract YouTube ID
const getYouTubeId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
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
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <LiteYouTubeEmbed
                        id={videoId}
                        title={title || "YouTube Video"}
                    />
                </div>
            </div>
        );
    },
};
