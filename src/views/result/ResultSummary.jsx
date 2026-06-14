// View component untuk menampilkan ringkasan keseluruhan hasil analisis
export default function ResultSummary({ totalFiles, totalMethods, totalEnvy }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-10">

      {/* HEADER SECTION */}
      <div className="border-b pb-8 mb-8">

        <div className="flex items-center justify-between">

          <div>
            <p className="uppercase tracking-widest text-sm text-gray-500 mb-2">
              Static Code Analysis
            </p>

            <h1 className="text-4xl font-bold">
              Feature Envy Analysis Report
            </h1>

            <p className="text-gray-500 mt-3">
              Generated: {new Date().toLocaleString()}
            </p>
          </div>

          <div className="text-7xl opacity-10 font-black">
            {"</>"}
          </div>

        </div>
      </div>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-3 gap-6">

        <div className="bg-gray-100 rounded-2xl p-6">

          <p className="text-gray-500 text-sm mb-2">
            Total Files
          </p>

          <h2 className="text-4xl font-bold">
            {totalFiles}
          </h2>
        </div>

        <div className="bg-gray-100 rounded-2xl p-6">

          <p className="text-gray-500 text-sm mb-2">
            Total Methods
          </p>

          <h2 className="text-4xl font-bold">
            {totalMethods}
          </h2>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-2xl p-6">

          <p className="text-red-500 text-sm mb-2">
            Feature Envy Found
          </p>

          <h2 className="text-4xl font-bold text-red-600">
            {totalEnvy}
          </h2>
        </div>

      </div>
    </div>
  );
}
