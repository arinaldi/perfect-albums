import axios from 'axios';

const URL = 'https://api.instagram.com/v1/users/self/media/recent?access_token=';
const { INSTATOKEN } = process.env;

export const list = (req, res) => {
  axios.get(`${URL}${INSTATOKEN}`)
    .then(response => res.json(response.data))
    .catch(error => {
      console.log(error);
    });
};
