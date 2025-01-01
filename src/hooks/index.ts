import { useLocation } from 'react-router-dom';

function useUrlParams() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const paramsObject = {};
  params.forEach((value, key) => {
    paramsObject[key] = value;
  });

  return paramsObject;
}

export { useUrlParams };
