import 'dotenv/config'; // This loads .env variables

export const config = {
  baseURL: process.env.BASE_URL|| 'https://backenderp-u19m.onrender.com'
};

// console.log(config.baseURL); // Should log: https://backenderp-u19m.onrender.com
