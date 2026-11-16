export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-orb ambient-orb--one" />
      <div className="ambient-orb ambient-orb--two" />
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-void via-void/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void via-void/70 to-transparent" />
    </div>
  );
}

export function NoiseOverlay() {
  return <div aria-hidden="true" className="noise-layer pointer-events-none fixed inset-0 z-[70]" />;
}
