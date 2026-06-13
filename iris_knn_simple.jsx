import { useState } from "react";

const DATA = [
  [5.1,3.5,1.4,0.2,0],[4.9,3.0,1.4,0.2,0],[4.7,3.2,1.3,0.2,0],[5.0,3.6,1.4,0.2,0],[5.4,3.9,1.7,0.4,0],
  [4.6,3.4,1.4,0.3,0],[5.0,3.4,1.5,0.2,0],[4.4,2.9,1.4,0.2,0],[5.1,3.5,1.4,0.3,0],[5.7,3.8,1.7,0.3,0],
  [5.1,3.8,1.5,0.3,0],[5.4,3.4,1.7,0.2,0],[5.1,3.7,1.5,0.4,0],[4.6,3.6,1.0,0.2,0],[5.0,3.0,1.6,0.2,0],
  [5.2,3.5,1.5,0.2,0],[4.7,3.2,1.6,0.2,0],[5.5,4.2,1.4,0.2,0],[4.9,3.1,1.5,0.2,0],[5.0,3.2,1.2,0.2,0],
  [7.0,3.2,4.7,1.4,1],[6.4,3.2,4.5,1.5,1],[6.9,3.1,4.9,1.5,1],[5.5,2.3,4.0,1.3,1],[6.5,2.8,4.6,1.5,1],
  [5.7,2.8,4.5,1.3,1],[6.3,3.3,4.7,1.6,1],[4.9,2.4,3.3,1.0,1],[6.6,2.9,4.6,1.3,1],[5.2,2.7,3.9,1.4,1],
  [5.9,3.0,4.2,1.5,1],[6.0,2.2,4.0,1.0,1],[6.1,2.9,4.7,1.4,1],[5.6,2.9,3.6,1.3,1],[6.7,3.1,4.4,1.4,1],
  [5.8,2.7,4.1,1.0,1],[6.2,2.2,4.5,1.5,1],[5.9,3.2,4.8,1.8,1],[6.1,2.8,4.0,1.3,1],[5.7,2.6,3.5,1.0,1],
  [6.3,3.3,6.0,2.5,2],[5.8,2.7,5.1,1.9,2],[7.1,3.0,5.9,2.1,2],[6.3,2.9,5.6,1.8,2],[6.5,3.0,5.8,2.2,2],
  [7.6,3.0,6.6,2.1,2],[4.9,2.5,4.5,1.7,2],[7.3,2.9,6.3,1.8,2],[6.7,2.5,5.8,1.8,2],[7.2,3.6,6.1,2.5,2],
  [6.5,3.2,5.1,2.0,2],[6.4,2.7,5.3,1.9,2],[6.8,3.0,5.5,2.1,2],[5.7,2.5,5.0,2.0,2],[6.9,3.2,5.7,2.3,2],
  [5.6,2.8,4.9,2.0,2],[7.7,2.8,6.7,2.0,2],[6.7,3.3,5.7,2.1,2],[6.3,2.7,4.9,1.8,2],[6.5,3.0,5.2,2.0,2],
];

const CLASSES = ["Setosa 🌸", "Versicolor 🌼", "Virginica 🌺"];
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b"];
const FEATURES = ["Sepal Length (cm)", "Sepal Width (cm)", "Petal Length (cm)", "Petal Width (cm)"];

function dist(a, b) {
  return Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));
}

function knn(inputs, k) {
  const sorted = DATA
    .map(r => ({ d: dist(inputs, r.slice(0, 4)), label: r[4] }))
    .sort((a, b) => a.d - b.d);
  const votes = [0, 0, 0];
  sorted.slice(0, k).forEach(n => votes[n.label]++);
  return { pred: votes.indexOf(Math.max(...votes)), votes };
}

export default function App() {
  const [inputs, setInputs] = useState([5.1, 3.5, 1.4, 0.2]);
  const [k, setK] = useState(5);
  const { pred, votes } = knn(inputs, k);

  const presets = [
    [5.1, 3.5, 1.4, 0.2],
    [6.0, 2.9, 4.5, 1.5],
    [6.5, 3.0, 5.8, 2.2],
  ];

  return (
    <div style={{ fontFamily: "system-ui,sans-serif", maxWidth: 420, margin: "0 auto",
      padding: 24, background: "#fff", minHeight: "100vh" }}>

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", letterSpacing: 2,
          textTransform: "uppercase", marginBottom: 4 }}>DecodeLabs · Project 2</div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111" }}>Iris Classifier</h1>
        <p style={{ margin: "6px 0 0", color: "#6b7280", fontSize: 14 }}>
          KNN · Supervised Learning
        </p>
      </div>

      {/* Preset buttons */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {presets.map((p, i) => (
          <button key={i} onClick={() => setInputs(p)}
            style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: `2px solid ${COLORS[i]}`,
              background: JSON.stringify(inputs) === JSON.stringify(p) ? COLORS[i] : "#fff",
              color: JSON.stringify(inputs) === JSON.stringify(p) ? "#fff" : COLORS[i],
              fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
            {["Setosa", "Versicolor", "Virginica"][i]}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
        {FEATURES.map((f, i) => (
          <div key={i}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280",
              textTransform: "uppercase", letterSpacing: 0.5, display: "block", marginBottom: 4 }}>
              {f}
            </label>
            <input type="number" step="0.1" value={inputs[i]}
              onChange={e => setInputs(prev => prev.map((v, idx) => idx === i ? +e.target.value : v))}
              style={{ width: "100%", padding: "10px", border: "1.5px solid #e5e7eb",
                borderRadius: 8, fontSize: 16, fontFamily: "monospace", boxSizing: "border-box",
                outline: "none" }} />
          </div>
        ))}
      </div>

      {/* K Slider */}
      <div style={{ marginBottom: 24, padding: "14px 16px", background: "#f9fafb",
        borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>K =</span>
        <input type="range" min={1} max={15} step={2} value={k}
          onChange={e => setK(+e.target.value)}
          style={{ flex: 1, accentColor: "#3b82f6" }} />
        <span style={{ fontSize: 20, fontWeight: 800, color: "#3b82f6",
          fontFamily: "monospace", minWidth: 28, textAlign: "center" }}>{k}</span>
      </div>

      {/* Result */}
      <div style={{ padding: "20px", borderRadius: 14, border: `2px solid ${COLORS[pred]}`,
        background: COLORS[pred] + "10", marginBottom: 24 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase",
          letterSpacing: 1.5, marginBottom: 6 }}>Prediction</div>
        <div style={{ fontSize: 26, fontWeight: 900, color: COLORS[pred] }}>
          {CLASSES[pred]}
        </div>
      </div>

      {/* Vote bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af",
          textTransform: "uppercase", letterSpacing: 1.5 }}>Neighbour Votes</div>
        {CLASSES.map((c, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: "space-between",
              fontSize: 13, marginBottom: 4 }}>
              <span style={{ color: COLORS[i], fontWeight: 600 }}>{c}</span>
              <span style={{ color: "#374151", fontFamily: "monospace" }}>{votes[i]} / {k}</span>
            </div>
            <div style={{ background: "#f3f4f6", borderRadius: 99, height: 8 }}>
              <div style={{ width: `${(votes[i] / k) * 100}%`, background: COLORS[i],
                borderRadius: 99, height: 8, transition: "width .3s" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
