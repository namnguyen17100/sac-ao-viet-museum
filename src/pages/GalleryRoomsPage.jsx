import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Database, History, Layers } from 'lucide-react';
import ArchivalImage from '../components/ArchivalImage.jsx';
import { galleryService } from '../services/galleryService.js';

export default function GalleryRoomsPage() {
  const { roomSlug } = useParams();
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);

    if (roomSlug) {
      Promise.all([galleryService.getRooms(), galleryService.getRoomBySlugOrId(roomSlug)])
        .then(([allRooms, currentRoom]) => {
          if (!active) return;
          setRooms(allRooms);
          setSelectedRoom(currentRoom);
          setLoading(false);
        })
        .catch((err) => {
          if (!active) return;
          setError(err.message || 'Không tìm thấy phòng trưng bày');
          setLoading(false);
        });
    } else {
      galleryService.getRooms().then((allRooms) => {
        if (!active) return;
        setRooms(allRooms);
        setSelectedRoom(null);
        setLoading(false);
      });
    }

    return () => {
      active = false;
    };
  }, [roomSlug]);

  const scrollToRoom = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 py-20 text-center text-sm text-[#4f4447]">
        Đang tải không gian phòng trưng bày...
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-2xl font-semibold text-[#391a26] mb-2">
          Không tìm thấy không gian trưng bày
        </h1>
        <p className="text-sm text-[#4f4447] mb-6">{error}</p>
        <Link to="/phong-trung-bay" className="museum-btn-primary px-5 py-2.5 text-xs font-semibold uppercase">
          Quay lại 4 phòng trưng bày
        </Link>
      </div>
    );
  }

  // Chế độ xem chi tiết từng phòng (/phong-trung-bay/phong-01)
  if (selectedRoom) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 lg:px-16 py-8 md:py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            to="/phong-trung-bay"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#805434] hover:text-[#391a26]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tất cả 4 phòng trưng bày</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            {rooms.map((r) => (
              <Link
                key={r.id}
                to={`/phong-trung-bay/${r.slug}`}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                  r.slug === selectedRoom.slug
                    ? 'bg-[#522f3c] text-[#fff8f5]'
                    : 'bg-[#f5ece7] text-[#391a26] hover:bg-[#efe6e2]'
                }`}
              >
                Phòng {r.number}
              </Link>
            ))}
          </div>
        </div>

        <div className="museum-card overflow-hidden mb-10">
          <div className="row g-0">
            <div className="col-12 col-lg-5 relative min-h-[320px] bg-[#f5ece7]">
              <ArchivalImage
                src={selectedRoom.imageUrl}
                alt={selectedRoom.title}
                code={`PHÒNG ${selectedRoom.number}`}
                caption={selectedRoom.title}
                imgClassName="w-full h-full object-cover"
              />
            </div>
            <div className="col-12 col-lg-7 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="text-xs text-[#805434] font-semibold uppercase tracking-wider mb-1">
                  Phòng trưng bày {selectedRoom.number} · {selectedRoom.eraLabel}
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#391a26] mb-3">
                  {selectedRoom.title}
                </h1>
                <p className="font-serif italic text-sm text-[#805434] mb-4">
                  "{selectedRoom.motto}"
                </p>
                <p className="text-base text-[#4f4447] leading-relaxed mb-5">
                  {selectedRoom.curatorNote}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#d3c2c6]/60 text-xs text-[#4f4447]">
                <span className="font-semibold text-[#391a26]">Đặc trưng chuyên đề:</span>
                {selectedRoom.characteristics.map((char, idx) => (
                  <span key={char}>
                    {char}
                    {idx < selectedRoom.characteristics.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold text-[#391a26] mb-0">
            Hiện vật &amp; Tư liệu trong Phòng {selectedRoom.number} ({selectedRoom.artifacts.length})
          </h2>
          <Link to="/bo-suu-tap" className="text-xs font-semibold uppercase text-[#805434] hover:text-[#391a26]">
            Mở toàn bộ danh mục
          </Link>
        </div>

        <div className="row g-4">
          {selectedRoom.artifacts.map((item) => (
            <div key={item.code} className="col-12 col-md-6 col-lg-3">
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
                  </div>
                  <div className="text-xs text-[#805434] mb-1 font-mono">
                    {item.code} · {item.typeLabel}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#391a26] mb-2">
                    {item.shortTitle}
                  </h3>
                  <p className="text-xs text-[#4f4447] leading-relaxed mb-3">
                    {item.summary}
                  </p>
                </div>
                <Link
                  to={`/bo-suu-tap/${item.code}`}
                  className="museum-btn-primary py-2 px-3 text-center text-xs font-semibold uppercase flex items-center justify-center gap-1.5"
                >
                  <span>{item.type === 'document' ? 'Đọc tư liệu' : 'Xem hồ sơ'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Chế độ tổng quan 4 phòng trưng bày (/phong-trung-bay)
  return (
    <div className="flex flex-col w-full">
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pt-8 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 text-xs text-[#4f4447]">
          <div>
            <span className="text-[#805434] font-semibold uppercase tracking-wider">
              Phân khu nghiên cứu số M3
            </span>
            <span className="mx-2">/</span>
            <span>Bảo tàng kỹ thuật số Sắc Áo Việt</span>
          </div>
          <div className="flex items-center gap-4 tabular-nums">
            <span className="inline-flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-[#805434]" />
              15 Hồ sơ tư liệu
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#805434]" />
              4 Không gian giám tuyển
            </span>
          </div>
        </div>

        <div className="row g-4 align-items-end pb-6">
          <div className="col-12 col-lg-8">
            <span className="text-xs uppercase tracking-wider text-[#805434] font-semibold block mb-1">
              Tập san triển lãm kỹ thuật số · Số hiệu C-2024-M3
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#391a26] mb-2">
              Phòng Trưng Bày Chuyên Đề
            </h1>
            <p className="text-base md:text-lg text-[#4f4447] max-w-3xl mb-0">
              Bốn không gian triển lãm được sắp xếp theo chủ đề và tiến trình lịch sử, giúp người xem khám phá chiều sâu văn hóa áo dài Việt Nam từ cấu trúc ngũ thân cổ truyền đến hơi thở đương đại.
            </p>
          </div>
          <div className="col-12 col-lg-4">
            <div className="bg-[#fbf2ed] border border-[#d3c2c6] rounded p-4">
              <div className="flex items-center gap-2 text-xs uppercase font-semibold text-[#391a26] mb-1">
                <History className="w-4 h-4 text-[#805434]" />
                <span>Ghi chú giám tuyển</span>
              </div>
              <p className="font-serif text-xs text-[#4f4447] mb-0 leading-relaxed">
                Cách phân chia không gian dựa trên định hướng giám tuyển học thuật của dự án Sắc Áo Việt, không phản ánh sơ đồ mặt bằng vật lý của Bảo tàng Phụ nữ Nam Bộ.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Room Scrubber */}
        <div className="bg-[#f5ece7] border border-[#d3c2c6]/60 p-3 rounded flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#805434] mr-1">
              Lộ trình quan sát:
            </span>
            {rooms.map((room) => (
              <button
                key={room.id}
                type="button"
                onClick={() => scrollToRoom(room.slug)}
                className="px-3 py-1.5 rounded bg-[#ffffff] border border-[#d3c2c6] text-xs font-medium text-[#391a26] hover:bg-[#522f3c] hover:text-[#fff8f5] hover:border-[#522f3c] transition-colors cursor-pointer"
              >
                <span className="font-mono mr-1.5">{room.number}.</span>
                {room.title}
              </button>
            ))}
          </div>
          <span className="font-serif text-xs text-[#4f4447] italic hidden xl:inline">
            Phân loại chuẩn hóa Dublin Core · Bản phục dựng số
          </span>
        </div>
      </section>

      {/* 4 Large Curatorial Room Cards */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 py-6 flex flex-col gap-10">
        {rooms.map((room) => (
          <article
            key={room.id}
            id={room.slug}
            className="museum-card overflow-hidden scroll-mt-24"
          >
            <div className="row g-0">
              <div className="col-12 col-lg-6 relative min-h-[360px] bg-[#f5ece7] flex flex-col justify-between p-6 overflow-hidden">
                <ArchivalImage
                  src={room.imageUrl}
                  alt={room.title}
                  code={`PHÒNG ${room.number}`}
                  caption={room.title}
                  imgClassName="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#391a26]/90 via-[#391a26]/45 to-[#391a26]/20 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between gap-2">
                  <div className="px-3 py-1.5 rounded bg-[#fff8f5]/95 text-[#391a26] text-xs font-semibold uppercase tracking-wider">
                    Phòng {room.number} · {room.themeLabel}
                  </div>
                  <div className="px-3 py-1.5 rounded bg-[#522f3c] text-[#fff8f5] text-xs font-medium tabular-nums">
                    {room.artifactCount} hồ sơ lưu trữ
                  </div>
                </div>

                <div className="relative z-10 mt-auto pt-10 text-[#fff8f5]">
                  <div className="text-xs uppercase tracking-wider text-[#fec39b] font-semibold mb-1">
                    {room.eraLabel}
                  </div>
                  <p className="font-serif text-sm text-[#f5ece7] italic mb-0">
                    "{room.motto}"
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-6 p-6 md:p-8 flex flex-col justify-between bg-[#ffffff]">
                <div>
                  <span className="text-xs text-[#805434] uppercase font-semibold tracking-wider block mb-1">
                    Phòng trưng bày {room.number}
                  </span>
                  <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#391a26] mb-3">
                    {room.title}
                  </h2>

                  <div className="bg-[#fbf2ed] border border-[#d3c2c6]/60 p-4 rounded mb-5">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-[#805434] block mb-1">
                      Nhận định giám tuyển
                    </span>
                    <p className="text-sm text-[#4f4447] leading-relaxed mb-0">
                      {room.curatorNote}
                    </p>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs uppercase font-semibold tracking-wider text-[#391a26] block mb-2">
                      Hồ sơ hiện vật trong phòng ({room.artifacts.length} mã SAV):
                    </span>
                    <div className="row g-2">
                      {room.artifacts.map((art) => (
                        <div key={art.code} className="col-6 col-sm-6">
                          <Link
                            to={`/bo-suu-tap/${art.code}`}
                            className="block p-2.5 bg-[#f5ece7] hover:bg-[#efe6e2] border border-[#d3c2c6]/50 rounded transition-colors"
                          >
                            <span className="font-mono text-xs font-bold text-[#391a26] block">
                              {art.code}
                            </span>
                            <span className="font-serif text-xs text-[#4f4447] block truncate">
                              {art.shortTitle}
                            </span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-[#4f4447] pt-2">
                    {room.characteristics.map((char, i) => (
                      <span key={char}>
                        {char}
                        {i < room.characteristics.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-[#d3c2c6]/50 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/phong-trung-bay/${room.slug}`}
                    className="museum-btn-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Bước vào Phòng {room.number}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <span className="font-serif text-xs text-[#805434] italic">
                    {room.footerCaption}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Curatorial Methodology Reference */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 py-10">
        <div className="bg-[#f5ece7] border border-[#d3c2c6] rounded p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-6 border-b border-[#d3c2c6]">
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-[#805434] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-serif text-xl font-semibold text-[#391a26] mb-1">
                  Phương Pháp Luận Giám Tuyển &amp; Chuẩn Hóa Dublin Core
                </h3>
                <p className="font-serif text-xs text-[#4f4447] mb-0">
                  Tiêu chuẩn mô tả siêu dữ liệu số hóa bảo tàng (Dublin Core Metadata Element Set ISO 15836)
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-[#805434] bg-[#ffffff] border border-[#d3c2c6] px-3 py-1 rounded">
              M3 / PH60600 - E01
            </span>
          </div>

          <div className="row g-4 mb-6">
            <div className="col-12 col-md-4">
              <div className="museum-card p-4 h-full">
                <h4 className="text-xs uppercase font-bold text-[#391a26] mb-2">
                  1. Siêu dữ liệu chuẩn
                </h4>
                <p className="text-xs text-[#4f4447] leading-relaxed mb-0">
                  Mỗi hồ sơ hiện vật (SAV-001 đến SAV-015) được lập chỉ mục theo chuẩn ISO 15836 (Title, Creator, Subject, Description, Date, Type, Format, Identifier, Rights).
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="museum-card p-4 h-full">
                <h4 className="text-xs uppercase font-bold text-[#391a26] mb-2">
                  2. Trục thời gian &amp; Chủ đề
                </h4>
                <p className="text-xs text-[#4f4447] leading-relaxed mb-0">
                  Sắp xếp không gian tuân thủ hai trục tương hỗ: Trục diễn biến niên đại và Trục ý niệm văn hóa (Kỹ nghệ, Canh tân, Ký ức, Tiếp biến).
                </p>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="museum-card p-4 h-full">
                <h4 className="text-xs uppercase font-bold text-[#391a26] mb-2">
                  3. Quyền hạn &amp; Nguồn tư liệu
                </h4>
                <p className="text-xs text-[#4f4447] leading-relaxed mb-0">
                  Nguồn tư liệu hiện vật thuộc quyền bảo tồn của Bảo tàng Phụ nữ Nam Bộ (TP.HCM). Ảnh minh họa phục vụ đồ án nghiên cứu M3 phi thương mại.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#4f4447]">
            <div>
              Tổng số hiện vật phân loại: <strong>15 hồ sơ mẫu</strong> · Hợp tác đối chiếu: <strong>Bảo tàng Phụ nữ Nam Bộ</strong>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="text-[#805434] hover:text-[#391a26] font-semibold uppercase">
                Về trang chủ
              </Link>
              <span>·</span>
              <Link to="/bo-suu-tap" className="text-[#805434] hover:text-[#391a26] font-semibold uppercase">
                Xem toàn bộ 15 hiện vật
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
