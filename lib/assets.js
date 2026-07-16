const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const assetUrl = (source) => {
  if (!source || /^https?:\/\//.test(source)) return source;
  return `${basePath}/${source.replace(/^\/+/, "")}`;
};

export const imageFallback = (event, width = 900, height = 1125) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = `https://picsum.photos/${width}/${height}`;
};
