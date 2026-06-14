import { useState } from "react";
import { useFileController } from "../../controllers/useFileController";
import { useAnalyzeController } from "../../controllers/useAnalyzeController";
import HeroSection from "../sections/HeroSection";
import UploadSection from "../sections/UploadSection";
import SelectedFilesSection from "../sections/SelectedFilesSection";
import AnalyzeSection from "../sections/AnalyzeSection";
import InfoSection from "../sections/InfoSection";

// Page component untuk upload dan analisis file
export default function UploadPage({ setResult }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fileController = useFileController();
  const analyzeController = useAnalyzeController();

  // Fungsi untuk handle file selection dan set ke state
  const handleFileSelect = (event) => {
    fileController.handleSelectFiles(event, setFiles);
  };

  // Fungsi untuk handle analyze button click
  const handleAnalyzeClick = async () => {
    await analyzeController.handleAnalyzeFiles(files, setLoading, setResult);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        <HeroSection />

        <UploadSection onFileSelect={handleFileSelect} />

        <SelectedFilesSection files={files} />

        <InfoSection />

        <AnalyzeSection
          files={files}
          loading={loading}
          onAnalyze={handleAnalyzeClick}
        />

      </div>
    </div>
  );
}
