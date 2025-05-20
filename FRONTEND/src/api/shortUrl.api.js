import axiosInstance from '../utils/axiosinstance.js';

export const createShortUrl = async(url) => {
    const {data} = await axiosInstance.post("/api/create", {url});
    return data.shortUrl;
}