import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lobster-app-7f2ry.ondigitalocean.app',
});

export default instance;
