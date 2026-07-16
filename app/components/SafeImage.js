"use client";

import { imageFallback } from "../../lib/assets";

export default function SafeImage({ fallbackWidth, fallbackHeight, ...props }) {
  return (
    <img
      {...props}
      onError={(event) =>
        imageFallback(
          event,
          fallbackWidth ?? props.width ?? 900,
          fallbackHeight ?? props.height ?? 1125,
        )
      }
    />
  );
}
