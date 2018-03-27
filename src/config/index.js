const Config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:5000/api/'
  }
};
export const config = Config[process.env.NODE_ENV]