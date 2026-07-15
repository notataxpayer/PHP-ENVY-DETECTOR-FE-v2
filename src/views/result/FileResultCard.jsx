// View component untuk menampilkan detail hasil analisis per file dalam bentuk tabel
import { useState } from "react";

export default function FileResultCard({ file }) {
  const [openedMethod, setOpenedMethod] = useState(null);

  const toggleDetail = (methodName) => {
    setOpenedMethod(
      openedMethod === methodName ? null : methodName
    );
  };

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
                Status
              </th>

              <th className="px-6 py-4">
                Aksi
              </th>

            </tr>

          </thead>

          <tbody>

            {file.methods.map((method, index) => (
              <>
                {/* MAIN ROW */}
                <tr
                  key={index}
                  className="border-t"
                >

                  {/* METHOD NAME */}
                  <td className="px-6 py-5">
                    <p className="font-semibold">
                      {method.method}
                    </p>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 py-5">
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

                  {/* ACTION */}
                  <td className="px-6 py-5">
                    <button
                      onClick={() =>
                        toggleDetail(method.method)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm transition"
                    >
                      {openedMethod === method.method
                        ? "Sembunyikan"
                        : "Detail Metrik"}
                    </button>
                  </td>

                </tr>

                {/* DETAIL ACCORDION */}
                {openedMethod === method.method && (
                  <tr className="bg-gray-50">

                    <td
                      colSpan="3"
                      className="px-6 py-5"
                    >

                      <div className="rounded-2xl border bg-white p-5">

                        {/* METRICS */}
                        <div className="grid grid-cols-3 gap-4 mb-5">

                          <div className="bg-red-50 rounded-xl p-4">
                            <p className="text-xs text-gray-500">
                              ATFD
                            </p>

                            <p className="text-lg font-bold">
                              {method.metrics?.ATFD ?? "-"}
                            </p>
                          </div>

                          <div className="bg-yellow-50 rounded-xl p-4">
                            <p className="text-xs text-gray-500">
                              LAA
                            </p>

                            <p className="text-lg font-bold">
                              {method.metrics?.LAA ?? "-"}
                            </p>
                          </div>

                          <div className="bg-blue-50 rounded-xl p-4">
                            <p className="text-xs text-gray-500">
                              FDP
                            </p>

                            <p className="text-lg font-bold">
                              {method.metrics?.FDP ?? "-"}
                            </p>
                          </div>

                        </div>

                        {/* ENVY INFORMATION */}
                        {method.status === "ENVY DETECTED" && (
                          <div className="bg-red-50 border border-red-200 rounded-2xl p-4">

                            <p className="text-sm">
                              <span className="font-semibold">
                                Target Class:
                              </span>{" "}
                              {method.dominant_class}
                            </p>

                            <p className="text-sm mt-3 text-gray-700">
                              💡 {method.recommendation}
                            </p>

                          </div>
                        )}

                      </div>

                    </td>

                  </tr>
                )}

              </>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}