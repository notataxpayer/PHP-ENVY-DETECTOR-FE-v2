import { analyzeFiles, mergeDetectionAndMetrics, calculateStatistics } from '../models/analysisModel';

// Controller untuk menangani logika upload dan analisis kode
export const useAnalyzeController = () => {
  // Fungsi untuk mengeksekusi analisis file dan menggabungkan hasil detection dengan metrics
  const handleAnalyzeFiles = async (files, setLoading, setResult) => {
    if (!files.length) return;

    try {
      setLoading(true);
      const response = await analyzeFiles(files);
      const { detection, metrics } = response;

      const mergedData = mergeDetectionAndMetrics(detection, metrics);
      setResult(mergedData);
      return mergedData;
    } catch (error) {
      console.error('Analysis failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menghitung statistik dari hasil analisis
  const handleGetAnalysisStatistics = (data) => {
    return calculateStatistics(data);
  };

  // Fungsi untuk menghitung total file yang dianalisis
  const handleCalculateTotalFiles = (data) => {
    return data.length;
  };

  // Fungsi untuk menghitung total method dari semua file
  const handleCalculateTotalMethods = (data) => {
    return data.reduce((acc, file) => acc + file.summary.total_methods, 0);
  };

  // Fungsi untuk menghitung total feature envy yang terdeteksi
  const handleCalculateTotalEnvy = (data) => {
    return data.reduce((acc, file) => acc + file.summary.failed_count, 0);
  };

  // Fungsi untuk handle reset hasil analisis
  const handleResetAnalysis = (setResult, setFiles) => {
    setResult(null);
    setFiles([]);
  };

  return {
    handleAnalyzeFiles,
    handleGetAnalysisStatistics,
    handleCalculateTotalFiles,
    handleCalculateTotalMethods,
    handleCalculateTotalEnvy,
    handleResetAnalysis,
  };
};
