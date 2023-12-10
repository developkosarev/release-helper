import axios from 'axios';

const BASE_URL : string = "https://www.yoshien.com/";

const getPage = async (page: string) => {
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
