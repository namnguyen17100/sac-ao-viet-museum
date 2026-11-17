import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Eye, Gavel, History, Landmark, Palette, ShieldCheck, Sparkles, Verified } from 'lucide-react';
import ArchivalImage from '../components/ArchivalImage.jsx';
import { timelineService } from '../services/timelineService.js';

const ERA_ICONS = {
  'era-1': Landmark,
  'era-2': Palette,
  'era-3': History,
  'era-4': ShieldCheck,
  'era-5': Sparkles,
  'era-6': Verified
};

export default function TimelinePage() {
  const [searchParams] = useSearchParams();
  const [eras, setEras] = useState([]);
  const [activeEra, setActiveEra] = useState(searchParams.get('era') || 'era-1');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    timelineService.getTimelineEras().then((data) => {
      if (!active) return;
      setEras(data);
      setLoading(false);

      const targetEra = searchParams.get('era');
      if (targetEra) {
        setTimeout(() => {
          const el = document.getElementById(targetEra);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      }
    });
    return () => {
      active = false;
    };
  }, [searchParams]);

  const handleSelectEra = (eraId) => {
    setActiveEra(eraId);
    const el = document.getElementById(eraId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header & Era Scrubber */}
      <section className="w-full bg-[#fff8f5] px-4 md:px-10 lg:px-16 pt-10 pb-8 border-b border-[#d3c2c6]/60">
        <div className="max-w-[1440px] mx-auto flex flex-col gap-6">
          <div className="text-xs text-[#805434] uppercase tracking-widest font-semibold">
            Bảo tàng số / Nghiên cứu học thuật M3 / <span className="text-[#391a26]">Dòng thời gian tiến trình</span>
          </div>

          <div className="row g-4 align-items-end">
            <div className="col-12 col-lg-8">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#805434] mb-2">
                <History className="w-4 h-4" />
                <span>Hồ sơ tiến trình trang phục dân tộc</span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#391a26] tracking-tight mb-3">
                Dòng Thời Gian: Tiến Trình Áo Dài Việt Nam
              </h1>
              <p className="text-base md:text-lg text-[#4f4447] max-w-3xl mb-0 leading-relaxed">
                Hành trình biến chuyển về kết cấu, kỹ thuật cắt may và triết lý thẩm mỹ của tà áo dài phụ nữ Việt Nam qua các bước ngoặt lịch sử từ thế kỷ XVIII đến đương đại.
              </p>
            </div>

            <div className="col-12 col-lg-4">
              <div className="bg-[#efe6e2] border border-[#d3c2c6] p-4 rounded">
                <div className="flex items-center justify-between text-xs text-[#805434] mb-2">
                  <span className="uppercase font-bold tracking-wider">Niên biểu khảo cứu</span>
                  <span className="font-serif italic tabular-nums">1744 — Hiện tại</span>
                </div>
                <div className="h-1.5 w-full bg-[#d3c2c6] rounded overflow-hidden mb-3">
                  <div className="h-full bg-[#805434] w-full" />
                </div>
                <p className="font-serif text-xs text-[#4f4447] mb-0 leading-relaxed">
                  <strong className="text-[#391a26]">Ghi chú giám tuyển:</strong> Trình bày thận trọng theo các mốc tư liệu đã được kiểm chứng. Các mẫu áo dài phục dựng năm 2021 không gán niên đại nguyên bản mà được định vị ở mốc tiếp nối di sản.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Era Scrubber */}
          <div className="bg-[#fbf2ed] border border-[#d3c2c6] p-2 rounded flex items-center overflow-x-auto gap-2">
            {eras.map((era) => (
              <button
                key={era.id}
                type="button"
                onClick={() => handleSelectEra(era.id)}
                className={`px-3.5 py-2 rounded text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  activeEra === era.id
                    ? 'bg-[#522f3c] text-[#fff8f5]'
                    : 'bg-[#ffffff] border border-[#d3c2c6]/60 text-[#4f4447] hover:bg-[#f5ece7] hover:text-[#391a26]'
                }`}
              >
                {era.shortLabel}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Alternating Timeline Canvas */}
      <section className="w-full bg-[#ffffff] px-4 md:px-10 lg:px-16 py-12">
        <div className="max-w-[1440px] mx-auto relative">
          <div className="hidden lg:block absolute left-1/2 top-4 bottom-8 -translate-x-1/2 w-px bg-[#d3c2c6]" />

          {loading ? (
            <div className="py-12 text-center text-sm text-[#4f4447]">
              Đang tải niên biểu lịch sử...
            </div>
          ) : (
            <div className="flex flex-col gap-12">
              {eras.map((era, index) => {
                const isEven = index % 2 === 1;
                const IconComp = ERA_ICONS[era.id] || History;

                return (
                  <article key={era.id} id={era.id} className="relative scroll-mt-28">
                    <div className="row g-4 g-lg-5 align-items-center">
                      {/* Narrative Card */}
                      <div className={`col-12 col-lg-6 ${isEven ? 'order-lg-3' : 'order-lg-1'}`}>
                        <div className="bg-[#fbf2ed] border border-[#d3c2c6] p-5 md:p-6 rounded">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="text-xs uppercase font-bold tracking-wider text-[#805434]">
                              {era.badge}
                            </span>
                            <span className="font-serif text-xs italic text-[#4f4447]">
                              {era.eraDate}
                            </span>
                          </div>

                          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#391a26] mb-3">
                            {era.title}
                          </h2>

                          <p className="text-sm md:text-[15px] text-[#1e1b18] leading-relaxed mb-4">
                            {era.description}
                          </p>

                          <blockquote className="py-3 px-4 bg-[#f5ece7] border-y border-[#d3c2c6] font-serif text-xs text-[#4f4447] italic mb-4">
                            {era.quote}
                          </blockquote>

                          <div>
                            <span className="text-[11px] uppercase font-bold tracking-wider text-[#805434] block mb-2">
                              Hồ sơ hiện vật liên kết:
                            </span>
                            <div className="flex flex-wrap gap-2">
                              {era.linkedArtifacts.map((linkItem) => (
                                <Link
                                  key={linkItem.code}
                                  to={`/bo-suu-tap/${linkItem.code}`}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffffff] border border-[#d3c2c6] hover:bg-[#522f3c] hover:text-[#fff8f5] hover:border-[#522f3c] text-[#391a26] rounded text-xs font-medium transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>{linkItem.label}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Central Timeline Node */}
                      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded bg-[#522f3c] text-[#fff8f5] items-center justify-center border-2 border-[#fff8f5] shadow-sm z-10">
                        <IconComp className="w-4 h-4" />
                      </div>

                      {/* Visual Archival Preview */}
                      <div className={`col-12 col-lg-6 ${isEven ? 'order-lg-1' : 'order-lg-3'}`}>
                        <div className="bg-[#f5ece7] border border-[#d3c2c6]/70 p-3 rounded">
                          <div className="overflow-hidden rounded aspect-[16/10] bg-[#efe6e2]">
                            <ArchivalImage
                              src={era.imageUrl}
                              alt={era.title}
                              code={era.shortLabel}
                              caption={era.imageCaption}
                              imgClassName="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mt-2.5 px-1 flex items-center justify-between text-xs text-[#4f4447] font-serif">
                            <span>{era.imageCaption}</span>
                            <span className="text-[#805434] uppercase font-semibold tracking-wider text-[11px]">
                              {era.imageTag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Legal Synthesis Box */}
      <section className="w-full bg-[#f5ece7] px-4 md:px-10 lg:px-16 py-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#805434] mb-3">
            <Gavel className="w-4 h-4" />
            <span>Căn cứ pháp lý &amp; Chuẩn mực bảo tồn di sản</span>
          </div>

          <div className="museum-card p-6 md:p-8">
            <div className="row g-4 align-items-center">
              <div className="col-12 col-lg-8">
                <h3 className="font-serif text-2xl font-semibold text-[#391a26] mb-3">
                  Đối Chiếu Với Luật Di Sản Văn Hóa Số 45/2024/QH15
                </h3>
                <p className="text-sm md:text-base text-[#4f4447] leading-relaxed mb-3">
                  Tiến trình lịch sử tà áo dài phụ nữ Việt Nam được hệ thống hóa trong dự án{' '}
                  <strong className="text-[#391a26]">Sắc Áo Việt (Giai đoạn M3)</strong> tuân thủ nghiêm ngặt các quy định tại{' '}
                  <strong>Luật Di sản Văn hóa số 45/2024/QH15</strong>. Đề án khẳng định trang phục truyền thống là thành tố cốt lõi của di sản văn hóa phi vật thể quốc gia, cần được bảo vệ nguyên trạng tính chân xác lịch sử.
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-serif text-[#805434] italic">
                  <span>· Điều 14 (Kiểm kê di sản số)</span>
                  <span>· Điều 22 (Bảo vệ tính toàn vẹn trang phục dân tộc)</span>
                  <span>· Bảo tàng Phụ nữ Nam Bộ</span>
                </div>
              </div>

              <div className="col-12 col-lg-4">
                <div className="bg-[#efe6e2] border border-[#d3c2c6] p-4 rounded">
                  <div className="flex items-center gap-2 font-serif text-lg font-semibold text-[#391a26] mb-2">
                    <Verified className="w-5 h-5 text-[#805434]" />
                    <span>Chứng thực học thuật</span>
                  </div>
                  <p className="font-serif text-xs text-[#4f4447] leading-relaxed mb-3">
                    Mã đề cương nghiên cứu: <strong className="font-mono text-[#391a26]">PH60600-E01-M3</strong>. Toàn bộ trích lục niên biểu đã được thẩm tra danh mục hiện vật tại Bảo tàng Phụ nữ Nam Bộ.
                  </p>
                  <Link
                    to="/nguon-va-ban-quyen"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#805434] hover:text-[#391a26]"
                  >
                    <span>Xem quy định bản quyền &amp; nguồn tư liệu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
