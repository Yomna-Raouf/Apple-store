import axios from "axios";

const instance = axios.create({
  baseURL: "https://young-ocean-52872.herokuapp.com/", // API (cloud function) URL
});

export default instance;
