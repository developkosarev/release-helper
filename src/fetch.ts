import axios from 'axios';
import { getBaseUrl } from './config/website.js'

const getPage = async (page: string) => {
  const BASE_URL: string = getBaseUrl();
  const url = `${BASE_URL}`

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (e) {
    return null;
  }
}

const data = await getPage('');
console.log(data);
