import { createStore, compose, applyMiddleware } from 'redux'
import rootReducer from 'redux/store/reducers'
import thunk from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { EquipmentsAPI } from 'redux/store/Equipments/EquipmentsAPI'
// import { enhancedApi as EquipmentsAPI2 } from 'redux/store/generateAPI/Equipments.ts'

import { LostFoundAPI } from 'redux/store/LostAndFound/LostAndFoundAPI'
import { LookupAPI } from 'redux/store/Lookup/LookupAPI'
import { MembersAPI } from 'redux/store/Members/MembersAPI'
import { HouseKeepingAPI } from 'redux/store/HouseKeeping/HouseKeepingAPI'
import { DiscountAndPromotionAPI } from 'redux/store/DiscountAndPromotion/DiscountAndPromotionAPI'
import { ReportsAPI } from 'redux/store/Reports/ReportsAPI'
import { MaintenanceContactAPI } from 'redux/store/Equipments/MaintenanceContactAPI'
import { SpecialistAPI } from 'redux/store/Specialist/SpecialistAPI'
import { SubscriptionsAPI } from 'redux/store/Subscriptions/SubscriptionsAPI'
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

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = configureStore({
  reducer: rootReducer, // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([
      // EquipmentsAPI2.middleware,
      LostFoundAPI.middleware,
      LookupAPI.middleware,
      MembersAPI.middleware,
      EquipmentsAPI.middleware,
      HouseKeepingAPI.middleware,
      DiscountAndPromotionAPI.middleware,
      ReportsAPI.middleware,
      MaintenanceContactAPI.middleware,
      SpecialistAPI.middleware,
      SubscriptionsAPI.middleware,
      SurveyAPI.middleware,
      WaitingListAPI.middleware,
      UnscheduledMaintenanceAPI.middleware,
      AdminUserControlAPI.middleware,
      TasksActivitiesAPI.middleware,
      ServiceTestinomialAPI.middleware,
      MemberWaitingListAPI.middleware,
      MemberEventAPI.middleware,
      InvoicesAPI.middleware,
      MemberProfileAPI.middleware,
      RequestsAPI.middleware,
      MemberHomeAPI.middleware,
      MemberSubscriptionsAPI.middleware,
      SpechialistSubscriptionsAPI.middleware,
      EventsAPI.middleware,
      CommunicationAPI.middleware,
      GlobalAPI.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
})
export default store
