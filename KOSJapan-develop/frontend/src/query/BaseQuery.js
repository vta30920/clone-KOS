import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081/api/";

export const BaseQuery = {
    Get: (url) => {
        return axios.get(url);
    },
    Post: (url, data) => {
        return axios.post(url, data);
    },
    Put: (url, data) => {
        return axios.put(url, data);
    },
    Delete: (url) => {
        return axios.delete(url);
    },
};
