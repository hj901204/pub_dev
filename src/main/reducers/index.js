import { combineReducers } from "redux"
import PositionRedu from './PositionRedu'
import EmployeeRedu from './EmployeeRedu'
import BaseDataRedu from './BaseDataRedu'

import TabsRedu from './TabsRedu'
import DepartmentRedu from './DepartmentRedu'
import PageLoadingRedu from './PageLoadingRedu'

import SiteRedu from './SiteRedu'
import AddressRedu from './AddressRedu'
import ImportEmployeeRedu from './ImportEmployeeRedu'
import SetOfficesRedu from './SetOfficesRedu'

import MemberManageRedu from './MemberManageRedu'
import TreeRedu from './TreeRedu'
import PersonManageRedu from './PersonManageRedu'
import GetActivedMemberRedu from './GetDeactivedMemberRedu'
import MemberDialogRedu from "./MemberDialogRedu"
import LinkageRedu from './LinkageRedu'
import LayoutTopRedu from './LayoutTopRedu'
import AuthorityRedu from './AuthorityRedu'
import SelectorRedu from './SelectorRedu'

const rootReducer = combineReducers({
    PositionRedu,

    EmployeeRedu,
    PageLoadingRedu,
    
	TabsRedu,
    ImportEmployeeRedu,
	BaseDataRedu,
    DepartmentRedu,
    SiteRedu,
    SetOfficesRedu,
    AddressRedu,
    MemberManageRedu,
    TreeRedu,
    PersonManageRedu,
    GetActivedMemberRedu,

    LinkageRedu,
    MemberDialogRedu,
    AuthorityRedu,
    SelectorRedu,
    LayoutTopRedu
})

export default rootReducer;