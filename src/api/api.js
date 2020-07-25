import * as axios from 'axios';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'a52737b5-b3d9-4824-89a6-4f5fb70edc1f',
  },
});

export const userApi = {
  requestUsers(currentPage, pageSize) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(userId) {
    return instance.post(`follow/${userId}`).then((response) => response.data);
  },
  unfollow(userId) {
    return instance
      .delete(`follow/${userId}`)
      .then((response) => response.data);
  },
  getProfile(userId) {
    console.warn('Obsolete method, use profileApi object instead');
    return profileApi.getProfile(userId);
  },
};

export const profileApi = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`).then((response) => response.data);
  },
  getStatus(userId) {
    return instance
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(status) {
    return instance
      .put(`profile/status/`, { status: status })
      .then((response) => response.data);
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile).then((response) => response.data);
  },
  savePhoto(photoFile) {
    const formData = new FormData();
    formData.append('image', photoFile);

    return instance
      .put(`profile/photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => response.data);
  },
};

export const authApi = {
  me() {
    return instance.get('auth/me').then((response) => response.data);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance
      .post('auth/login', { email, password, rememberMe, captcha })
      .then((response) => response.data);
  },
  logout() {
    return instance.delete('auth/login').then((response) => response.data);
  },
};

export const securityApi = {
  getCaptchaUrl() {
    return instance
      .get('security/get-captcha-url')
      .then((response) => response.data);
  },
};
