import { useRef } from "react";

// View component untuk interface upload file dan folder PHP
export default function UploadSection({ onFileSelect }) {
  const inputRef = useRef();
  const folderRef = useRef();

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">

      <h2 className="text-2xl font-bold mb-2">
        Upload Source Code
      </h2>

      <p className="text-gray-500 mb-8">
        Upload PHP files or folders before starting analysis.
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        {/* FILE UPLOAD SECTION */}
        <div className="border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center">

          <div className="text-5xl mb-4">📂</div>

          <h3 className="font-bold text-lg mb-2">
            Upload PHP File
          </h3>

          <button
            onClick={() => inputRef.current.click()}
            className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Choose File
          </button>

          <input
            ref={inputRef}
            type="file"
            multiple
            accept=".php"
            onChange={onFileSelect}
            className="hidden"
          />
        </div>

        {/* FOLDER UPLOAD SECTION */}
        <div className="border-2 border-dashed border-purple-200 rounded-2xl p-8 text-center">

          <div className="text-5xl mb-4">📁</div>

          <h3 className="font-bold text-lg mb-2">
            Upload Folder
          </h3>

          <button
            onClick={() => folderRef.current.click()}
            className="mt-4 bg-purple-600 text-white px-5 py-3 rounded-xl"
          >
            Choose Folder
          </button>

          <input
            ref={folderRef}
            type="file"
            multiple
            webkitdirectory="true"
            onChange={onFileSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
