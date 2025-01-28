export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.firstName) errors.firstName = "First name is required.";
    if (!formData.lastName) errors.lastName = "Last name is required.";
    if (!formData.email) errors.email = "Email is required.";
    if (!formData.country) errors.country = "Country is required.";
    
    // Mobile validation: check if it's empty, contains only digits, and has exactly 10 digits
    if (!formData.mobile) {
      errors.mobile = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      errors.mobile = "Mobile number must be 10 digits.";
    }
  
    if (!formData.password) errors.password = "Password is required.";
    if (!formData.username) errors.username = "Username is required.";
  
    return errors;
  };
  