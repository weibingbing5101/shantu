"use strict";(self.webpackChunkreact_mind_map=self.webpackChunkreact_mind_map||[]).push([[962],{4440:(e,t,n)=>{n.d(t,{Jp:()=>i,Zm:()=>o,kz:()=>s,or:()=>a,z8:()=>c});var r=n(6629);const o=e=>(0,r.$E)("/user/doLogin",{...e}),s=e=>(0,r.$E)("/user/register",{...e}),c=e=>(0,r.x4)("/user/getCaptcha",{...e}),a=e=>(0,r.$E)("/file/upload",e),i=e=>(0,r.x4)("/file/getFile",e)},6629:(e,t,n)=>{n.d(t,{$E:()=>u,ZF:()=>c,bj:()=>a,oJ:()=>s,x4:()=>d});var r=n(3057),o=n(6213);const s=e=>["200",200].includes(e),c=e=>["100005",100005].includes(e),a="",i=o.A.create({baseURL:"http://47.121.126.205:8099/file-api/v1",timeout:7e3,headers:{"Content-Type":"application/json;charset=utf-8"},withCredentials:!1});i.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),i.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject({code:e.response.data.status,data:e.response.data.error||"\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5"})}));const u=(e,t)=>new Promise(((n,o)=>{const{getToken:s}=(0,r.Nv)(),c=s(),a={url:e,method:"post",data:Object.assign({...t}),headers:{token:c}};i.request(a).then((e=>{n(e.data)})).catch((e=>{o(e.message)}))})),d=(e,t)=>new Promise(((n,o)=>{const{getToken:s}=(0,r.Nv)(),c=s(),a={url:e,method:"get",params:t,headers:{token:c}};i.request(a).then((e=>{n(e.data)})).catch((e=>{o(e.message)}))}))},5489:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var r=n(9735),o=n(7144),s=n(4775),c=n(5043);const a="index_homeWarp__vnToO",i="index_prevImg__50Q3j",u="index_upBox__NUu-f",d=n.p+"static/media/upimg.18d5993c1ec8698717c8.png";var l=n(6629),m=n(4440),p=n(5270),h=n.n(p),f=n(4612),g=n(906),v=n(579);const j=()=>{const[e]=(0,c.useState)(!1),[t,n]=(0,c.useState)(""),p=(0,c.useRef)(null),j=(0,c.useRef)(null),[x,y]=(0,c.useState)(""),A=(0,g.Zp)(),_={action:l.bj,multiple:!1,headers:{},showUploadList:!1,onStart(e){},onSuccess(e,t){},onError(e){},onProgress(e,t){let{percent:n}=e},customRequest:function(e){const t=new FileReader;return t.readAsDataURL(e.file),t.onloadend=function(r){p.current=r.target.result,j.current=e,r&&r.target&&r.target.result&&n(t.result)},{abort(){s.Ay.error({content:"\u4e0a\u4f20\u88ab\u7ec8\u7aef\u8bf7\u91cd\u8bd5\uff0c\u8bf7\u7a0d\u540e\u91cd\u65b0"})}}},beforeUpload:function(e){const t="image/jpeg"===e.type||"image/png"===e.type;if(!t)return s.Ay.error("\u53ea\u80fd\u4e0a\u4f20JPG\u6216PNG\u6587\u4ef6!"),!1;const n=e.size/1024/1024<f.LY;return n?t&&n:(s.Ay.error(`\u56fe\u7247\u5927\u5c0f\u9700\u5c0f\u4e8e${f.LY}MB!`),!1)}};return(0,v.jsxs)("div",{className:a,children:[(0,v.jsx)("div",{className:i,children:(0,v.jsx)("img",{src:t||d,alt:"avatar"})}),(0,v.jsx)("div",{}),(0,v.jsxs)("div",{className:u,children:[(0,v.jsx)(r.A,{..._,name:"avatar",disabled:e,children:(0,v.jsx)(o.Ay,{children:(0,v.jsx)("div",{children:"\u9009\u62e9\u56fe\u7247"})})}),(0,v.jsx)(o.Ay,{onClick:()=>{if(p.current){const e=j.current;e.onProgress({percent:Number(Math.round(1).toFixed(2))},e.file);(new FormData).append("files[]",e.file),e.onSuccess(e.file),(0,m.or)({fileBase64:p.current}).then((e=>{(0,l.oJ)(e.code)?(s.Ay.success({content:"\u4e0a\u4f20\u6210\u529f\uff0c\u70b9\u51fb\u4e0b\u9762\u7684\u5206\u4eab\u94fe\u63a5\uff0c\u5206\u4eab\u7ed9\u597d\u53cb"}),y(e.data)):(0,l.ZF)(e.code)?(s.Ay.error({content:(null===e||void 0===e?void 0:e.description)||"\u767b\u5f55\u8d85\u65f6\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55"}),setTimeout((()=>{A("login")}),2e3)):s.Ay.error({content:(null===e||void 0===e?void 0:e.data)||"\u4e0a\u4f20\u5931\u8d25\u8bf7\u7a0d\u540e\u91cd\u8bd5"})})).catch((e=>{s.Ay.error({content:e||"\u670d\u52a1\u5668\u9519\u8bef\uff0c\u4e0a\u4f20\u5931\u8d25\u8bf7\u7a0d\u540e\u91cd\u8bd5"})}))}else s.Ay.error({content:"\u8bf7\u5148\u9009\u62e9\u56fe\u7247\uff0c\u518d\u8fdb\u884c\u4e0a\u4f20\u5206\u4eab"})},children:"\u4e0a\u4f20\u56fe\u7247"}),(0,v.jsx)(o.Ay,{onClick:()=>{x?(h()(`\n\n        \u60a8\u7684\u597d\u53cb\u7ed9\u60a8\u53d1\u4e86\u4e00\u5f20\u95ea\u7167\u7247\uff0c\u70b9\u51fb\u67e5\u770b\uff1a\n\n        \u7531\u4e8e\u5fae\u4fe1\u9650\u5236\u8f83\u591a\uff0c\u53ef\u80fd\u5b58\u5728\u98ce\u63a7\u98ce\u9669\uff0c\u53ef\u590d\u5236\u94fe\u63a5\u5230[\u7cfb\u7edf\u81ea\u5e26\u6d4f\u89c8\u5668]\u6253\u5f00\u67e5\u770b\uff1a\n\n        ${window.location.origin}/reviewphoto?fileId=${x}\n\n        \u5982\u679c\u9700\u8981\u6ce8\u518c\u8d26\u53f7\uff0c\u8bf7\u52a1\u5fc5\u7d22\u53d6\u9080\u8bf7\u7801\uff01\uff01\uff01\n      `),s.Ay.success({content:"\u5df2\u590d\u5236\u5206\u4eab\u94fe\u63a5"})):s.Ay.error({content:"\u8bf7\u5148\u4e0a\u4f20\u56fe\u7247\uff0c\u518d\u8fdb\u884c\u5206\u4eab"})},color:"default",children:"\u5206\u4eab\u8fde\u63a5"})]})]})}},4612:(e,t,n)=>{n.d(t,{KO:()=>o,LY:()=>s,MY:()=>r});const r=["qq.com","163.com","@sina.com","@aliyun.com","@16com","@18com","@hotmail.com","@sohu.com","@mail.com","gmail.com"],o="666888",s=2}}]);
//# sourceMappingURL=home.effa2e99.chunk.js.map