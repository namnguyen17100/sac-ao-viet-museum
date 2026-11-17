import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Landmark,
  Paintbrush,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Verified
} from 'lucide-react';
import ArchivalImage from '../components/ArchivalImage.jsx';
import { PROJECT_INFO } from '../data/aboutData.js';
import { artifactService } from '../services/artifactService.js';
import { galleryService } from '../services/galleryService.js';

export default function HomePage() {
  const [rooms, setRooms] = useState([]);
  const [featuredArtifacts, setFeaturedArtifacts] = useState([]);
  const [stats, setStats] = useState({ total: 15, artifacts: 9, documents: 6, rooms: 4 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      galleryService.getRooms(),
      artifactService.getFeaturedArtifacts(),
      artifactService.getCatalogStats()
    ]).then(([roomsRes, featuredRes, statsRes]) => {
      if (!active) return;
      setRooms(roomsRes);
      setFeaturedArtifacts(featuredRes);
      setStats(statsRes);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Top Visual Hero Chamber */}
      <section className="relative w-full bg-gradient-to-b from-[#fbf2ed] via-[#fff8f5] to-[#fff8f5] px-4 md:px-10 lg:px-16 pt-10 pb-14">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-5 text-xs text-[#4f4447]">
            <span className="font-semibold uppercase tracking-wider text-[#805434]">
              Không gian triển lãm di sản trực tuyến
            </span>
            <span aria-hidden="true">·</span>
            <span>Phục dựng số học thuật M3</span>
            <span aria-hidden="true">·</span>
            <span className="font-serif italic">Hồ sơ đối chiếu {PROJECT_INFO.studentId}</span>
          </div>

          <div className="row g-4 g-lg-5 align-items-stretch">
            <div className="col-12 col-lg-7 flex flex-col justify-center">
              <span className="font-serif text-xs text-[#805434] italic tracking-widest uppercase mb-2">
                Hành trình văn hiến &amp; Phom dáng Việt Nam
              </span>
              <h1 className="font-serif text-4xl md:text-5xl font-semibold text-[#391a26] tracking-tight leading-[1.2] max-w-2xl mb-4">
                Một tà áo,{' '}
                <span className="italic font-normal text-[#805434]">muôn câu chuyện.</span>
              </h1>
              <p className="text-base md:text-lg text-[#4f4447] max-w-2xl leading-relaxed mb-6">
                Từ nét may ngũ thân đến những ký ức của người phụ nữ Việt, Sắc Áo Việt mở ra hành trình tìm hiểu trang phục truyền thống bằng các hồ sơ hiện vật và tư liệu được dẫn nguồn.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Link
                  to="/phong-trung-bay"
                  className="museum-btn-primary px-6 py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <Landmark className="w-4 h-4 text-[#fec39b]" />
                  <span>Bắt đầu tham quan</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/bo-suu-tap"
                  className="museum-btn-secondary px-6 py-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-[#805434]" />
                  <span>Khám phá 15 hồ sơ</span>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-xs text-[#4f4447] font-serif">
                <Verified className="w-4 h-4 text-[#805434] shrink-0" />
                <span>
                  Tư liệu giám tuyển phối hợp nghiên cứu cùng {PROJECT_INFO.partnerMuseum.name}
                </span>
              </div>
            </div>

            <div className="col-12 col-lg-5">
              <div className="museum-card p-3 md:p-4 h-full flex flex-col justify-between">
                <div className="relative w-full aspect-[4/5] rounded overflow-hidden bg-[#f5ece7]">
                  <ArchivalImage
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFv-7PFv0zLNmgLdmYcqEEDj4SNF_sJsEMT5rN8TYsME6vLw1Zu8wHvEE_yI29YiBG4fYSj_YOFrJAw9oUEmSVj_zS6LwvxQcxE5mIMIYynMnVCaH7mvKMODh1tV7pBaeeYbddcu7D1GykyL-TVbTO_34rRIFPb9V95iFIVkNa3dffpWv6r__36IvkKrF-lq_hQrirRnughQGoRjmENaCazo_0ty7rCcoNtbk-fmXX"
                    alt="Hiện vật tiêu biểu M3 - Áo dài Lễ nghi và Ký ức"
                    code="SAV-CAT-2024"
                    caption="Áo dài Lễ nghi & Ký ức"
                    imgClassName="w-full h-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e1b18]/85 via-[#1e1b18]/45 to-transparent p-4 text-[#fff8f5]">
                    <span className="text-[11px] uppercase tracking-wider text-[#ffdcc6] font-semibold block">
                      Hiện vật tiêu biểu M3
                    </span>
                    <p className="font-serif text-lg font-semibold mb-0">
                      Áo dài Lễ nghi &amp; Ký ức
                    </p>
                    <p className="font-serif text-xs text-[#f5ece7] italic mb-0">
                      Niên đại thế kỷ XX &amp; đương đại
                    </p>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-[#d3c2c6]/50 flex items-center justify-between text-xs text-[#4f4447] font-serif">
                  <span className="font-mono">Định danh: SAV-CAT-2024</span>
                  <span className="text-[#805434] font-medium">Bảo tàng Phụ nữ Nam Bộ</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Column KPI Strip */}
          <div className="mt-10 museum-card p-4 md:p-6">
            <div className="row g-4">
              <div className="col-6 col-md-3">
                <div className="p-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-4xl font-semibold text-[#391a26] tabular-nums">
                      {stats.total}
                    </span>
                    <span className="text-xs text-[#805434] uppercase font-bold">Hồ sơ</span>
                  </div>
                  <h2 className="font-serif text-base font-semibold text-[#1e1b18] mb-1">
                    Tư liệu giám tuyển
                  </h2>
                  <p className="font-serif text-xs text-[#4f4447] mb-0">
                    Lưu trữ đối chiếu đa chiều qua các thời kỳ
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="p-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-4xl font-semibold text-[#805434] tabular-nums">
                      0{stats.artifacts}
                    </span>
                    <span className="text-xs text-[#805434] uppercase font-bold">Hiện vật</span>
                  </div>
                  <h2 className="font-serif text-base font-semibold text-[#1e1b18] mb-1">
                    Vật thể gốc &amp; Phục dựng
                  </h2>
                  <p className="font-serif text-xs text-[#4f4447] mb-0">
                    Kỹ thuật cắt may, hoa văn thêu và chất liệu sợi
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="p-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-4xl font-semibold text-[#391a26] tabular-nums">
                      0{stats.documents}
                    </span>
                    <span className="text-xs text-[#805434] uppercase font-bold">Tư liệu</span>
                  </div>
                  <h2 className="font-serif text-base font-semibold text-[#1e1b18] mb-1">
                    Nghiên cứu số
                  </h2>
                  <p className="font-serif text-xs text-[#4f4447] mb-0">
                    Ảnh tư liệu, bản họa và văn bản lịch sử đối chiếu
                  </p>
                </div>
              </div>

              <div className="col-6 col-md-3">
                <div className="p-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-serif text-4xl font-semibold text-[#805434] tabular-nums">
                      0{stats.rooms}
                    </span>
                    <span className="text-xs text-[#805434] uppercase font-bold">Chuyên đề</span>
                  </div>
                  <h2 className="font-serif text-base font-semibold text-[#1e1b18] mb-1">
                    Không gian triển lãm
                  </h2>
                  <p className="font-serif text-xs text-[#4f4447] mb-0">
                    Chặng đường văn hóa từ cổ truyền đến đương đại
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Curatorial Chambers Section */}
      <section className="w-full bg-[#fbf2ed] px-4 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs text-[#805434] uppercase tracking-widest font-semibold block mb-1">
                Chuyên mục khám phá
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#391a26] mb-0">
                4 Không Gian Triển Lãm Chuyên Đề
              </h2>
            </div>
            <p className="text-sm text-[#4f4447] max-w-md mb-0">
              Mỗi không gian được phân bổ theo dòng thời gian và bối cảnh xã hội, phản ánh chiều sâu tư tưởng và phẩm giá văn hóa người phụ nữ Việt Nam.
            </p>
          </div>

          {loading ? (
            <div className="py-12 text-center text-sm text-[#4f4447]">Đang tải không gian trưng bày...</div>
          ) : (
            <div className="row g-4">
              {rooms.map((room) => (
                <div key={room.id} className="col-12 col-md-6 col-xl-3">
                  <article className="museum-card h-full flex flex-col overflow-hidden group">
                    <div className="relative h-56 w-full overflow-hidden bg-[#f5ece7]">
                      <ArchivalImage
                        src={room.homeImageUrl}
                        alt={room.title}
                        code={`PHÒNG ${room.number}`}
                        caption={room.title}
                        imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e1b18]/75 to-transparent p-3 flex items-center justify-between text-[#fff8f5] text-xs">
                        <span className="font-semibold tracking-wider uppercase">Phòng {room.number}</span>
                        <span className="tabular-nums">{room.artifactCount} hồ sơ</span>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-1 justify-between">
                      <div>
                        <span className="text-[11px] text-[#805434] uppercase font-semibold tracking-wider block mb-1">
                          {room.homeSubLabel}
                        </span>
                        <h3 className="font-serif text-xl font-semibold text-[#391a26] mb-2">
                          {room.title}
                        </h3>
                        <p className="text-sm text-[#4f4447] leading-relaxed mb-4">
                          {room.shortSummary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#d3c2c6]/60 flex items-center justify-between text-xs">
                        <span className="font-serif text-[#4f4447]">{room.homeChip}</span>
                        <Link
                          to={`/phong-trung-bay/${room.slug}`}
                          className="font-semibold text-[#391a26] hover:text-[#805434] uppercase tracking-wide flex items-center gap-1"
                        >
                          <span>Xem phòng</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Artifact Showcases */}
      <section className="w-full bg-[#fff8f5] px-4 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs text-[#805434] uppercase tracking-widest font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tủ kính giám tuyển M3</span>
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#391a26] mb-0">
                Hồ Sơ Hiện Vật Tiêu Biểu
              </h2>
            </div>
            <Link
              to="/bo-suu-tap"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#391a26] hover:text-[#805434] transition-colors"
            >
              <span>Toàn bộ danh mục 15 hiện vật</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="row g-4">
            {featuredArtifacts.map((item) => (
              <div key={item.code} className="col-12 col-lg-4">
                <article className="museum-card p-3 md:p-4 h-full flex flex-col justify-between group">
                  <div>
                    <div className="relative aspect-[3/4] w-full rounded overflow-hidden bg-[#f5ece7] mb-4">
                      <ArchivalImage
                        src={item.imageUrl}
                        alt={item.title}
                        code={item.code}
                        caption={item.shortTitle}
                        imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e1b18]/80 to-transparent p-3 flex items-center justify-between text-xs text-[#fff8f5]">
                        <span className="font-mono font-semibold">{item.code}</span>
                        <span className="tabular-nums">{item.eraBadge}</span>
                      </div>
                    </div>

                    <div className="text-xs text-[#805434] mb-1">
                      <span>{item.roomLabel}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{item.typeLabel}</span>
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#391a26] mb-2">
                      {item.shortTitle}
                    </h3>
                    <p className="text-sm text-[#4f4447] leading-relaxed mb-4">
                      {item.summary}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="bg-[#fbf2ed] rounded p-3 text-xs text-[#4f4447] border border-[#d3c2c6]/40">
                      <div className="flex justify-between mb-1">
                        <span>Đơn vị lưu giữ:</span>
                        <span className="font-medium text-[#1e1b18]">Bảo tàng Phụ nữ Nam Bộ</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hình thức:</span>
                        <span className="text-[#805434]">Đồ họa phục dựng học thuật</span>
                      </div>
                    </div>

                    <Link
                      to={`/bo-suu-tap/${item.code}`}
                      className="museum-btn-secondary w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider block"
                    >
                      Xem chi tiết hồ sơ
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curatorial Philosophy & Five-Panel Diagram */}
      <section className="w-full bg-[#efe6e2] px-4 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto">
          <div className="row g-4 g-lg-5 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="text-xs uppercase tracking-widest text-[#805434] font-semibold block mb-2">
                Giá trị nghiên cứu M3
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#391a26] mb-4">
                Bảo Tồn Bản Sắc Trong Thời Đại Số
              </h2>
              <p className="text-base text-[#4f4447] leading-relaxed mb-5">
                Mỗi tà áo dài Việt Nam không đơn thuần là phục trang mà là bản ghi chép sống động về nhân sinh quan, lễ nghi phong kiến và vị thế của người phụ nữ trong từng giai đoạn lịch sử.
              </p>

              <div className="row g-3 mb-5">
                <div className="col-12 col-sm-6">
                  <div className="museum-card p-4 h-full">
                    <BookOpen className="w-5 h-5 text-[#805434] mb-2" />
                    <h3 className="font-serif text-base font-semibold text-[#391a26] mb-1">
                      Tư liệu đối chiếu
                    </h3>
                    <p className="text-xs text-[#4f4447] mb-0 leading-relaxed">
                      Minh bạch hóa các tài liệu lịch sử, sách báo xưa và hồ sơ hiện vật hiện lưu trữ tại bảo tàng.
                    </p>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="museum-card p-4 h-full">
                    <Paintbrush className="w-5 h-5 text-[#805434] mb-2" />
                    <h3 className="font-serif text-base font-semibold text-[#391a26] mb-1">
                      Phục dựng chuẩn mực
                    </h3>
                    <p className="text-xs text-[#4f4447] mb-0 leading-relaxed">
                      Mô phỏng hình thái, cổ áo, vạt áo và khuy bấm theo nguyên tắc giám tuyển bảo tàng truyền thống.
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/dong-thoi-gian"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#391a26] hover:text-[#805434] transition-colors"
              >
                <span>Khám phá tiến trình dòng thời gian áo dài</span>
                <TrendingUp className="w-4 h-4" />
              </Link>
            </div>

            <div className="col-12 col-lg-6">
              <div className="museum-card p-5 md:p-6">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#d3c2c6]/60">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#391a26]">
                    Cấu trúc tà áo ngũ thân
                  </span>
                  <span className="font-serif text-xs text-[#805434]">Tư liệu cổ họa</span>
                </div>

                <div className="bg-[#f5ece7] rounded p-4 flex flex-col justify-between">
                  <div className="flex justify-between text-xs text-[#4f4447]">
                    <div>
                      <span className="font-semibold text-[#391a26] block">
                        Tà trước &amp; Tà sau (4 thân)
                      </span>
                      <span>Tượng trưng tứ thân phụ mẫu</span>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-[#391a26] block">
                        Tà con (Thân thứ năm)
                      </span>
                      <span>Nằm ẩn phía trong che chắn</span>
                    </div>
                  </div>

                  <div className="py-6 flex items-center justify-center">
                    <svg
                      className="w-52 h-36 text-[#805434]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 100 60"
                      aria-label="Sơ đồ cấu trúc áo dài ngũ thân"
                    >
                      <path d="M 50 5 Q 40 10 30 18 L 10 25 L 18 35 L 35 28 L 30 55 L 70 55 L 65 28 L 82 35 L 90 25 L 70 18 Q 60 10 50 5 Z" />
                      <path d="M 50 5 L 50 28 L 48 55" strokeDasharray="2 2" />
                      <circle cx="50" cy="5" fill="currentColor" r="2.5" />
                    </svg>
                  </div>

                  <div className="flex justify-between items-end text-xs text-[#4f4447]">
                    <div>
                      <span className="font-semibold text-[#391a26] block">
                        Năm cúc (Ngũ thường)
                      </span>
                      <span>Nhân · Lễ · Nghĩa · Trí · Tín</span>
                    </div>
                    <span className="text-[#805434] font-medium">Bản phục dựng số học thuật</span>
                  </div>
                </div>

                <p className="font-serif text-xs text-[#4f4447] mt-4 mb-0 text-center italic">
                  Áo dài ngũ thân đại diện cho sự kín đáo, trật tự đạo đức gia đình và chuẩn mực thẩm mỹ người Việt thời Nguyễn.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Transparency & Academic Disclaimer */}
      <section className="w-full bg-[#fff8f5] px-4 md:px-10 lg:px-16 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#f5ece7] border border-[#d3c2c6] rounded p-5 md:p-6">
            <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="w-11 h-11 rounded bg-[#efe6e2] border border-[#d3c2c6] flex items-center justify-center text-[#805434] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-[#391a26]">
                    Cảnh báo pháp lý &amp; Giám tuyển học thuật minh bạch
                  </span>
                  <span className="text-xs text-[#805434]">· Giai đoạn M3</span>
                </div>

                <div className="flex flex-col gap-2 text-sm text-[#4f4447] leading-relaxed">
                  <p className="mb-0">
                    <strong className="text-[#1e1b18]">1. Tính chất hình ảnh minh họa:</strong> Tất cả hình ảnh áo dài và không gian trưng bày trong trang web là đồ họa giao diện tái hiện phục vụ đồ án học thuật. Dự án <strong className="text-[#391a26]">CHƯA sở hữu quyền sử dụng độc quyền hình ảnh chụp hiện vật gốc</strong> từ các bảo tàng lưu giữ.
                  </p>
                  <p className="mb-0">
                    <strong className="text-[#1e1b18]">2. Tôn trọng bản quyền &amp; Nguồn trích dẫn:</strong> Mọi thông tin lịch sử, nhân vật gắn liền hiện vật đều được đối chiếu từ dữ liệu công khai của <em>Bảo tàng Phụ nữ Nam Bộ</em> tại mục{' '}
                    <Link to="/nguon-va-ban-quyen" className="text-[#805434] font-medium underline underline-offset-4">
                      Nguồn &amp; Bản quyền
                    </Link>.
                  </p>
                  <p className="mb-0">
                    <strong className="text-[#1e1b18]">3. Mục đích sử dụng:</strong> Dự án hoàn toàn phi thương mại, phục vụ giáo dục và bảo tồn di sản văn hóa Việt Nam.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#d3c2c6]/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-serif text-[#805434]">
                    Đồ án học thuật {PROJECT_INFO.ideaCode} · {PROJECT_INFO.studentName} · {PROJECT_INFO.studentId}
                  </span>
                  <Link
                    to="/nguon-va-ban-quyen"
                    className="font-semibold text-[#391a26] hover:text-[#805434] uppercase flex items-center gap-1"
                  >
                    <span>Xem điều khoản trích dẫn đầy đủ</span>
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
