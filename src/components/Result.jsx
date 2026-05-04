export default function Result({ data }) {
  if (!data) return null;

  return (
    <div id="report-content" className="space-y-6">
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Feature Envy Analysis Report
        </h2>
        <p className="text-sm text-gray-500">
          Generated: {new Date().toLocaleString()}
        </p>
      </div>

      {data.map((file, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow">
          {/* FILE NAME */}
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            📄 {file.file}
          </h2>

          {/* SUMMARY */}
          <div className="flex gap-4 mb-4 text-sm">
            <div className="bg-gray-100 px-3 py-1 rounded">
              Total: {file.summary.total_methods}
            </div>
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded">
              Passed: {file.summary.passed_count}
            </div>
            <div className="bg-red-100 text-red-700 px-3 py-1 rounded">
              Envy: {file.summary.failed_count}
            </div>
          </div>

          {/* METHODS */}
          <div className="space-y-4">
            {file.methods.map((method, j) => (
              <div
                key={j}
                className={`p-4 rounded-lg border transition ${
                  method.status === "ENVY DETECTED"
                    ? "bg-red-50 border-red-300"
                    : "bg-green-50 border-green-300"
                }`}
              >
                {/* METHOD NAME */}
                <p className="font-semibold text-gray-800">
                  {method.method}
                </p>

                {/* STATUS */}
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span
                    className={
                      method.status === "ENVY DETECTED"
                        ? "text-red-600 font-medium"
                        : "text-green-600 font-medium"
                    }
                  >
                    {method.status}
                  </span>
                </p>

                {/* 🔥 METRICS (BARU) */}
                {method.metrics && (
                  <div className="mt-3 bg-gray-100 p-3 rounded text-sm">
                    <p className="font-medium mb-1">Metrics:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-red-500">
                        ATFD: {method.metrics.ATFD}
                      </span>
                      <span className="text-yellow-600">
                        LAA: {method.metrics.LAA}
                      </span>
                      <span className="text-blue-500">
                        FDP: {method.metrics.FDP}
                      </span>
                    </div>
                  </div>
                )}

                {/* RECOMMENDATION */}
                {method.status === "ENVY DETECTED" && (
                  <div className="mt-3">
                    <p className="text-sm">
                      👉 Target Class:{" "}
                      <b>{method.dominant_class}</b>
                    </p>
                    <p className="text-sm mt-1 text-gray-700">
                      💡 {method.recommendation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}