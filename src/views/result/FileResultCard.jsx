// View component untuk menampilkan detail hasil analisis per file dalam bentuk tabel
export default function FileResultCard({ file }) {

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* FILE HEADER */}
      <div className="bg-gray-900 text-white px-8 py-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              📄 {file.file}
            </h2>

            <p className="text-gray-300 mt-2">
              Source code analysis result
            </p>
          </div>

          <div className="flex gap-3">

            <div className="bg-white/10 px-4 py-2 rounded-xl text-sm">
              Methods: {file.summary.total_methods}
            </div>

            <div className="bg-green-500/20 text-green-200 px-4 py-2 rounded-xl text-sm">
              Passed: {file.summary.passed_count}
            </div>

            <div className="bg-red-500/20 text-red-200 px-4 py-2 rounded-xl text-sm">
              Envy: {file.summary.failed_count}
            </div>

          </div>
        </div>
      </div>

      {/* METHODS TABLE */}
      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-left text-gray-600">

              <th className="px-6 py-4">
                Method
              </th>

              <th className="px-6 py-4">
                ATFD
              </th>

              <th className="px-6 py-4">
                LAA
              </th>

              <th className="px-6 py-4">
                FDP
              </th>

              <th className="px-6 py-4">
                Status
              </th>
            </tr>

          </thead>

          <tbody>

            {file.methods.map((method, index) => (

              <tr
                key={index}
                className="border-t"
              >

                {/* METHOD NAME */}
                <td className="px-6 py-5 align-top">

                  <p className="font-semibold">
                    {method.method}
                  </p>

                  {method.status === "ENVY DETECTED" && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded-2xl p-4">

                      <p className="text-sm">
                        <span className="font-semibold">
                          Target Class:
                        </span>{" "}
                        {method.dominant_class}
                      </p>

                      <p className="text-sm mt-2 text-gray-700">
                        💡 {method.recommendation}
                      </p>
                    </div>
                  )}
                </td>

                {/* ATFD METRIC */}
                <td className="px-6 py-5 align-top">
                  <p className="font-semibold">
                    {method.metrics?.ATFD || '-'}
                  </p>
                </td>

                {/* LAA METRIC */}
                <td className="px-6 py-5 align-top">
                  <p className="font-semibold">
                    {method.metrics?.LAA || '-'}
                  </p>
                </td>

                {/* FDP METRIC */}
                <td className="px-6 py-5 align-top">
                  <p className="font-semibold">
                    {method.metrics?.FDP || '-'}
                  </p>
                </td>

                {/* STATUS BADGE */}
                <td className="px-6 py-5 align-top">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      method.status === "ENVY DETECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {method.status}
                  </span>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
