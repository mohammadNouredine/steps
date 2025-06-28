export const DASHBOARD_ENDPOINTS = {
  //---------------------------USERS
  GET_ALL_USERS: "/users", //GET
  CREATE_USER: "/users", //POST
  UPDATE_USER: (id: number) => `/users/${id}`, //PUT
  DELETE_USER: "/users/", //DELETE
  EDIT_USER_PERMISSIONS: (id: number) => `/users/${id}/permissions`, //PUT
  GET_USER_ROLES: "/roles", //GET

  //---------------------------CONTACT
  GET_ALL_CONTACT_MESSAGES: "/contact", //GET
  DELETE_CONTACT_MESSAGE: `/contact/`, //DELETE
  //---------------------------PAYMENTS
  GET_ALL_PAYMENTS: "/payment", //GET
  CREATE_PAYMENT: "/payment", //POST
  UPDATE_PAYMENT: `/payment`, //PUT
  DELETE_PAYMENT: `/payment/`, //DELETE
  //---------------------------SUBSCRIPTIONS
  GET_ALL_SUBSCRIPTIONS: "/subscription", //GET
  CREATE_SUBSCRIPTION: "/subscription", //POST
  UPDATE_SUBSCRIPTION: `/subscription`, //PUT
  DELETE_SUBSCRIPTION: `/subscription/`, //DELETE
  //---------------------------EXPENSES
  GET_ALL_EXPENSES: "/expense", //GET
  CREATE_EXPENSE: "/expense", //POST
  UPDATE_EXPENSE: `/expense`, //PUT
  DELETE_EXPENSE: `/expense/`, //DELETE
  //---------------------------TRANSACTIONS
  GET_ALL_TRANSACTIONS: "/transaction", //GET
  CREATE_TRANSACTION: "/transaction", //POST
  DELETE_TRANSACTION: `/transaction/`, //DELETE
  //---------------------------NOTES
  GET_ALL_NOTES: "/note", //GET
  CREATE_NOTE: "/note", //POST
  UPDATE_NOTE: `/note`, //PUT
  DELETE_NOTE: (id: number) => `/note/${id}`, //DELETE
  //---------------------------PURCHASES
  GET_ALL_PURCHASES: "/purchase", //GET
  CREATE_PURCHASE: "/purchase", //POST
  UPDATE_PURCHASE: (purchaseId: number) => `/purchase/${purchaseId}`, //PUT
  DELETE_PURCHASE: `/purchase/`, //DELETE
  //---------------------------ATTENDANCE
  GET_ALL_ATTENDANCE: "/attendance", //GET
  CREATE_ATTENDANCE: "/attendance", //POST
  UPDATE_ATTENDANCE: `/attendance`, //PUT
  TOGGLE_ATTENDANCE: `/attendance/toggle`, //POST
  DELETE_ATTENDANCE: `/attendance`, //DELETE
  //----------------------------KIDS
  GET_ALL_KIDS: "/kids", //GET
  CREATE_KID: "/kids", //POST
  DELETE_KID: `/kids/`, //DELETE
  UPDATE_KID: (id: number) => `/kids/${id}`, //PUT
  UPDATE_KID_LOAN: (id: number) => `/kids/${id}/loan`, //PATCH

  //----------------------------SUBSCRIPTION PLANS
  GET_ALL_SUBSCRIPTION_PLANS: "/subscription-plans", //GET
  CREATE_SUBSCRIPTION_PLAN: "/subscription-plans", //POST
  DELETE_SUBSCRIPTION_PLAN: (id: number) => `/subscription-plans/${id}`, //DELETE
  UPDATE_SUBSCRIPTION_PLAN: (id: number) => `/subscription-plans/${id}`, //PATCH
};
