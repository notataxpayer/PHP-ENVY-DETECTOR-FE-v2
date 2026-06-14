import { addFiles, removeFile, getFileCount, getTotalFileSize, isValidPhpFile, clearAllFiles } from '../models/fileModel';

// Controller untuk menangani logika upload dan manajemen file
export const useFileController = () => {
  // Fungsi untuk menambahkan file baru yang dipilih ke dalam array
  const handleAddFiles = (currentFiles, newFiles) => {
    return addFiles(currentFiles, newFiles);
  };

  // Fungsi untuk menghapus file dari array berdasarkan index
  const handleRemoveFile = (currentFiles, index) => {
    return removeFile(currentFiles, index);
  };

  // Fungsi untuk mendapatkan jumlah file yang dipilih
  const handleGetFileCount = (files) => {
    return getFileCount(files);
  };

  // Fungsi untuk menghitung total ukuran semua file
  const handleCalculateTotalSize = (files) => {
    return getTotalFileSize(files);
  };

  // Fungsi untuk validasi bahwa file adalah file PHP yang valid
  const handleValidatePhpFile = (file) => {
    return isValidPhpFile(file);
  };

  // Fungsi untuk reset/clear semua file yang dipilih
  const handleClearFiles = () => {
    return clearAllFiles();
  };

  // Fungsi untuk handle file selection dari input element (digunakan dari view)
  const handleSelectFiles = (event, setFiles) => {
    const selected = Array.from(event.target.files);
    setFiles((prev) => handleAddFiles(prev, selected));
  };

  return {
    handleAddFiles,
    handleRemoveFile,
    handleGetFileCount,
    handleCalculateTotalSize,
    handleValidatePhpFile,
    handleClearFiles,
    handleSelectFiles,
  };
};
