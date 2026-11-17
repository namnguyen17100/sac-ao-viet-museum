import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Trang chủ', end: true },
  { to: '/phong-trung-bay', label: 'Phòng trưng bày' },
  { to: '/bo-suu-tap', label: 'Bộ sưu tập' },
  { to: '/dong-thoi-gian', label: 'Dòng thời gian' },
  { to: '/nguon-va-ban-quyen', label: 'Nguồn & Bản quyền' },
  { to: '/gioi-thieu', label: 'Giới thiệu' }
];

export default function Header({ onOpenSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#fff8f5]/95 backdrop-blur-md border-b border-[#d3c2c6]/60">
      <div className="max-w-[1440px] mx-auto h-16 md:h-20 px-4 md:px-10 lg:px-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (1 line, no extra tags/subtitles) */}
        <Link
          to="/"
          className="font-serif text-lg md:text-xl font-semibold tracking-wide text-[#391a26] whitespace-nowrap shrink-0 hover:text-[#805434] transition-colors"
        >
          SẮC ÁO VIỆT
        </Link>

        {/* Zone 2: Clean single-line typography navigation links */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden xl:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `relative py-1.5 text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'text-[#391a26] border-b-2 border-[#522f3c]'
                    : 'text-[#4f4447] hover:text-[#391a26] border-b-2 border-transparent hover:border-[#ca9a6c]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Mở cửa sổ tra cứu di sản"
            className="museum-btn-primary px-4 py-2 text-xs font-semibold tracking-wider uppercase flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Tra cứu</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Đóng trình đơn' : 'Mở trình đơn'}
            aria-expanded={mobileMenuOpen}
            className="xl:hidden w-11 h-11 flex items-center justify-center rounded border border-[#d3c2c6] text-[#391a26] hover:bg-[#f5ece7] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f5] border-t border-[#d3c2c6] px-4 py-4 shadow-lg">
          <nav aria-label="Điều hướng di động" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#522f3c] text-[#fff8f5]'
                      : 'text-[#4f4447] hover:bg-[#f5ece7] hover:text-[#391a26]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
