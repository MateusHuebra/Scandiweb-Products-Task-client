import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://mateushuebra.ml/scandiwebproducts/'
});

export default instance;