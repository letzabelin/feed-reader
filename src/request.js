import axios from 'axios';
import parse from './parse';

export default (link) => {
  console.log(link);
  const proxy = 'cors-anywhere.herokuapp.com';

  axios.get(`https://${proxy}/${link}`)
    .then((response) => {
      const xml = response.data;
      return parse(xml);
    })
    .then(console.log);
};
