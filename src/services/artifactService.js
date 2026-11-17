import { ARTIFACTS_DATA } from '../data/artifactsData.js';
import { API_CONFIG, ApiError, httpRequest, simulateLatency } from './apiClient.js';

const BOOKMARK_STORAGE_KEY = 'sav_research_bookmarks';

/**
 * Service quản lý hồ sơ hiện vật và tư liệu số (tương ứng Spring Boot ArtifactController)
 * Endpoints dự kiến:
 * - GET    /api/v1/artifacts?search=&room=&type=&sort=&page=&size=
 * - GET    /api/v1/artifacts/{code}
 * - GET    /api/v1/artifacts/stats
 * - POST   /api/v1/artifacts/{code}/views
 */
export const artifactService = {
  async getArtifacts({
    search = '',
    room = 'all',
    type = 'all',
    sort = 'code-asc',
    page = 0,
    size = 50
  } = {}) {
    if (!API_CONFIG.USE_MOCK_DATA) {
      const params = new URLSearchParams({
        search,
        room,
        type,
        sort,
        page: String(page),
        size: String(size)
      });
      return httpRequest(`/artifacts?${params.toString()}`);
    }

    await simulateLatency(90);
    const normalizedSearch = search.trim().toLowerCase();

    let filtered = ARTIFACTS_DATA.filter((item) => {
      const matchesRoom = room === 'all' || item.roomId === room || item.roomSlug === room;
      const matchesType = type === 'all' || item.type === type;
      const matchesSearch =
        !normalizedSearch ||
        item.code.toLowerCase().includes(normalizedSearch) ||
        item.title.toLowerCase().includes(normalizedSearch) ||
        item.shortTitle.toLowerCase().includes(normalizedSearch) ||
        item.summary.toLowerCase().includes(normalizedSearch) ||
        item.eraDisplay.toLowerCase().includes(normalizedSearch) ||
        item.dublinCore.contributor.toLowerCase().includes(normalizedSearch);

      return matchesRoom && matchesType && matchesSearch;
    });

    filtered = [...filtered].sort((a, b) => {
      if (sort === 'code-asc') return a.code.localeCompare(b.code);
      if (sort === 'code-desc') return b.code.localeCompare(a.code);
      if (sort === 'era') return a.eraYear - b.eraYear;
      if (sort === 'name') return a.shortTitle.localeCompare(b.shortTitle, 'vi');
      return 0;
    });

    const start = page * size;
    const pagedContent = filtered.slice(start, start + size);

    return {
      content: pagedContent,
      totalElements: filtered.length,
      totalPages: Math.max(1, Math.ceil(filtered.length / size)),
      number: page,
      size
    };
  },

  async getArtifactByCode(code) {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest(`/artifacts/${encodeURIComponent(code)}`);
    }

    await simulateLatency(80);
    const normalizedCode = (code || '').trim().toUpperCase();
    const found = ARTIFACTS_DATA.find((item) => item.code.toUpperCase() === normalizedCode);

    if (!found) {
      throw new ApiError(404, `Không tìm thấy hồ sơ hiện vật mã ${normalizedCode}`);
    }

    return found;
  },

  async getFeaturedArtifacts() {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest('/artifacts/featured');
    }

    await simulateLatency(60);
    const featuredCodes = ['SAV-001', 'SAV-003', 'SAV-005'];
    return featuredCodes
      .map((code) => ARTIFACTS_DATA.find((item) => item.code === code))
      .filter(Boolean);
  },

  async getAdjacentArtifacts(code) {
    const normalizedCode = (code || '').trim().toUpperCase();
    const index = ARTIFACTS_DATA.findIndex((item) => item.code.toUpperCase() === normalizedCode);
    if (index === -1) {
      return { prev: null, next: null };
    }
    const prevIndex = (index - 1 + ARTIFACTS_DATA.length) % ARTIFACTS_DATA.length;
    const nextIndex = (index + 1) % ARTIFACTS_DATA.length;
    return {
      prev: ARTIFACTS_DATA[prevIndex],
      next: ARTIFACTS_DATA[nextIndex]
    };
  },

  async getCatalogStats() {
    if (!API_CONFIG.USE_MOCK_DATA) {
      return httpRequest('/artifacts/stats');
    }

    const total = ARTIFACTS_DATA.length;
    const artifacts = ARTIFACTS_DATA.filter((item) => item.type === 'artifact').length;
    const documents = ARTIFACTS_DATA.filter((item) => item.type === 'document').length;

    return {
      total,
      artifacts,
      documents,
      rooms: 4
    };
  },

  getBookmarkedCodes() {
    try {
      const raw = window.localStorage.getItem(BOOKMARK_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  toggleBookmark(code) {
    const normalized = (code || '').toUpperCase();
    const current = this.getBookmarkedCodes();
    const exists = current.includes(normalized);
    const updated = exists
      ? current.filter((item) => item !== normalized)
      : [...current, normalized];

    try {
      window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage error
    }
    return updated;
  }
};
