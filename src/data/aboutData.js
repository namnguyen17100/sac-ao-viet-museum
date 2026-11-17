/**
 * Thông tin dự án học thuật M3 - Bùi Trung Nam PH60600 - E01
 */

export const PROJECT_INFO = {
  brandName: 'SẮC ÁO VIỆT',
  subtitle: 'Bảo tàng áo dài trực tuyến',
  studentName: 'Bùi Trung Nam',
  studentId: 'PH60600',
  ideaCode: 'E01',
  phase: 'Giai đoạn M3 (Archival Scaffolding)',
  completionPercent: 85,
  partnerMuseum: {
    name: 'Bảo tàng Phụ nữ Nam Bộ',
    address: '200-202 Đường Võ Thị Sáu, Phường Võ Thị Sáu, Quận 3, Thành phố Hồ Chí Minh',
    website: 'https://baotangphunu.com'
  },
  techStack: {
    frontend: 'React JS, JavaScript (JSX), HTML5, CSS3, Bootstrap',
    backend: 'Java, Spring Boot, Hibernate (Kiến trúc Service sẵn sàng tích hợp)',
    database: 'MySQL',
    security: 'Spring Security, JWT, HTTPS/SSL/TLS',
    tools: 'Visual Studio Code, IntelliJ IDEA, Google AI Studio, Git, GitHub'
  }
};

export const RESEARCH_PILLARS = [
  {
    number: 'Trụ cột 01',
    title: 'Giám Tuyển Khoa Học (Curatorial Rigor)',
    description:
      'Phân loại 15 hồ sơ dựa trên bối cảnh xã hội và mỹ thuật: từ kết cấu áo ngũ thân triều Nguyễn (triết lý Ngũ Thường), phong trào canh tân Le Mur - Cát Tường 1930s, đến tà áo ngoại giao thời chiến và nghệ thuật dệt may tơ tằm đương đại.',
    footer: 'Phương pháp tiếp cận: Sử học & Dân tộc học tạo hình',
    icon: 'book'
  },
  {
    number: 'Trụ cột 02',
    title: 'Tiêu Chuẩn Siêu Dữ Liệu (Dublin Core ISO 15836)',
    description:
      'Thiết lập bộ trường dữ liệu chuẩn cho mỗi hiện vật (Title, Creator, Subject, Temporal, Spatial, Provenance, Format...). Cung cấp khả năng liên kết mở (JSON-LD) sẵn sàng tích hợp với API Spring Boot và mạng lưới bảo tàng.',
    footer: 'Chuẩn dữ liệu: Qualified Dublin Core XML / JSON-LD',
    icon: 'database'
  },
  {
    number: 'Trụ cột 03',
    title: 'Minh Bạch Học Thuật & Đạo Đức Số',
    description:
      'Phân định nghiêm ngặt giữa tranh ảnh phục dựng số mang tính trực quan hóa và hiện vật gốc mang bản quyền bảo tàng. Tôn trọng hiện trạng, từ chối việc suy diễn phi lịch sử và cam kết mục tiêu phi thương mại.',
    footer: 'Tiêu chuẩn: Creative Commons BY-NC-ND 4.0',
    icon: 'scale'
  }
];

export const PRODUCTION_ROADMAP = [
  {
    step: '01',
    title: 'Kiểm Chứng Kho Hiện Vật',
    description: 'Bổ sung và đối chiếu đầy đủ 15 hiện vật vật chất từ kho lưu trữ của các bảo tàng chuyên đề trang phục.',
    tag: 'Khảo sát kho',
    highlight: false
  },
  {
    step: '02',
    title: 'Xác Thực Hồ Sơ Gốc',
    description: 'Chuẩn hóa mã kiểm kê chính thức, niên đại học và ghi nhận lai lịch (provenance) cùng hội đồng khoa học.',
    tag: 'Thẩm định sử liệu',
    highlight: false
  },
  {
    step: '03',
    title: 'Ký Kết Bản Quyền Ảnh',
    description: 'Ký thỏa thuận cấp phép số hóa độ nét cao (RAW/TIFF) với đơn vị giữ di sản để phục vụ giáo dục mở.',
    tag: 'Pháp lý & Bản quyền',
    highlight: false
  },
  {
    step: '04',
    title: 'Tích Hợp Spring Boot & MySQL',
    description: 'Kết nối Service Layer Frontend với REST API Java Spring Boot, Hibernate, MySQL và bảo mật JWT over HTTPS.',
    tag: 'Kiến trúc Full-Stack',
    highlight: false
  },
  {
    step: '05',
    title: 'Phát Hành Cộng Đồng',
    description: 'Ra mắt chính thức nền tảng giáo dục di sản mở, phục vụ học sinh, sinh viên và nhà nghiên cứu văn hóa Việt Nam.',
    tag: 'Mục tiêu 2025',
    highlight: true
  }
];

export const COMPLIANCE_STEPS = [
  {
    step: '01',
    title: 'Lập hồ sơ liên hệ',
    description: 'Gửi công văn nghiên cứu học thuật đến Phòng Quản lý Hiện vật – Bảo tàng Phụ nữ Nam Bộ.',
    metaLabel: 'Thời hạn dự kiến',
    metaValue: 'Tháng 04/2025'
  },
  {
    step: '02',
    title: 'Đối chiếu kiểm kê',
    description: 'Xác nhận danh mục mã kiểm kê thực tế tại kho lưu trữ và thẩm quyền cấp phép đối với từng hiện vật.',
    metaLabel: 'Đơn vị thẩm định',
    metaValue: 'Hội đồng khoa học BT'
  },
  {
    step: '03',
    title: 'Ký văn bản cam kết',
    description: 'Ký cam kết bảo lưu bản quyền hình ảnh, giới hạn mục đích trưng bày giáo dục, phi thương mại.',
    metaLabel: 'Chế tài cam kết',
    metaValue: 'Không thương mại hóa'
  },
  {
    step: '04',
    title: 'Thay thế ảnh chuẩn',
    description: 'Thay thế đồ họa minh họa bằng ảnh chụp độ phân giải cao có chứng chỉ số và mã giám định bảo tàng.',
    metaLabel: 'Chuẩn hình ảnh',
    metaValue: 'TIFF / Ultra-HD Digital'
  },
  {
    step: '05',
    title: 'Gán nhãn CC mở',
    description: 'Đính kèm chuẩn giấy phép Creative Commons (CC BY-NC-ND 4.0) toàn diện trên mọi cổng tra cứu.',
    metaLabel: 'Giấy phép quốc tế',
    metaValue: 'CC BY-NC-ND 4.0'
  }
];
