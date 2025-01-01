import { atom } from 'jotai';
// useAtom
const tokenKey = 'token';

export const tokenAtom = atom(localStorage.getItem(tokenKey) || '');

//  设置 读取 主题色
export const useConfigToken = () => {
  //   const [tokenVal, setTokenValAtom] = useAtom(tokenAtom);

  const setToken = (newTheme) => {
    // setTokenValAtom(newTheme);
    localStorage.setItem(tokenKey, newTheme);
  };

  const getToken = () => {
    // 防止token为空 或 无效token  null undfined  后台生的token长度大于100
    const token = localStorage.getItem(tokenKey) || '';
    if (token.length < 100) {
      return '';
    }
    return token;
  };

  return {
    setToken,
    getToken,
  };
};

// 设置用户名
const userNameKey = 'userName';
export const useGonfigUserName = () => {
  const setUserName = (newTheme) => {
    localStorage.setItem(userNameKey, newTheme);
  };

  const getUserName = () => {
    return localStorage.getItem(userNameKey) || '';
  };

  return {
    setUserName,
    getUserName,
  };
};
