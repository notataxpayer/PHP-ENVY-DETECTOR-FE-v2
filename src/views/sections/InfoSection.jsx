// View component untuk menampilkan informasi metric ATFD, LAA, dan FDP
export default function InfoSection() {
  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="text-4xl mb-4">📊</div>

        <h3 className="font-bold text-lg mb-2">
          ATFD
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          Measures how many foreign attributes
          are accessed by a method.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="text-4xl mb-4">🧠</div>

        <h3 className="font-bold text-lg mb-2">
          LAA
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          Measures locality of attribute accesses
          inside a method.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow">
        <div className="text-4xl mb-4">⚡</div>

        <h3 className="font-bold text-lg mb-2">
          FDP
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          Measures the number of foreign
          data providers used by a method.
        </p>
      </div>
    </div>
  );
}
