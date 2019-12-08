import axios from 'axios';
import { AsyncStorage } from 'react-native';


const BASE_URL = 'https://hot-otter-22.localtunnel.me';

export const axiosPost = async (url, data = null, sendToken = true) => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    if (sendToken) options['headers']['Authorization'] = await AsyncStorage.getItem('userToken');

    return axios.post(BASE_URL + url, data, options);
}


export const axiosGet = async (url, data = null, sendToken = true) => {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
    };
    if (data) options['params'] = data;
    if (sendToken) options['headers']['Authorization'] = await AsyncStorage.getItem('userToken');

    return axios.get(BASE_URL + url, options);
}