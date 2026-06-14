# Struktur Arsitektur MVC (Model-View-Controller)

Dokumentasi lengkap tentang struktur kode setelah refactoring ke pola MVC.

## 📁 Struktur Folder

```
eslint.config.js
index.html
package.json
README.md
vite.config.js
public/
src/
	App.css
	App.jsx
	index.css
	main.jsx
	assets/
	models/
		fileModel.js
		analysisModel.js
		pdfModel.js
	controllers/
		useFileController.js
		useAnalyzeController.js
		usePdfController.js
	views/
		sections/
			HeroSection.jsx
			UploadSection.jsx
			SelectedFilesSection.jsx
			AnalyzeSection.jsx
			InfoSection.jsx
		result/
			ResultSummary.jsx
			FileResultCard.jsx
			DownloadPDFButton.jsx
			PDFReport.jsx
		pages/
			UploadPage.jsx
			ResultPage.jsx
	MVC_ARCHITECTURE.md
```

## 🏛️ Penjelasan Pola MVC

### 1. **MODEL** (`src/models/`)
Model menangani semua logika bisnis dan akses data.

#### `fileModel.js` - Fungsi untuk manajemen file
- `addFiles()` - Menambahkan file baru ke array
- `removeFile()` - Menghapus file berdasarkan index
- `getFileCount()` - Mendapatkan jumlah file
- `getTotalFileSize()` - Menghitung ukuran total
- `isValidPhpFile()` - Validasi file PHP
- `clearAllFiles()` - Reset semua file

#### `analysisModel.js` - Fungsi untuk analisis kode
- `analyzeFiles()` - Mengirim file ke API backend
- `mergeDetectionAndMetrics()` - Menggabungkan detection dengan metrics
- `calculateStatistics()` - Menghitung statistik hasil

#### `pdfModel.js` - Fungsi untuk PDF
- `generatePDFReport()` - Generate PDF dari data hasil
- `downloadPDFReport()` - Download PDF ke device
- `downloadPDFFromHTML()` - Download dari HTML element

---

### 2. **CONTROLLER** (`src/controllers/`)
Controller menghubungkan model dengan view dan mengelola logic flow.

#### `useFileController.js` - Custom hook untuk file management
```javascript
const { 
  addFiles, 
  removeFileByIndex, 
  getFileCount, 
  calculateTotalSize, 
  validatePhpFile, 
  clearFiles 
} = useFileController();
```

#### `useAnalyzeController.js` - Custom hook untuk analysis
```javascript
const { 
  handleAnalyzeFiles, 
  getAnalysisStatistics 
} = useAnalyzeController();
```

#### `usePdfController.js` - Custom hook untuk PDF
```javascript
const { 
  downloadPDFReport, 
  generatePDFFromData, 
  savePDFToDevice 
} = usePdfController();
```

---

### 3. **VIEW** (`src/views/`)
View adalah komponen React yang hanya menampilkan UI. View menerima data dan callback dari controller.

#### Komponen Section (Sub-UI)
- `HeroSection.jsx` - Menampilkan hero banner
- `UploadSection.jsx` - Interface upload file/folder
- `SelectedFilesSection.jsx` - Tampil daftar file
- `AnalyzeSection.jsx` - Tombol analyze + status loading
- `InfoSection.jsx` - Informasi metric

#### Komponen Result
- `ResultSummary.jsx` - Ringkasan statistik hasil
- `FileResultCard.jsx` - Table detail per file
- `DownloadPDFButton.jsx` - Tombol download PDF
- `PDFReport.jsx` - Format print-friendly report

#### Page Components
- `UploadPage.jsx` - Halaman upload (menggabungkan berbagai section)
- `ResultPage.jsx` - Halaman hasil (menampilkan hasil analisis)

---

## 🔄 Alur Data dalam MVC

```
┌─────────────────────────────────────────────────────────────┐
│                        USER INTERACTION                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────────┐
        │   VIEW (React Component)         │
        │   - UploadSection.jsx            │
        │   - AnalyzeSection.jsx          │
        └──────────┬──────────────────────┘
                   │ User clicks button / input change
                   │ Calls handler function
                   ▼
        ┌─────────────────────────────────┐
        │   CONTROLLER (Custom Hook)      │
        │   - useFileController()          │
        │   - useAnalyzeController()      │
        └──────────┬──────────────────────┘
                   │ Call model functions
                   │ Pass processed data back to view
                   ▼
        ┌─────────────────────────────────┐
        │   MODEL (Business Logic)        │
        │   - fileModel.js                │
        │   - analysisModel.js            │
        │   - pdfModel.js                 │
        └──────────┬──────────────────────┘
                   │ Return processed data
                   │ Call API if needed
                   ▼
        ┌─────────────────────────────────┐
        │        Backend API               │
        │   http://127.0.0.1:8000/api/...│
        └─────────────────────────────────┘
```

---

## 📝 Contoh Penggunaan

### Menggunakan File Controller
```javascript
import { useFileController } from '../controllers/useFileController';

function MyComponent() {
  const [files, setFiles] = useState([]);
  const { addFiles, getFileCount } = useFileController();

  const handleFileSelect = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => addFiles(prev, newFiles));
  };

  return (
    <div>
      <input onChange={handleFileSelect} />
      <p>Files: {getFileCount(files)}</p>
    </div>
  );
}
```

### Menggunakan Analyze Controller
```javascript
import { useAnalyzeController } from '../controllers/useAnalyzeController';

function MyComponent() {
  const { handleAnalyzeFiles, getAnalysisStatistics } = useAnalyzeController();

  const handleAnalyze = async () => {
    const result = await handleAnalyzeFiles(files);
    const stats = getAnalysisStatistics(result);
    console.log(stats); // { totalFiles, totalMethods, totalEnvy, ... }
  };

  return <button onClick={handleAnalyze}>Analyze</button>;
}
```

---

## ✅ Keuntungan Struktur MVC

1. **Separation of Concerns** - Model, view, dan controller terpisah dengan jelas
2. **Reusability** - Model dan controller bisa digunakan di multiple views
3. **Testability** - Logic di model dan controller mudah di-test tanpa UI
4. **Maintainability** - Kode lebih terorganisir dan mudah dipahami
5. **Scalability** - Mudah menambah fitur baru tanpa mengubah struktur
6. **Code Documentation** - Setiap fungsi memiliki 1 line komentar yang jelas

---

## 📋 Daftar Fungsi dengan Komentar

### Models

**fileModel.js**
- `addFiles` - Menambahkan file baru ke dalam array files
- `removeFile` - Menghapus file dari array berdasarkan index
- `getFileCount` - Menghitung jumlah file yang telah dipilih
- `getTotalFileSize` - Menghitung total ukuran semua file (dalam KB)
- `isValidPhpFile` - Validasi file (hanya menerima .php)
- `clearAllFiles` - Reset/clear semua file

**analysisModel.js**
- `analyzeFiles` - Mengirim file ke API backend untuk analisis
- `mergeDetectionAndMetrics` - Menggabungkan data deteksi dengan data metrik dari API response
- `calculateStatistics` - Menghitung statistik hasil analisis (total methods, passed, failed)

**pdfModel.js**
- `generatePDFReport` - Menghasilkan PDF report dari hasil analisis fitur envy
- `downloadPDFReport` - Download PDF report ke perangkat user
- `downloadPDFFromHTML` - Download PDF dari HTML element menggunakan html2pdf

### Controllers

**useFileController.js**
- `addFiles` - Menambahkan file baru yang dipilih ke dalam array
- `removeFileByIndex` - Menghapus file dari array berdasarkan index
- `getFileCount` - Mendapatkan jumlah file yang dipilih
- `calculateTotalSize` - Menghitung total ukuran semua file
- `validatePhpFile` - Validasi bahwa file adalah file PHP yang valid
- `clearFiles` - Reset/clear semua file yang dipilih

**useAnalyzeController.js**
- `handleAnalyzeFiles` - Mengeksekusi analisis file dan menggabungkan hasil detection dengan metrics
- `getAnalysisStatistics` - Menghitung statistik dari hasil analisis

**usePdfController.js**
- `downloadPDFReport` - Membuat dan download PDF report dari hasil analisis
- `generatePDFFromData` - Generate PDF dari data hasil analisis
- `savePDFToDevice` - Download PDF yang sudah dibuat ke perangkat user

### Views

**UploadSection.jsx**
- `handleSelect` - Menangani perubahan file yang dipilih dari input file/folder

**AnalyzeSection.jsx**
- `handleAnalyze` - Menjalankan proses analisis file ke backend

**ResultSummary.jsx**
- `getTotalFiles` - Menghitung total file yang dianalisis
- `getTotalMethods` - Menghitung total method dari semua file
- `getTotalEnvy` - Menghitung total feature envy yang terdeteksi

**PDFReport.jsx**
- `getTotalFiles` - Menghitung total file yang dianalisis
- `getTotalMethods` - Menghitung total method dari semua file
- `getTotalEnvy` - Menghitung total feature envy yang terdeteksi

**DownloadPDFButton.jsx**
- `downloadPDF` - Mendownload PDF report dari element HTML yang sudah dibuat

**ResultPage.jsx**
- `handleReset` - Menangani klik tombol reset dan kembali ke halaman upload

**UploadPage.jsx** (no explicit functions - page composition)

---

## 🔍 Backward Compatibility

File-file lama di `src/components/` dan `src/components/section/` masih ada sebagai wrapper untuk backward compatibility. Mereka hanya me-re-export komponen dari folder `views/`:

```javascript
// src/components/Upload.jsx
import UploadPage from "../views/UploadPage";

export default function Upload({ setResult }) {
  return <UploadPage setResult={setResult} />;
}
```

Ini memungkinkan kode lama yang mengimpor dari `components/` masih bekerja dengan sempurna.

---

## 🚀 Tips untuk Pengembangan Selanjutnya

1. **Tambah fitur baru di Model** - Jika perlu logic baru, tambahkan fungsi di model
2. **Update Controller** - Jika logic baru perlu di-expose ke view, tambahkan di controller
3. **Create View Component** - Buat view baru untuk menampilkan data
4. **Hindari business logic di View** - View hanya untuk rendering UI
5. **Test Model secara terpisah** - Model bisa di-test tanpa perlu React

---

## 📌 Catatan Penting

- Semua fungsi sudah memiliki 1 baris komentar yang menjelaskan fungsinya
- Struktur tetap sama dengan tampilan UI (tidak berubah)
- Kode lebih mudah dibaca, dipahami, dan di-maintain
- MVC pattern membuat testing lebih mudah
- Views murni hanya untuk rendering (presentational components)
- Business logic terisolasi di Model dan Controller
