import Global from 'redux/store/Global/reducer'
import Select from 'redux/store/Select/reducer'
import UserInfo from 'redux/store/UserInfo/reducer'
import Members from 'redux/store/Members/reducer'
import Lookup from 'redux/store/Lookup/reducer'
import Specialist from 'redux/store/Specialist/reducer'
import LeadManagement from 'redux/store/LeadManagement/reducer'
import { combineReducers } from '@reduxjs/toolkit'
import { enhancedApi as EquipmentsAPI2 } from 'redux/store/generateAPI/Equipments.ts'
import { LostFoundAPI } from 'redux/store/LostAndFound/LostAndFoundAPI'
import { LookupAPI } from 'redux/store/Lookup/LookupAPI'
import { MembersAPI } from 'redux/store/Members/MembersAPI'
import { HouseKeepingAPI } from 'redux/store/HouseKeeping/HouseKeepingAPI'
import { DiscountAndPromotionAPI } from 'redux/store/DiscountAndPromotion/DiscountAndPromotionAPI'
import { ReportsAPI } from 'redux/store/Reports/ReportsAPI'
import { EquipmentsAPI } from 'redux/store/Equipments/EquipmentsAPI'
import { SpecialistAPI } from 'redux/store/Specialist/SpecialistAPI'
import { SubscriptionsAPI } from 'redux/store/Subscriptions/SubscriptionsAPI'
import { MaintenanceContactAPI } from 'redux/store/Equipments/MaintenanceContactAPI'
import { SurveyAPI } from 'redux/store/Survey/SurveyAPI'
import { WaitingListAPI } from 'redux/store/WaitingList/WaitingListAPI'
import { UnscheduledMaintenanceAPI } from 'redux/store/Equipments/UnscheduledMaintenanceAPI'
import { AdminUserControlAPI } from 'redux/store/AdminUserControl/AdminUserControlAPI'
import { TasksActivitiesAPI } from 'redux/store/TasksActivities/TasksActivitiesAPI'
import { ServiceTestinomialAPI } from 'redux/store/ServiceTestinomial/ServiceTestinomialAPI'
import { MemberWaitingListAPI } from 'redux/store/MemberWaitingList/MemberWaitingListAPI'
import { MemberEventAPI } from 'redux/store/MemberEvent/MemberEventAPI'
import { InvoicesAPI } from 'redux/store/Invoices/InvoicesAPI'
import { MemberProfileAPI } from 'redux/store/MemberProfile/MemberProfileAPI'
import { RequestsAPI } from 'redux/store/Requests/RequestsAPI'
import { MemberHomeAPI } from 'redux/store/MemberHome/MemberHomeAPI'
import { MemberSubscriptionsAPI } from 'redux/store/MemberSubscriptions/MemberSubscriptionsAPI'
import { SpechialistSubscriptionsAPI } from 'redux/store/SpechialistSubscriptions/SpechialistSubscriptionsAPI'
import { EventsAPI } from 'redux/store/Events/EventsAPI'
import { CommunicationAPI } from 'redux/store/Communication/CommunicationAPI'
import { GlobalAPI } from 'redux/store/Global/GlobalAPI'

const allReducer = combineReducers({
  Global,
  Select,
  UserInfo,
  Members,
  Lookup,
  Specialist,
  LeadManagement,
  [MembersAPI.reducerPath]: MembersAPI.reducer,
  [EquipmentsAPI.reducerPath]: EquipmentsAPI.reducer,
  // TODO: Look here
  [EquipmentsAPI2.reducerPath]: EquipmentsAPI.reducer,
  [LostFoundAPI.reducerPath]: LostFoundAPI.reducer,
  [LookupAPI.reducerPath]: LookupAPI.reducer,
  [HouseKeepingAPI.reducerPath]: HouseKeepingAPI.reducer,
  [DiscountAndPromotionAPI.reducerPath]: DiscountAndPromotionAPI.reducer,
  [ReportsAPI.reducerPath]: ReportsAPI.reducer,
  [MaintenanceContactAPI.reducerPath]: MaintenanceContactAPI.reducer,
  [SpecialistAPI.reducerPath]: SpecialistAPI.reducer,
  [SubscriptionsAPI.reducerPath]: SubscriptionsAPI.reducer,
  [WaitingListAPI.reducerPath]: WaitingListAPI.reducer,
  [SurveyAPI.reducerPath]: SurveyAPI.reducer,
  [UnscheduledMaintenanceAPI.reducerPath]: UnscheduledMaintenanceAPI.reducer,
  [AdminUserControlAPI.reducerPath]: AdminUserControlAPI.reducer,
  [TasksActivitiesAPI.reducerPath]: TasksActivitiesAPI.reducer,
  [ServiceTestinomialAPI.reducerPath]: ServiceTestinomialAPI.reducer,
  [MemberWaitingListAPI.reducerPath]: MemberWaitingListAPI.reducer,
  [MemberEventAPI.reducerPath]: MemberEventAPI.reducer,
  [InvoicesAPI.reducerPath]: InvoicesAPI.reducer,
  [MemberProfileAPI.reducerPath]: MemberProfileAPI.reducer,
  [RequestsAPI.reducerPath]: RequestsAPI.reducer,
  [MemberHomeAPI.reducerPath]: MemberHomeAPI.reducer,
  [MemberSubscriptionsAPI.reducerPath]: MemberSubscriptionsAPI.reducer,
  [SpechialistSubscriptionsAPI.reducerPath]: SpechialistSubscriptionsAPI.reducer,
  [EventsAPI.reducerPath]: EventsAPI.reducer,
  [CommunicationAPI.reducerPath]: CommunicationAPI.reducer,
  [GlobalAPI.reducerPath]: GlobalAPI.reducer,
})
const rootReducer = (state, action) => {
  let newState = { ...state }
  if (action.type === 'RESET_APP') {
    newState = {}
  }

  return allReducer(newState, action)
}

export default rootReducer
