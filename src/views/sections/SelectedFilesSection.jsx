// View component untuk menampilkan daftar file yang telah dipilih oleh user
export default function SelectedFilesSection({ files }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg">

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Selected Files
        </h2>

        <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
          {files.length} files selected
        </div>
      </div>

      {files.length === 0 ? (
        <div className="text-gray-400 text-center py-10 border rounded-2xl">
          No files selected yet
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">

          {files.map((file, index) => (
            <div
              key={index}
              className="border rounded-2xl p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">

                <div className="text-2xl">📄</div>

                <div>
                  <p className="font-medium">
                    {file.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}
