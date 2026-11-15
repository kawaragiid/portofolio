export default function HudCorner({
  className = "",
  color = "text-cyan-400/40",
  size = "text-[10px]",
}: {
  className?: string;
  color?: string;
  size?: string;
}) {
  return (
    <>
      <span className={`absolute top-1.5 left-2 font-mono ${size} ${color} pointer-events-none select-none ${className}`}>+</span>
      <span className={`absolute top-1.5 right-2 font-mono ${size} ${color} pointer-events-none select-none ${className}`}>+</span>
      <span className={`absolute bottom-1.5 left-2 font-mono ${size} ${color} pointer-events-none select-none ${className}`}>+</span>
      <span className={`absolute bottom-1.5 right-2 font-mono ${size} ${color} pointer-events-none select-none ${className}`}>+</span>
    </>
  );
}
