// Fungsi untuk menambahkan file baru ke dalam array files
export const addFiles = (currentFiles, newFiles) => {
  return [...currentFiles, ...newFiles];
};

// Fungsi untuk menghapus file dari array berdasarkan index
export const removeFile = (currentFiles, index) => {
  return currentFiles.filter((_, i) => i !== index);
};

// Fungsi untuk menghitung jumlah file yang telah dipilih
export const getFileCount = (files) => {
  return files.length;
};

// Fungsi untuk menghitung total ukuran semua file (dalam KB)
export const getTotalFileSize = (files) => {
  return files.reduce((total, file) => total + file.size, 0) / 1024;
};

// Fungsi untuk validasi file (hanya menerima .php)
export const isValidPhpFile = (file) => {
  return file.type === 'application/x-php' || file.name.endsWith('.php');
};

// Fungsi untuk reset/clear semua file
export const clearAllFiles = () => {
  return [];
};
