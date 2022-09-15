exports.modifyGETResponse = function (customer, customerResponse) {
  const Status = require('dw/system/Status');
  const customerGroups = [];

  for (var i = 0; i < customer.customerGroups.length; i++) {
    let cg = customer.customerGroups[i];
    customerGroups.push(cg.ID)
  }

  customerResponse.c_customerGroups = customerGroups;
  return new Status(Status.OK);
};