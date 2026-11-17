import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Landmark, Search, ShieldCheck, X } from 'lucide-react';
import { searchService } from '../services/searchService.js';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ artifacts: [], rooms: [], eras: [], sources: [] });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    setIsLoading(true);
    searchService.globalSearch(query).then((res) => {
      if (active) {
        setResults(res);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, [query, isOpen]);

  if (!isOpen) return null;

  const totalResults =
    results.artifacts.length +
    results.rooms.length +
    results.eras.length +
    results.sources.length;

  const handleNavigate = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#391a26]/45 backdrop-blur-sm flex items-start justify-center p-4 pt-20 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-search-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-[#ffffff] border border-[#d3c2c6] rounded shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#f5ece7] px-5 py-4 flex items-center justify-between border-b border-[#d3c2c6]">
          <div>
            <h2 id="global-search-title" className="font-serif text-lg font-semibold text-[#391a26] mb-0">
              Tra cứu di sản Sắc Áo Việt
            </h2>
            <p className="text-xs text-[#4f4447] mb-0">
              Tìm kiếm theo mã hồ sơ (SAV-001..015), tên hiện vật, phòng trưng bày, niên đại hoặc nguồn tài liệu (SRC-01..18)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Đóng cửa sổ tra cứu"
            className="w-9 h-9 rounded flex items-center justify-center text-[#4f4447] hover:bg-[#efe6e2] hover:text-[#391a26] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-[#817477] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ví dụ: SAV-001, Nguyễn Thị Bình, Le Mur, Ngũ thân, Đinh Văn Thơ..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#fff8f5] border border-[#d3c2c6] rounded text-sm text-[#1e1b18] focus:outline-none focus:border-[#805434]"
            />
          </div>

          {!query.trim() ? (
            <div className="bg-[#fbf2ed] rounded p-4 border border-[#d3c2c6]/60">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#805434] mb-2">
                Gợi ý từ khóa tra cứu nhanh
              </p>
              <div className="flex flex-wrap gap-2">
                {['SAV-001', 'Nguyễn Thị Bình', 'Ngũ thân', 'Phan Thị Quyên', 'Đinh Văn Thơ', 'Le Mur', 'SRC-17'].map(
                  (keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => setQuery(keyword)}
                      className="px-3 py-1.5 text-xs font-medium bg-[#ffffff] border border-[#d3c2c6] rounded text-[#391a26] hover:border-[#805434] hover:bg-[#f5ece7] transition-colors cursor-pointer"
                    >
                      {keyword}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : isLoading ? (
            <div className="py-8 text-center text-sm text-[#4f4447]">
              Đang đối chiếu kho dữ liệu lưu trữ...
            </div>
          ) : totalResults === 0 ? (
            <div className="py-8 text-center">
              <p className="font-serif text-base text-[#391a26] mb-1">
                Không tìm thấy kết quả phù hợp cho "{query}"
              </p>
              <p className="text-xs text-[#4f4447] mb-0">
                Thử tìm theo mã hồ sơ như SAV-001, tên nhân vật lịch sử hoặc niên đại (1973, 1964, 1930).
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {results.artifacts.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#805434] mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Hồ sơ hiện vật &amp; Tư liệu ({results.artifacts.length})</span>
                  </h3>
                  <div className="flex flex-col gap-2">
                    {results.artifacts.map((item) => (
                      <button
                        key={item.code}
                        type="button"
                        onClick={() => handleNavigate(`/bo-suu-tap/${item.code}`)}
                        className="w-full text-left p-3 bg-[#fbf2ed] hover:bg-[#f5ece7] border border-[#d3c2c6]/60 rounded flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="text-xs text-[#805434] font-mono font-semibold">
                            {item.code} · {item.typeLabel} · {item.roomLabel}
                          </div>
                          <div className="font-serif text-sm font-semibold text-[#391a26] truncate">
                            {item.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#805434] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.rooms.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#805434] mb-2 flex items-center gap-1.5">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>Phòng trưng bày ({results.rooms.length})</span>
                  </h3>
                  <div className="flex flex-col gap-2">
                    {results.rooms.map((room) => (
                      <button
                        key={room.id}
                        type="button"
                        onClick={() => handleNavigate(`/phong-trung-bay/${room.slug}`)}
                        className="w-full text-left p-3 bg-[#fbf2ed] hover:bg-[#f5ece7] border border-[#d3c2c6]/60 rounded flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="text-xs text-[#805434] font-semibold">
                            Phòng {room.number} · {room.eraLabel}
                          </div>
                          <div className="font-serif text-sm font-semibold text-[#391a26]">
                            {room.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#805434] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.eras.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#805434] mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Dòng thời gian ({results.eras.length})</span>
                  </h3>
                  <div className="flex flex-col gap-2">
                    {results.eras.map((era) => (
                      <button
                        key={era.id}
                        type="button"
                        onClick={() => handleNavigate(`/dong-thoi-gian?era=${era.id}`)}
                        className="w-full text-left p-3 bg-[#fbf2ed] hover:bg-[#f5ece7] border border-[#d3c2c6]/60 rounded flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="text-xs text-[#805434] font-semibold">
                            {era.badge} · {era.eraDate}
                          </div>
                          <div className="font-serif text-sm font-semibold text-[#391a26]">
                            {era.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#805434] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {results.sources.length > 0 && (
                <div>
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#805434] mb-2 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Nguồn tư liệu &amp; Pháp lý ({results.sources.length})</span>
                  </h3>
                  <div className="flex flex-col gap-2">
                    {results.sources.map((src) => (
                      <button
                        key={src.id}
                        type="button"
                        onClick={() => handleNavigate(`/nguon-va-ban-quyen?source=${src.id}`)}
                        className="w-full text-left p-3 bg-[#fbf2ed] hover:bg-[#f5ece7] border border-[#d3c2c6]/60 rounded flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      >
                        <div>
                          <div className="text-xs text-[#805434] font-mono font-semibold">
                            {src.id} · {src.authority} · {src.rightsStatus}
                          </div>
                          <div className="font-serif text-sm font-semibold text-[#391a26]">
                            {src.title}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#805434] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
