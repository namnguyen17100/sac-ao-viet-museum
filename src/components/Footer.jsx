import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { PROJECT_INFO } from '../data/aboutData.js';

export default function Footer() {
  return (
    <footer className="w-full bg-[#fbf2ed] border-t border-[#d3c2c6]/70 mt-12 pt-12 pb-8">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16">
        <div className="row g-4 pb-10">
          <div className="col-12 col-md-6 col-lg-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-[#522f3c] text-[#fff8f5] flex items-center justify-center font-serif font-semibold text-base select-none">
                Á
              </div>
              <span className="font-serif text-lg font-semibold text-[#391a26]">
                {PROJECT_INFO.brandName}
              </span>
            </div>
            <p className="text-sm text-[#4f4447] leading-relaxed mb-0">
              Bảo tàng số chuyên đề nghiên cứu áo dài phụ nữ Việt Nam qua các thời kỳ lịch sử. Một không gian giám tuyển số tôn vinh di sản dệt may truyền thống, phom dáng cung đình và nét thanh lịch của người phụ nữ Việt.
            </p>
            <p className="font-serif text-xs text-[#805434] italic mb-0">
              Không gian lưu trữ di sản số học thuật · Kiến trúc React Service
            </p>
          </div>

          <div className="col-12 col-md-6 col-lg-3 flex flex-col gap-2">
            <span className="text-xs uppercase text-[#391a26] tracking-wider font-semibold">
              Đồ án học thuật
            </span>
            <div className="flex flex-col gap-1.5 text-sm text-[#4f4447]">
              <p className="mb-0">
                <span className="font-medium text-[#1e1b18]">Sinh viên thực hiện:</span>{' '}
                {PROJECT_INFO.studentName}
              </p>
              <p className="mb-0 tabular-nums">
                <span className="font-medium text-[#1e1b18]">Mã số sinh viên:</span>{' '}
                {PROJECT_INFO.studentId}
              </p>
              <p className="mb-0">
                <span className="font-medium text-[#1e1b18]">Mã ý tưởng:</span>{' '}
                {PROJECT_INFO.ideaCode}
              </p>
              <p className="mb-0">
                <span className="font-medium text-[#1e1b18]">Mốc triển khai:</span>{' '}
                {PROJECT_INFO.phase}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-3 flex flex-col gap-2">
            <span className="text-xs uppercase text-[#391a26] tracking-wider font-semibold">
              Đơn vị lưu giữ &amp; Cung cấp nguồn
            </span>
            <div className="flex flex-col gap-1.5 text-sm text-[#4f4447]">
              <p className="font-medium text-[#1e1b18] mb-0">
                {PROJECT_INFO.partnerMuseum.name}
              </p>
              <p className="leading-relaxed mb-0">
                {PROJECT_INFO.partnerMuseum.address}
              </p>
              <p className="font-serif text-xs text-[#805434] italic mt-1 mb-0">
                Hợp tác nghiên cứu tư liệu và hiện vật phục dựng số
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-2 flex flex-col gap-2">
            <span className="text-xs uppercase text-[#391a26] tracking-wider font-semibold">
              Điều hướng nhanh
            </span>
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" className="text-[#4f4447] hover:text-[#391a26] transition-colors">
                Trang chủ bảo tàng
              </Link>
              <Link to="/phong-trung-bay" className="text-[#4f4447] hover:text-[#391a26] transition-colors">
                Phòng trưng bày
              </Link>
              <Link to="/bo-suu-tap" className="text-[#4f4447] hover:text-[#391a26] transition-colors">
                Bộ sưu tập hiện vật
              </Link>
              <Link to="/dong-thoi-gian" className="text-[#4f4447] hover:text-[#391a26] transition-colors">
                Dòng thời gian áo dài
              </Link>
              <Link to="/nguon-va-ban-quyen" className="text-[#4f4447] hover:text-[#391a26] transition-colors">
                Nguồn &amp; Bản quyền
              </Link>
              <Link to="/gioi-thieu" className="text-[#4f4447] hover:text-[#391a26] transition-colors">
                Về dự án Sắc Áo Việt
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-[#f5ece7] border border-[#d3c2c6]/60 rounded p-4 mb-6 flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-[#805434] shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#391a26] mb-1">
              Cảnh báo bản quyền &amp; Sử dụng học thuật
            </h4>
            <p className="font-serif text-xs text-[#4f4447] mb-0 leading-relaxed">
              Tất cả ảnh hiện vật trong giao diện là đồ họa minh họa phục dựng phục vụ mục đích nghiên cứu học thuật M3, chưa cấp phép sử dụng thương mại hoặc khai thác độc quyền tư liệu gốc.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 border-t border-[#d3c2c6]/50 text-[#4f4447] font-serif text-xs">
          <p className="mb-0">
            © 2024 Sắc Áo Việt - Hành trình áo dài phụ nữ Việt Nam qua các thời kỳ. Bảo tồn di sản văn hóa phi vật thể.
          </p>
          <p className="mb-0 text-[#817477]">
            Dự án học thuật mã E01 · Bùi Trung Nam PH60600
          </p>
        </div>
      </div>
    </footer>
  );
}
