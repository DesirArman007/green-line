"use client";

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import styles from './VideoUpload.module.css';

interface VideoUploadProps {
  bucket: string;
  folder: string;
  onUploadSuccess: (publicUrl: string) => void;
  onUploadError?: (error: string) => void;
  currentVideo?: string | null;
  dimensions?: string;
}

export default function VideoUpload({
  bucket,
  folder,
  onUploadSuccess,
  onUploadError,
  currentVideo,
  dimensions
}: VideoUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 50MB)
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > 50) {
      alert("Video file is too large. Max limit is 50MB.");
      return;
    }

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
        onUploadError(error.message || 'Error uploading video');
      } else {
        alert(error.message || 'Error uploading video');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.uploadCard} ${currentVideo ? styles.hasVideo : ''}`}>
        {currentVideo ? (
          <div className={styles.previewArea}>
            <video 
              src={currentVideo} 
              className={styles.previewVideo} 
              muted 
              loop 
              autoPlay 
              playsInline 
            />
            <div className={styles.previewOverlay}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', zIndex: 5 }}>
                <a href={currentVideo} target="_blank" rel="noreferrer" className={styles.viewBtn}>
                  Play Full Video
                </a>
                <label htmlFor={`video-upload-replace-${folder}`} className={styles.changeLabel}>
                  {isUploading ? 'Uploading...' : 'Replace Video'}
                </label>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className={styles.fileInput}
                id={`video-upload-replace-${folder}`}
              />
            </div>
          </div>
        ) : (
          <div className={styles.dropzone}>
            <svg className={styles.uploadIcon} width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="23 7 16 12 23 17 23 7" />
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </svg>
            <span className={styles.dropzoneText}>
              {isUploading ? 'Uploading video...' : 'Click to upload video'}
            </span>
            <span className={styles.dropzoneSubtext}>MP4 or WebM (Max 50MB)</span>
            {dimensions && (
              <span className={styles.dropzoneDimensions}>
                Recommended: {dimensions}
              </span>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className={styles.fileInput}
              id={`video-upload-${folder}`}
            />
            <label htmlFor={`video-upload-${folder}`} className={styles.hiddenLabel} />
          </div>
        )}
      </div>
      {dimensions && (
        <p className={styles.uploadHelperText}>
          Recommended size: <strong>{dimensions}</strong>
        </p>
      )}
    </div>
  );
}
