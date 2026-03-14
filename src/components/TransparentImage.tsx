"use client";

import { useEffect, useRef } from "react";

interface TransparentImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Threshold 0-255: pixels darker than this are considered "black background" */
  threshold?: number;
}

/**
 * Renders an image onto a canvas and makes near-black pixels transparent.
 * This solves the issue where mix-blend-mode cannot pierce through backdrop-filter
 * stacking contexts (e.g. backdrop-blur on a parent card).
 */
export default function TransparentImage({
  src,
  alt,
  className = "",
  threshold = 30,
}: TransparentImageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        // If the pixel is near-black, make it fully transparent
        if (r <= threshold && g <= threshold && b <= threshold) {
          data[i + 3] = 0; // alpha = 0
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  }, [src, threshold]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      className={className}
      style={{
        display: "block",
        maxWidth: "100%",
        maxHeight: "100%",
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  );
}
