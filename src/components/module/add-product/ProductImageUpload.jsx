import { ImagePlus, UploadCloud } from "lucide-react";

export default function ProductImageUpload({ imagePreview, onImageChange }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
        Product Image
      </label>

      <label className="group relative flex h-44 w-full cursor-pointer flex-col items-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-400 hover:bg-blue-50/50 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700/50">
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt="Product preview"
              className="h-full w-full object-contain px-3 pt-3 pb-14"
            />

            <span className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 border-t border-gray-200 bg-white/95 px-4 py-3 text-sm font-medium text-gray-700 transition-colors group-hover:bg-blue-50 dark:border-gray-700 dark:bg-gray-900/95 dark:text-gray-200 dark:group-hover:bg-gray-800">
              <UploadCloud size={16} />
              Change image
            </span>
          </>
        ) : (
          <div className="flex flex-col items-center px-4 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <ImagePlus size={26} />
            </div>

            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Click to upload an image
            </p>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              PNG, JPG, WEBP or GIF
            </p>

            <div className="absolute bottom-3 flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm dark:bg-gray-900/95 dark:text-gray-100">
              <UploadCloud size={16} />
              Choose image
            </div>
          </div>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={onImageChange}
        />
      </label>
    </div>
  );
}
