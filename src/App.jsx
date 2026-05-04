import { useState } from "react";
import Upload from "./components/Upload";
import Result from "./components/Result";
// import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";

function App() {
  const [result, setResult] = useState(null);

  const handleReset = () => {
    setResult(null);
  };
  
  const handleDownloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF();

    let y = 10;

    // Title
    doc.setFontSize(16);
    doc.text("Feature Envy Analysis Report", 10, y);

    y += 8;

    // Date
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 10, y);

    y += 10;

    result.forEach((file, index) => {
      // File name
      doc.setFontSize(12);
      doc.text(`File: ${file.file}`, 10, y);
      y += 6;

      // Summary
      doc.setFontSize(10);
      doc.text(
        `Total Methods: ${file.summary.total_methods} | Passed: ${file.summary.passed_count} | Envy: ${file.summary.failed_count}`,
        10,
        y
      );

      y += 8;

      file.methods.forEach((method) => {
        // Auto page break
        if (y > 270) {
          doc.addPage();
          y = 10;
        }

        doc.setFontSize(10);

        doc.text(`Method: ${method.method}`, 10, y);
        y += 5;

        doc.text(`Status: ${method.status}`, 10, y);
        y += 5;

        if (method.status === "ENVY DETECTED") {
          doc.text(`Target Class: ${method.dominant_class}`, 10, y);
          y += 5;

          doc.text(`Recommendation:`, 10, y);
          y += 5;

          // wrap text panjang
          const lines = doc.splitTextToSize(method.recommendation, 180);
          doc.text(lines, 10, y);
          y += lines.length * 5;
        }

        y += 4;
      });

      y += 5;
    });

    doc.save("feature-envy-report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Feature Envy Detector
      </h1>

      {!result && <Upload setResult={setResult} />}

      {result && (
        <>
        <div className="">
          <div className="flex gap-4">
              <button
              onClick={handleReset}
              className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:duration-500 hover:bg-red-600"
            >
              Reset
            </button>

            <button
              onClick={handleDownloadPDF}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:duration-500 hover:bg-blue-600"
            >
              Download PDF
            </button>
          </div>
          <Result data={result} />
        </div>
        </>
      )}
    </div>
  );
}

export default App;