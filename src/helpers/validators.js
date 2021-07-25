export const isValidEmail = (val) => {
  // Let's say my cat walked on my keyboard xD
  const emailRegex = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailRegex.test(val);
};

export const isRequired = (val) => val && val.length > 0;
