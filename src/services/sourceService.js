import { SOURCES_DATA } from '../data/sourcesData.js';
import { API_CONFIG, httpRequest, simulateLatency } from './apiClient.js';

/**
 * Service quản lý 18 nguồn tư liệu & tuyên bố bản quyền (Spring Boot SourceReferenceController)
 */
export const sourceService = {
  async getSources(groupFilter = 'all') {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest(`/sources?group=${encodeURIComponent(groupFilter)}`);
    }

    await simulateLatency(60);
    if (groupFilter === 'all') {
      return SOURCES_DATA;
    }
    return SOURCES_DATA.filter((item) => item.group === groupFilter);
  },

  generateApaCitation(source) {
    const year = source.id === 'SRC-16' ? '2025' : '2024';
    return `${source.authority}. (${year}). ${source.title}. Truy xuất từ ${source.url} (Hồ sơ đối chiếu ${source.id} - Dự án học thuật Sắc Áo Việt M3).`;
  }
};
