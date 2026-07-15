import { analyzeFiles, mergeDetectionAndMetrics, calculateStatistics, getMetricDetail } from '../models/analysisModel';

// Controller untuk menangani logika upload dan analisis kode
export const useAnalyzeController = () => {
  // Fungsi untuk mengeksekusi analisis file dan menggabungkan hasil detection dengan metrics
  const handleAnalyzeFiles = async (files, setLoading, setResult) => {
    if (!files.length) return;

    try {
      // console.log(files.length);
      setLoading(true);
      const startTime = performance.now();
      const response = await analyzeFiles(files);
      const endTime = performance.now();
      const { detection, metrics } = response;

      const mergedData = mergeDetectionAndMetrics(detection, metrics);
      setResult(mergedData);
      console.log(`Analysis Time: ${((endTime - startTime) / 1000).toFixed(3)} seconds`);
      return mergedData; // Waktu analisis dalam detik
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

  // Mengambil detail metrik dari method yang dipilih
    const handleGetMetricDetail = (
    data,
    fileName,
    methodName
    ) => {
    return getMetricDetail(
        data,
        fileName,
        methodName
    );
    };

  return {
    handleAnalyzeFiles,
    handleGetAnalysisStatistics,
    handleCalculateTotalFiles,
    handleCalculateTotalMethods,
    handleCalculateTotalEnvy,
    handleResetAnalysis,
    handleGetMetricDetail,
  };
};
