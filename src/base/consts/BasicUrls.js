import { prefix, prefixPub } from './UrlsConfig';

const basic = 'basic';

const BasicUrls = {
    SUBJECT_ALL: `${prefixPub}/${basic}/subject/getAllSubject`,
    CURRENCYLIST: `${prefixPub}/${basic}/currency/getList`,
    SUBJECT_LIST:`${prefixPub}/${basic}/subject/getList`,
};
BasicUrls.GET_SUBJECT_ALL = (subCode) => ({
    url: BasicUrls.SUBJECT_ALL,
    pm: { subCode }
});

export default BasicUrls ;