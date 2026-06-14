import { useAnalyzeController } from "../../controllers/useAnalyzeController";
import { usePdfController } from "../../controllers/usePdfController";
import ResultSummary from "../result/ResultSummary";
import FileResultCard from "../result/FileResultCard";
import DownloadPDFButton from "../result/DownloadPDFButton";
import PDFReport from "../result/PDFReport";

// Page component untuk menampilkan hasil analisis
export default function ResultPage({ data, onReset, setFiles }) {
  const analyzeController = useAnalyzeController();
  const pdfController = usePdfController();

  if (!data) return null;

  // Fungsi untuk handle download PDF
  const handleDownloadPDF = async () => {
    await pdfController.handleDownloadPDFFromHTML("pdf-report");
  };

  // Fungsi untuk handle reset
  const handleReset = () => {
    analyzeController.handleResetAnalysis(onReset, setFiles);
  };

  // Hitung statistics
  const totalFiles = analyzeController.handleCalculateTotalFiles(data);
  const totalMethods = analyzeController.handleCalculateTotalMethods(data);
  const totalEnvy = analyzeController.handleCalculateTotalEnvy(data);

  return (
    <div className="space-y-6">

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-4">

        {/* RESET BUTTON */}
        <button
          onClick={handleReset}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow transition"
        >
          Reset
        </button>

        {/* DOWNLOAD PDF BUTTON */}
        <DownloadPDFButton onDownload={handleDownloadPDF} />

      </div>

      {/* ANALYSIS SUMMARY */}
      <ResultSummary 
        totalFiles={totalFiles}
        totalMethods={totalMethods}
        totalEnvy={totalEnvy}
      />

      {/* DETAILED RESULTS PER FILE */}
      {data.map((file, index) => (
        <FileResultCard
          key={index}
          file={file}
        />
      ))}

      {/* PDF VERSION (HIDDEN - FOR DOWNLOAD ONLY) */}
      <div className="hidden">
        <PDFReport 
          data={data}
          totalFiles={totalFiles}
          totalMethods={totalMethods}
          totalEnvy={totalEnvy}
        />
      </div>

    </div>
  );
}
