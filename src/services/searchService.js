import { ARTIFACTS_DATA } from '../data/artifactsData.js';
import { ROOMS_DATA } from '../data/roomsData.js';
import { SOURCES_DATA } from '../data/sourcesData.js';
import { TIMELINE_DATA } from '../data/timelineData.js';
import { API_CONFIG, httpRequest, simulateLatency } from './apiClient.js';

/**
 * Service tìm kiếm toàn cục trên toàn bộ bảo tàng số (Spring Boot SearchController)
 */
export const searchService = {
  async globalSearch(query) {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest(`/search?q=${encodeURIComponent(query)}`);
    }

    await simulateLatency(60);
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      return { artifacts: [], rooms: [], eras: [], sources: [] };
    }

    const artifacts = ARTIFACTS_DATA.filter(
      (item) =>
        item.code.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.shortTitle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.eraDisplay.toLowerCase().includes(q)
    );

    const rooms = ROOMS_DATA.filter(
      (room) =>
        room.title.toLowerCase().includes(q) ||
        room.curatorNote.toLowerCase().includes(q) ||
        room.eraLabel.toLowerCase().includes(q)
    );

    const eras = TIMELINE_DATA.filter(
      (era) =>
        era.title.toLowerCase().includes(q) ||
        era.description.toLowerCase().includes(q) ||
        era.eraDate.toLowerCase().includes(q)
    );

    const sources = SOURCES_DATA.filter(
      (src) =>
        src.id.toLowerCase().includes(q) ||
        src.title.toLowerCase().includes(q) ||
        src.authority.toLowerCase().includes(q) ||
        src.scope.toLowerCase().includes(q)
    );

    return { artifacts, rooms, eras, sources };
  }
};
