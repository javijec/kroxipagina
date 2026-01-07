import { ComponentConfig } from "@measured/puck";
import { Props } from "./types";
import { useState } from "react";

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
        // We use a state to track if the user has clicked play
        // This avoids the DOM manipulation issues of external libraries
        const [isPlaying, setIsPlaying] = useState(false);

        // Reset state if URL changes
        const videoId = getYouTubeId(videoUrl);

        // If props change, we want to reset the player (effect not needed if we key by ID, but simple reset works)
        if (videoId && isPlaying) {
            // Note: In a real app we might want to handle prop changes more gracefully, 
            // but for a simple block, letting the user click again if they change the URL mid-playback is fine.
            // actually, let's keep it simple. If the ID changes, the component re-renders. 
            // We can force a remount by using key={videoId} on the wrapper or just let state handle it.
        }

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
                    // Reset player when video ID changes
                    key={videoId}
                >
                    {!isPlaying ? (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="group relative w-full h-full block cursor-pointer"
                            aria-label={`Play video: ${title}`}
                        >
                            {/* Thumbnail */}
                            <img
                                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                                alt={title || "YouTube Video Thumbnail"}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* YouTube-style play button */}
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
    },
};
