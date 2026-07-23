export const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const COURSE_IMAGE_MAX_BYTES = 8 * 1024 * 1024;
export const TOPIC_VIDEO_MAX_BYTES = 250 * 1024 * 1024;
export const TOPIC_RESOURCE_MAX_BYTES = 25 * 1024 * 1024;

export const PROFILE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const COURSE_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const TOPIC_VIDEO_TYPES = [
  "video/mp4",
  "video/x-msvideo",
  "video/webm",
];

export const TOPIC_RESOURCE_TYPES = [
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export const isValidUploadType = (file: File, allowedTypes: string[]) =>
  allowedTypes.includes(file.type);

export const isValidUploadSize = (file: File, maxBytes: number) =>
  file.size <= maxBytes;
