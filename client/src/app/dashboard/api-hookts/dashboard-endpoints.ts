export const DASHBOARD_ENDPOINTS = {
  //---------------------------SUBSCRIPTIONS
  GET_ALL_SUBSCRIPTIONS: "/subscription", //GET
  CREATE_SUBSCRIPTION: "/subscription", //POST
  UPDATE_SUBSCRIPTION: `/subscription`, //PUT
  DELETE_SUBSCRIPTION: `/subscription/`, //DELETE
  //---------------------------EXPENSES
  GET_ALL_EXPENSES: "/expense", //GET
  CREATE_EXPENSE: "/expense", //POST
  UPDATE_EXPENSE: `/expense`, //PUT
  DELETE_EXPENSE: `/expense`, //DELETE
  //---------------------------NOTES
  GET_ALL_NOTES: "/note", //GET
  CREATE_NOTE: "/note", //POST
  UPDATE_NOTE: `/note`, //PUT
  DELETE_NOTE: `/note`, //DELETE
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

  //----------------------------SUBSCRIPTION PLANS
  GET_ALL_SUBSCRIPTION_PLANS: "/subscription-plans", //GET
  CREATE_SUBSCRIPTION_PLAN: "/subscription-plans", //POST
  DELETE_SUBSCRIPTION_PLAN: (id: number) => `/subscription-plans/${id}`, //DELETE
  UPDATE_SUBSCRIPTION_PLAN: (id: number) => `/subscription-plans/${id}`, //PATCH
};
