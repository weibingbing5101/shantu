import { atom, useAtom } from 'jotai';
import localStorage from 'localStorage';

const themeKey = 'theme';

export enum Etheme {
  WHITE = 'white',
  BLACK = 'black',
}

export type Itheme = Etheme.BLACK | Etheme.WHITE;

export const themeBaseAtom = atom(localStorage.getItem(themeKey) || Etheme.WHITE);

//  设置 读取 主题色
export const useConfigTheme = () => {
  const [theme, setThemeAtom] = useAtom(themeBaseAtom);
  document.body.className = theme;

  const changeTheme = (newTheme?: Itheme) => {
    let temp = Etheme.WHITE;
    if (newTheme) {
      temp = newTheme;
    } else {
      if (theme === Etheme.WHITE) {
        temp = Etheme.BLACK;
      }
    }
    setThemeAtom(temp);
    document.body.className = theme;
    localStorage.setItem(themeKey, temp);
  };

  const getTheme = () => {
    return theme;
  };

  return {
    changeTheme,
    getTheme,
  };
};

//
//
//
//
//
//
//
//
// // 获取当前主题色
// export const getLsTheme = (): Itheme => {
//   const defaultTheme: Itheme =
//     (localStorage.getItem(themeKey) as Itheme) || Etheme.WHITE;
//   return defaultTheme;
// };

// // 设置主题色
// export const setBodyThemeType = (theme: Itheme) => {
//   localStorage.setItem(themeKey, theme);
//   document.body.className = theme;
// };

// // 初始化当前主题
// export const initTheme = () => {
//   const defaultTheme: Itheme =
//     (localStorage.getItem(themeKey) as Itheme) || Etheme.WHITE;

//   localStorage.setItem(themeKey, defaultTheme);
//   document.body.className = defaultTheme;
// };

// const [theme, setTheme] = useState(defaultTheme);
// const changeTheme = () => {
//   if (theme === "white") {
//     setTheme("black");
//     localStorage.setItem("theme", "black");
//     document.body.className = "black";
//   } else {
//     setTheme("white");
//     localStorage.setItem("theme", "white");
//     document.body.className = "white";
//   }
// };

// 用法其它
// 用法其它
// 用法其它
// 用法其它
// 用法其它
// 用法其它
// export const themeAtom = atom(
//   (get) => get(themeBaseAtom),
//   (get, set, newValue: Itheme) => {
//     const prevVal = get(themeBaseAtom);
//     if (prevVal !== newValue) {
//       set(themeBaseAtom, newValue);
//       localStorage.setItem(themeKey, newValue);
//     } else {
//       console.log("theme-atom is same return !!!");
//     }
//   }
// );
// const [theme, setThemeAtom] = useAtom(themeAtom);
