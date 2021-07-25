import { api } from 'boot/axios';

export default {
  async login(data) {
    // const user = await api.post(`${process.env.API_HOSTNAME}/auth/local`, data);
    // return user.data;

    // Fake hard coded login \o/
    const usersMap = new Map();
    usersMap.set('vincent@unitetons.com', { password: '12345', role: 'admin' });
    usersMap.set('viewer@test.com', { password: '67890', role: 'viewer' });
    const user = usersMap.get(data.email);

    if (user && user.password === data.password) {
      return {
        user_role: user.role,
        user_token: `${user.role}-token`,
        user_email: data.email,
      };
    }
    throw new Error('Incorrect email / password');
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
