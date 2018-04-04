const Config = {
  development: {
    API_BASE_URL: 'https://cyapi-db.herokuapp.com/api/'
  },
  production: {
    API_BASE_URL: 'https://cyapi-db.herokuapp.com/api/'
  }
};
export const config = Config[process.env.NODE_ENV];
