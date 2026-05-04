import axios from "axios";
import { useRef, useState } from "react";

export default function Upload({ setResult }) {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files[]", files[i]);
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/analyze",
        formData
      );

      setResult(res.data.detection);

      inputRef.current.value = "";

    } catch (err) {
    //   alert("Upload gagal");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
        <div className="space-y-4">
            <div>
                <label className="block font-semibold mb-1">
                Upload File (.php)
                </label>
                <input
                type="file"
                multiple
                accept=".php"
                onChange={handleUpload}
                className="block"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">
                Upload Folder
                </label>
                <input
                type="file"
                multiple
                webkitdirectory="true"
                onChange={handleUpload}
                className="block"
                />
            </div>
        </div>
      {loading && (
        <p className="text-blue-500">Analyzing...</p>
      )}
    </div>
  );
}