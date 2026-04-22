export const baseURL = 'https://gadget-fai.onrender.com/api';

// User endpoints
export const signuplink = `${baseURL}/user/signup`;
export const signinlink = `${baseURL}/user/signin`;
export const logoutlink = `${baseURL}/user/logout`;
export const loggedinUserlink = `${baseURL}/user/profile`;
export const profilelink = `${baseURL}/user/profile`;

// Gadget endpoints
export const allGadgetsLink = `${baseURL}/gadget/all`;
export const gadgetByIdLink = (id) => `${baseURL}/gadget/${id}`;