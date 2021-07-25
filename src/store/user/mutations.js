export function someMutation(state, userData) {
  state.user = {
    token: userData.user_token,
    email: userData.user_email,
    role: userData.user_role,
  };
}
