import { message } from '../components/AntdComp'
import { JSON2Str } from '../consts/Utils'
import React from 'react';
import {prefix,prefix_route,prefixCh} from '../../base/consts/UrlsConfig'

const jsonHead = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'clientMark': 0,
};

//页面初始化 登录  
const  getCookie=(name)=>{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
    return unescape(arr[2]);
    else
    return null;
}

const setJsonHead = (tokenId)=>{
    let tokenIdVal = getCookie("tokenId");
    if(!tokenIdVal){
        return ;
    }
    jsonHead.tokenId = tokenIdVal || "";
    
}

setJsonHead();

const delJsonHead = ()=>{
    delete jsonHead.tokenId;
    delCookie("tokenId");
}

const setCookie=(name,val)=>{
    var exp = new Date();  
    exp.setTime(exp.getTime() + 3 * 24 * 60 * 60 * 1000); //3天过期  
    document.cookie = name + "=" + val + ";expires=" + exp.toGMTString()+";path=/";  
}

const  delCookie = (name)=>{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


const post = (pm) => ({
    method: "POST",
    // mode: "cors",
    credentials: "same-origin",
    headers: Object.assign({}, jsonHead),
    body: JSON.stringify(pm),

});
const get = () => ({
    // mode: 'cors',
    credentials: "same-origin",
    headers:{tokenId:jsonHead.tokenId},
    method: 'GET'
});

const handlerReq = (req, p) => (req.then((resp) => {
    return resp.json();
}).then((j) => {
    if(p.callBack === true){
        return j;
    }
    if (j.status === 4013) {
        window.location.href = prefix+prefixCh+"login.html";
        throw j;
    }else if (j.status !== 2000) {
        message.config({ duration: 3 });
        throw j;
    }
    return j;
}).catch((j) => {
    let error = (msgs) => <div>
        {
            msgs.map((item, index) => 
                <div key={"field_error" + index}>
                    {item.msg?item.msg:""}
                </div>)
        }
    </div>;
    if (Array.isArray(j.message)&&j.message.length>0) {
        message.error(error(j.message));
    }
    return j;
}));

const ReqApi = {
    filterPm(p) {      
        let g = Object.assign({
            pm: {}
        }, p);
        if(!window.LUX_URL)
            g.pm.corNode = 1;
        return g;
    },
    get(param) {
        let p = this.filterPm(param);
        //  p.url = p.url.toLowerCase();
        p.url = p.url + '?' + JSON2Str(p.pm);
        return handlerReq(fetch(p.url, get()), p);
    },
    post(param) {
        let p = this.filterPm(param);
        //   p.url = p.url.toLowerCase();
        return handlerReq(fetch(p.url, post(p.pm)), p);
    }
}


const ReqApiNoToken = {
    get(param) {
        let p = ReqApi.filterPm(param),opt = get();
        delete opt.headers.tokenId;
        p.url = p.url + '?' + JSON2Str(p.pm);
        return handlerReq(fetch(p.url, opt), p);
    },
    post(param) {
        let p = ReqApi.filterPm(param),opt = post(p.pm); 
        delete opt.headers.tokenId;
        return handlerReq(fetch(p.url, opt), p);
    }
}


const ReqApiPhoto = {
    post(param) {
        let p = ReqApi.filterPm(param), opt = {
            method: "POST",
            mode: "cors",
            body: p.pm,
            headers: {
                tokenId: jsonHead.tokenId,
                clientMark: 0
            }
        };
        return handlerReq(fetch(p.url, opt), p);
    }
}

export { ReqApiNoToken, ReqApi, setCookie, setJsonHead, delJsonHead, ReqApiPhoto, getCookie,jsonHead};