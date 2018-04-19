import zn_CH from './zn_CH';

const lang = 'zn_CH';

const TxtFilter = (lang) => {
    switch (lang) {
        case 'zn_CH':
            return zn_CH;
        default:
            return zn_CH;
    }
};

const TXT = TxtFilter(lang);

export default TXT;

export {lang};