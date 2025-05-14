export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  return /^0\d{9}$/.test(phone);
};

export const isValidPassword = (password: string): boolean => {
  // Password must be at least 6 characters and contain no spaces
  return password.length >= 6 && !password.includes(' ');
};

export const isStrongPassword = (password: string): boolean => {
  // Password must be at least 8 characters, contain at least one uppercase letter,
  // one lowercase letter, one number, and one special character
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return strongPasswordRegex.test(password);
};

export const isValidVietnamesePhone = (phone: string): boolean => {
  // Vietnamese phone numbers start with 0, followed by 9 digits
  // This is the same as the existing isValidPhone function
  return /^0\d{9}$/.test(phone);
};
