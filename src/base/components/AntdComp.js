import Button from "antd/lib/button";
import Input from "antd/lib/Input";
import Form from "antd/lib/Form";
import Spin from "antd/lib/Spin";
import Table from "antd/lib/Table";
import Pagination from "antd/lib/Pagination";
import Dropdown from "antd/lib/Dropdown";
import Menu from "antd/lib/Menu";
import Checkbox from "antd/lib/Checkbox";
import message from "antd/lib/message";
import Modal from "antd/lib/Modal";
import Radio from "antd/lib/Radio";
import Popover from "antd/lib/Popover";
import Icon from "antd/lib/Icon";
import Tabs from "antd/lib/Tabs";
import Tree from "antd/lib/Tree";
import Badge from "antd/lib/Badge";
import Popconfirm from "antd/lib/Popconfirm";
import Row from "antd/lib/Row";
import Col from "antd/lib/Col";
import Tag from "antd/lib/Tag";
import Select from "antd/lib/Select";
import DatePicker from "antd/lib/date-picker";
import TreeSelect from "antd/lib/tree-select";
import Upload from "antd/lib/Upload";
import AutoComplete from "antd/lib/auto-complete";
import Tooltip from "antd/lib/Tooltip";
import Layout from "antd/lib/layout";
import Breadcrumb from "antd/lib/breadcrumb";
import InputNumber from "antd/lib/input-number";
import Collapse from "antd/lib/collapse";
import Progress from "antd/lib/progress";
import Notification from 'antd/lib/notification';

let getPopupContainer=(triggerNode) => {
    let temp,
        content = document.getElementById("ew-content"),
        dialog = document.getElementsByClassName("ant-modal-wrap"),
        sidebar = document.getElementsByClassName("ew-sidebar");

    if(dialog.length>0){
        temp = dialog[dialog.length-1];
    }else if(sidebar.length>0){
        temp = sidebar[sidebar.length-1];
    }else temp = content;
    return temp;
}
/**
 * 统一处理输入框不记录之前的输入内容
 * 如果使用者需要记录输入过的内容请 <Input autoComplete="on"
 */
Input.defaultProps.autoComplete = "off"; 
Popconfirm.defaultProps.getPopupContainer=getPopupContainer;
Select.defaultProps.getPopupContainer=getPopupContainer;
AutoComplete.defaultProps.getPopupContainer=getPopupContainer;
TreeSelect.defaultProps.getPopupContainer = getPopupContainer;
DatePicker.defaultProps.getCalendarContainer = getPopupContainer;
Tooltip.defaultProps.getPopupContainer = getPopupContainer;
exports.getPopupContainer = getPopupContainer;

exports.Button = Button;
exports.Input = Input;
exports.Form = Form;
exports.Spin = Spin;
exports.Table = Table;
exports.Pagination = Pagination;
exports.Dropdown = Dropdown;
exports.Menu = Menu;
exports.Checkbox = Checkbox;
exports.Modal = Modal;
exports.Radio = Radio;
exports.message = message;
exports.Popover = Popover;
exports.Icon = Icon;
exports.Tabs = Tabs;
exports.Tree = Tree;
exports.Badge = Badge;
exports.Row = Row;
exports.Col = Col;
exports.Tag = Tag;
exports.Select = Select;
exports.TreeSelect = TreeSelect;
exports.DatePicker = DatePicker;
exports.Popconfirm = Popconfirm;
exports.Upload = Upload;
exports.AutoComplete = AutoComplete;
exports.Tooltip = Tooltip;
exports.Layout = Layout;
exports.Breadcrumb = Breadcrumb;
exports.InputNumber = InputNumber;
exports.Collapse = Collapse;
exports.Progress = Progress;
exports.Notification = Notification;
