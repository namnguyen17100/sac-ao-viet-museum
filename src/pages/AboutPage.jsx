import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Compass,
  Database,
  Heart,
  Info,
  Landmark,
  Layers,
  Scale,
  Server,
  ShieldCheck,
  Verified
} from 'lucide-react';
import ArchivalImage from '../components/ArchivalImage.jsx';
import { PRODUCTION_ROADMAP, PROJECT_INFO, RESEARCH_PILLARS } from '../data/aboutData.js';
import { galleryService } from '../services/galleryService.js';

const PILLAR_ICONS = {
  book: BookOpen,
  database: Database,
  scale: Scale
};

export default function AboutPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    galleryService.getRooms().then(setRooms);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Editorial Header */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pt-8 pb-8">
        <div className="text-xs text-[#805434] uppercase tracking-widest font-semibold mb-3">
          Bảo tàng số / Thông tin đồ án / <span className="text-[#391a26]">Giới thiệu dự án</span>
        </div>

        <div className="row g-4 align-items-end pb-6">
          <div className="col-12 col-lg-8">
            <span className="text-xs text-[#805434] tracking-widest uppercase font-semibold block mb-2">
              Khảo luận chuyên khảo M3
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#391a26] tracking-tight mb-3">
              Sắc Áo Việt: Kết Nối Di Sản Với Thế Hệ Trẻ
            </h1>
            <p className="font-serif text-lg text-[#805434] italic max-w-3xl leading-relaxed mb-0">
              “Một tà áo, muôn câu chuyện. Không gian trưng bày số hóa tôn vinh dòng chảy văn hóa, thẩm mỹ và lòng kiên trinh của người phụ nữ Việt qua từng thời kỳ lịch sử.”
            </p>
          </div>

          <div className="col-12 col-lg-4 flex justify-lg-end">
            <div className="bg-[#efe6e2] border border-[#d3c2c6] p-4 rounded flex items-center gap-3 w-full w-lg-auto">
              <div className="w-12 h-12 rounded bg-[#391a26] text-[#fff8f5] flex items-center justify-center font-serif text-xl font-semibold shrink-0">
                Á
              </div>
              <div>
                <span className="text-xs font-bold uppercase text-[#391a26] block">
                  Bản Thảo Học Thuật
                </span>
                <span className="font-serif text-xs text-[#805434] italic block">
                  Lưu trữ điện tử · Mã {PROJECT_INFO.ideaCode}
                </span>
                <span className="text-[11px] text-[#4f4447]">Phát hành: Kỳ II/2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Meta Bento Grid */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-10">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="museum-card p-5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#817477] block mb-1">
                  Sinh viên thực hiện
                </span>
                <h2 className="font-serif text-xl font-semibold text-[#391a26] mb-2">
                  {PROJECT_INFO.studentName}
                </h2>
                <div className="text-xs text-[#805434] font-semibold mb-3 tabular-nums">
                  MSSV: {PROJECT_INFO.studentId} · Mã ý tưởng: {PROJECT_INFO.ideaCode}
                </div>
              </div>
              <p className="font-serif text-xs text-[#4f4447] leading-relaxed mb-0">
                Đề án nghiên cứu độc lập về mô hình số hóa hiện vật trang phục truyền thống, tích hợp giám tuyển hình ảnh và siêu dữ liệu bảo tàng mở.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="bg-[#f5ece7] border border-[#d3c2c6] p-5 rounded h-full flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#817477] block mb-1">
                  Tiến độ nghiên cứu
                </span>
                <h2 className="font-serif text-xl font-semibold text-[#391a26] mb-1">
                  {PROJECT_INFO.phase}
                </h2>
                <p className="text-xs text-[#805434] font-semibold mb-4">
                  Thiết kế nội dung, kiến trúc Service &amp; giao diện bảo tàng số
                </p>
              </div>
              <div className="tabular-nums">
                <div className="flex justify-between text-xs text-[#4f4447] mb-1">
                  <span>Tiến độ giai đoạn M3</span>
                  <span className="font-semibold text-[#391a26]">
                    {PROJECT_INFO.completionPercent}% Hoàn thiện
                  </span>
                </div>
                <div className="w-full h-1.5 bg-[#e9e1dc] rounded overflow-hidden">
                  <div
                    className="h-full bg-[#522f3c]"
                    style={{ width: `${PROJECT_INFO.completionPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="museum-card p-5 h-full flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#817477] block mb-1">
                  Tham chiếu nguồn &amp; Hiện vật
                </span>
                <h2 className="font-serif text-xl font-semibold text-[#391a26] mb-1">
                  {PROJECT_INFO.partnerMuseum.name}
                </h2>
                <p className="text-xs text-[#4f4447] mb-3 leading-snug">
                  {PROJECT_INFO.partnerMuseum.address}
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#805434] font-serif italic">
                <Verified className="w-4 h-4 shrink-0" />
                <span>Hệ thống hồ sơ thực địa và tư liệu lưu trữ số hóa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture & Tech Stack Card */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-10">
        <div className="bg-[#fbf2ed] border border-[#d3c2c6] rounded p-5 md:p-6">
          <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#805434] mb-3">
            <Server className="w-4 h-4" />
            <span>Kiến trúc kỹ thuật &amp; Định hướng tích hợp hệ thống</span>
          </div>
          <div className="row g-3 text-xs">
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-3.5 rounded h-full">
                <span className="font-semibold text-[#391a26] block mb-1">Frontend (Hiện tại)</span>
                <p className="text-[#4f4447] mb-0">{PROJECT_INFO.techStack.frontend}</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-3.5 rounded h-full">
                <span className="font-semibold text-[#391a26] block mb-1">Backend &amp; ORM (Dự kiến)</span>
                <p className="text-[#4f4447] mb-0">{PROJECT_INFO.techStack.backend}</p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-3.5 rounded h-full">
                <span className="font-semibold text-[#391a26] block mb-1">Cơ sở dữ liệu &amp; Bảo mật</span>
                <p className="text-[#4f4447] mb-0">
                  {PROJECT_INFO.techStack.database} · {PROJECT_INFO.techStack.security}
                </p>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-3.5 rounded h-full">
                <span className="font-semibold text-[#391a26] block mb-1">Công cụ &amp; Quản lý mã nguồn</span>
                <p className="text-[#4f4447] mb-0">{PROJECT_INFO.techStack.tools}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Research Pillars */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="bg-[#391a26] text-[#fff8f5] rounded p-6 md:p-10">
          <div className="max-w-2xl mb-8">
            <span className="text-xs uppercase tracking-widest text-[#c696a6] font-semibold block mb-1">
              Tôn chỉ dự án
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#fff8f5] mb-2">
              Ba Trụ Cột Nghiên Cứu &amp; Chuẩn Hóa Số
            </h2>
            <p className="text-sm text-[#e9e1dc] mb-0">
              Dự án kiến tạo sự cân bằng giữa lòng say mê văn hóa truyền thống và tính kỷ luật của phương pháp giám tuyển bảo tàng hiện đại.
            </p>
          </div>

          <div className="row g-4">
            {RESEARCH_PILLARS.map((pillar) => {
              const IconComp = PILLAR_ICONS[pillar.icon] || BookOpen;
              return (
                <div key={pillar.number} className="col-12 col-md-4">
                  <div className="bg-[#522f3c] rounded p-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded bg-[#fff8f5]/10 flex items-center justify-center text-[#fff8f5] mb-4">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] uppercase tracking-wider text-[#ffdcc6] block mb-1">
                        {pillar.number}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#fff8f5] mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-[#e9e1dc] leading-relaxed mb-4">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="font-serif text-xs text-[#ffdcc6] italic">
                      {pillar.footer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 Thematic Spaces Summary */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#805434] font-semibold block mb-1">
              Quy mô &amp; Không gian số
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#391a26] mb-0">
              Cấu Trúc 4 Không Gian Chuyên Đề
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#4f4447] tabular-nums">
            <span><strong>09</strong> Hồ sơ hiện vật vật chất</span>
            <span>·</span>
            <span><strong>06</strong> Hồ sơ tư liệu số</span>
          </div>
        </div>

        <div className="row g-4">
          {rooms.map((room) => (
            <div key={room.id} className="col-12 col-md-6 col-xl-3">
              <Link
                to={`/phong-trung-bay/${room.slug}`}
                className="museum-card p-3.5 h-full flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-[16/10] rounded overflow-hidden bg-[#f5ece7] mb-3">
                    <ArchivalImage
                      src={room.homeImageUrl}
                      alt={room.title}
                      code={`PHÒNG ${room.number}`}
                      caption={room.title}
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="text-xs font-semibold text-[#805434] uppercase mb-1">
                    Phòng {room.number}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#391a26] mb-1">
                    {room.title}
                  </h3>
                  <p className="text-xs text-[#4f4447] leading-relaxed mb-3">
                    {room.shortSummary}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#d3c2c6]/60 flex justify-between text-xs text-[#4f4447] tabular-nums">
                  <span className="font-mono">{room.artifactCodes.join(', ')}</span>
                  <span className="font-semibold text-[#805434]">{room.artifactCount} hồ sơ</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations & Acknowledgements */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="bg-[#fbf2ed] border border-[#d3c2c6] p-6 rounded h-full">
              <div className="flex items-center gap-2 text-[#805434] text-xs uppercase tracking-wider font-bold mb-3">
                <ShieldCheck className="w-5 h-5" />
                <span>Giới hạn của dự án học thuật</span>
              </div>
              <p className="text-sm text-[#4f4447] leading-relaxed mb-4">
                Đề án “Sắc Áo Việt” được triển khai trong khuôn khổ đồ án học thuật M3, do đó tồn tại một số ranh giới cần làm rõ:
              </p>
              <ul className="flex flex-col gap-3 text-xs text-[#4f4447] ps-0 list-unstyled mb-0">
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#805434] shrink-0 mt-0.5" />
                  <span>
                    <strong>Mã định danh nội bộ:</strong> Ký hiệu SAV-001 đến SAV-015 là mã phân loại phục vụ hệ thống web, không thay thế mã kiểm kê gốc của Bảo tàng Phụ nữ Nam Bộ.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#805434] shrink-0 mt-0.5" />
                  <span>
                    <strong>Đồ họa minh họa phục dựng:</strong> Hình ảnh mang tính diễn họa mô phỏng bối cảnh lịch sử phục vụ giáo dục, chưa phải ảnh quét 3D trực tiếp.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="w-4 h-4 text-[#805434] shrink-0 mt-0.5" />
                  <span>
                    <strong>Phạm vi phi thương mại:</strong> Tuyệt đối không sử dụng cho mục đích thương mại, quảng cáo hay khai thác cá nhân.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="museum-card p-6 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#805434] text-xs uppercase tracking-wider font-bold mb-3">
                  <Heart className="w-5 h-5" />
                  <span>Lời cảm ơn chân thành</span>
                </div>
                <p className="text-sm text-[#4f4447] leading-relaxed mb-4">
                  Dự án hoàn thiện được giai đoạn M3 nhờ sự hỗ trợ tư liệu quý báu từ các đơn vị chuyên môn:
                </p>

                <div className="flex flex-col gap-3">
                  <div className="bg-[#f5ece7] p-3.5 rounded">
                    <p className="font-semibold text-xs text-[#391a26] mb-1">
                      Ban Giám Đốc &amp; Phòng Nghiên Cứu — Bảo tàng Phụ nữ Nam Bộ
                    </p>
                    <p className="font-serif text-xs text-[#4f4447] italic mb-0">
                      Đã hỗ trợ tài liệu chuyên khảo trang phục phụ nữ Nam Bộ và công bố các câu chuyện lịch sử phía sau mỗi hiện vật.
                    </p>
                  </div>
                  <div className="bg-[#f5ece7] p-3.5 rounded">
                    <p className="font-semibold text-xs text-[#391a26] mb-1">
                      Giảng Viên Hướng Dẫn Chuyên Ngành
                    </p>
                    <p className="font-serif text-xs text-[#4f4447] italic mb-0">
                      Đã tận tình định hướng phương pháp nghiên cứu bảo tàng số, ứng dụng chuẩn Dublin Core và thiết kế tôn trọng giá trị truyền thống.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[#d3c2c6]/60 flex justify-between text-xs font-serif text-[#817477]">
                <span>Tri ân văn hóa Việt</span>
                <span>{PROJECT_INFO.studentName} · {PROJECT_INFO.studentId}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Production Roadmap */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="bg-[#f5ece7] border border-[#d3c2c6] rounded p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#805434] font-semibold block mb-1">
                Tương lai đồ án
              </span>
              <h2 className="font-serif text-3xl font-semibold text-[#391a26] mb-0">
                Lộ Trình Phát Triển Production
              </h2>
            </div>
            <p className="font-serif text-xs text-[#805434] italic mb-0">
              5 bước chiến lược từ đồ án M3 thành nền tảng bảo tàng số Full-Stack
            </p>
          </div>

          <div className="row g-3 mb-6">
            {PRODUCTION_ROADMAP.map((item) => (
              <div key={item.step} className="col-12 col-md-6 col-xl">
                <div
                  className={`p-4 rounded h-full flex flex-col justify-between ${
                    item.highlight
                      ? 'bg-[#391a26] text-[#fff8f5]'
                      : 'bg-[#ffffff] border border-[#d3c2c6]'
                  }`}
                >
                  <div>
                    <div
                      className={`font-serif text-2xl font-bold mb-2 ${
                        item.highlight ? 'text-[#ffdcc6]' : 'text-[#805434]'
                      }`}
                    >
                      {item.step}
                    </div>
                    <h4
                      className={`font-serif text-base font-semibold mb-1.5 ${
                        item.highlight ? 'text-[#fff8f5]' : 'text-[#391a26]'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed mb-4 ${
                        item.highlight ? 'text-[#e9e1dc]' : 'text-[#4f4447]'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wider ${
                      item.highlight ? 'text-[#ffdcc6]' : 'text-[#805434]'
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#d3c2c6]">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/phong-trung-bay"
                className="museum-btn-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Khám phá Phòng trưng bày</span>
              </Link>
              <Link
                to="/nguon-va-ban-quyen"
                className="museum-btn-secondary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Xem danh mục nguồn tư liệu</span>
              </Link>
            </div>
            <span className="font-serif text-xs text-[#805434] italic">
              Đề án tốt nghiệp M3 · Hệ sinh thái văn hóa số Sắc Áo Việt
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
