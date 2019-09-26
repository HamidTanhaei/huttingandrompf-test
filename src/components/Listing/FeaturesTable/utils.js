import {browserRoutes} from '../../../consts/browserRoutes';

export const makeFetchParamsFromQueryParams = () => {
  const dataToFetch = {};
  const urlParams = new URLSearchParams(window.location.search);
  const params = urlParams.entries();
  for(const [param, value] of params) {
    switch (param) {
    case 'search':
      dataToFetch.search = value;
      break;
    case 'sort_direction':
      // todo handle anomaly sort type
      dataToFetch.sort_direction = value;
      break;
    case 'sort_type':
      // todo handle anomaly sort type
      dataToFetch.sort_type = value;
      break;
    case 'page[number]':
      if(value) dataToFetch['page[number]'] = value;
      break;
    default:
      break;
    }
  }
  return dataToFetch;
};


export const makeQueryStringFromFetchParams = (params) => {
  const paramsList = Object.keys(params).map(key => {
    return `${key}=${params[key]}`;
  }).join('&');
  return browserRoutes.listing + (paramsList ? `?${paramsList}` : '');
};

export const sortNameMapToTable = {
  asc: 'ascend',
  desc: 'descend'
};

export const sortNameMapToFetch = {
  ascend: 'asc',
  descend: 'desc',
};

export const makeSortParams = (sorter) => {
  if(sorter.field){
    return {
      'sort_type': sorter.field === 'element' ? 'label' : '',
      'sort_direction': sortNameMapToFetch[sorter.order]
    }
  } else {
    return {};
  }
};
