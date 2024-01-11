type ErrorObj = {
 name?: string;
 email?: string;
 password?: string;
 confirmPassword?: string;
};

export function isFirstPageInvalid(form: any) {
 let errors: ErrorObj = {};
 const name = form.watch("name");
 const email = form.watch("email");
 const password = form.watch("password");
 const confirmPassword = form.watch("confirmPassword");
 if (name) {
  if (name.length > 50) {
   errors.name = "Name must be less than 50 characters";
  }
 }
 if (email) {
  if (email.length > 100) {
   errors.email = "Email must be less than 100 characters";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
   errors.email = "Email is invalid";
  }
 }
 if (password) {
  if (password.length < 6 || password.length > 50) {
   errors.password = "Password must be between 6 and 50 characters";
  }
 }
 if (confirmPassword) {
  if (password !== confirmPassword) {
   errors.confirmPassword = "Passwords must match";
  }
 }
 if (Object.keys(errors).length > 0) {
  return { errors };
 }
 return !name || !email || !password;
}