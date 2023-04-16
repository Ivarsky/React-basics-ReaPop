import client from '../../api/client';

const advertsUrl = '/api/adverts';

export const getLatestAdverts = ()=>{
  return client.get(advertsUrl);
};