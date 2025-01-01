import { getApi, posApi } from '.';

export const doLogin = (data) => {
  return posApi('/user/doLogin', { ...data });
};

export const register = (data) => {
  return posApi('/user/register', { ...data });
};

export const getCaptcha = (data) => {
  return getApi('/user/getCaptcha', { ...data });
};

export const isLogin = () => {
  return getApi('/user/isLogin', {});
};

export const uploadPic = (data: any) => {
  return posApi('/file/upload', data);
};

export const getFilePic = (data: any) => {
  return getApi('/file/getFile', data);
};
