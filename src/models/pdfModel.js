import jsPDF from 'jspdf';

// Fungsi untuk menghasilkan PDF report dari hasil analisis fitur envy
export const generatePDFReport = (result) => {
    if (!result) return;

    const doc = new jsPDF();
    let y = 10;

    // Judul dokumen
    doc.setFontSize(16);
    doc.text('Feature Envy Analysis Report', 10, y);
    y += 8;

    // Tanggal pembuatan
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 10, y);
    y += 10;

    // Loop untuk setiap file yang dianalisis
    result.forEach((file) => {
      doc.setFontSize(12);
      doc.text(`File: ${file.file}`, 10, y);
      y += 6;

      doc.setFontSize(10);
      doc.text(
        `Total Methods: ${file.summary.total_methods} | Passed: ${file.summary.passed_count} | Envy: ${file.summary.failed_count}`,
        10,
        y
      );
      y += 8;

      // Loop untuk setiap method dalam file
      file.methods.forEach((method) => {
        // Jika sudah mencapai batas halaman, buat halaman baru
        if (y > 270) {
          doc.addPage();
          y = 10;
        }

        doc.setFontSize(10);
        doc.text(`Method: ${method.method}`, 10, y);
        y += 5;

        doc.text(`Status: ${method.status}`, 10, y);
        y += 5;

        // Tampilkan metrik jika tersedia
        if (method.metrics) {
          doc.text(
            `Metrics -> ATFD: ${method.metrics.ATFD} | LAA: ${method.metrics.LAA} | FDP: ${method.metrics.FDP}`,
            10,
            y
          );
          y += 5;

          if (method.metrics.foreign_access_by_class) {
            Object.entries(method.metrics.foreign_access_by_class).forEach(
              ([cls, count]) => {
                doc.text(`- ${cls}: ${count}`, 14, y);
                y += 5;
              }
            );
          }

          y += 2;
        }

        // Tampilkan rekomendasi jika feature envy terdeteksi
        if (method.status === 'ENVY DETECTED') {
          doc.text(`Target Class: ${method.dominant_class}`, 10, y);
          y += 5;

          doc.text(`Recommendation:`, 10, y);
          y += 5;

          const lines = doc.splitTextToSize(method.recommendation, 180);
          doc.text(lines, 10, y);
          y += lines.length * 5;
        }

        y += 4;
      });

      y += 5;
    });

    return doc;
};

// Fungsi untuk download PDF report ke perangkat user
export const downloadPDFReport = (doc, filename = 'feature-envy-report.pdf') => {
  if (doc) {
    doc.save(filename);
  }
};

// Fungsi untuk download PDF dari HTML element menggunakan html2pdf
export const downloadPDFFromHTML = async (html2pdfLibrary, elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const options = {
      margin: 0.5,
      filename: 'feature-envy-report.pdf',
      image: {
        type: 'jpeg',
        quality: 1,
      },
      html2canvas: {
        scale: 2,
      },
      jsPDF: {
        unit: 'in',
        format: 'a4',
        orientation: 'portrait',
      },
    };

    await html2pdfLibrary()
      .set(options)
      .from(element)
      .save();
};
