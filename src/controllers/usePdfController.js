import html2pdf from 'html2pdf.js';
import { generatePDFReport, downloadPDFReport, downloadPDFFromHTML } from '../models/pdfModel';

// Controller untuk menangani logika PDF generation dan download
export const usePdfController = () => {
  // Fungsi untuk download PDF dari HTML element
  const handleDownloadPDFFromHTML = async (elementId) => {
    try {
      await downloadPDFFromHTML(html2pdf, elementId);
    } catch (error) {
      console.error('PDF download failed:', error);
      throw error;
    }
  };

  // Fungsi untuk generate PDF dari data hasil analisis
  const handleGeneratePDFFromData = (resultData) => {
    try {
      const doc = generatePDFReport(resultData);
      return doc;
    } catch (error) {
      console.error('PDF generation failed:', error);
      throw error;
    }
  };

  // Fungsi untuk download PDF yang sudah dibuat ke perangkat user
  const handleSavePDFToDevice = (doc, filename) => {
    try {
      downloadPDFReport(doc, filename);
    } catch (error) {
      console.error('PDF save failed:', error);
      throw error;
    }
  };

  return {
    handleDownloadPDFFromHTML,
    handleGeneratePDFFromData,
    handleSavePDFToDevice,
  };
};
