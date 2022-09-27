exports.modifyGETResponse = function (scriptFolder, results) {
  const Status = require("dw/system/Status");
  const CustomerMgr = require("dw/customer/CustomerMgr");
  let customerGroups = [];

  var groups = CustomerMgr.customerGroups.iterator();

  while (groups.hasNext()) {
    var grp = groups.next();
    customerGroups.push(grp.ID);
  }

  results.c_customerGroups = customerGroups;

  return new Status(Status.OK);
};
