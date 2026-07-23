export const isRemoteMediaUrl = (url?: string | null) =>
  Boolean(url && /^https?:\/\//i.test(url));

export const isSvgAsset = (url?: string | null) =>
  Boolean(url && /\.svg(\?|$)/i.test(url));

export const shouldBypassImageOptimization = (url?: string | null) =>
  isRemoteMediaUrl(url) || isSvgAsset(url);
