function MethodSymbol({ kind }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      {kind === "culture" && <>
        <ellipse cx="32" cy="32" rx="25" ry="19" />
        <path d="M7 32v7c0 11 11 19 25 19s25-8 25-19v-7" />
        <ellipse cx="25" cy="28" rx="6" ry="4" /><ellipse cx="40" cy="37" rx="6" ry="4" />
        <circle cx="40" cy="23" r="2" fill="currentColor" stroke="none" />
        <circle cx="22" cy="39" r="2" fill="currentColor" stroke="none" />
      </>}
      {kind === "imaging" && <>
        <path d="M8 24V10h14M42 10h14v14M56 40v14H42M22 54H8V40" />
        <path d="M21 22c7-7 12 0 16 1s12 3 10 11-9 15-16 10-17-3-15-12 2-7 5-10Z" />
        <circle cx="32" cy="33" r="6" /><path d="M4 32h8M52 32h8M32 4v8M32 52v8" />
      </>}
      {kind === "analysis" && <>
        <path d="M10 9v45h46" />
        {[[20,39],[25,33],[22,29],[32,35],[38,23],[42,29],[45,18],[50,23],[30,43]].map(([x,y]) =>
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="currentColor" stroke="none" />
        )}
        <path d="m17 44 13-12 11-3 12-15" strokeDasharray="2 4" />
      </>}
    </svg>
  );
}

export default function ResearchMethods() {
  return (
    <aside className="research-methods" aria-label="Experimental and computational methods">
      <p className="eyebrow">At the Bench & in the Data</p>
      <ul>
        {[
          ["culture", "Cell Culture", "Stromal Cells & T-cells"],
          ["imaging", "Imaging", "Immunofluorescence & Confocal Microscopy"],
          ["analysis", "Analysis", "Single Cell & Spatial Transcriptomics"],
        ].map(([kind, title, description]) => (
          <li key={kind}>
            <div className="method-symbol"><MethodSymbol kind={kind} /></div>
            <div><h4>{title}</h4><p>{description}</p></div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
