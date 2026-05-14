// export const baseURL = 'https://gadget-fai.onrender.com/api';
export const baseURL = 'http://localhost:3000/api';

// User endpoints
export const signuplink = `${baseURL}/user/signup`;
export const signinlink = `${baseURL}/user/signin`;
export const logoutlink = `${baseURL}/user/logout`;
export const loggedinUserlink = `${baseURL}/user/profile`;
export const profilelink = `${baseURL}/user/profile`;

// Gadget endpoints
export const allSmartphonesLink = `${baseURL}/gadget/smartphones/paginated`;
export const allLaptopsLink = `${baseURL}/gadget/laptops/paginated`;
export const affordableSmartphonesLink = `${baseURL}/gadget/smartphones/affordable`;
export const affordableLaptopsLink = `${baseURL}/gadget/laptops/affordable`;
export const topRatedSmartphonesLink = `${baseURL}/gadget/smartphones/rated`;
export const topRatedLaptopsLink = `${baseURL}/gadget/laptops/rated`;
export const gadgetsByBrandLink = `${baseURL}/gadget/gadgets`;
export const gadgetByIdLink = (id) => `${baseURL}/gadget/${id}`;
export const recommendLink = `${baseURL}/gadget/recommend`;