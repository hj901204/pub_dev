export const JSON2Str = (data) => {
    let toString = "";
    for (var key in data) {
        var obj = data[key];
        if (Array.isArray(obj)) {
            let arrayString = obj.join(",");
            toString += key + "=" + encodeURIComponent(arrayString) + "&";
        }
        else {
            toString += key + "=" + encodeURIComponent(data[key]) + "&";
        }
    }
    return toString.replace(/\&$/, "");
};

/**
 * 应对，当有null,"",undefined的字符串需要被替换为制定字符串时使用
 * 例如： 所有的null需要替换为 --
 * @param {*} str 需要格式化的字符串
 * @param {*} replaceStr 替换的字符串
 */
export const formatNullStr = (str,replaceStr='--') => {
    return (str === null || str === undefined || str === "")?replaceStr:str;
};


export const getScrollBarSize = (fresh) => {
    let cached;
    if (fresh || cached === undefined) {
        const inner = document.createElement('div');
        inner.style.width = '100%';
        inner.style.height = '200px';

        const outer = document.createElement('div');
        const outerStyle = outer.style;

        outerStyle.position = 'absolute';
        outerStyle.top = 0;
        outerStyle.left = 0;
        outerStyle.pointerEvents = 'none';
        outerStyle.visibility = 'hidden';
        outerStyle.width = '200px';
        outerStyle.height = '150px';
        outerStyle.overflow = 'hidden';

        outer.appendChild(inner);

        document.body.appendChild(outer);

        const widthContained = inner.offsetWidth;
        outer.style.overflow = 'scroll';
        let widthScroll = inner.offsetWidth;

        if (widthContained === widthScroll) {
            widthScroll = outer.clientWidth;
        }

        document.body.removeChild(outer);

        cached = widthContained - widthScroll;
    }
    return cached;
};


export const buildTree = (data, key = 'id', name = 'name') => {
    if (Array.isArray(data)) {
        let loop = data => data.map((item) => {
            item.key = item[key]+'';
            item.value = item[key]+'';
            item.label = item[name];
            if (item.children) loop(item.children);
            return item;
        });
        return loop(data);
    }
};

import { is } from 'immutable';

export const shouldComponentUpdate = (nextProps = {}, nextState = {}, thisProps = {}, thisState={}) => {
    if (Object.keys(thisProps).length !== Object.keys(nextProps).length) {
        return true;
    }
    if (thisState && nextState && Object.keys(thisState).length !== Object.keys(nextState).length) {
        return true;
    }
    for (const key in nextProps) {
        if (thisProps[key] !== nextProps[key] || !is(thisProps[key], nextProps[key])) {
            return true;
        }
    }
    for (const key in nextState) {
        if (thisState[key] !== nextState[key] || !is(thisState[key], nextState[key])) {
            return true;
        }
    }
    return false;
}


/**
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 *
 * @param  {function} func        传入函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @param  {boolean}  immediate   设置为ture时，调用触发于开始边界而不是结束边界
 * @return {function}             返回客户调用函数
 */
export const debounce = function (func, wait, immediate) {
    var timeout, args, context, timestamp, result;

    var later = function () {
        // 据上一次触发时间间隔
        var last = Date.now() - timestamp;

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            }
        }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = Date.now();
        var callNow = immediate && !timeout;
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
};
export const removeTabs = (targetKey,props) =>{
    let { tabs,activeKey,tabRemove } = props;
    let prevIndex,nextIndex;
    tabs.forEach((pane, i) => {
        if (pane.key === targetKey) {
            prevIndex = i - 1;
            nextIndex = i;
            nextIndex = nextIndex <=tabs.length? nextIndex : -1;
        }
    });

    const _tabs = tabs.filter(pane => pane.key !== targetKey);
    if (prevIndex >= 0 && activeKey === targetKey && _tabs.length>0) {
        activeKey = _tabs[prevIndex].key;
    }else if(nextIndex >= 0 && activeKey === targetKey && _tabs.length>0){
        activeKey = _tabs[nextIndex].key;
    }
    tabRemove(targetKey,activeKey);
}



import moment from "moment";
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
        result.push(i);
    }
    return result;
},
    disableAll = {
        disabledHours: () => range(0, 24),
        disabledMinutes: () => range(0, 60),
        disabledSeconds: () => range(0, 60),
    },
    enableAll = {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
    };
export const disabledBeforeDate = (current, compareDate, disableToday = false) => {
    let compare = compareDate == undefined ? moment() : compareDate;
    if (!compare) {
        return false
    } else if (disableToday) {
        return current && current.valueOf() < compare.valueOf();
    } else if (!current || current.format('YYYY-MM-DD') === compare.format('YYYY-MM-DD')) {
        return false;
    } else {
        return current.valueOf() < compare.valueOf();
    }
}
export const disabledBeforeTime = (currentDate, compareDate) => {
    let current = currentDate || moment(),
        compare = compareDate == undefined ? moment() : compareDate;

    if (current && compare) {
        let year = compare.year(),
            month = compare.month(),
            date = compare.date(),
            hour = compare.hour(),
            minute = compare.minute(),
            second = compare.second();

        if (current.year() > year) {
            return enableAll;
        } else if (current.year() == year) {
            if (current.month() > month) {
                return enableAll;
            } else if (current.month() == month) {
                //当前月
                return {
                    disabledHours: () => current.date() > date ? [] : range(0, hour),
                    disabledMinutes: (currentHour) => (current.date() > date || currentHour > hour) ? [] : range(0, minute),
                    disabledSeconds: (currentHour, currentMinute) => (current.date() > date || currentHour > hour || currentMinute > minute) ? [] : range(0, second),
                }
            } else {
                return disableAll
            }
        } else {
            return disableAll
        }
    } else {
        return enableAll
    }


}
export const disabledAfterDate = (current, compare, disableToday = false) => {
    if (!compare) {
        return false
    } else if (disableToday) {
        return current && current.valueOf() > compare.valueOf();
    } else if (!current || current.format('YYYY-MM-DD') === compare.format('YYYY-MM-DD')) {
        return false;
    } else {
        return current.valueOf() > compare.valueOf();
    }
}
export const disabledAfterTime = (currentDate, compare) => {
    let current = currentDate || moment();
    if (current && compare) {
        let year = compare.year(),
            month = compare.month(),
            date = compare.date(),
            hour = compare.hour(),
            minute = compare.minute(),
            second = compare.second();
        if (current.year() < year) {
            return enableAll;
        } else if (current.year() == year) {
            if (current.month() < month) {
                return enableAll;
            } else if (current.month() == month) {
                if (current.date() > date) {
                    return disableAll
                } else {
                    return {
                        disabledHours: () => current.date() < date ? [] : range(hour + 1, 24),
                        disabledMinutes: (currentHour) => (current.date() < date || currentHour < hour) ? [] : range(minute + 1, 60),
                        disabledSeconds: (currentHour, currentMinute) => (current.date() < date || currentHour < hour || currentMinute < minute) ? [] : range(second + 1, 60),
                    }
                }
            } else {
                return disableAll
            }
        } else {
            return disableAll
        }
    } else {
        return enableAll
    }
}