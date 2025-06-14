export enum EventBusType {
  TEST = 'test',
  CREATE_ORDER_SUCCESS = 'CREATE_ORDER_SUCCESS',
  FIND_CLOSET_SHOE_MAKERS = 'FIND_CLOSET_SHOE_MAKERS',
  UPDATE_STATUS_ORDER = 'UPDATE_STATUS_ORDER',
  CANCEL_ORDER_SUCCESS = 'CANCEL_ORDER_SUCCESS',
  FINISHED_ORDER = 'FINISHED_ORDER',
  HAVE_PERMISSION_LOCATION = 'HAVE_PERMISSION_LOCATION',
  BACK_TO_HOME = 'BACK_TO_HOME',
  CANCEL_FIND_SHOEMAKER = 'cancel-find-shoemaker',
  // ... add more event types as needed

  //Package Service

  CREATE_PACKAGE_SERVICE = 'CREATE_PACKAGE_SERVICE',
  CANCEL_PACKAGE_SERVICE = 'CANCEL_PACKAGE_SERVICE',
  UPDATE_PACKAGE_SERVICE = 'UPDATE_PACKAGE_SERVICE',
  GET_PACKAGE_SERVICE = 'GET_PACKAGE_SERVICE',
  GET_PACKAGE_SERVICE_SUCCESS = 'GET_PACKAGE_SERVICE_SUCCESS',
  GET_PACKAGE_SERVICE_FAIL = 'GET_PACKAGE_SERVICE_FAIL',
}

export enum TypeBonusProductEnum {
  TRANSFER_WALLET = 'TRANSFER_WALLET',
  TRANSFER_CODE = 'TRANSFER_CODE',
}
