import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Calendar,
  Camera,
  Check,
  Code2,
  Copy,
  Database,
  ExternalLink,
  Eye,
  Gavel,
  Landmark,
  PauseCircle,
  Ruler,
  Verified,
  Volume2,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import ArchivalImage from '../components/ArchivalImage.jsx';
import { artifactService } from '../services/artifactService.js';

export default function ArtifactDetailPage() {
  const { code } = useParams();
  const [artifact, setArtifact] = useState(null);
  const [adjacent, setAdjacent] = useState({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isZoomed, setIsZoomed] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [showJsonLd, setShowJsonLd] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [bookmarkedCodes, setBookmarkedCodes] = useState(() => artifactService.getBookmarkedCodes());

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    setIsZoomed(false);
    setShowJsonLd(false);

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    }

    Promise.all([
      artifactService.getArtifactByCode(code),
      artifactService.getAdjacentArtifacts(code)
    ])
      .then(([item, adj]) => {
        if (!active) return;
        setArtifact(item);
        setAdjacent(adj);
        setLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        setError(err.message || 'Không tìm thấy hồ sơ');
        setLoading(false);
      });

    return () => {
      active = false;
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [code]);

  const handleToggleRead = () => {
    if (!artifact) return;

    if (isReading) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsReading(false);
      return;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${artifact.title}. ${artifact.subtitle}. ${artifact.narratives.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      window.speechSynthesis.speak(utterance);
    }
    setIsReading(true);
  };

  const handleToggleBookmark = () => {
    if (!artifact) return;
    setBookmarkedCodes(artifactService.toggleBookmark(artifact.code));
  };

  const handleCopyJsonLd = () => {
    if (!artifact) return;
    const jsonPayload = JSON.stringify(
      {
        '@context': 'https://dublincore.org/specifications/dublin-core/dcmi-terms/',
        ...artifact.dublinCore
      },
      null,
      2
    );
    if (navigator.clipboard) {
      navigator.clipboard.writeText(jsonPayload);
    }
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 py-20 text-center text-sm text-[#4f4447]">
        Đang tải hồ sơ hiện vật {code}...
      </div>
    );
  }

  if (error || !artifact) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-[#391a26] mb-2">
          Không tìm thấy hồ sơ hiện vật
        </h1>
        <p className="text-sm text-[#4f4447] mb-6">{error}</p>
        <Link to="/bo-suu-tap" className="museum-btn-primary px-5 py-2.5 text-xs font-semibold uppercase">
          Quay lại Bộ sưu tập 15 hồ sơ
        </Link>
      </div>
    );
  }

  const isBookmarked = bookmarkedCodes.includes(artifact.code);

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 pt-6 pb-14">
      {/* Breadcrumb & Archival Context */}
      <nav aria-label="Đường dẫn lưu trữ" className="flex flex-wrap items-center gap-2 text-xs text-[#4f4447] font-serif mb-4">
        <Link to="/" className="hover:text-[#391a26] flex items-center gap-1">
          <Landmark className="w-3.5 h-3.5 text-[#805434]" />
          <span>Trang chủ</span>
        </Link>
        <span>/</span>
        <Link to="/bo-suu-tap" className="hover:text-[#391a26]">
          Bộ sưu tập
        </Link>
        <span>/</span>
        <span className="text-[#805434] font-medium">
          Hồ sơ {artifact.code} · {artifact.shortTitle}
        </span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-[#d3c2c6]">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#391a26]">
            Kho lưu trữ di sản M3
          </span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[#805434] font-semibold">
            {artifact.dublinCore.identifier}
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-[#4f4447] font-serif">
            Giám định số: Đã đồng bộ tài liệu gốc
          </span>
        </div>

        <button
          type="button"
          onClick={handleToggleBookmark}
          className={`px-3.5 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
            isBookmarked
              ? 'bg-[#805434] text-[#ffffff]'
              : 'bg-[#f5ece7] border border-[#d3c2c6] text-[#391a26] hover:bg-[#efe6e2]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" fill={isBookmarked ? 'currentColor' : 'none'} />
          <span>{isBookmarked ? 'Đã lưu vào ghi chú' : 'Lưu hồ sơ'}</span>
        </button>
      </div>

      {/* Main 2-Column Curatorial Canvas */}
      <div className="row g-4 g-lg-5 align-items-start">
        {/* LEFT COLUMN */}
        <div className="col-12 col-lg-5 flex flex-col gap-4">
          <div className="museum-card p-4">
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="font-semibold uppercase tracking-wider text-[#391a26]">
                Phục dựng đồ họa 2D
              </span>
              <span className="font-serif italic text-[#4f4447]">
                Bảo quản: {artifact.physicalSpecs.conservationTemp}
              </span>
            </div>

            <div className="relative w-full h-[460px] rounded overflow-hidden bg-[#fbf2ed] flex items-center justify-center">
              <ArchivalImage
                src={artifact.detailImageUrl || artifact.imageUrl}
                alt={artifact.title}
                code={artifact.code}
                caption={artifact.shortTitle}
                imgClassName="w-full h-full object-cover transition-transform duration-300"
                style={{ transform: isZoomed ? 'scale(1.4)' : 'scale(1)' }}
              />
              <button
                type="button"
                onClick={() => setIsZoomed((prev) => !prev)}
                className="absolute bottom-3 right-3 bg-[#fff8f5]/95 border border-[#d3c2c6] text-[#391a26] hover:bg-[#522f3c] hover:text-[#fff8f5] px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isZoomed ? <ZoomOut className="w-4 h-4" /> : <ZoomIn className="w-4 h-4" />}
                <span>{isZoomed ? 'Thu nhỏ góc nhìn' : 'Soi chi tiết dệt'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-[#4f4447] font-serif pt-3 pb-4 border-b border-[#d3c2c6]/60">
              <span>Đồ họa minh họa mô phỏng</span>
              <span>{artifact.physicalSpecs.scaleRatio}</span>
            </div>

            {/* Copyright Warning */}
            <div className="bg-[#f5ece7] border border-[#d3c2c6] rounded p-3.5 mt-4 flex items-start gap-3">
              <Gavel className="w-5 h-5 text-[#805434] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#391a26] mb-1">
                  Lưu ý bản quyền &amp; Tình trạng cấp phép ảnh
                </h4>
                <p className="font-serif text-xs text-[#4f4447] mb-0 leading-relaxed">
                  Hình ảnh minh họa đồ họa học thuật mô phỏng hiện vật, không phải ảnh chụp nguyên bản của bảo tàng. Tình trạng:{' '}
                  <strong className="text-[#805434]">{artifact.dublinCore.licenseStatus}</strong>. Nghiêm cấm sao chép phục vụ mục đích thương mại.
                </p>
              </div>
            </div>

            {/* Physical Specs */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase font-semibold tracking-wider text-[#391a26] flex items-center gap-1.5">
                  <Ruler className="w-4 h-4 text-[#805434]" />
                  <span>Thông số vật lý &amp; Hiện trạng</span>
                </span>
                <span className="font-serif text-xs text-[#805434] italic">
                  {artifact.physicalSpecs.inspectionYear}
                </span>
              </div>

              <div className="row g-2 text-xs">
                <div className="col-6">
                  <div className="bg-[#fbf2ed] p-2.5 rounded border border-[#d3c2c6]/40 h-full">
                    <span className="text-[#817477] block">Chất liệu chính</span>
                    <span className="font-medium text-[#1e1b18] mt-0.5 block">
                      {artifact.physicalSpecs.material}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-[#fbf2ed] p-2.5 rounded border border-[#d3c2c6]/40 h-full">
                    <span className="text-[#817477] block">Sắc thái nguyên bản</span>
                    <span className="font-medium text-[#1e1b18] mt-0.5 block">
                      {artifact.physicalSpecs.colorTone}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-[#fbf2ed] p-2.5 rounded border border-[#d3c2c6]/40 h-full">
                    <span className="text-[#817477] block">Kích thước / Quy cách</span>
                    <span className="font-medium text-[#1e1b18] mt-0.5 block">
                      {artifact.physicalSpecs.dimensions}
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="bg-[#fbf2ed] p-2.5 rounded border border-[#d3c2c6]/40 h-full">
                    <span className="text-[#817477] block">Cấu trúc đóng mở</span>
                    <span className="font-medium text-[#1e1b18] mt-0.5 block">
                      {artifact.physicalSpecs.closure}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="bg-[#fbf2ed] p-2.5 rounded border border-[#d3c2c6]/40">
                    <span className="text-[#817477] block">Tình trạng bảo quản</span>
                    <span className="font-medium text-[#1e1b18] mt-0.5 block">
                      {artifact.physicalSpecs.condition}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pigment Breakdown */}
            <div className="mt-4 bg-[#efe6e2] rounded p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="uppercase font-semibold text-[#4f4447]">Mã màu di sản:</span>
              <div className="flex flex-wrap items-center gap-3">
                {artifact.pigments.map((pig) => (
                  <span key={pig.label} className="inline-flex items-center gap-1.5 text-[#391a26]">
                    <span
                      className="w-3.5 h-3.5 rounded-sm border border-[#d3c2c6] inline-block"
                      style={{ backgroundColor: pig.hex }}
                    />
                    {pig.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Secondary Archival Photo */}
          <div className="museum-card p-4">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#391a26] flex items-center gap-1.5 mb-3">
              <Camera className="w-4 h-4 text-[#805434]" />
              <span>Tư liệu hình ảnh đối chiếu liên quan</span>
            </span>
            <div className="relative w-full h-52 rounded overflow-hidden bg-[#f5ece7] mb-2">
              <ArchivalImage
                src={artifact.secondaryImageUrl || artifact.imageUrl}
                alt={artifact.secondaryCaption}
                code={artifact.code}
                caption={artifact.secondaryCaption}
                imgClassName="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e1b18]/80 to-transparent p-3 text-[#fff8f5] font-serif text-xs">
                {artifact.secondaryCaption}
              </div>
            </div>
            <p className="font-serif text-xs text-[#4f4447] mb-0">
              {artifact.secondaryNote}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-12 col-lg-7 flex flex-col gap-4">
          {/* Header Card */}
          <div className="museum-card p-5 md:p-6">
            <div className="text-xs text-[#805434] font-semibold uppercase tracking-wider mb-2">
              <span className="font-mono">{artifact.code}</span>
              <span className="mx-2">·</span>
              <span>{artifact.roomLabel}</span>
              <span className="mx-2">·</span>
              <span>{artifact.typeLabel}</span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-semibold text-[#391a26] leading-snug mb-3">
              {artifact.title}
            </h1>

            <p className="font-serif text-base text-[#4f4447] italic leading-relaxed mb-4">
              "{artifact.subtitle}"
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-[#4f4447] pt-3 border-t border-[#d3c2c6]/60 tabular-nums">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#805434]" />
                Lập hồ sơ: {artifact.recordDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-[#805434]" />
                Lượt tra cứu: {artifact.viewsCount.toLocaleString('vi-VN')}
              </span>
            </div>
          </div>

          {/* Historical-Cultural Essay */}
          <div className="museum-card p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#d3c2c6]/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#f5ece7] flex items-center justify-center text-[#391a26]">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif text-lg font-semibold text-[#391a26] mb-0">
                    Thuyết minh Lịch sử - Văn hóa
                  </h2>
                  <span className="font-serif text-xs text-[#805434] italic">
                    Bài khảo cứu chuyên sâu · {artifact.code}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleToggleRead}
                className="museum-btn-secondary px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {isReading ? (
                  <>
                    <PauseCircle className="w-4 h-4 text-[#522f3c]" />
                    <span>Dừng đọc hồ sơ</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#805434]" />
                    <span>Nghe đọc hồ sơ</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col gap-4 text-[15px] text-[#1e1b18] leading-relaxed">
              {artifact.narratives.map((para, idx) => (
                <div key={idx}>
                  <p className="mb-0">{para}</p>
                  {idx === 0 && (
                    <blockquote className="my-4 py-4 px-5 border-y border-[#d3c2c6] bg-[#fbf2ed] font-serif text-sm text-[#391a26] italic">
                      "{artifact.quote}"
                    </blockquote>
                  )}
                </div>
              ))}
            </div>

            <div className="row g-3 mt-4 pt-4 border-t border-[#d3c2c6]/60">
              {artifact.significance.map((sig) => (
                <div key={sig.label} className="col-12 col-sm-4">
                  <div className="bg-[#f5ece7] p-3 rounded h-full">
                    <span className="text-[11px] uppercase font-semibold text-[#805434] block mb-1">
                      {sig.label}
                    </span>
                    <span className="text-xs text-[#1e1b18] leading-snug block">
                      {sig.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dublin Core Metadata Registry */}
          <div className="museum-card p-5 md:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#d3c2c6]/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded bg-[#f5ece7] flex items-center justify-center text-[#391a26]">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#391a26] mb-0">
                    Siêu Dữ Liệu Hồ Sơ Hiện Vật
                  </h3>
                  <span className="font-serif text-xs text-[#805434] italic">
                    Tiêu chuẩn Dublin Core Metadata (ISO 15836)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowJsonLd((prev) => !prev)}
                className="px-3 py-1.5 rounded bg-[#f5ece7] hover:bg-[#efe6e2] border border-[#d3c2c6] text-xs font-semibold text-[#391a26] flex items-center gap-1.5 cursor-pointer"
              >
                <Code2 className="w-3.5 h-3.5 text-[#805434]" />
                <span>{showJsonLd ? 'Ẩn JSON-LD' : 'Xem JSON-LD'}</span>
              </button>
            </div>

            {showJsonLd && (
              <div className="mb-4 bg-[#1e1b18] text-[#f8efea] rounded p-4 text-xs font-mono overflow-x-auto">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-[#4f4447]">
                  <span className="text-[#ca9a6c]">application/ld+json · Dublin Core Export</span>
                  <button
                    type="button"
                    onClick={handleCopyJsonLd}
                    className="text-xs text-[#fff8f5] hover:text-[#ca9a6c] flex items-center gap-1 cursor-pointer"
                  >
                    {copiedJson ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedJson ? 'Đã sao chép' : 'Sao chép JSON'}</span>
                  </button>
                </div>
                <pre className="mb-0 whitespace-pre-wrap">
                  {JSON.stringify(
                    {
                      '@context': 'https://dublincore.org/specifications/dublin-core/dcmi-terms/',
                      ...artifact.dublinCore
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}

            <dl className="flex flex-col gap-2 text-sm mb-5">
              {[
                ['Mã định danh (Identifier)', artifact.dublinCore.identifier, true],
                ['Nhan đề (Title)', artifact.dublinCore.title],
                ['Niên đại (Date)', artifact.dublinCore.date],
                ['Nhân vật liên quan (Contributor)', artifact.dublinCore.contributor],
                ['Sự kiện gắn liền (Event)', artifact.dublinCore.event],
                ['Đơn vị lưu giữ (Custodian)', artifact.dublinCore.custodian],
                ['Tình trạng kiểm chứng', artifact.dublinCore.verificationStatus, false, true],
                ['Mã kiểm kê thực tế (Accession No.)', artifact.dublinCore.accessionNo, true],
                ['Quyền sở hữu & Giấy phép (Rights)', artifact.dublinCore.rights]
              ].map(([label, value, isMono, isVerified]) => (
                <div
                  key={label}
                  className="row g-2 py-2.5 px-3 bg-[#fbf2ed] rounded border border-[#d3c2c6]/40 m-0"
                >
                  <dt className="col-12 col-sm-4 font-serif text-xs text-[#805434] font-semibold uppercase mb-0">
                    {label}
                  </dt>
                  <dd
                    className={`col-12 col-sm-8 text-sm text-[#1e1b18] mb-0 ${
                      isMono ? 'font-mono text-xs' : ''
                    }`}
                  >
                    {isVerified ? (
                      <span className="inline-flex items-center gap-1.5 text-[#391a26] font-medium">
                        <Verified className="w-4 h-4 text-[#805434] shrink-0" />
                        <span>{value}</span>
                      </span>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="bg-[#efe6e2] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-serif text-base font-semibold text-[#391a26] mb-0.5">
                  Nguồn trích dẫn chính thức
                </h4>
                <p className="font-serif text-xs text-[#4f4447] mb-0">
                  Hồ sơ tư liệu đối chiếu từ {artifact.dublinCore.sourceLabel}
                </p>
              </div>
              <a
                href={artifact.dublinCore.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="museum-btn-primary px-4 py-2 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0"
              >
                <span>Mở nguồn lưu trữ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="museum-card p-3 flex flex-col sm:flex-row items-stretch justify-between gap-3">
            {adjacent.prev && (
              <Link
                to={`/bo-suu-tap/${adjacent.prev.code}`}
                className="flex-1 bg-[#f5ece7] hover:bg-[#efe6e2] p-3 rounded flex items-center gap-3 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-[#805434] shrink-0" />
                <div className="min-w-0">
                  <span className="text-[11px] uppercase font-semibold text-[#805434] block">
                    Hồ sơ trước
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#391a26] block truncate">
                    {adjacent.prev.code}: {adjacent.prev.shortTitle}
                  </span>
                </div>
              </Link>
            )}

            {adjacent.next && (
              <Link
                to={`/bo-suu-tap/${adjacent.next.code}`}
                className="flex-1 bg-[#f5ece7] hover:bg-[#efe6e2] p-3 rounded flex items-center justify-end text-right gap-3 transition-colors"
              >
                <div className="min-w-0">
                  <span className="text-[11px] uppercase font-semibold text-[#805434] block">
                    Hồ sơ tiếp theo
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#391a26] block truncate">
                    {adjacent.next.code}: {adjacent.next.shortTitle}
                  </span>
                </div>
                <ArrowRight className="w-5 h-5 text-[#805434] shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
