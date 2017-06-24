require('dotenv').config();
import axios from 'axios';

const url = 'https://api.instagram.com/v1/users/self/media/recent?access_token=';
const accessToken = process.env.INSTATOKEN;

export function list(req, res) {
  axios.get(`${url}${accessToken}`)
    .then(function (response) {
      return res.json(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}
