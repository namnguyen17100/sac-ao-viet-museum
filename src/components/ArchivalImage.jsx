import { useState } from 'react';
import { Landmark } from 'lucide-react';

/**
 * Khung ảnh hiện vật chuẩn bảo tàng với cơ chế fallback CSS/SVG không bao giờ vỡ khung hình.
 */
export default function ArchivalImage({
  src,
  alt,
  code,
  caption,
  className = '',
  imgClassName = '',
  style = {}
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#f5ece7] text-[#391a26] p-4 text-center select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-12 h-12 rounded flex items-center justify-center bg-[#efe6e2] text-[#805434] mb-3 border border-[#d3c2c6]">
          <Landmark className="w-6 h-6" strokeWidth={1.5} />
        </div>
        {code && (
          <span className="font-mono text-xs font-semibold tracking-wider text-[#805434] uppercase mb-1">
            {code}
          </span>
        )}
        <p className="font-serif text-sm text-[#391a26] max-w-[22ch] leading-snug mb-0">
          {caption || alt || 'Tư liệu phục dựng số M3'}
        </p>
        <span className="text-[11px] text-[#4f4447] mt-1">
          Bảo tàng Phụ nữ Nam Bộ
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={imgClassName || className}
      style={style}
    />
  );
}
