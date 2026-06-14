// View component untuk tombol dan status analisis kode
export default function AnalyzeSection({ files, loading, onAnalyze }) {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl">

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold mb-2">
            Ready to Analyze
          </h2>

          <p className="text-gray-300">
            Start Feature Envy detection using AST analysis.
          </p>
        </div>

        <button
          onClick={onAnalyze}
          disabled={loading || !files.length}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-8 py-4 rounded-2xl font-semibold transition"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {loading && (
        <div className="mt-6 bg-white/10 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

            <div>
              <p className="font-medium">
                Processing source code...
              </p>

              <p className="text-sm text-gray-300">
                Parsing AST and calculating metrics
              </p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
