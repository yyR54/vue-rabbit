import axios from 'axios';

export const getTestAPI = () => {
  return axios({
    url: '/data/test.json', 
    method: 'get',
  });
};