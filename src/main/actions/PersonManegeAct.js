import { PERSONMANAGE,MEMBERCHANGEREDU, GETDEAVTIVEMEMER } from '../consts/ActTypes'
import memberManageAct from '../actions/MemberManageAct'

const actions = {
        //组织架构
        organizationChart: (pm = {}) => (dispatch, getState) => {
            let val = {
                key: pm.data[0]?pm.data[0].id:'',
                departNum: pm.data[0]?pm.data[0].children.length:'',
                departLeader: pm.data[0]?pm.data[0].deptManager:'',
                departName: pm.data[0]?pm.data[0].deptName:''
            };
            if (val.key) {
                dispatch(actions.disableEmployees(2,2));
                dispatch(memberManageAct.DepartInfo(val));
            }
        },
        /*
            *切换右侧表格
            *切换左侧样式
        */
        disableEmployees: (e,active) => (dispatch, getState) => {
            /*停用员工与组织架构表格的切换
                * 1代表停用员工
                * 2代表组织架构
            */
            let flag;
            switch (e){
                case 1:
                    flag = 1;
                    let states = getState()[GETDEAVTIVEMEMER].setIn(['searchDeactiveMemberVal'],{
                        employeeName:'', phone: '', page: 1, pageSize: 10
                    })
                    dispatch( {type: GETDEAVTIVEMEMER, state:states} )
                    break;
                case 2:
                    flag = 2;
                    let state = getState()[MEMBERCHANGEREDU].set('headerBar_visible', ["none","block"]).setIn(['searchPm'],{
                        deptCode:'', employeeName:'', phone: '', page: 1, pageSize: 10
                    });
                    dispatch( {type: MEMBERCHANGEREDU, state} )
                    break;
                default :
                    flag = 1;
            }
            let selectDisEmployees,selectOrgChart;
            /*停用员工与组价架构的样式切换
                * 1代表停用员工
                * 2代表组织架构
            */
            switch (active) {
                case 1:
                    selectDisEmployees = false;
                    selectOrgChart = true;
                    break;
                case 2:
                    selectDisEmployees = true;
                    selectOrgChart = false;
                    break;
                default :
                    selectDisEmployees = true;
                    selectOrgChart = false;
            }
            let state = getState()[PERSONMANAGE].set('changetable', flag).set('selectDisEmployees',!selectDisEmployees).set('selectOrgChart',!selectOrgChart);
            dispatch({type: PERSONMANAGE, state})
        }
    }


export default actions;
