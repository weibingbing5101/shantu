"use strict";(self.webpackChunkreact_mind_map=self.webpackChunkreact_mind_map||[]).push([[797],{4440:(e,t,r)=>{r.d(t,{Jp:()=>c,Zm:()=>s,kz:()=>a,or:()=>u,z8:()=>o});var n=r(6629);const s=e=>(0,n.$E)("/user/doLogin",{...e}),a=e=>(0,n.$E)("/user/register",{...e}),o=e=>(0,n.x4)("/user/getCaptcha",{...e}),u=e=>(0,n.$E)("/file/upload",e),c=e=>(0,n.x4)("/file/getFile",e)},6629:(e,t,r)=>{r.d(t,{$E:()=>i,ZF:()=>o,bj:()=>u,oJ:()=>a,x4:()=>d});var n=r(3057),s=r(6213);const a=e=>["200",200].includes(e),o=e=>["100005",100005].includes(e),u="",c=s.A.create({baseURL:"http://47.121.126.205:8099/file-api/v1",timeout:7e3,headers:{"Content-Type":"application/json;charset=utf-8"},withCredentials:!1});c.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)})),c.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject({code:e.response.data.status,data:e.response.data.error||"\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5"})}));const i=(e,t)=>new Promise(((r,s)=>{const{getToken:a}=(0,n.Nv)(),o=a(),u={url:e,method:"post",data:Object.assign({...t}),headers:{token:o}};c.request(u).then((e=>{r(e.data)})).catch((e=>{s(e.message)}))})),d=(e,t)=>new Promise(((r,s)=>{const{getToken:a}=(0,n.Nv)(),o=a(),u={url:e,method:"get",params:t,headers:{token:o}};c.request(u).then((e=>{r(e.data)})).catch((e=>{s(e.message)}))}))},7289:(e,t,r)=>{r.d(t,{z:()=>s});var n=r(906);function s(){const e=(0,n.zy)(),t=new URLSearchParams(e.search),r={};return t.forEach(((e,t)=>{r[t]=e})),r}},7101:(e,t,r)=>{r.r(t),r.d(t,{default:()=>m});var n=r(4775),s=r(5043);const a={repvePhotoWarp:"index_repvePhotoWarp__npMLo",timeTips:"index_timeTips__asPNH",myCanvasWarp:"index_myCanvasWarp__M79Ro",myCanvas:"index_myCanvas__6uvR8"};var o=r(4440),u=r(7289),c=r(906),i=r(6629),d=r(579);const l=()=>{const e=(0,s.useRef)(null),t=(0,s.useRef)(null),r=(0,c.Zp)(),[l,m]=(0,s.useState)(""),[p,f]=(0,s.useState)(""),[v,h]=(0,s.useState)(3),_=(0,s.useRef)(null),[x,T]=(0,s.useState)(void 0),g=(0,u.z)();(0,s.useEffect)((()=>{g&&g.fileId?(0,o.Jp)({fileId:g.fileId}).then((e=>{(0,i.oJ)(e.code)?(t.current=e.data,f("\u957f\u6309\u67e5\u770b\u56fe\u7247")):(0,i.ZF)(e.code)?(n.Ay.error({content:(null===e||void 0===e?void 0:e.description)||"\u767b\u5f55\u8d85\u65f6\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55"}),setTimeout((()=>{const e=window.location.href;r(`/login?from=${e}`)}),2e3)):(f("\u56fe\u7247\u5df2\u67e5\u770b\u4e14\u9500\u6bc1"),setTimeout((()=>{r("/")}),2e3))})):(f("\u9519\u8bef\u7684\u5730\u5740\uff0c\u8bf7\u91cd\u65b0\u7d22\u53d6\u5206\u4eab\u8fde\u63a5"),setTimeout((()=>{r("/")}),2e3))}),[]);const C=()=>{f("\u56fe\u7247\u5df2\u67e5\u770b\u4e14\u9500\u6bc1"),m(""),T(!1),t.current=null,_.current&&clearTimeout(_.current),setTimeout((()=>{r("/")}),2e3)};return(0,s.useEffect)((()=>{if(void 0!==x){if(x){if(v<=0)return void C();_.current=setTimeout((()=>{h(v-1)}),1e3)}else C();return()=>{_.current&&clearTimeout(_.current)}}}),[x,v]),(0,s.useEffect)((()=>{e.current.addEventListener("contextmenu",(function(e){e.preventDefault()})),e.current.addEventListener("touchstart",(function(e){t.current&&(T(!0),f(""),m(t.current)),e.preventDefault()})),e.current.addEventListener("touchend",(function(e){t.current&&T(!1),e.preventDefault()}))}),[]),(0,d.jsxs)("div",{className:a.repvePhotoWarp,ref:e,children:[x?(0,d.jsx)("span",{className:a.timeTips,children:v}):null,(0,d.jsx)("span",{className:a.text,children:p}),x?(0,d.jsx)("div",{className:a.myCanvasWarp,children:(0,d.jsx)("img",{className:a.myCanvas,src:l,alt:""})}):null]})},m=(0,s.memo)(l)}}]);
//# sourceMappingURL=reviewphoto.61dec05a.chunk.js.map