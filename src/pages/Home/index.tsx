import { useRef, useState } from 'react';
import { Button, message, Upload } from 'antd';
import styles from './index.module.less';
import upimg from '@/imgs/upimg.png';
import { isSuccess, isUnLogin, updateUrl } from '@/api';
import { uploadPic } from '@/api/apis';
import copy from 'copy-to-clipboard';
import { limitPicMb } from '@/utils/const';
import { useNavigate } from 'react-router';

const App = () => {
  const [loading] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>('');
  const base64Ref = useRef(null);
  const updateRef = useRef(null);
  const [fileId, setFileId] = useState('');
  const navigate = useNavigate();

  const props = {
    action: updateUrl,
    multiple: false,
    headers: {},
    showUploadList: false,
    onStart(file) {
      // console.log('onStart', file, file.name);
    },
    onSuccess(res, file) {
      // console.log('onSuccess', res, file.name);
    },
    onError(err) {
      // console.log('onError', err);
    },
    // 进度会调用这里
    onProgress({ percent }, file) {
      // console.log('onProgress', `${percent}%`, file.name);
    },
    // customRequest 参考文档
    // https://upload-react-component.vercel.app/demo/custom-request
    customRequest: function (option) {
      // console.log('option', option);

      const reader = new FileReader();
      reader.readAsDataURL(option.file);
      reader.onloadend = function (e) {
        base64Ref.current = e.target.result;
        updateRef.current = option;

        // console.log('3333333333333', e.target.result);
        if (e && e.target && e.target.result) {
          // option.onSuccess();
          // console.log('reader.result', reader);
          // console.log('e', e);
          setImageUrl(reader.result);
        }
      };
      return {
        abort() {
          message.error({
            content: '上传被终端请重试，请稍后重新',
          });
        },
      };
    },
    beforeUpload: function (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('只能上传JPG或PNG文件!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < limitPicMb;
      if (!isLt2M) {
        message.error(`图片大小需小于${limitPicMb}MB!`);
        return false;
      }
      return isJpgOrPng && isLt2M;
    },
  };

  const updateAndShare = () => {
    if (base64Ref.current) {
      const option = updateRef.current;
      option.onProgress(
        { percent: Number(Math.round((100 / 10000) * 100).toFixed(2)) },
        option.file,
      );

      const formData = new FormData();
      formData.append('files[]', option.file);

      option.onSuccess(option.file);

      uploadPic({
        fileBase64: base64Ref.current,
      })
        .then((res) => {
          if (isSuccess(res.code)) {
            message.success({
              content: '上传成功，点击下面的分享链接，分享给好友',
            });
            setFileId(res.data);
          }
          // 没登陆，则跳转到登陆页【带着登陆后回跳的参数】
          else if (isUnLogin(res.code)) {
            message.error({
              content: res?.description || '登录超时，请重新登录',
            });
            setTimeout(() => {
              navigate('login');
            }, 2000);
          } else {
            message.error({
              content: res?.data || '上传失败请稍后重试',
            });
          }
        })
        .catch((err) => {
          message.error({
            content: err || '服务器错误，上传失败请稍后重试',
          });
          return;
        });

      // axios
      //   .post(action, formData, {
      //     withCredentials,
      //     headers,
      //     onUploadProgress: ({ total, loaded }) => {
      //       onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, file);
      //     },
      //   })
      //   .then(({ data: response }) => {
      //     onSuccess(response, file);
      //   })
      //   .catch(onError);
    } else {
      message.error({
        content: '请先选择图片，再进行上传分享',
      });
    }
  };

  const copyUrl = () => {
    if (fileId) {
      copy(`

        您的好友给您发了一张闪照片，点击查看：

        由于微信限制较多，可能存在风控风险，可复制链接到[系统自带浏览器]打开查看：

        ${window.location.origin}/reviewphoto?fileId=${fileId}

        如果需要注册账号，请务必索取邀请码！！！
      `);
      message.success({
        content: '已复制分享链接',
      });
    } else {
      message.error({
        content: '请先上传图片，再进行分享',
      });
    }
  };

  return (
    <div className={styles.homeWarp}>
      <div className={styles.prevImg}>
        <img src={imageUrl || upimg} alt="avatar" />
      </div>
      <div></div>

      <div className={styles.upBox}>
        <Upload {...props} name="avatar" disabled={loading}>
          <Button>
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            {/* <LoadingOutlined /> */}
            {/* <PlusOutlined /> */}
            <div>选择图片</div>
          </Button>
        </Upload>
        <Button onClick={updateAndShare}>上传图片</Button>
        <Button onClick={copyUrl} color="default">
          分享连接
        </Button>
      </div>
    </div>
  );
};

export default App;

// const uploadProps = {
//   customRequest({
//     action,
//     data,
//     file,
//     filename,
//     headers,
//     onError,
//     onProgress,
//     onSuccess,
//     withCredentials,
//   }) {
//     // EXAMPLE: post form-data with 'axios'
//     // eslint-disable-next-line no-undef
//     const formData = new FormData();
//     if (data) {
//       Object.keys(data).forEach((key) => {
//         formData.append(key, data[key] as string);
//       });
//     }
//     formData.append(filename, file);

//     // axios
//     //   .post(action, formData, {
//     //     withCredentials,
//     //     headers,
//     //     onUploadProgress: ({ total, loaded }) => {
//     //       onProgress({ percent: Number(Math.round((loaded / total) * 100).toFixed(2)) }, file);
//     //     },
//     //   })
//     //   .then(({ data: response }) => {
//     //     onSuccess(response, file);
//     //   })
//     //   .catch(onError);

//     return {
//       abort() {
//         console.log('upload progress is aborted.');
//       },
//     };
//   },
// };

// type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

// const getBase64 = (img: FileType, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };

// const App: React.FC = () => {
// const [loading, setLoading] = useState(false);
// const [imageUrl, setImageUrl] = useState<string>();

// const handleChange: UploadProps['onChange'] = (info) => {
//   if (info.file.status === 'uploading') {
//     setLoading(true);
//     return;
//   }
//   if (info.file.status === 'done') {
//     // Get this url from response in real world.
//     getBase64(info.file.originFileObj as FileType, (url) => {
//       setLoading(false);
//       setImageUrl(url);
//     });
//   }
// };

// const uploadButton = (
//   <button style={{ border: 0, background: 'none' }} type="button">
//     {loading ? <LoadingOutlined /> : <PlusOutlined />}
//     <div style={{ marginTop: 8 }}>Upload</div>
//   </button>
// );

// return (
// <Flex gap="middle" wrap>
//   <Upload
//     name="avatar"
//     listType="picture-card"
//     className="avatar-uploader"
//     showUploadList={true}
//     action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//     beforeUpload={beforeUpload}
//     onChange={handleChange}
//   >
//     {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
//   </Upload>
// </Flex>
// );
// };
