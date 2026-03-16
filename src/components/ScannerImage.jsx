import HudCorners from './HudCorners'

export default function ScannerImage({ src, alt, className = "" }) {
  return (
    <div className={`scanner-container ${className}`}>
      <HudCorners />
      <div className="scanner-line"></div>
      <img src={src} alt={alt} className="scanner-img" />
      <div className="scanner-overlay"></div>
    </div>
  )
}
