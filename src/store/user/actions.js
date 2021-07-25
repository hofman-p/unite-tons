import UsersAPI from '../../api/Users';

export async function login({ commit }, values) {
  const userData = await UsersAPI.login(values);

  commit('setUser', userData);
}
