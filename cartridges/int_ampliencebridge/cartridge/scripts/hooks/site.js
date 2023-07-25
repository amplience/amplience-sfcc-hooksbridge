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

  // Get all campaigns and promotions
  const CM = require('dw/campaign/PromotionMgr');
  let camps = [];
  let promotions = [];
  var cams = CM.getCampaigns().iterator();
  var proms = CM.getPromotions().iterator();

  while(cams.hasNext()){
      let cam = cams.next()

      // campaign customer groups
      var cgroups = cam.customerGroups.toArray()
      let grps = []

      for(var i = 0; i < cgroups.length; i++){
        grps.push(cgroups[i].ID)
      }

      // campaign promotions
      var camp_promos = cam.promotions.toArray()
      let cproms = []

      for(var i = 0; i < camp_promos.length; i++){
        cproms.push({
          active: camp_promos[i].active,
          basedOnCoupon: camp_promos[i].basedOnCoupon,
          basedOnCustomerGroups: camp_promos[i].basedOnCustomerGroups,
          basedOnSourceCodes: camp_promos[i].basedOnSourceCodes,
          calloutMsg: camp_promos[i].calloutMsg.source,
          conditionalDescription: camp_promos[i].conditionalDescription.source,
          creationDate: camp_promos[i].creationDate ? camp_promos[i].creationDate.toDateString() : '',
          details: camp_promos[i].details.source,
          description: camp_promos[i].description.source,
          enabled: camp_promos[i].enabled,
          endDate: camp_promos[i].endDate,
          exclusivity: camp_promos[i].exclusivity,
          ID: camp_promos[i].ID,
          image: camp_promos[i].image,
          lastModified: camp_promos[i].lastModified ? camp_promos[i].lastModified.toDateString() : '',
          name: camp_promos[i].name,
          promotionClass: camp_promos[i].promotionClass,
          qualifierMatchMode: camp_promos[i].qualifierMatchMode,
          rank: camp_promos[i].rank,
          refinable: camp_promos[i].refinable,
          startDate: camp_promos[i].startDate
        })
      }

      camps.push({
        active: cam.active,
        ID: cam.ID,
        applicableInStore: cam.applicableInStore,
        applicableOnline: cam.applicableOnline,
        endDate: cam.endDate ? cam.endDate.toDateString() : '',
        startDate: cam.startDate ? cam.startDate.toDateString() : '',
        customerGroups: grps,
        promotions: cproms,
        description: cam.description
      });
  }

  while(proms.hasNext()){
      let prom = proms.next()
      promotions.push({
        active: prom.active,
        basedOnCoupon: prom.basedOnCoupon,
        basedOnCustomerGroups: prom.basedOnCustomerGroups,
        basedOnSourceCodes: prom.basedOnSourceCodes,
        calloutMsg: prom.calloutMsg.source,
        conditionalDescription: prom.conditionalDescription.source,
        creationDate: prom.creationDate ? prom.creationDate.toDateString() : '',
        details: prom.details.source,
        description: prom.description.source,
        enabled: prom.enabled,
        endDate: prom.endDate ? prom.endDate.toDateString() : '',
        exclusivity: prom.exclusivity,
        ID: prom.ID,
        lastModified: prom.lastModified ? prom.lastModified.toDateString() : '',
        name: prom.name,
        promotionClass: prom.promotionClass,
        qualifierMatchMode: prom.qualifierMatchMode,
        rank: prom.rank,
        refinable: prom.refinable,
        startDate: prom.startDate ? prom.startDate.toDateString() : ''
      });
  }

  results.c_campaigns = camps;
  results.c_promotions = promotions;

  return new Status(Status.OK);
};
