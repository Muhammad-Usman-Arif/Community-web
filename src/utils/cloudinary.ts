export const CLOUDINARY_CLOUD_NAME = 'drhev5eoj';
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export interface CloudinaryTransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'limit' | 'thumb';
  quality?: 'auto' | number;
  format?: string;
  fetchFormat?: 'auto';
}

export function cloudinaryImageUrl(publicId: string, options: CloudinaryTransformOptions = {}): string {
  const transformations = [];

  if (options.width) transformations.push(`w_${options.width}`);
  if (options.height) transformations.push(`h_${options.height}`);
  if (options.crop) transformations.push(`c_${options.crop}`);
  if (options.quality) transformations.push(`q_${options.quality}`);
  if (options.format) transformations.push(`f_${options.format}`);
  if (options.fetchFormat) transformations.push(`f_${options.fetchFormat}`);

  const transformPath = transformations.length ? `${transformations.join(',')}/` : '';
  return `${CLOUDINARY_BASE_URL}/${transformPath}${publicId}`;
}

export function cloudinaryUploadUrl(): string {
  return `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
}

export function createCloudinaryUploadForm(file: File, uploadPreset: string): FormData {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  return formData;
}
