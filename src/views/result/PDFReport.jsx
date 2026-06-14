// View component untuk format PDF report yang siap di-download
export default function PDFReport({ data, totalFiles, totalMethods, totalEnvy }) {
  return (
    <div
      id="pdf-report"
      style={{
        background: "#ffffff",
        padding: "40px",
        color: "#111827",
        fontFamily: "Arial",
      }}
    >

      {/* REPORT HEADER */}
      <div
        style={{
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Feature Envy Analysis Report
        </h1>

        <p style={{ color: "#6b7280" }}>
          Generated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* SUMMARY STATISTICS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
        }}
      >

        <div
          style={{
            flex: 1,
            background: "#f3f4f6",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <p>Total Files</p>

          <h2
            style={{
              fontSize: "32px",
              marginTop: "10px",
            }}
          >
            {totalFiles}
          </h2>
        </div>

        <div
          style={{
            flex: 1,
            background: "#f3f4f6",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <p>Total Methods</p>

          <h2
            style={{
              fontSize: "32px",
              marginTop: "10px",
            }}
          >
            {totalMethods}
          </h2>
        </div>

        <div
          style={{
            flex: 1,
            background: "#fef2f2",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <p style={{ color: "#dc2626" }}>Feature Envy Found</p>

          <h2
            style={{
              fontSize: "32px",
              color: "#dc2626",
              marginTop: "10px",
            }}
          >
            {totalEnvy}
          </h2>
        </div>

      </div>

      {/* DETAILED RESULTS */}
      {data.map((file, fileIndex) => (
        <div
          key={fileIndex}
          style={{
            marginBottom: "30px",
            pageBreakInside: "avoid",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "15px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "10px",
            }}
          >
            📄 {file.file}
          </h2>

          <p style={{ marginBottom: "10px", color: "#6b7280" }}>
            Total Methods: {file.summary.total_methods} | 
            Passed: {file.summary.passed_count} | 
            Envy: {file.summary.failed_count}
          </p>

          {/* METHODS */}
          {file.methods.map((method, methodIndex) => (
            <div
              key={methodIndex}
              style={{
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {method.method}
              </p>

              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                Status: {method.status}
              </p>

              {method.metrics && (
                <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Metrics - ATFD: {method.metrics.ATFD} | LAA: {method.metrics.LAA} | FDP: {method.metrics.FDP}
                </p>
              )}

              {method.status === "ENVY DETECTED" && (
                <div style={{ marginTop: "10px", backgroundColor: "#fef2f2", padding: "8px", borderRadius: "4px" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>
                    Target Class: {method.dominant_class}
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    💡 {method.recommendation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

    </div>
  );
}

  return (
    <div
      id="pdf-report"
      style={{
        background: "#ffffff",
        padding: "40px",
        color: "#111827",
        fontFamily: "Arial",
      }}
    >

      {/* REPORT HEADER */}
      <div
        style={{
          borderBottom: "2px solid #e5e7eb",
          paddingBottom: "20px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Feature Envy Analysis Report
        </h1>

        <p style={{ color: "#6b7280" }}>
          Generated: {new Date().toLocaleString()}
        </p>
      </div>

      {/* SUMMARY STATISTICS */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "40px",
        }}
      >

        <div
          style={{
            flex: 1,
            background: "#f3f4f6",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <p>Total Files</p>

          <h2
            style={{
              fontSize: "32px",
              marginTop: "10px",
            }}
          >
            {totalFiles}
          </h2>
        </div>

        <div
          style={{
            flex: 1,
            background: "#f3f4f6",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <p>Total Methods</p>

          <h2
            style={{
              fontSize: "32px",
              marginTop: "10px",
            }}
          >
            {totalMethods}
          </h2>
        </div>

        <div
          style={{
            flex: 1,
            background: "#fef2f2",
            padding: "20px",
            borderRadius: "12px",
          }}
        >
          <p style={{ color: "#dc2626" }}>Feature Envy Found</p>

          <h2
            style={{
              fontSize: "32px",
              color: "#dc2626",
              marginTop: "10px",
            }}
          >
            {totalEnvy}
          </h2>
        </div>

      </div>

      {/* DETAILED RESULTS */}
      {data.map((file, fileIndex) => (
        <div
          key={fileIndex}
          style={{
            marginBottom: "30px",
            pageBreakInside: "avoid",
          }}
        >
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              marginBottom: "15px",
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "10px",
            }}
          >
            📄 {file.file}
          </h2>

          <p style={{ marginBottom: "10px", color: "#6b7280" }}>
            Total Methods: {file.summary.total_methods} | 
            Passed: {file.summary.passed_count} | 
            Envy: {file.summary.failed_count}
          </p>

          {/* METHODS */}
          {file.methods.map((method, methodIndex) => (
            <div
              key={methodIndex}
              style={{
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#f9fafb",
                borderRadius: "8px",
              }}
            >
              <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                {method.method}
              </p>

              <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                Status: {method.status}
              </p>

              {method.metrics && (
                <p style={{ fontSize: "12px", marginBottom: "5px" }}>
                  Metrics - ATFD: {method.metrics.ATFD} | LAA: {method.metrics.LAA} | FDP: {method.metrics.FDP}
                </p>
              )}

              {method.status === "ENVY DETECTED" && (
                <div style={{ marginTop: "10px", backgroundColor: "#fef2f2", padding: "8px", borderRadius: "4px" }}>
                  <p style={{ fontSize: "12px", fontWeight: "bold", marginBottom: "5px" }}>
                    Target Class: {method.dominant_class}
                  </p>
                  <p style={{ fontSize: "12px" }}>
                    💡 {method.recommendation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      ))}

    </div>
  );
}
