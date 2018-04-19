import { prefixPub } from './UrlsConfig';

const login = 'login';

const LoginUrls = {
    //登录的忘记密码URL
    LOGIN_GET_SMSWITH: `${prefixPub}/${login}/getSMSWithImg`,
    LOGIN_CHECK_PHONE: `${prefixPub}/${login}/checkPhone`,
    LOGIN_RESET_PSW: `${prefixPub}/${login}/resetPassword`,

    //获取图片验证码
    LOGIN_GET_IMGCAPTCHA: `${prefixPub}/${login}/getImgCaptcha`,

    //个人中心的忘记密码与修改手机
    LOGIN_CHECK_PSW: `${prefixPub}/${login}/checkPassword`,
    LOGIN_RESET_PSWWITH: `${prefixPub}/${login}/resetPasswordWithOld`,
    LOGIN_GET_SMS: `${prefixPub}/${login}/getSMS`,
    LOGIN_BIND_PHONE: `${prefixPub}/${login}/bindNewPhone`,

    //登录
    LOGIN_SELECT_COMPANY: `${prefixPub}/${login}/selectCompany`,
    LOGIN_ENTER: `${prefixPub}/${login}/enter`,

    //退出系统
    LOGIN_LOGOUT:`${prefixPub}/${login}/logout`,
};

export default LoginUrls;
