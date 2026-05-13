import axios from 'axios';

const api = axios.create({
  baseURL: 'https://young-ocean-52872.herokuapp.com/',
});

export default api;
