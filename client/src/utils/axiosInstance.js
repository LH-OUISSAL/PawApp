import axios from "axios";
const axiosInstance=axios.create({
    baseURL: `${window.location.protocol}//${window.location.hostname}:5000`
})

export default axiosInstance