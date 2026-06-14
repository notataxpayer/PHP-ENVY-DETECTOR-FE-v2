# Struktur Arsitektur MVC - REFACTORED v2 (Proper Separation of Concerns)

Dokumentasi lengkap tentang struktur kode dengan proper separation of concerns.

## 📁 Struktur Folder (FINAL)

```
src/
├── models/                    # Model - Pure business logic (tanpa React)
│   ├── fileModel.js          # File upload logic
│   ├── analysisModel.js      # API analysis & data processing
│   └── pdfModel.js           # PDF generation logic
│
├── controllers/              # Controller - Application logic & orchestration
│   ├── useFileController.js  # File management + handlers
│   ├── useAnalyzeController.js # Analysis + calculations + reset
│   └── usePdfController.js   # PDF operations
│
├── views/                    # View - Pure presentational components
│   ├── pages/               # Page-level components (handle routing logic)
│   │   ├── UploadPage.jsx   # Upload flow with controller logic
│   │   └── ResultPage.jsx   # Result flow with controller logic
│   │
│   ├── sections/            # Reusable section components (NO LOGIC)
│   │   ├── HeroSection.jsx
│   │   ├── UploadSection.jsx
│   │   ├── SelectedFilesSection.jsx
│   │   ├── AnalyzeSection.jsx
│   │   └── InfoSection.jsx
│   │
│   └── result/              # Reusable result components (NO LOGIC)
│       ├── ResultSummary.jsx
│       ├── FileResultCard.jsx
│       ├── DownloadPDFButton.jsx
│       └── PDFReport.jsx
│
├── App.jsx                  # Main routing component
└── main.jsx
```

---

## 🏛️ Penjelasan Arsitektur MVC yang PROPER

### **LAYER 1: MODEL** (Pure Business Logic)
Model adalah JavaScript functions yang **TIDAK punya React dependency**. Pure functions yang bisa di-test tanpa UI.

**fileModel.js** - 6 pure functions
- `addFiles(currentFiles, newFiles)` - Menambah file array
- `removeFile(currentFiles, index)` - Hapus file
- `getFileCount(files)` - Hitung jumlah file
- `getTotalFileSize(files)` - Hitung ukuran total
- `isValidPhpFile(file)` - Validasi file
- `clearAllFiles()` - Reset files

**analysisModel.js** - 3 pure functions  
- `analyzeFiles(files)` - Call API analysis
- `mergeDetectionAndMetrics(detection, metrics)` - Merge response data
- `calculateStatistics(data)` - Hitung stats (total files, methods, envy)

**pdfModel.js** - 3 pure functions
- `generatePDFReport(result)` - Generate PDF doc
- `downloadPDFReport(doc, filename)` - Download PDF
- `downloadPDFFromHTML(html2pdfLib, elementId)` - Download dari HTML

---

### **LAYER 2: CONTROLLER** (Application Logic & Orchestration)
Controller adalah custom hooks yang **menghubungkan Model dengan View**. Mereka:
- Memanggil model functions
- Mengelola state UI (loading, errors)
- Menangani event handlers
- Melakukan calculations untuk di-pass ke view

**useFileController.js** - File management controller
```javascript
const fileController = useFileController();

// Semua ini di-pass ke View sebagai callbacks
fileController.handleAddFiles(currentFiles, newFiles)
fileController.handleSelectFiles(event, setFiles)  // dari input element
fileController.handleGetFileCount(files)
fileController.handleClearFiles()
```

**useAnalyzeController.js** - Analysis controller
```javascript
const analyzeController = useAnalyzeController();

// Semua ini di-pass ke View
analyzeController.handleAnalyzeFiles(files, setLoading, setResult)  // dari button click
analyzeController.handleCalculateTotalFiles(data)  // untuk display
analyzeController.handleCalculateTotalMethods(data)
analyzeController.handleCalculateTotalEnvy(data)
analyzeController.handleResetAnalysis(setResult, setFiles)
```

**usePdfController.js** - PDF controller
```javascript
const pdfController = usePdfController();

pdfController.handleDownloadPDFFromHTML("pdf-report")  // dari button
```

---

### **LAYER 3: VIEW** (Pure Presentational Components)
View **HANYA untuk rendering UI**. TIDAK boleh ada:
- ❌ Logika bisnis
- ❌ API calls
- ❌ Calculations
- ❌ State management (kecuali ref untuk input element)

View hanya menerima:
- ✅ Props (data & callbacks)
- ✅ useRef untuk HTML elements (input, buttons)

#### **Sections** - Reusable UI blocks
```javascript
// ✅ BENAR - Pure rendering
function UploadSection({ onFileSelect }) {
  const inputRef = useRef();
  return (
    <input onChange={onFileSelect} ref={inputRef} />
  );
}

// ❌ SALAH - Ada logic
function UploadSection({ files, setFiles }) {
  const handleSelect = (e) => setFiles([...files, ...e.target.files]);
  return <input onChange={handleSelect} />;
}
```

#### **Result Components** - Display analysis results
```javascript
// ✅ BENAR - Hanya display dengan props
function ResultSummary({ totalFiles, totalMethods, totalEnvy }) {
  return (
    <div>
      <p>{totalFiles}</p>
      <p>{totalMethods}</p>
      <p>{totalEnvy}</p>
    </div>
  );
}

// ❌ SALAH - Ada calculation logic
function ResultSummary({ data }) {
  const totalFiles = data.length;  // ← LOGIC! Harus di controller
  return <p>{totalFiles}</p>;
}
```

#### **Pages** - Container components dengan logic
Pages adalah "smart components" yang:
- Menggunakan controllers untuk handle logic
- Pass callbacks ke section/result components
- Mengelola state yang dibutuhkan

```javascript
// UploadPage - menghubungkan sections dengan controllers
function UploadPage({ setResult }) {
  const [loading, setLoading] = useState(false);
  const fileController = useFileController();
  const analyzeController = useAnalyzeController();

  // Dari UploadSection
  const handleFileSelect = (event) => {
    fileController.handleSelectFiles(event, setFiles);
  };

  // Dari AnalyzeSection
  const handleAnalyzeClick = async () => {
    await analyzeController.handleAnalyzeFiles(files, setLoading, setResult);
  };

  return (
    <>
      <UploadSection onFileSelect={handleFileSelect} />
      <AnalyzeSection loading={loading} onAnalyze={handleAnalyzeClick} />
    </>
  );
}
```

---

## 🔄 Alur Data yang PROPER

```
USER INTERACTION
       ↓
┌──────────────────────┐
│   VIEW (Sections)    │  ← Pure rendering, menerima props & callbacks
│  - UploadSection     │
│  - AnalyzeSection    │
└──────────┬───────────┘
           │ User clicks button
           │ Calls callback: onFileSelect(event), onAnalyze()
           ↓
┌──────────────────────┐
│  PAGE (Smart)        │  ← Handle flow & state
│  - UploadPage        │     Orchestrate controller calls
└──────────┬───────────┘
           │ Call controller methods
           ↓
┌──────────────────────┐
│   CONTROLLER         │  ← Application logic
│ useFileController    │    - Validate
│ useAnalyzeController │    - Process
│                      │    - Update state
└──────────┬───────────┘
           │ Call model functions
           ↓
┌──────────────────────┐
│      MODEL           │  ← Pure business logic
│  fileModel.js        │    - No React dependency
│  analysisModel.js    │    - Testable
└──────────┬───────────┘
           │ Call API / return data
           ↓
┌──────────────────────┐
│    BACKEND API       │
│ /api/analyze         │
└──────────────────────┘
```

---

## 📝 Contoh Flow yang PROPER

### Upload & Analyze Flow

**1. User selects file (UploadSection)**
```javascript
<input onChange={onFileSelect} />  // Call page callback
```

**2. Page receives callback (UploadPage)**
```javascript
const handleFileSelect = (event) => {
  fileController.handleSelectFiles(event, setFiles);
  // setFiles now updated
};
```

**3. Controller handles it (useFileController)**
```javascript
const handleSelectFiles = (event, setFiles) => {
  const selected = Array.from(event.target.files);
  setFiles((prev) => handleAddFiles(prev, selected));  // Call model
};
```

**4. Model processes (fileModel)**
```javascript
const addFiles = (currentFiles, newFiles) => {
  return [...currentFiles, ...newFiles];  // Pure logic
};
```

---

### Result Display Flow

**1. Controller calculates stats (ResultPage)**
```javascript
const totalFiles = analyzeController.handleCalculateTotalFiles(data);
const totalMethods = analyzeController.handleCalculateTotalMethods(data);
```

**2. Controller calls model (useAnalyzeController)**
```javascript
const handleCalculateTotalFiles = (data) => {
  return calculateStatistics(data).totalFiles;  // Call model
};
```

**3. Model does math (analysisModel)**
```javascript
const calculateStatistics = (data) => ({
  totalFiles: data.length,
  totalMethods: data.reduce(...),
  totalEnvy: data.reduce(...)
});
```

**4. View just displays (ResultSummary)**
```javascript
<p>{totalFiles}</p>  // Just rendering
```

---

## ✅ Checklist MVC yang PROPER

### View Checklist
- ✅ Hanya menerima props (data + callbacks)
- ✅ Tidak ada state management (kecuali useRef)
- ✅ Tidak ada API calls
- ✅ Tidak ada calculations
- ✅ Tidak ada event handlers dengan logic (hanya callbacks)
- ✅ Pure functional component

### Controller Checklist
- ✅ Menggunakan custom hook (useXyzController)
- ✅ Memanggil model functions
- ✅ Mengelola state ui (loading, errors)
- ✅ Return handlers & utility functions
- ✅ Tidak ada JSX/React elements

### Model Checklist
- ✅ Pure functions (no React dependency)
- ✅ Testable tanpa UI
- ✅ Business logic saja
- ✅ Tidak ada state
- ✅ Reusable di berbagai aplikasi

---

## 🚀 Keuntungan Arsitektur Ini

1. **Proper Separation** - Setiap layer truly terpisah dengan jelas
2. **Testability** - Model & controller bisa di-test tanpa rendering
3. **Reusability** - Model bisa dipakai di native/desktop/CLI apps
4. **Maintainability** - Bug fix/changes isolated ke satu layer
5. **Scalability** - Mudah menambah fitur & view baru
6. **Readability** - Kode lebih mudah dipahami & di-debug
7. **Performance** - Controllers dapat di-optimize tanpa affect views
