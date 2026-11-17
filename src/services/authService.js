import { API_CONFIG, httpRequest, simulateLatency, tokenStorage } from './apiClient.js';

/**
 * Service xác thực & phân quyền (Spring Security + JWT over HTTPS/SSL/TLS)
 * Endpoints Backend dự kiến:
 * - POST /api/v1/auth/login
 * - POST /api/v1/auth/logout
 * - GET  /api/v1/auth/me
 */
export const authService = {
  async login({ username, password }) {
    if (!API_CONFIG.USE_MOCK_DATA) {
      const response = await httpRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      if (response?.accessToken) {
        tokenStorage.setToken(response.accessToken);
      }
      return response;
    }

    await simulateLatency(120);
    return {
      accessToken: null,
      user: {
        username: username || 'guest_researcher',
        role: 'ROLE_VISITOR',
        fullName: 'Khách tham quan học thuật'
      }
    };
  },

  async getCurrentSession() {
    const token = tokenStorage.getToken();
    if (!token || API_CONFIG.USE_MOCK_DATA) {
      return {
        authenticated: false,
        role: 'ROLE_VISITOR',
        displayName: 'Khách tham quan'
      };
    }

    return httpRequest('/auth/me');
  },

  logout() {
    tokenStorage.clearToken();
  }
};
