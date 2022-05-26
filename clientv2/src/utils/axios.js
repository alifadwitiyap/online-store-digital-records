import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://inventori-rpl.herokuapp.com',
});

export default instance;
