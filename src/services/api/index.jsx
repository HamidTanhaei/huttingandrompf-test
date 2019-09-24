import axios from 'axios';

export const getData = (params) => {
  return axios({
    url: '/rights_and_roles_elements',
    params: {
      'page[size]': '10',
      ...params
    }
  });
};
