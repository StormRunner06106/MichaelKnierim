"use client";

import MuxPlayer from "@mux/mux-player-react";

interface MuxVideoPlayerProps {
  playbackId: string;
  className?: string;
  thumbnailTime?: number;
}

export function MuxVideoPlayer({
  playbackId,
  className = "",
  thumbnailTime = 0,
}: MuxVideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      thumbnailTime={thumbnailTime}
      streamType="on-demand"
      className={className}
      style={{
        width: "100%",
        height: "100%",
        aspectRatio: "16/9",
      }}
    />
  );
}
