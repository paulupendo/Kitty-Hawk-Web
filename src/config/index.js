const Config = {
  development: {
    API_BASE_URL: 'http://127.0.0.1:5000/api/'
  },
  production: {
    API_BASE_URL: 'https://kitty-python-api.herokuapp.com/api/'
  }
};
export const config = Config[process.env.NODE_ENV];
