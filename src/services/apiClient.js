/**
 * API Client chuẩn hóa để dễ dàng chuyển đổi từ Mock Data sang Backend Spring Boot REST API
 * Hỗ trợ đính kèm JWT Bearer Token (Spring Security) và xử lý lỗi HTTP thống nhất.
 */

const ENV = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};

export const API_CONFIG = {
  BASE_URL: ENV.VITE_API_BASE_URL || 'http://localhost:8080/api/v1',
  USE_MOCK_DATA: ENV.VITE_USE_MOCK_DATA !== 'false',
  TOKEN_STORAGE_KEY: 'sav_jwt_access_token',
  MOCK_LATENCY_MS: 120
};

export class ApiError extends Error {
  constructor(status, message, details = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export const tokenStorage = {
  getToken() {
    try {
      return window.localStorage.getItem(API_CONFIG.TOKEN_STORAGE_KEY);
    } catch {
      return null;
    }
  },
  setToken(token) {
    try {
      if (token) {
        window.localStorage.setItem(API_CONFIG.TOKEN_STORAGE_KEY, token);
      } else {
        window.localStorage.removeItem(API_CONFIG.TOKEN_STORAGE_KEY);
      }
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  },
  clearToken() {
    this.setToken(null);
  }
};

export function simulateLatency(ms = API_CONFIG.MOCK_LATENCY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Hàm gọi REST API chung (dùng khi VITE_USE_MOCK_DATA="false")
 */
export async function httpRequest(endpoint, options = {}) {
  const url = `${API_CONFIG.BASE_URL}${endpoint}`;
  const token = tokenStorage.getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(url, {
    ...options,
    headers
  });

  if (!response.ok) {
    let errorBody = null;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { message: response.statusText };
    }
    throw new ApiError(
      response.status,
      errorBody?.message || `Lỗi máy chủ (${response.status})`,
      errorBody
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
