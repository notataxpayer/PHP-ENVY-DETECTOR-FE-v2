import { useState } from "react";

import UploadPage from "./views/pages/UploadPage";
import ResultPage from "./views/pages/ResultPage";

// Main App component - Fungsi untuk mengelola state global dan routing utama aplikasi
function App() {

  const [result, setResult] = useState(null);
  const [files, setFiles] = useState([]);

  // Fungsi untuk reset hasil analisis dan kembali ke halaman upload
  const handleReset = () => {
    setResult(null);
    setFiles([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {!result && (
        <UploadPage setResult={setResult} />
      )}

      {result && (
        <ResultPage
          data={result}
          onReset={handleReset}
          setFiles={setFiles}
        />
      )}

    </div>
  );
}

export default App;