const scheme = process.env.REACT_APP_SCHEME; //"https://";
const appScheme = "http://";
const gatewayHost = process.env.REACT_APP_GATEWAY_HOST; 
const host = process.env.REACT_APP_HOST; 
const dataCdn = scheme + process.env.REACT_APP_DATA_CDN; 

const gatewayPath = scheme + gatewayHost + "/"; //end slash required
const siteUrl = appScheme + host + "/"; //end slash is required

module.exports = {

  gatewayPath: gatewayPath,
  api: url => {
    return gatewayPath + url;
  },
  siteUrl: siteUrl,
  host:host,
  cdn: appScheme + host + "/cdn/", // for app assets. end slash required
  dataCdn: dataCdn, // for image data and entity files, end slash is required
  summaryLimit: 255,
  captchaKey: "6LeiRokUAAAAADGYgfp0cWkqQ-bmWOziOXcKiWs4",
  defaultUser: { name: "-", email: null, image: "default/user.png" },

  defaultUserImage: "default/user.png",
  defaultCompanyImage: "default/company.png",
  defaultNewsIcon: "default/company.png",
  defaultCoverPhoto: "default/event-banner.png",
  defaultOpportunityIcon: "default/opportunity.png",
  defaultOpportunityCover: "default/opportunity-banner.png",
  // defaultNotifyIcon:"",
  defaultEventIcon: "default/event.png",
  defaultEventCover: "default/event-banner.png",
  defaultPrivateEventIcon: "default/event-private.png",
  defaultPublicEventIcon: "default/event-public.png",
  companyTypeIcon: { INVESTOR: "default/dollar_sign.svg" },
  displayDateFormat: "YYYY-DD-MM",
  inputDateFormat: "YYYY-DD-MM",
  inputDateTimeFormat: "YYYY-DD-MM HH:mm",
  displayDateTimeFormat: "YYYY-DD-MM [at] HH:mm",
  defaultWaitTime: 3000,
  defaultPageSize: 6,
  defaultLoadMoreSize: 2,
  defaultCarouselLength: 100,
  defaultGuestListingLength: 20,
  graphGeoScope:"GCC",
  defaultDescMaxLength: 150,
  pageStartLabel: "iDisplayStart", //to be replaced with the paginationQS
  pageLengthLabel: "iDisplayLength", //to be replaced with the paginationQSs
  paginationQS: params => {
    let offset = (params.page - 1) * params.length;
    return {
      iDisplayStart: offset,
      iDisplayLength: params.length,
      iSortCol_0: 1,
      sSortDir_0: "desc"
    };
  },
  pageRangeDisplayed: 5,
  thumbnailFetchingEndpoint: "https://api.linkpreview.net",
  thumbnailFetchingKey: "5c6579fee6cf2fae504c7f3bdce5b17da7664b3efeded",
  linkedInClientId: "78fqhwb7pow56a",
  linkedInClientSecret: "c5EAtGVjM1Saxi9B",
  linkedInRedirect: siteUrl + "linkedin",
  
  startupDescription: "A young company that is just beginning to develop.",
  startupIcon: "default/company-startup.png",
  startupString: "Startup",
  privateString: "Private Company",
  companyPageTypeId: 1,
  publicCompanyMetaId: 15,
  startupPageSubTypeId: 5,
  privateCompanyMetaId: 14,
  ownershipTypes:{
    private:[1,2,4,5,10835,127,158,437],
    public: [10835,2,3],
    startup:[158,127,437]
  },
  facebookAppId: "529686990849411",

  sessionTimeOut: 3540,
  sesstionCheck: 1200,
  companyTypes :  [
    { 
      name :"Public",
      type:"public",
      id:15,
    },
    {
      name :"Private",
      type:"private",
      id:14,
    },
    {
      name :"Startup",
      type:"startup",
      id:14,
   }
  ]

}
