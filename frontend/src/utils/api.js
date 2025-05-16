import axios from 'axios';
import i18n from 'i18next';

// 使用环境变量或默认值，并确保URL末尾没有斜杠
export const BASE_URL = (process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000').replace(/\/+$/, '');
export const API_BASE_URL = `${BASE_URL}/api`;

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 添加认证token和语言
api.interceptors.request.use(config => {
  // 添加当前语言到请求中
  const currentLanguage = i18n.language || 'en';
  config.params = { 
    ...config.params,
    language: currentLanguage 
  };
  
  // 如果是需要认证的请求，添加token
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    config.headers['Authorization'] = `Bearer ${adminToken}`;
  }
  
  return config;
}, error => {
  return Promise.reject(error);
});

// Event API calls
export const getEvents = async (status = '') => {
  try {
    const params = status ? { status } : {};
    const response = await api.get('/events', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const getEventById = async (id) => {
  try {
    const response = await api.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await api.post('/events', eventData);
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (id, eventData) => {
  try {
    const response = await api.put(`/events/${id}`, eventData);
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// 管理员认证API
export const verifyAdmin = async (password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/verify`, { password });
    return response.data;
  } catch (error) {
    console.error('Error verifying admin:', error);
    throw error;
  }
};

export const changeAdminPassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/admin/password', { 
      currentPassword, 
      newPassword 
    });
    return response.data;
  } catch (error) {
    console.error('Error changing admin password:', error);
    throw error;
  }
}; 