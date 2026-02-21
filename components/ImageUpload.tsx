"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, ImageIcon } from "lucide-react";
import { apiRequest } from "@/lib/api";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export default function ImageUpload({
  images,
  onImagesChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    setError(null);
    const remainingSlots = maxImages - images.length;
    const filesToProcess = Math.min(files.length, remainingSlots);

    if (filesToProcess === 0) {
      setError(`Maximum ${maxImages} images allowed`);
      return;
    }

    const validFiles: File[] = [];
    for (let i = 0; i < filesToProcess; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        validFiles.push(file);
      }
    }

    if (validFiles.length === 0) {
      setError("No valid image files selected");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      validFiles.forEach((file) => formData.append("images", file));

      const result = await apiRequest("uploads/multiple", {
        method: "POST",
        body: formData,
      });

      const imageUrls = (result.data as { url: string }[]).map(
        (img) => img.url,
      );
      onImagesChange([...images, ...imageUrls]);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Failed to upload images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium">
          Product Images{" "}
          {images.length > 0 && `(${images.length}/${maxImages})`}
        </label>
        <span className="text-xs text-muted-foreground">
          {maxImages - images.length} remaining
        </span>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
          {error}
        </div>
      )}

      {/* Upload Area */}
      {images.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isUploading ? "cursor-wait opacity-50" : "cursor-pointer"
          } ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-accent/5"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={!isUploading ? handleButtonClick : undefined}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
            disabled={isUploading}
          />
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Upload
                className={`w-6 h-6 text-primary ${
                  isUploading ? "animate-pulse" : ""
                }`}
              />
            </div>
            <div>
              <p className="text-sm font-medium">
                {isUploading
                  ? "Uploading..."
                  : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted"
            >
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage(index);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center p-6 border border-dashed rounded-lg bg-muted/30">
          <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-sm text-muted-foreground">
            No images uploaded yet
          </p>
        </div>
      )}
    </div>
  );
}
