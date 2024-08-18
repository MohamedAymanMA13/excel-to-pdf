import React from 'react'

import members from 'assets/images/Nav/members.svg'
import subscriptions from 'assets/images/Nav/subscriptions.svg'
import specialists from 'assets/images/Nav/specialists.svg'
import waitingList from 'assets/images/Nav/waitingList.svg'
import leadManagement from 'assets/images/Nav/leadManagement.svg'
import tasks from 'assets/images/Nav/tasks.svg'
import calender from 'assets/images/Nav/calender.svg'
import communications from 'assets/images/Nav/communications.svg'
import equipments from 'assets/images/Nav/equipments.svg'
import houseKeeping from 'assets/images/Nav/houseKeeping.svg'
import lostAndFound from 'assets/images/Nav/lostAndFound.svg'
import serviceTestimonials from 'assets/images/Nav/serviceTestimonials.svg'
import surveyManagement from 'assets/images/Nav/surveyManagement.svg'
import DiscountPromotion from 'assets/images/Nav/DiscountPromotion.svg'
import reports from 'assets/images/Nav/reports.svg'
import settings from 'assets/images/Nav/settings.svg'
import configurations from 'assets/images/Nav/configurations.svg'
import invoiceIcon from 'assets/images/Nav/Invoice.svg'

export const Routes = [
  { path: '/members', img: members, name: 'Members', roles: ['admin', 'frontDisk'] },
  {
    path: '/subscriptions',
    img: subscriptions,
    name: 'Subscriptions',
    roles: ['admin', 'frontDisk'],
  },
  {
    path: '/specialists',
    img: specialists,
    name: 'Specialists',
    roles: ['admin', 'fitness'],
  },
  {
    path: '/classes-today',
    img: surveyManagement,
    name: 'Classes Today',
    roles: ['admin', 'frontDisk', 'operations', 'fitness'],
  },
  {
    path: '/classes',
    img: surveyManagement,
    name: 'Classes',
    roles: ['admin'],
  },
  {
    path: '/waiting-list/inventory',
    img: waitingList,
    name: 'Waiting List',
    roles: ['admin', 'frontDisk'],
  },

  {
    path: '/leadManagement',
    img: leadManagement,
    name: 'Lead Management',
    roles: ['admin', 'frontDisk'],
  },

  {
    path: '/tasks-activities',
    img: tasks,
    name: 'Tasks & Activities',
    roles: ['admin', 'frontDisk', 'operations', 'fitness'],
  },

  {
    path: '/calender',
    img: calender,
    name: 'Calender',
    roles: ['admin', 'fitness'],
  },

  {
    path: '/communications',
    img: communications,
    name: 'Communications',
    roles: ['admin'],
  },

  {
    path: '/communication/chats',
    img: communications,
    name: 'Chats',
    roles: ['admin'],
  },

  {
    path: '/equipments',
    img: equipments,
    name: 'Equipments',
    roles: ['admin', 'operations'],
  },

  {
    path: '/house-keeping/staff',
    img: houseKeeping,
    name: 'House Keepnig',
    roles: ['admin', 'operations'],
  },

  {
    path: '/lost-found',
    img: lostAndFound,
    name: 'Lost & Found',
    roles: ['admin', 'frontDisk', 'operations'],
  },

  {
    path: '/service-testimonials',
    img: serviceTestimonials,
    name: 'Service Testimonials',
    roles: ['admin', 'frontDisk'],
  },

  {
    path: '/survey-management',
    img: surveyManagement,
    name: 'Survey Management',
    roles: ['admin'],
  },

  {
    path: '/discounts-promotions',
    img: DiscountPromotion,
    name: 'Discount & Promotion',
    roles: ['admin'],
  },

  {
    path: '/report/specialist',
    img: reports,
    name: 'Reports',
    roles: ['admin'],
  },
  {
    path: '/report/MemberExpirationReport',
    img: reports,
    name: 'Expiration Report',
    roles: ['admin', 'frontDisk'],
  },
  {
    path: '/MembershipInvoices',
    img: invoiceIcon,
    name: 'Membership Invoices',
    roles: ['admin'],
  },
  {
    path: '/admin-user-control',
    img: settings,
    name: 'Admin & user control',
    roles: ['admin'],
  },

  {
    path: '/configuration/subscription-types',
    img: configurations,
    name: 'Configuration',
    roles: ['admin'],
  },
]
