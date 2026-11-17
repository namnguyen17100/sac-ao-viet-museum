import { ARTIFACTS_DATA } from '../data/artifactsData.js';
import { ROOMS_DATA } from '../data/roomsData.js';
import { API_CONFIG, ApiError, httpRequest, simulateLatency } from './apiClient.js';

/**
 * Service quản lý 4 không gian phòng trưng bày chuyên đề (Spring Boot GalleryController)
 */
export const galleryService = {
  async getRooms() {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest('/galleries');
    }
    await simulateLatency(70);
    return ROOMS_DATA.map((room) => ({
      ...room,
      artifacts: ARTIFACTS_DATA.filter((item) => item.roomId === room.id)
    }));
  },

  async getRoomBySlugOrId(roomIdentifier) {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest(`/galleries/${encodeURIComponent(roomIdentifier)}`);
    }

    await simulateLatency(70);
    const room = ROOMS_DATA.find(
      (r) => r.id === roomIdentifier || r.slug === roomIdentifier
    );

    if (!room) {
      throw new ApiError(404, `Không tìm thấy không gian trưng bày ${roomIdentifier}`);
    }

    return {
      ...room,
      artifacts: ARTIFACTS_DATA.filter((item) => item.roomId === room.id)
    };
  }
};
