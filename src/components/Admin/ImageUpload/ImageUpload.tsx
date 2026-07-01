"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './ImageUpload.module.css';

interface ImageUploadProps {
  bucket: string;
  folder: string;
  onUploadSuccess: (publicUrl: string) => void;
  onUploadError?: (error: string) => void;
  currentImage?: string | null;
}

export default function ImageUpload({
  bucket,
  folder,
  onUploadSuccess,
  onUploadError,
  currentImage
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUploadSuccess(publicUrl);
    } catch (error: any) {
      if (onUploadError) {
        onUploadError(error.message || 'Error uploading image');
      } else {
        alert(error.message || 'Error uploading image');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.uploadCard} ${currentImage ? styles.hasImage : ''}`}>
        {currentImage ? (
          <div className={styles.previewArea}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={currentImage} alt="Uploaded preview" className={styles.previewImage} />
            <div className={styles.previewOverlay}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className={styles.fileInput}
                id={`file-upload-replace-${folder}`}
              />
              <label htmlFor={`file-upload-replace-${folder}`} className={styles.changeLabel}>
                {isUploading ? 'Uploading...' : 'Replace Image'}
              </label>
            </div>
          </div>
        ) : (
          <div className={styles.dropzone}>
            <svg className={styles.uploadIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className={styles.dropzoneText}>
              {isUploading ? 'Uploading image...' : 'Click to upload image'}
            </span>
            <span className={styles.dropzoneSubtext}>PNG, JPG, or WEBP (Max 5MB)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className={styles.fileInput}
              id={`file-upload-${folder}`}
            />
            <label htmlFor={`file-upload-${folder}`} className={styles.hiddenLabel} />
          </div>
        )}
      </div>
    </div>
  );
}
