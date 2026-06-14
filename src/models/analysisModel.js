import axios from 'axios';

// Fungsi untuk mengirim file ke API backend untuk analisis
export const analyzeFiles = async (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('files[]', file);
  });

  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/analyze',
      formData
    );
    return response.data;
  } catch (error) {
    console.error('Error analyzing files:', error);
    throw error;
  }
};

// Fungsi untuk menggabungkan data deteksi dengan data metrik dari API response
export const mergeDetectionAndMetrics = (detection, metrics) => {
  return detection.map((file) => {
    const metricFile = metrics.find((m) => m.file === file.file);
    if (!metricFile) return file;

    return {
      ...file,
      methods: file.methods.map((method) => ({
        ...method,
        metrics: metricFile.methods[method.method] || null,
      })),
    };
  });
};

// Fungsi untuk menghitung statistik hasil analisis (total methods, passed, failed)
export const calculateStatistics = (data) => {
  const totalFiles = data.length;
  const totalMethods = data.reduce(
    (acc, file) => acc + file.summary.total_methods,
    0
  );
  const totalEnvy = data.reduce(
    (acc, file) => acc + file.summary.failed_count,
    0
  );
  const totalPassed = data.reduce(
    (acc, file) => acc + file.summary.passed_count,
    0
  );

  return {
    totalFiles,
    totalMethods,
    totalEnvy,
    totalPassed,
  };
};
