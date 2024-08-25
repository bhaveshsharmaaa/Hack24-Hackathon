export const CheckValidation = (email, password) => {
  const emailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);

  return {
    email: emailValid ? null : "Invalid Email",
    password: passwordValid ? null : "Invalid Password",
  };
};
