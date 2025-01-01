/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useRef, useState } from 'react';
import styles from './index.module.less';

// import base64 from './test';
import { getFilePic } from '@/api/apis';
import { useUrlParams } from '@/hooks';
import { useNavigate } from 'react-router';
import { isSuccess, isUnLogin } from '@/api';
import { message } from 'antd';

const hadSeeTxt = '图片已查看且销毁';
const unSeeTxt = '长按查看图片';
const errTxt = '错误的地址，请重新索取分享连接';

const ReviewPhoto = () => {
  const refs = useRef(null);
  const base64Ref = useRef(null);
  const navigate = useNavigate();

  const [base64Src, setBase64Src] = useState('');
  const [text, setText] = useState('');
  const [timeNum, setTimeNum] = useState(3); // 时间大于0秒 ，还可以查看

  const timerRef = useRef(null);
  const [startTimeEnd, setStartTimeEnd] = useState(undefined); // 是否开始倒计时  undefined 标识初始化

  const urlInfo: any = useUrlParams();

  // 请求图片 判断是否看过图片
  useEffect(() => {
    if (urlInfo && urlInfo.fileId) {
      getFilePic({ fileId: urlInfo.fileId }).then((res) => {
        // 成功了，则设置图片
        if (isSuccess(res.code)) {
          base64Ref.current = res.data;
          setText(unSeeTxt);
        }
        // 没登陆，则跳转到登陆页【带着登陆后回跳的参数】
        else if (isUnLogin(res.code)) {
          message.error({
            content: res?.description || '登录超时，请重新登录',
          });
          setTimeout(() => {
            const from = window.location.href;
            const url = `/login?from=${from}`;
            navigate(url);
          }, 2000);
        }
        // 其它则展示 图片已经销毁
        else {
          setText(hadSeeTxt);
          setTimeout(() => {
            navigate(`/`);
          }, 2000);
        }
      });
    }
    // 没有 fileId 则跳首页  说明参数不全
    else {
      setText(errTxt);
      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 销毁图片   查看过
  const destroyImg = () => {
    setText('图片已查看且销毁');
    setBase64Src('');
    setStartTimeEnd(false);
    base64Ref.current = null;

    timerRef.current && clearTimeout(timerRef.current); // 倒计时没结束，就抬起鼠标了
    // console.log('发个接口销毁一下图片');

    setTimeout(() => {
      navigate(`/`);
    }, 2000);
  };

  // 倒计时
  useEffect(() => {
    if (startTimeEnd === undefined) {
      // console.log('进入effect --- 初始化', timeNum);
      return;
    }
    // console.log('进入effect', timeNum);

    // 开始倒计时
    if (startTimeEnd) {
      if (timeNum <= 0) {
        destroyImg();
        return;
      }

      timerRef.current = setTimeout(() => {
        setTimeNum(timeNum - 1);
      }, 1000);
    } else {
      destroyImg();
    }

    return () => {
      // console.log('销毁');
      timerRef.current && clearTimeout(timerRef.current);
    };
  }, [startTimeEnd, timeNum]);

  // 事件
  useEffect(() => {
    refs.current.addEventListener('contextmenu', function (e) {
      e.preventDefault();
    });

    refs.current.addEventListener('touchstart', function (e) {
      if (base64Ref.current) {
        // console.log('touchstart');
        setStartTimeEnd(true);
        setText('');
        setBase64Src(base64Ref.current);
      }

      e.preventDefault();
    });

    // 手指抬起，设置永远无法查看第2次
    refs.current.addEventListener('touchend', function (e) {
      if (base64Ref.current) {
        // console.log('touchend');
        setStartTimeEnd(false);
      }
      e.preventDefault();
    });
  }, []);

  return (
    <div className={styles.repvePhotoWarp} ref={refs}>
      {startTimeEnd ? <span className={styles.timeTips}>{timeNum}</span> : null}
      <span className={styles.text}>{text}</span>
      {startTimeEnd ? (
        <div className={styles.myCanvasWarp}>
          <img className={styles.myCanvas} src={base64Src} alt="" />
        </div>
      ) : null}
    </div>
  );
};

export default memo(ReviewPhoto);

// {/* <canvas
//       width={'100%'}
//       height={'100%'}
//       ref={canvasRef}
//       id="myCanvas"
//       className={styles.myCanvas}
//     ></canvas> */}

// useEffect(() => {
//   setTimeout(() => {
//     let canvas: any = canvasRef.current; //document.getElementById('myCanvas');

//     let w = canvas.width;
//     let h = canvas.height;
//     debugger;
//     if (canvas.getContext) {
//       let ctx = canvas.getContext('2d');
//       let img: any = new Image();
//       img.src = base64; // 'https://gtms02.alicdn.com/tps/i2/TB1ZeJGIXXXXXcnXXXXDgwcQVXX-375-130.jpg'; // 图片地址示例
//       img.onload = function () {
//         let iw = this.width;
//         let ih = this.height;
//         debugger;
//         // let local = calculate(iw, ih);
//         ctx.fillStyle = '#000';
//         ctx.fill();
//         ctx.drawImage(this, 0, 0);
//         // ctx.drawImage(this, local.px, local.py, local.pw, local.ph);
//       };
//     }

//     // 计算出图片画在canvas中的四个参数
//     function calculate(pw, ph) {
//       let px = 0;
//       let py = 0;
//       if (pw < w && ph < h) {
//         px = 0.5 * w - 0.5 * pw;
//         py = 0.5 * h - 0.5 * ph;
//       } else if (ph / pw > h / w) {
//         let uu = ph;
//         ph = h;
//         pw = (pw * h) / uu;
//         px = 0.5 * w - 0.5 * pw;
//       } else {
//         let uu = pw;
//         pw = w;
//         ph = (ph * pw) / uu;
//         py = 0.5 * h - 0.5 * ph;
//       }
//       return { px, py, pw, ph };
//     }
//   }, 1000);
// }, []);
