import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Copy,
  Gavel,
  Landmark,
  Scale,
  ShieldCheck,
  Verified,
  X
} from 'lucide-react';
import ArchivalImage from '../components/ArchivalImage.jsx';
import { COMPLIANCE_STEPS } from '../data/aboutData.js';
import { sourceService } from '../services/sourceService.js';

export default function SourcesPage() {
  const [searchParams] = useSearchParams();
  const [groupFilter, setGroupFilter] = useState('all');
  const [sources, setSources] = useState([]);
  const [selectedSource, setSelectedSource] = useState(null);
  const [copiedCitation, setCopiedCitation] = useState(false);

  useEffect(() => {
    let active = true;
    sourceService.getSources(groupFilter).then((data) => {
      if (!active) return;
      setSources(data);
      const targetId = searchParams.get('source');
      if (targetId) {
        const match = data.find((s) => s.id === targetId);
        if (match) setSelectedSource(match);
      }
    });
    return () => {
      active = false;
    };
  }, [groupFilter, searchParams]);

  const groupASources = sources.filter((s) => s.group === 'group-a');
  const groupBSources = sources.filter((s) => s.group === 'group-b');

  const handleCopyCitation = (source) => {
    const apaText = sourceService.generateApaCitation(source);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(apaText);
    }
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const renderBadge = (status) => {
    if (status === 'CHƯA') {
      return (
        <span className="museum-tag bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/30">
          CHƯA
        </span>
      );
    }
    if (status === 'KHÔNG CẦN') {
      return (
        <span className="museum-tag bg-[#ffdcc6] text-[#301400] border border-[#805434]/30">
          KHÔNG CẦN
        </span>
      );
    }
    return (
      <span className="museum-tag bg-[#f5ece7] text-[#805434] border border-[#d3c2c6]">
        RỒI
      </span>
    );
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Header & Stats */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pt-8 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6">
          <div>
            <div className="text-xs text-[#805434] uppercase tracking-widest font-semibold mb-1">
              Bảo tàng số / Minh bạch học thuật / <span className="text-[#391a26]">Nguồn &amp; Bản quyền</span>
            </div>
            <p className="font-serif text-xs text-[#805434] italic mb-0">
              Hồ sơ khảo cứu lưu trữ di sản · Giai đoạn M3 (Archival Scaffolding)
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs text-[#4f4447] bg-[#f5ece7] border border-[#d3c2c6] px-3 py-1.5 rounded">
            <Verified className="w-4 h-4 text-[#805434]" />
            <span>
              Hồ sơ kiểm định: <strong className="font-mono text-[#391a26]">SAV-LEGAL-M3-2025</strong>
            </span>
          </div>
        </div>

        <div className="row g-4 align-items-start">
          <div className="col-12 col-lg-8">
            <span className="text-xs uppercase font-semibold tracking-widest text-[#805434] block mb-2">
              Tuyên bố chuẩn mực giám tuyển &amp; Tuân thủ pháp lý
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#391a26] leading-tight mb-4">
              Nguồn Tư Liệu &amp; Tuyên Bố Bản Quyền
            </h1>
            <p className="text-base md:text-lg text-[#4f4447] max-w-3xl leading-relaxed mb-0">
              Đối chiếu toàn văn 18 nguồn tài liệu học thuật, cơ sở lưu trữ bảo tàng gốc và hiện trạng pháp lý phục vụ đề tài nghiên cứu số hóa áo dài truyền thống phụ nữ Việt Nam qua các thời kỳ lịch sử.
            </p>
          </div>

          <div className="col-12 col-lg-4">
            <div className="bg-[#fbf2ed] border border-[#d3c2c6] p-5 rounded">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wider text-[#805434] font-semibold">
                  Thống kê tư liệu M3
                </span>
                <Landmark className="w-4 h-4 text-[#805434]" />
              </div>
              <div className="row g-2 mb-3 tabular-nums">
                <div className="col-4">
                  <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-2.5 rounded text-center">
                    <span className="block font-serif text-2xl font-bold text-[#391a26]">18</span>
                    <span className="text-[11px] text-[#4f4447]">Tổng nguồn</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-2.5 rounded text-center">
                    <span className="block font-serif text-2xl font-bold text-[#805434]">13</span>
                    <span className="text-[11px] text-[#4f4447]">BT Phụ Nữ</span>
                  </div>
                </div>
                <div className="col-4">
                  <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-2.5 rounded text-center">
                    <span className="block font-serif text-2xl font-bold text-[#53320d]">05</span>
                    <span className="text-[11px] text-[#4f4447]">Pháp quy/QG</span>
                  </div>
                </div>
              </div>
              <p className="font-serif text-xs text-[#4f4447] italic mb-0">
                Tuân thủ cấu trúc chuẩn 15 trường Dublin Core Metadata (ISO 15836) và các quy chuẩn bảo tồn di sản số.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Status Banner */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-10">
        <div className="bg-[#ffffff] border border-[#ba1a1a]/40 rounded p-5 md:p-7">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-8">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#ffdad6] text-[#93000a] text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  Trạng thái dự án: Chưa được cấp phép chính thức
                </span>
                <span className="font-serif text-xs text-[#805434] italic">
                  Cảnh báo pháp lý lưu trữ đồ án sinh viên M3
                </span>
              </div>

              <h2 className="font-serif text-xl md:text-2xl font-semibold text-[#391a26] mb-3">
                Quy chế khai thác tư liệu hình ảnh và ranh giới nghiên cứu phi thương mại
              </h2>

              <p className="text-sm text-[#4f4447] leading-relaxed mb-3">
                Dự án <strong>Sắc Áo Việt</strong> hiện tại triển khai ở quy mô đồ án học thuật (Mốc M3 — Sinh viên Bùi Trung Nam, MSSV: PH60600). Toàn bộ hình ảnh áo dài trong bảo tàng trực tuyến hiện tại là <strong>đồ họa minh họa phục dựng học thuật</strong>, chưa có văn bản ký kết chính thức chuyển giao bản quyền hình ảnh thương mại hoặc độc quyền tư liệu gốc từ <strong>Bảo tàng Phụ nữ Nam Bộ</strong>.
              </p>

              <div className="bg-[#fbf2ed] border border-[#d3c2c6] rounded p-3.5 flex items-start gap-3">
                <Gavel className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5" />
                <p className="font-serif text-xs text-[#1e1b18] mb-0 leading-relaxed">
                  <strong>Cam kết đạo đức số:</strong> Nghiêm cấm mọi hành vi sao chép, tải về, tái phân phối hoặc thương mại hóa bất kỳ tư liệu, hiện vật phục dựng nào từ hệ thống. Toàn bộ nội dung tuân thủ chặt chẽ Điều 14 &amp; Điều 22 Luật Di sản Văn hóa số 45/2024/QH15.
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-4">
              <div className="bg-[#fbf2ed] border border-[#d3c2c6] p-4 rounded flex flex-col gap-3">
                <span className="text-xs uppercase font-bold tracking-wider text-[#391a26]">
                  Phân loại 3 nhãn quyền nghiên cứu
                </span>

                <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-3 rounded flex items-start gap-3">
                  {renderBadge('RỒI')}
                  <div>
                    <span className="block text-xs font-semibold text-[#391a26]">
                      Văn bản quy phạm &amp; Công bố mở
                    </span>
                    <p className="font-serif text-[11px] text-[#4f4447] mb-0 mt-0.5">
                      Được trích dẫn hợp pháp phục vụ nghiên cứu &amp; giáo dục.
                    </p>
                  </div>
                </div>

                <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-3 rounded flex items-start gap-3">
                  {renderBadge('CHƯA')}
                  <div>
                    <span className="block text-xs font-semibold text-[#391a26]">
                      Ảnh hiện vật gốc &amp; Độc quyền
                    </span>
                    <p className="font-serif text-[11px] text-[#4f4447] mb-0 mt-0.5">
                      Tư liệu hiện vật bảo tàng, đang lập hồ sơ xin cấp phép văn bản.
                    </p>
                  </div>
                </div>

                <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-3 rounded flex items-start gap-3">
                  {renderBadge('KHÔNG CẦN')}
                  <div>
                    <span className="block text-xs font-semibold text-[#391a26]">
                      Chuẩn siêu dữ liệu &amp; Schema
                    </span>
                    <p className="font-serif text-[11px] text-[#4f4447] mb-0 mt-0.5">
                      Hạ tầng Dublin Core ISO 15836, tiêu chuẩn mở phi độc quyền.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 18-Source Comparison Table */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider text-[#805434] block mb-1">
              Hệ thống đối chiếu hồ sơ tư liệu
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#391a26] mb-1">
              Bảng Đối Chiếu 18 Nguồn Tài Liệu Học Thuật
            </h2>
            <p className="text-sm text-[#4f4447] mb-0">
              Danh mục lưu trữ chi tiết xác lập cơ sở giám tuyển cho từng mã hiện vật trưng bày (SAV-001 đến SAV-015).
            </p>
          </div>

          <div className="bg-[#f5ece7] border border-[#d3c2c6] p-1 rounded flex flex-wrap gap-1 self-start">
            {[
              { id: 'all', label: 'Tất cả (18)' },
              { id: 'group-a', label: 'BT Phụ Nữ Nam Bộ (13)' },
              { id: 'group-b', label: 'Cơ quan & Tiêu chuẩn (5)' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setGroupFilter(tab.id)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  groupFilter === tab.id
                    ? 'bg-[#522f3c] text-[#fff8f5]'
                    : 'text-[#4f4447] hover:text-[#391a26]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Group A Table */}
        {groupASources.length > 0 && (
          <div className="mb-8 border border-[#d3c2c6] rounded overflow-hidden bg-[#ffffff]">
            <div className="bg-[#efe6e2] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d3c2c6]">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#391a26] mb-0.5">
                  Nhóm A: Bảo Tàng Phụ Nữ Nam Bộ
                </h3>
                <span className="font-serif text-xs text-[#4f4447]">
                  200-202 Võ Thị Sáu, P. Võ Thị Sáu, Q.3, TP. Hồ Chí Minh · 13 nguồn đối chiếu
                </span>
              </div>
              <span className="text-xs uppercase font-semibold text-[#805434]">
                Tư liệu hiện vật &amp; Ký ức nhân chứng
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-sm">
                <thead className="bg-[#f5ece7] text-xs uppercase text-[#4f4447]">
                  <tr>
                    <th className="py-3 px-4">Mã nguồn</th>
                    <th className="py-3 px-4">Tên văn bản / Khảo cứu / Hiện vật</th>
                    <th className="py-3 px-4">Cơ quan cung cấp</th>
                    <th className="py-3 px-4">Phạm vi ứng dụng trong SAV</th>
                    <th className="py-3 px-4 text-center">Nhãn quyền</th>
                    <th className="py-3 px-4 text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efe6e2]">
                  {groupASources.map((src) => (
                    <tr key={src.id}>
                      <td className="py-3 px-4 font-mono font-bold text-[#805434] tabular-nums whitespace-nowrap">
                        {src.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#391a26]">{src.title}</div>
                        <div className="font-serif text-xs text-[#4f4447] italic">{src.subtitle}</div>
                      </td>
                      <td className="py-3 px-4 text-[#4f4447]">{src.authority}</td>
                      <td className="py-3 px-4 text-[#1e1b18]">{src.scope}</td>
                      <td className="py-3 px-4 text-center">{renderBadge(src.rightsStatus)}</td>
                      <td className="py-3 px-4 text-end">
                        <button
                          type="button"
                          onClick={() => setSelectedSource(src)}
                          className="text-xs font-semibold uppercase text-[#805434] hover:text-[#391a26] underline underline-offset-4 cursor-pointer bg-transparent border-0"
                        >
                          Đối chiếu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Group B Table */}
        {groupBSources.length > 0 && (
          <div className="border border-[#d3c2c6] rounded overflow-hidden bg-[#ffffff]">
            <div className="bg-[#efe6e2] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#d3c2c6]">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#391a26] mb-0.5">
                  Nhóm B: Cơ Quan Nhà Nước, Bảo Tàng Quốc Gia &amp; Chuẩn Hóa
                </h3>
                <span className="font-serif text-xs text-[#4f4447]">
                  Cơ sở pháp lý di sản văn hóa, quản lý dữ liệu bảo tàng &amp; chuẩn siêu dữ liệu quốc tế · 5 nguồn đối chiếu
                </span>
              </div>
              <span className="text-xs uppercase font-semibold text-[#805434]">
                Cơ sở pháp lý &amp; Tiêu chuẩn ISO
              </span>
            </div>

            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0 text-sm">
                <thead className="bg-[#f5ece7] text-xs uppercase text-[#4f4447]">
                  <tr>
                    <th className="py-3 px-4">Mã nguồn</th>
                    <th className="py-3 px-4">Tên văn bản / Cơ sở pháp lý</th>
                    <th className="py-3 px-4">Cơ quan ban hành / Quản lý</th>
                    <th className="py-3 px-4">Phạm vi ứng dụng trong SAV</th>
                    <th className="py-3 px-4 text-center">Nhãn quyền</th>
                    <th className="py-3 px-4 text-end">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#efe6e2]">
                  {groupBSources.map((src) => (
                    <tr key={src.id}>
                      <td className="py-3 px-4 font-mono font-bold text-[#805434] tabular-nums whitespace-nowrap">
                        {src.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-[#391a26]">{src.title}</div>
                        <div className="font-serif text-xs text-[#4f4447] italic">{src.subtitle}</div>
                      </td>
                      <td className="py-3 px-4 text-[#4f4447]">{src.authority}</td>
                      <td className="py-3 px-4 text-[#1e1b18]">{src.scope}</td>
                      <td className="py-3 px-4 text-center">{renderBadge(src.rightsStatus)}</td>
                      <td className="py-3 px-4 text-end">
                        <button
                          type="button"
                          onClick={() => setSelectedSource(src)}
                          className="text-xs font-semibold uppercase text-[#805434] hover:text-[#391a26] underline underline-offset-4 cursor-pointer bg-transparent border-0"
                        >
                          Đối chiếu
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Visual Transparency Showcase */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="bg-[#fbf2ed] border border-[#d3c2c6] rounded p-6 md:p-8">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-6">
              <span className="text-xs uppercase text-[#805434] tracking-widest font-semibold block mb-2">
                Tư liệu giám tuyển thực tế
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#391a26] mb-3">
                Minh bạch giữa ảnh minh họa nghiên cứu và tư liệu gốc
              </h3>
              <p className="text-sm md:text-base text-[#4f4447] leading-relaxed mb-4">
                Để đảm bảo không xâm phạm tác quyền của bảo tàng lưu giữ, mọi hình ảnh hiển thị trên nền tảng Sắc Áo Việt hiện tại đều được định danh là minh họa phục dựng số. Nhóm nghiên cứu cam kết chỉ công bố ảnh độ nét cao nguyên bản sau khi hoàn tất thủ tục bàn giao với cơ quan chức năng.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-[#4f4447] font-serif">
                <span className="bg-[#ffffff] border border-[#d3c2c6] px-3 py-1.5 rounded">
                  Định danh minh họa: ACADEMIC_USE_ONLY
                </span>
                <span className="bg-[#ffffff] border border-[#d3c2c6] px-3 py-1.5 rounded">
                  Phạm vi: Phi thương mại M3
                </span>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="row g-3">
                <div className="col-6">
                  <div className="museum-card p-2.5">
                    <div className="aspect-[3/4] rounded overflow-hidden bg-[#f5ece7] mb-2">
                      <ArchivalImage
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmP9lvEUtAr_9XH7kKmVSu_TPo7GzsA6RA7osZITho4PVcYrgnABNYa8o-toHeAKilUc7T0UJtoAB4ZgUq6My7IILiI-FZeHaGsxEuknpu69QGNI01zB8qzt49scvmH4Qo6D9gAV2deKjSt1gO50QZ4wBW_nY1jh-Uz1zf_2ivm27d4yFzbJIcgXP4UptU1twpPlAzmxTU1Y3RPcA5HJwbU08pkbACTzGaHGdfGICD"
                        alt="Tơ tằm dệt hoa văn"
                        code="SAV-001"
                        caption="Tơ tằm dệt hoa văn"
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#391a26] block">
                      Tơ tằm dệt hoa văn
                    </span>
                    <span className="font-serif text-[11px] text-[#4f4447] italic">
                      Mô phỏng tư liệu SAV-001
                    </span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="museum-card p-2.5">
                    <div className="aspect-[3/4] rounded overflow-hidden bg-[#f5ece7] mb-2">
                      <ArchivalImage
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCiuvh5xAV6xIZ4YMiOcaRtuqy0zptsQjp7whvvbY-cj_XqV1rkvMP84M2FG4Tnm73x57RuEohqOQGgd6tw_74Gsnv9NOh3XfeTQJnAxVN5-Tjh3SGaK-afCsfnBxGjCH9woqiecbssvm-NXuXR17LZrUs8aaJjFrrKRAZvNncaQaBGJVc0WQSIYgh1omvcTpyh4G5Zq7TL1N75sP-rRgJcSLNwwHizA6dAYjsY6RvH"
                        alt="Phom dáng Ngũ Thân"
                        code="SAV-008"
                        caption="Phom dáng Ngũ Thân"
                        imgClassName="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#391a26] block">
                      Phom dáng Ngũ Thân
                    </span>
                    <span className="font-serif text-[11px] text-[#4f4447] italic">
                      Mô phỏng tư liệu SAV-008
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Compliance Pipeline */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="mb-6">
          <span className="text-xs uppercase font-semibold tracking-wider text-[#805434] block mb-1">
            Quy chuẩn chuyển giao &amp; Hợp thức hóa
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-[#391a26] mb-1">
            Quy Trình 5 Bước Hoàn Tất Bản Quyền Công Khai Dự Án
          </h2>
          <p className="text-sm text-[#4f4447] mb-0">
            Lộ trình nghiêm ngặt nhằm chuẩn hóa cơ sở pháp lý trước khi đưa Sắc Áo Việt từ đồ án sinh viên (M3) thành bảo tàng mở chính thức.
          </p>
        </div>

        <div className="row g-3">
          {COMPLIANCE_STEPS.map((st) => (
            <div key={st.step} className="col-12 col-md-6 col-xl">
              <div className="museum-card p-4 h-full flex flex-col justify-between">
                <div>
                  <span className="inline-flex w-8 h-8 rounded bg-[#ffdcc6] text-[#301400] items-center justify-center font-mono text-xs font-bold mb-3">
                    {st.step}
                  </span>
                  <h4 className="font-serif text-base font-semibold text-[#391a26] mb-1">
                    {st.title}
                  </h4>
                  <p className="text-xs text-[#4f4447] leading-relaxed mb-4">
                    {st.description}
                  </p>
                </div>
                <div className="bg-[#f5ece7] p-2.5 rounded">
                  <span className="text-[11px] uppercase font-semibold text-[#805434] block">
                    {st.metaLabel}
                  </span>
                  <span className="font-serif text-xs text-[#1e1b18]">{st.metaValue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Foundation & Digital Ethics */}
      <section className="max-w-[1440px] w-full mx-auto px-4 md:px-10 lg:px-16 pb-12">
        <div className="row g-4">
          <div className="col-12 col-lg-6">
            <div className="bg-[#f5ece7] border border-[#d3c2c6] p-6 rounded h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-[#522f3c] text-[#fff8f5] flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#391a26] mb-0">
                      Căn Cứ Pháp Lý Trọng Yếu
                    </h3>
                    <span className="text-xs uppercase font-semibold text-[#805434]">
                      Luật Di sản Văn hóa số 45/2024/QH15
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-xs text-[#4f4447] leading-relaxed">
                  <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-4 rounded">
                    <h5 className="text-xs font-bold text-[#391a26] mb-1">
                      Điều 14: Quyền và nghĩa vụ bảo vệ tính toàn vẹn hiện vật
                    </h5>
                    <p className="mb-0">
                      Nghiêm cấm hành vi xuyên tạc thông tin, làm sai lệch hiện trạng, niên đại hoặc kết cấu y phục truyền thống trong quá trình tái hiện số. Mọi đồ họa minh họa phải trung thành với mô tả khoa học của hội đồng giám tuyển bảo tàng.
                    </p>
                  </div>
                  <div className="bg-[#ffffff] border border-[#d3c2c6]/60 p-4 rounded">
                    <h5 className="text-xs font-bold text-[#391a26] mb-1">
                      Điều 22: Chuẩn hóa cơ sở dữ liệu số hóa di sản
                    </h5>
                    <p className="mb-0">
                      Nhà nước khuyến khích các sáng kiến số hóa tư liệu phục vụ mục đích giáo dục, bảo tồn và nghiên cứu phi lợi nhuận; đồng thời quy định dữ liệu số phải tuân thủ phân định bản quyền của đơn vị sở hữu hiện vật vật lý.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#d3c2c6] flex items-center justify-between text-xs text-[#805434] font-serif">
                <span>Trích xuất từ Công báo Nước CHXHCN Việt Nam</span>
                <span className="font-mono">LUAT-45-2024</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="bg-[#391a26] text-[#fff8f5] p-6 rounded h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded bg-[#fff8f5] text-[#391a26] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#fff8f5] mb-0">
                      Nguyên Tắc Đạo Đức Số &amp; Tôn Kính Di Sản
                    </h3>
                    <span className="text-xs uppercase font-semibold text-[#ffdcbe]">
                      Di sản nhân chứng lịch sử
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#e9e1dc] leading-relaxed mb-4">
                  Mỗi tà áo dài trong bảo tàng trực tuyến không chỉ là một tạo tác dệt may thuần túy mà là một <strong>chứng nhân lịch sử thiêng liêng</strong>. Đó là chiếc áo dài của các vị lãnh đạo ngoại giao tại Hòa đàm Paris, là kỷ vật của các Mẹ Việt Nam Anh Hùng, là áo cưới giữa bom đạn chiến tranh.
                </p>

                <div className="flex flex-col gap-2.5 text-xs text-[#efe6e2]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ffdcbe] shrink-0 mt-0.5" />
                    <span>Tuyệt đối giữ gìn câu chuyện lịch sử nguyên bản, không hư cấu hoặc thi vị hóa thương mại câu chuyện của nhân chứng.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ffdcbe] shrink-0 mt-0.5" />
                    <span>Luôn công khai danh tính cá nhân hiến tặng và đơn vị lưu giữ trong mọi tài liệu xuất bản hoặc giao diện tương tác.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ffdcbe] shrink-0 mt-0.5" />
                    <span>Sẵn sàng gỡ bỏ hoặc cập nhật tư liệu ngay khi nhận được phản hồi từ thân nhân nhân vật lịch sử hoặc cơ quan bảo tồn.</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#522f3c] flex items-center justify-between text-xs text-[#ffdcbe] font-serif">
                <span>Dự án đồ án học thuật M3 · Sắc Áo Việt</span>
                <span>Chủ nhiệm: Bùi Trung Nam</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Modal */}
      {selectedSource && (
        <div
          className="fixed inset-0 z-50 bg-[#391a26]/45 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedSource(null)}
        >
          <div
            className="bg-[#ffffff] border border-[#d3c2c6] max-w-xl w-full rounded shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#f5ece7] px-5 py-3.5 flex items-center justify-between border-b border-[#d3c2c6]">
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-wider text-[#391a26]">
                <Verified className="w-4 h-4 text-[#805434]" />
                <span>Hồ sơ đối chiếu tư liệu</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSource(null)}
                aria-label="Đóng cửa sổ"
                className="w-8 h-8 rounded flex items-center justify-center text-[#4f4447] hover:bg-[#efe6e2] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-[#805434] uppercase">
                  {selectedSource.id}
                </span>
                <h4 className="font-serif text-xl font-semibold text-[#391a26] mt-1 mb-1">
                  {selectedSource.title}
                </h4>
                <span className="font-serif text-xs text-[#4f4447] block">
                  Cơ quan quản trị: {selectedSource.authority}
                </span>
              </div>

              <div className="bg-[#fbf2ed] border border-[#d3c2c6]/60 p-3.5 rounded">
                <span className="text-[11px] uppercase font-semibold text-[#805434] block mb-1">
                  Tình trạng đối chiếu
                </span>
                <p className="text-sm text-[#1e1b18] mb-0">
                  {selectedSource.verificationDetail}
                </p>
              </div>

              <div className="flex items-center justify-between bg-[#f5ece7] px-3.5 py-2.5 rounded text-xs">
                <span className="text-[#4f4447]">Phân cấp quyền hạn:</span>
                {renderBadge(selectedSource.rightsStatus)}
              </div>

              <div className="flex items-center justify-between text-xs font-serif text-[#4f4447]">
                <span>Liên kết gốc lưu trữ:</span>
                <a
                  href={selectedSource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#805434] underline underline-offset-4"
                >
                  {selectedSource.domain}
                </a>
              </div>
            </div>

            <div className="px-5 py-3.5 bg-[#f5ece7] border-t border-[#d3c2c6] flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedSource(null)}
                className="px-4 py-2 rounded text-xs font-semibold bg-[#e9e1dc] text-[#391a26] hover:bg-[#d3c2c6] cursor-pointer"
              >
                Đóng cửa sổ
              </button>
              <button
                type="button"
                onClick={() => handleCopyCitation(selectedSource)}
                className="museum-btn-primary px-4 py-2 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Đã sao chép trích dẫn APA' : 'Sao chép trích dẫn APA'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
