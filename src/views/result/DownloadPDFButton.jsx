// View component untuk tombol download PDF report hasil analisis
export default function DownloadPDFButton({ onDownload }) {
  return (
    <button
      onClick={onDownload}
      className="bg-black text-white px-6 py-3 rounded-2xl"
    >
      Download PDF
    </button>
  );
}
