import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  Eye,
  Landmark,
  RotateCcw,
  Search,
  Verified
} from 'lucide-react';
import ArchivalImage from '../components/ArchivalImage.jsx';
import { artifactService } from '../services/artifactService.js';

const ROOM_FILTERS = [
  { id: 'all', label: 'Tất cả (15)' },
  { id: 'room1', label: 'Phòng 01: Di sản ngũ thân (4)' },
  { id: 'room2', label: 'Phòng 02: Lịch sử biến đổi (4)' },
  { id: 'room3', label: 'Phòng 03: Áo dài & Ký ức (4)' },
  { id: 'room4', label: 'Phòng 04: Sáng tạo đương đại (3)' }
];

const TYPE_FILTERS = [
  { id: 'all', label: 'Tất cả (15)' },
  { id: 'artifact', label: 'Hiện vật vật chất (9)' },
  { id: 'document', label: 'Tư liệu số (6)' }
];

export default function CollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialRoom = searchParams.get('room') || 'all';
  const initialQuery = searchParams.get('code') || '';

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [currentRoom, setCurrentRoom] = useState(initialRoom);
  const [currentType, setCurrentType] = useState('all');
  const [sortBy, setSortBy] = useState('code-asc');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);

  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({ total: 15, artifacts: 9, documents: 6 });
  const [bookmarkedCodes, setBookmarkedCodes] = useState(() => artifactService.getBookmarkedCodes());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const paramRoom = searchParams.get('room');
    const paramCode = searchParams.get('code');
    if (paramRoom) setCurrentRoom(paramRoom);
    if (paramCode) setSearchTerm(paramCode);
  }, [searchParams]);

  useEffect(() => {
    artifactService.getCatalogStats().then(setStats);
  }, []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    artifactService
      .getArtifacts({
        search: searchTerm,
        room: currentRoom,
        type: currentType,
        sort: sortBy
      })
      .then((res) => {
        if (!active) return;
        const resultList = onlyBookmarked
          ? res.content.filter((item) => bookmarkedCodes.includes(item.code))
          : res.content;
        setItems(resultList);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [searchTerm, currentRoom, currentType, sortBy, onlyBookmarked, bookmarkedCodes]);

  const handleToggleBookmark = (code) => {
    const updated = artifactService.toggleBookmark(code);
    setBookmarkedCodes(updated);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setCurrentRoom('all');
    setCurrentType('all');
    setSortBy('code-asc');
    setOnlyBookmarked(false);
    if (searchParams.toString()) {
      setSearchParams({});
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Curatorial Banner & Metric Ribbon */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#d3c2c6]">
          <div className="max-w-3xl">
            <div className="text-xs text-[#805434] uppercase tracking-widest font-semibold mb-1">
              Danh mục lưu trữ học thuật M3 · Giai đoạn nghiên cứu &amp; phục dựng số
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#391a26] mb-2">
              Bộ Sưu Tập Hiện Vật &amp; Tư Liệu Số
            </h1>
            <p className="text-base md:text-lg text-[#4f4447] mb-0 leading-relaxed">
              Tra cứu hệ thống 15 hồ sơ khoa học gồm 09 hiện vật vật chất và 06 tư liệu nghiên cứu số chuyên sâu từ Bảo tàng Phụ nữ Nam Bộ.
            </p>
          </div>

          <div className="bg-[#f5ece7] border border-[#d3c2c6] rounded px-4 py-3 flex items-center gap-4 shrink-0 tabular-nums">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-[#805434]" />
              <div>
                <div className="font-serif text-xl font-bold text-[#391a26] leading-none">
                  {stats.total}
                </div>
                <div className="text-[11px] text-[#4f4447]">Tổng hồ sơ</div>
              </div>
            </div>
            <div className="w-px h-8 bg-[#d3c2c6]" />
            <div>
              <div className="font-serif text-xl font-bold text-[#391a26] leading-none">
                0{stats.artifacts}
              </div>
              <div className="text-[11px] text-[#4f4447]">Hiện vật</div>
            </div>
            <div className="w-px h-8 bg-[#d3c2c6]" />
            <div>
              <div className="font-serif text-xl font-bold text-[#391a26] leading-none">
                0{stats.documents}
              </div>
              <div className="text-[11px] text-[#4f4447]">Tư liệu số</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter Console */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-8">
        <div className="bg-[#fbf2ed] border border-[#d3c2c6] rounded p-4 md:p-5 flex flex-col gap-4">
          <div className="row g-3 align-items-center">
            <div className="col-12 col-md-7">
              <div className="relative">
                <Search className="w-4 h-4 text-[#817477] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm theo mã hồ sơ (SAV-xxx), tên hiện vật, nhân vật hoặc niên đại..."
                  className="w-full pl-10 pr-4 py-2 bg-[#ffffff] border border-[#d3c2c6] rounded text-sm text-[#1e1b18] focus:outline-none focus:border-[#805434]"
                />
              </div>
            </div>

            <div className="col-12 col-md-5 flex flex-wrap sm:flex-nowrap items-center gap-2 justify-md-end">
              <select
                aria-label="Sắp xếp hồ sơ"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select text-sm bg-[#ffffff] border-[#d3c2c6] text-[#1e1b18] rounded py-2"
              >
                <option value="code-asc">Sắp xếp: Mã SAV (A-Z)</option>
                <option value="code-desc">Sắp xếp: Mã SAV (Z-A)</option>
                <option value="era">Sắp xếp: Niên đại lịch sử</option>
                <option value="name">Sắp xếp: Tên hiện vật</option>
              </select>

              <button
                type="button"
                onClick={resetFilters}
                className="px-3.5 py-2 bg-[#e9e1dc] hover:bg-[#efe6e2] text-[#391a26] text-xs font-semibold rounded flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            </div>
          </div>

          {/* Room Filters */}
          <div className="pt-3 border-t border-[#d3c2c6]/60 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs uppercase font-semibold text-[#805434] mr-1">
                Phòng trưng bày:
              </span>
              {ROOM_FILTERS.map((rf) => (
                <button
                  key={rf.id}
                  type="button"
                  onClick={() => setCurrentRoom(rf.id)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    currentRoom === rf.id
                      ? 'bg-[#522f3c] text-[#fff8f5]'
                      : 'bg-[#ffffff] border border-[#d3c2c6] text-[#4f4447] hover:bg-[#f5ece7]'
                  }`}
                >
                  {rf.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-semibold text-[#805434] mr-1">
                  Loại hồ sơ:
                </span>
                {TYPE_FILTERS.map((tf) => (
                  <button
                    key={tf.id}
                    type="button"
                    onClick={() => setCurrentType(tf.id)}
                    className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                      currentType === tf.id
                        ? 'bg-[#522f3c] text-[#fff8f5]'
                        : 'bg-[#ffffff] border border-[#d3c2c6] text-[#4f4447] hover:bg-[#f5ece7]'
                    }`}
                  >
                    {tf.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setOnlyBookmarked((prev) => !prev)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    onlyBookmarked
                      ? 'bg-[#805434] text-[#ffffff]'
                      : 'bg-[#ffffff] border border-[#d3c2c6] text-[#4f4447] hover:bg-[#f5ece7]'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Đã lưu ({bookmarkedCodes.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-[#4f4447] font-serif tabular-nums">
                <Eye className="w-3.5 h-3.5 text-[#805434]" />
                <span>Hiển thị {items.length}/15 hồ sơ đối chiếu</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        {loading ? (
          <div className="py-12 text-center text-sm text-[#4f4447]">
            Đang truy xuất dữ liệu từ kho lưu trữ...
          </div>
        ) : items.length === 0 ? (
          <div className="bg-[#fbf2ed] border border-[#d3c2c6] rounded py-12 px-4 text-center">
            <h3 className="font-serif text-xl font-semibold text-[#391a26] mb-2">
              Không tìm thấy hồ sơ phù hợp
            </h3>
            <p className="text-sm text-[#4f4447] max-w-md mx-auto mb-4">
              Vui lòng thử từ khóa tra cứu khác hoặc chọn lại phân loại phòng trưng bày để đối chiếu kết quả.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="museum-btn-primary px-4 py-2 text-xs font-semibold uppercase cursor-pointer"
            >
              Xóa điều kiện lọc
            </button>
          </div>
        ) : (
          <div className="row g-4">
            {items.map((item) => {
              const isBookmarked = bookmarkedCodes.includes(item.code);
              return (
                <div key={item.code} className="col-12 col-md-6 col-lg-4">
                  <article className="museum-card p-3 h-full flex flex-col justify-between group">
                    <div>
                      <div className="relative aspect-[4/5] rounded overflow-hidden bg-[#f5ece7] mb-3">
                        <ArchivalImage
                          src={item.imageUrl}
                          alt={item.title}
                          code={item.code}
                          caption={item.shortTitle}
                          imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e1b18]/80 to-transparent p-3 flex items-center justify-between text-xs text-[#fff8f5]">
                          <span className="font-mono font-semibold">{item.code}</span>
                          <span className="font-serif italic">{item.eraBadge}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleBookmark(item.code)}
                          aria-label={isBookmarked ? `Bỏ lưu ${item.code}` : `Lưu hồ sơ ${item.code}`}
                          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded flex items-center justify-center transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-[#805434] text-[#ffffff]'
                              : 'bg-[#fff8f5]/90 text-[#391a26] hover:bg-[#522f3c] hover:text-[#fff8f5]'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <div className="px-2">
                        <div className="text-xs text-[#805434] mb-1">
                          <span>{item.roomLabel}</span>
                          <span aria-hidden="true"> · </span>
                          <span>{item.typeLabel}</span>
                        </div>
                        <h3 className="font-serif text-lg font-semibold text-[#391a26] mb-1.5">
                          <Link to={`/bo-suu-tap/${item.code}`} className="hover:text-[#805434] transition-colors">
                            {item.shortTitle}
                          </Link>
                        </h3>
                        <p className="text-sm text-[#4f4447] leading-relaxed mb-3 line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-2 pt-3 border-t border-[#d3c2c6]/60 flex items-center justify-between">
                      <span className="font-serif text-xs text-[#4f4447]">
                        Bảo tàng Phụ nữ Nam Bộ
                      </span>
                      <Link
                        to={`/bo-suu-tap/${item.code}`}
                        className="museum-btn-primary px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1.5"
                      >
                        <span>{item.type === 'document' ? 'Đọc tư liệu' : 'Hồ sơ'}</span>
                        {item.type === 'document' ? (
                          <BookOpen className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </Link>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Curatorial Transparency Note */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-10">
        <div className="bg-[#f5ece7] border border-[#d3c2c6] rounded p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3 max-w-3xl">
            <Verified className="w-6 h-6 text-[#805434] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs uppercase font-bold tracking-wider text-[#391a26] mb-1">
                Minh bạch đồ họa &amp; Nguồn cấp dữ liệu nghiên cứu
              </h4>
              <p className="font-serif text-xs text-[#4f4447] mb-0 leading-relaxed">
                Hệ thống 15 mã hồ sơ định danh (SAV-001 đến SAV-015) được lập theo danh mục đối chiếu hiện vật của Bảo tàng Phụ nữ Nam Bộ phục vụ đồ án giai đoạn M3. Tất cả tư liệu và hình ảnh đồ họa số được giám tuyển nhằm tôn vinh giá trị văn hóa và giáo dục di sản trang phục Việt Nam.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-[#805434] font-semibold bg-[#ffffff] border border-[#d3c2c6] px-3 py-1.5 rounded whitespace-nowrap">
            Đề cương E01 · PH60600
          </span>
        </div>
      </section>
    </div>
  );
}
