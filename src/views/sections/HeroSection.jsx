// View component untuk menampilkan bagian hero/banner dengan informasi aplikasi
export default function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-3xl p-10 shadow-xl overflow-hidden relative">

      <div className="absolute right-0 top-0 opacity-10 text-[200px] font-bold pointer-events-none select-none">
        {"</>"}
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="uppercase tracking-widest text-gray-300 text-sm mb-3">
          Static Code Analysis
        </p>

        <h1 className="text-4xl font-bold leading-tight mb-4">
          Feature Envy Detection Tool
        </h1>

        <p className="text-gray-300 leading-relaxed">
          Analyze PHP source code using Abstract Syntax Tree (AST)
          and software metrics such as ATFD, LAA, and FDP
          to detect Feature Envy automatically. Only works with propertyfetch!
        </p>

        <div className="flex gap-4 mt-6">
          <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur">
            ⚡ AST Parsing
          </div>

          <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur">
            📊 Metrics Analysis
          </div>

          <div className="bg-white/10 px-4 py-2 rounded-xl backdrop-blur">
            🧠 Feature Envy Detection
          </div>
        </div>
      </div>
    </div>
  );
}
