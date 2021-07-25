import { api } from 'boot/axios';

export default {
  async login(data) {
    const user = await api.post(`${process.env.API_HOSTNAME}/auth/local`, data);
    return user.data;
  },
  async register(data) {
    const user = await api.post(`${process.env.API_HOSTNAME}/auth/local/register`, data);
    return user.data;
  },
  async forgotPassword(data) {
    const emailSent = await api.post(`${process.env.API_HOSTNAME}/auth/forgot-password`, data);
    return emailSent.data;
  },
  async resetPassword(data) {
    const passwordReset = await api.post(`${process.env.API_HOSTNAME}/auth/reset-password`, data);
    return passwordReset.data;
  },
  async getSelf(data) {
    const self = await api.get(`${process.env.API_HOSTNAME}/users/me`, {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });
    return self.data;
  },
};
