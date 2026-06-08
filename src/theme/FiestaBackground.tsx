export function FiestaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-fiesta-indigo" />
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(197, 41, 157, 0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(27, 153, 139, 0.2) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 20%, rgba(244, 161, 39, 0.15) 0%, transparent 45%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 70%, #fff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
    </div>
  )
}
