exports.modifyGETResponse = function (scriptFolder, results) {
  const Status = require("dw/system/Status");
  
  // Get Customer Groups
  const CustomerMgr = require("dw/customer/CustomerMgr");
  let customerGroups = [];

  var groups = CustomerMgr.customerGroups.iterator();

  while (groups.hasNext()) {
    var grp = groups.next();
    customerGroups.push(grp.ID);
  }

  results.c_customerGroups = customerGroups;

  // Get all active campaigns and promotions
  const CM = require('dw/campaign/PromotionMgr');
  let camps = [];
  let promotions = [];
  var cams = CM.getCampaigns().iterator();
  var proms = CM.getPromotions().iterator();

  while(cams.hasNext()){
      let cam = cams.next()
      if(cam.active === true) {camps.push(cam.ID)};
  }

  while(proms.hasNext()){
      let prom = proms.next()
      if(prom.active === true) {promotions.push(prom.ID)};
  }

  results.c_activeCampaignIds = camps;
  results.c_activePromoIds = promotions;

  return new Status(Status.OK);
};
