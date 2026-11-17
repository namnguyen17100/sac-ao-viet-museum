import { TIMELINE_DATA } from '../data/timelineData.js';
import { API_CONFIG, httpRequest, simulateLatency } from './apiClient.js';

/**
 * Service quản lý dòng thời gian tiến trình áo dài Việt Nam (Spring Boot TimelineController)
 */
export const timelineService = {
  async getTimelineEras() {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest('/timeline/eras');
    }
    await simulateLatency(70);
    return TIMELINE_DATA;
  }
};
