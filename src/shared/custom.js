import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import PropTypes from "prop-types";
import PopConfirm from "react-popconfirm";
import moment from "moment";
import config from "./config";
import $ from "jquery";
import jQuery from "jquery";
import store from "../store";

import ReactTimeAgo from "react-time-ago";
import JavascriptTimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
JavascriptTimeAgo.locale(en);

const jsonToQueryString = obj => {
  if (typeof obj == "String") {
    obj = JSON.parse(obj);
  }
  return $.param(obj);
};

const translateMessages = msgs => {
  let msgText = "";
  let msgTextArray = [];
  if (typeof msgs == "Array" || typeof msgs == "object") {
    msgs.forEach(msg => {
      msgTextArray.push(msg);
    });
    //remove redundancy
    msgTextArray = [...new Set(msgTextArray)];
    return (
      <div>
        {msgTextArray.map(msg => {
          return <div key={msg.split(" ").join("")}>{msg}</div>;
        })}
      </div>
    );
  } else {
    msgText += msgs;
    return msgText;
  }
};

const prettyNumber = (number, numConfig) => {
  if (!numConfig) {
    numConfig = {
      noComma: false,
      round: 0
    };
  }
  if (number == 0 || !number || number == "") {
    return "";
  }

  var number = parseFloat(number);
  if (numConfig.round > 0) {
    if (number % 1 == 0) {
      numConfig.round = 0;
    }
    number = number.toFixed(numConfig.round);
  }
  if (!numConfig.noComma) {
    var parts = number.toString().split(".");
    number =
      parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
      (parts[1] ? "." + parts[1] : "");
  }
  return number;
};

const Helpers = {
  isEmpty: value => {
    return (
      value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)
    );
  },
  pushMsg: (msg, postion) => {
    toast(msg, { postion: postion });
  },
  pushSuccess: (msg, postion) => {
    toast.success(msg, { postion: postion });
  },
  pushError: (msg, postion) => {
    toast.error(msg, { postion: postion });
  },
  pushWarn: (msg, postion) => {
    toast.warn(msg, { postion: postion });
  },
  pushInfo: (msg, postion) => {
    toast.info(msg, { postion: postion });
  },
  pushTMsg: (msg, postion) => {
    toast(<div>{translateMessages(msg)}</div>, { postion: postion });
  },
  pushTSuccess: (msg, postion) => {
    toast.success(translateMessages(msg), { postion: postion });
  },
  pushTError: (msg, postion) => {
    toast.error(translateMessages(msg), { postion: postion });
  },
  pushTWarn: (msg, postion) => {
    toast.warn(translateMessages(msg), { postion: postion });
  },
  pushTInfo: (msg, postion) => {
    toast.info(translateMessages(msg), { postion: postion });
  },

  handleError: data => {
    if (!data) {
      return;
    }
    if (data.message) {
      toast.error(translateMessages(data.message));
    } else {
      toast.error(translateMessages("GENERIC_ERROR"));
    }
  },

  apiURL: urlConfig => {
    var endpoint = urlConfig.uri || "";
    var pathVar = urlConfig.pathVar || {};
    var query = urlConfig.query || {};
    endpoint = endpoint.replace(/:(\w+)(\/|\b)/g, function(
      substring,
      match,
      nextMatch
    ) {
      return pathVar[match] + nextMatch;
    });
    if (!jQuery.isEmptyObject(query)) {
      var qString = jsonToQueryString(query);
      if (qString != "") {
        endpoint = endpoint + "?" + qString;
      }
    }
    if (endpoint.indexOf("http") == 0) {
      return endpoint;
    }
    return config.api(endpoint);
  },
  lastSegment: url => {
    url = url + "";
    if (url == "") {
      return null;
    }
    if (url.slice(-1) == "/") {
      url = url.slice(0, -1);
    }
    return url.substr(url.lastIndexOf("/") + 1);
  },
  lastURISegment: url => {
    url = url + "";
    if (url == "") {
      return null;
    }
    if (url.slice(-1) == "/") {
      url = url.slice(0, -1);
    }
    if (url.lastIndexOf("?") != -1)
      return url.substr(url.lastIndexOf("/"),url.lastIndexOf("?")-url.lastIndexOf("/"));
    else
      return url.substr(url.lastIndexOf("/"));
  },
  dataPath: url => {
    var pattern = /^((http|https|ftp):\/\/)/;
    if (!pattern.test(url)) {
      url = config.dataCdn + url;
    }
    return url;
  },
  assetPath: url => {
    return config.cdn + url;
  },
  sitePath: url => {
    return config.siteUrl + url;
  },
  properExternalUrl: url => {
    let newUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      newUrl = "http://" + url;
    }
    return newUrl;
  },
  domainOnly: url => {
    var sourceString = url.replace('http://','').replace('https://','').replace('www.','').split(/[/?#]/)[0];
    return sourceString;
  },
  readableString: string => {
    string = string+"";
    string = string.replace(/\\/g, '');

    return string;

  },
  viewFile: (uniqueId, extraParams) => {
    let token = "";
    let storeData = store.getState();
    if (storeData.auth && storeData.auth.isAuthenticated) {
      token = storeData.auth.token;
    }
    var url =
      config.gatewayPath +
      "ws/file/view?uniqueId=" +
      uniqueId +
      "&token=" +
      token;

    if (!jQuery.isEmptyObject(extraParams)) {
      var qString = jsonToQueryString(extraParams);
      if (qString != "") {
        url = url + "&" + qString;
      }
    }
    return url;
  },
  removeValue: (arr, value) => {
    var what,
      a = value,
      L = a.length,
      ax;

    what = a;
    while ((ax = arr.indexOf(what)) !== -1) {
      arr.splice(ax, 1);
    }

    return arr;
  },
  externalURL: link => {
    if (!link) {
      return null;
    }
    if ((link + "").substring(0, 4) != "http") {
      link = "http://" + link;
    }
    return link;
  },
  paramsEncoder:(params) => {
    return Object.keys(params).map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
    }).join('&');
  },
  jsonToQueryString: (json) => {
    return '?' + 
        Object.keys(json).map(function(key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
  },
  pageURL: (type, uri) => {
    type = (type + "").toLowerCase();
    switch (type) {
      case "company":
      case "startup":
        return "company/" + uri;
      case "people":
        return "people/" + uri;
      case "investor":
        return "investor/" + uri;
      case "opportunity":
        return "opportunity/" + uri;
    }
  },
  onlyNumbers: elem => {
    var that = elem;
    setTimeout(function() {
      that.value = that.value.replace(/\D/g, "");
    }, 100);

    if (isNaN(that.value)) {
      return false;
    } else {
      return true;
    }
  },
  isValidDate: date => {
    return date instanceof Date ? true : false;
  },
  // isValidEmail: email => {
  //   var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // },
  isValidEmail: emailsChain => {
    if (emailsChain && emailsChain.length === 0) return true;
    var emailsArr = emailsChain.split(",");
    var isValid = true;
    
    var ind = 0
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    while(ind <= emailsArr.length && isValid){
      var email  = emailsArr[ind];
      if (email){
         email = email.trim("");
         isValid = re.test(email);
      }
      ind++;
    }
    return isValid;
  },
  getDateInFormat: (date, dateFormat) => {
    dateFormat = dateFormat || config.displayDateFormat;
    return moment(date).format(dateFormat);
  },
  isValidYouTube: link => {
    var re = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
    return re.test(link);
  },
  isValidUrl: link => {
    //var re = /^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/;
    var basic = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})/
    let isValid = basic.test(link);
    if(!isValid){
      var extended = /^((ftp|http|https):\/\/)?www\.([A-z]+)\.([A-z]{2,})\/(.*)/
      extended.test(link);
    }
    return isValid;
  },
  isValidVimeo: link => {
    var re = /https:\/\/vimeo.com\/\d{9}(?=\b|\/)/;
    return re.test(link);
  },
  getDateInDisplayFormat: date => {
    let dateFormat = config.displayDateFormat;
    return moment(date).format(dateFormat);
  },
  getDateInInputFormat: (date, asDate, asFormat) => {
    let dateFormat = asFormat || config.inputDateFormat;
    return asDate
      ? moment(date, dateFormat).toDate()
      : moment(date).format(dateFormat);
  },
  
  getDateAndTimeInputFormat: date => {
    let dateFormat = config.inputDateTimeFormat;
    return moment(date).format(dateFormat);
  },
  getDateAndTimeInDisplayFormat: date => {
    let dateFormat = config.displayDateTimeFormat;
    return moment(date).format(dateFormat);
  },
  makeSelectOptions: optionList => {
    let options = [];
    if (optionList) {
      optionList.forEach(function(item) {
        options.push({ value: item.id, label: item.name });
      });
    }
    return options;
  },  
  makeCountriesSelectOptions: (optionList, field) => {
    let options = [];
    if (optionList) {
      optionList.forEach(function(item) {
        options.push({ value: item[field], label: item[field] });
      });
    }
    return options;
  },
  selectOptionsToTextArray: optionList => {
    let optionLabels = [];
    if (!optionList) return [];
    optionList.forEach(function(item) {
      optionLabels.push(item.label);
    });
    return optionLabels;
  },
  selectOptionsToTextArrayByName: optionList => {
    let optionLabels = [];
    optionList.forEach(function(item) {
      optionLabels.push(item.name);
    });
    return optionLabels;
  },
  makeSelectOption: option => {
    if (option) {
      option.value = option.id;
      if (option.name) {
        option.label = option.name;
      } else if (option.shortName) {
        option.label = option.shortName;
      }
    }
    return option;
  },
  valueLabelToIdName: option => {
    if (option) {
      option.id = option.value;
      option.name = option.label;
      delete option.value;
      delete option.label;
    }
    return option;
  },
  isValidFileType: (fileFormat, itemType) => {
    itemType = itemType || "ALL";
    itemType = (itemType + "").toUpperCase();
    let allowedTypes = {
      IMAGE: ["image/jpeg", "image/jpg", "image/png"],
      DOC: ["image/jpeg", "image/jpg", "image/png", "application/pdf"],
      ALL: ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
    };

    let allowedForThisType = allowedTypes[itemType]
      ? allowedTypes[itemType]
      : [];
    if (allowedForThisType.indexOf(fileFormat) > -1) {
      return true;
    } else {
      return false;
    }
  },
  getMessage: code => {
    let cleanCode = code.replace(/"/g, "");
    return "[" + code + "] Message not available for the issue!";
  },
  capitalizeString: word => {
    let wordLower = word.toLowerCase();
    if (wordLower.indexOf(" ") != -1) {
      // passed param contains 1 + words
      var wordLowerReplaced = wordLower.replace(/\s/g, "--");
      var result = $.camelCase("-" + wordLowerReplaced);
      return result.replace(/-/g, " ");
    } else {
      return $.camelCase("-" + wordLower);
    }
  },
  camelize: str => {
    var frags = str != null && str != "" ? str.toLowerCase().split("_") : [];
    //  if (frags.length > 0)
    for (var i = 0; i < frags.length; i++) {
      //if (i>0)
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join("");
  },
  triggerLogin: e => {
    e.preventDefault();
    var loginTrigger = document.getElementById("loginDropdown");
    loginTrigger.click();
  },
  redirectToHome: props => {
    props.history.push('/');
  },
  
  isUrl:(str)=>{
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      return !!pattern.test(str);
  },
  isVideoUrl:(url)=>{
    var videoLink = url;
    if (videoLink.indexOf("youtube.com") > -1) {
        return true;
    }else if (videoLink.indexOf("vimeo.com") > -1) {
      return true;
    } else if(videoLink.indexOf("youtu.be") > -1){
      return true;
    }
    else {
      return false;
    }
  },
  linkify:(inputText) =>{
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');
  

    return replacedText;
},
  getYoutubeId: url => {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "error";
    }
  },
  getEmbbedVideoLink: url => {
    var videoLink = url;
    if (videoLink.indexOf("youtube.com") > -1) {
      let youtubeId = Helpers.getYoutubeId(videoLink);
      videoLink = "https://www.youtube.com/embed/" + youtubeId;
    } else if (videoLink.indexOf("vimeo.com") > -1) {
      let vimeoId = Helpers.lastSegment(videoLink);
      videoLink = "https://player.vimeo.com/video/" + vimeoId;
    }else if(videoLink.indexOf("youtu.be") > -1){
      let youtubeId = Helpers.getYoutubeId(videoLink);
      videoLink = "https://www.youtube.com/embed/" + youtubeId;
    } else {
      videoLink = videoLink;
    }
    return videoLink;
  },
  grabFirstLink: article => {
    if (article.trim() == "") return null;
    var re = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    var result = re.exec(article);
    if (result) return result[0];
    return null;
  },
  calculateOffsetByPage: params => {
    return (params.page - 1) * params.length;
  },
  generatePaginationQS: params => {
    let offset = (params.page - 1) * params.length;
    let qs = {
      iDisplayStart: offset,
      iDisplayLength: params.length,
      iSortCol_0: 1,
      sSortDir_0: "desc"
    };
    let ep = params.extraParams != undefined ? params.extraParams : {};
    let combinedQS = Object.assign({}, ep, qs);
    return combinedQS;
  },
  randomPassword: () => {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    var possibleChar = "!@#$%^*";
    var possibleCharUP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possibleNum = "0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    for (var i = 0; i < 5; i++)
      text += possibleChar.charAt(
        Math.floor(Math.random() * possibleChar.length)
      );

    text += possibleCharUP.charAt(
      Math.floor(Math.random() * possibleCharUP.length)
    );
    text += possibleNum.charAt(Math.floor(Math.random() * possibleNum.length));
    return text;
  },
  getStartupType(types) {
    let startUpType = {
      id: null,
      description: config.startupDescription,
      image: config.startupIcon,
      name: config.startupString
    };

    types.forEach(typeItem => {
      if (typeItem.name == config.privateString) {
        startUpType.id = typeItem.id;
      }
    });
    return startUpType;
  },
  newLineToBrWithLink(str){
    str = str+"";
    str = str.replace("<br>", "");
    let output = str.split("\n").map((item, key) => {
      return (
        // <Fragment key={key}>
        //   {item}
        //   <br />
        // </Fragment>
        <p key={key}>{Helpers.linkify(item)}</p>
      );
    });
    return output;
  },
  newLineToBr(str) {
    str = str+"";
    str = str.replace("<br>", "");
    let output = str.split("\n").map((item, key) => {
      return (
        // <Fragment key={key}>
        //   {item}
        //   <br />
        // </Fragment>
        <p key={key}>{item}</p>
      );
    });
    return output;
  },
  extractHostname(url) {
    var hostname;
    //find & remove protocol (http, ftp, etc.) and get hostname

    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }

    //find & remove port number
    hostname = hostname.split(":")[0];
    //find & remove "?"
    hostname = hostname.split("?")[0];

    return hostname;
  },
  truncate(string, length) {
    if (!this.isEmpty(string)) {
      if (string.length > length) {
        return string.substring(0, length) + "...";
      } else {
        return string;
      }
    }
  },
  afterAuthRedirect(location) {
    let path = "/";
    if (location) {
      let lastPath =
        location.state && location.state.from
          ? location.state.from.pathname
          : "/";
      path = lastPath;
    }
    return <Redirect to={path} />;
  },
  getCommentTime(date) {
    const currentDate = moment();
    const prevDate = moment(date);
    const finalOutput = moment(prevDate.diff(currentDate)).format("HH:mm:ss");
  },
  proceedWithAOrAn(str) {
    //this function decides based on vowel or not is used as the first letter, it doesn't consider the exceptions as hour and unique.
    if  (str.trim() === "") return;
    let firstLetter = str.charAt(0).toUpperCase();
    var isVowel;
    isVowel = firstLetter == "A" || firstLetter == "E" || firstLetter == "I" || firstLetter == "O" || firstLetter == "U";
    return isVowel? "an "+str : "a "+str;
  },
  actionConfirm(e, action) {
    let target = e.currentTarget;
    PopConfirm({
      confirmation: action.message || "Are you sure?",
      okLabbel: action.okLabel || "Yes",
      cancelLabel: action.cancelLabel || "No",
      okStyle: action.okStyle || "danger",
      placement: action.placement || "top",
      element: e.target,
      confirmationColor: "#000"
    }).then(
      result => {
        if (action.proceed) {
          action.proceed(target, result);
        }
      },
      result => {
        if (action.cancel) {
          action.cancel(target, result);
        }
      }
    );
  },
  dismissActionConfirm() {
    if (document.getElementById("pop-confirm") !== undefined)
      document.getElementById("pop-confirm").style.display = "none";
  },
  getDateInAgoFormat(date,format) {
    let timeStyle = format? format : ""
    return <ReactTimeAgo date={new Date(date)} className="text-grey" timeStyle={timeStyle}/>;
  },
  getOppIcon(type) {
    let oppType = type.toLowerCase() || "partnership";
    let types = [
      {
        "partnership": "mdi-account-switch",
        "real estate": "mdi-city",
        "finance":"mdi-bank"
      }
    ];

    return "mdi-trending-up"; //types[0][oppType];
  },
  getActionName(action){
    let actions = {
      "REVENUE":"Revenue",
      "GROSS_PROFIT":"Gross Profit",
      "NET_INCOME":"Net Income",
      "FUNDING_STATUS" : "Funding Status",
      "NEW_INVESTMENT":"New Investment",
      "INVESTMENT_EXIT":"Exited Investment",
      "NEW_FUND":"Funding Round",
      "NEW_INVESTOR":"New Investor",
      "CEO":"CEO",
      "KEY_PERSON":"Key Person",
      "BOD":"Board of director",
      }
      return actions[action];
    
  },
  getMonthbyDate(date) {
    let dateFormat = new Date(date);
    let monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return monthNames[dateFormat.getMonth()];
  },
  yearOptions() {
    let currentYear = parseInt(new Date().getFullYear());
    let maxOptions = 100;
    let options = [];
    for(var i=0;i<maxOptions;i++){
      options.push({value:currentYear,label:currentYear});
      currentYear--;
    }
    return options;
  },
  booleanOptions() {    
    return [      
      {value:"any",label:"Any"},
      {value:"yes",label:"YES"},
      {value:"no",label:"NO"},
    ];
  },
  cleanObject(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  },
  getOnlyDate(date) {
    let dateFormat = new Date(date);//this.getDateInInputFormat(date, true);
    return dateFormat.getDate();
  },
  getDayFromDate(date) {
    let dateFormat = new Date(date);//this.getDateInInputFormat(date, true);
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    return weekday[dateFormat.getDay()];
  },
  getDefaultImage(type) {
    switch (type) {
      case "company":
        return config.defaultCompanyImage;

      case "event":
        return config.defaultEventIcon;

      case "opportunity":
        return config.defaultOpportunityIcon;

      case "people":
        return config.defaultUserImage;

      default:
        return config.defaultCompanyImage;
    }
  },
  cleanNumber(n) {
    return typeof n != "undefined" && n != null
      ? n.toString().replace(/[^0-9.-]/g, "")
      : "";
  },

  prettyNumber(number, numConfig) {
    if (!numConfig) {
      numConfig = {
        noComma: false,
        round: 0
      };
    }

    if(!number || isNaN(number)){
      return "";
    }
    if (number == 0) {
      return 0;
    }

    var number = parseFloat(number);
    if (numConfig.round > 0) {
      if (number % 1 == 0) {
        numConfig.round = 0;
      }
      number = number.toFixed(numConfig.round);
    }
    if (!numConfig.noComma) {
      var parts = number.toString().split(".");
      number =
        parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
        (parts[1] ? "." + parts[1] : "");
    }
    return number;
  },
  loadMoreDiv() {
    let loadImg = config.cdn + "theme/images/small-loader.gif";
    return (
      <div className="loader text-center" key={0}>
        <img src={loadImg} />
      </div>
    );
  },
  displayAmount(amountConfig) {
    if (!amountConfig.amount) {
      return 0;
    }

    let output = prettyNumber(amountConfig.amount);

    if (amountConfig.currency) {
      let currency = amountConfig.currency;
      let currencyName = currency.shortName || currency.name;

      output =
        amountConfig.currencyAfterAmount === true
          ? output + " " + currencyName
          : currencyName + " " + output;
    }
    return output;
  },
  typeOf(obj) {
    const { toString } = Object.prototype;
    const stringified = obj.toString();
    const type = stringified.split(" ")[1].slice(0, -1);
    return type.toLowerCase();
  },
  isStartupCompany(pageTypes) {
    return pageTypes &&
      pageTypes[0] &&
      pageTypes[0].subType &&
      pageTypes[0].subType.type && 
      pageTypes[0].subType.type == "STARTUP"?true:false;
  },
  isPublicCompany(companyType){
    return companyType && companyType.id == config.publicCompanyMetaId
  },
  getCompanyType(companyId,name){
    if(!Helpers.isEmpty(companyId)){
      let companyName = name.toLowerCase();
      if(companyId == config.privateCompanyMetaId && companyName == "startup"){
        return "startup"
      }else if(companyId == config.publicCompanyMetaId){
        return "public"
      }else if(companyId == config.privateCompanyMetaId){
        return "private"
      }
    }
  },
  getCardTheme(theme) {

    var defaultTheme = {
      headerClass: "light-blue-header",
      textClass: "text-white"
    };

    if (!theme) {
      return defaultTheme;
    }
    switch (theme) {
      case "white":
        defaultTheme = {
          headerClass: "",
          textClass: ""
        };
        break;
    }
    return defaultTheme;
  },
  getQueryParameter(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return null;
    return decodeURIComponent(results[2].replace(/\+/g, " "));
 },
 getOwnerShipOptionsByType(ownershipOptions, type){
   let ownershipOptionsNew = ownershipOptions;
   let companyType = Helpers.getCompanyType(type.id,type.name)
   let listOfOptions = config.ownershipTypes[companyType];
   return ownershipOptionsNew.filter(option=>{
       return (listOfOptions.indexOf(option.id) != -1)
    });
 },
 isAndroid: function() {
  return navigator.userAgent.match(/Android/i);
  },
  isBlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  isIOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  isOpera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  isWindows: function() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  isMobile: function() {
    return (!this.isEmpty(this.isAndroid() || this.isBlackBerry() || this.isIOS() || this.isOpera() || this.isWindows()));
  },
  getCleanText:(str)=>{
    return str.replace(/<(.|\n)*?>/g, '').replace("&amp;" ,"&").replace( "&quot;","'");
  }
 
};

/**********  Toaster Notification to push messeges ***********/

/****
 *
 * toast("Your Msg");
 * toast.success("Success Msg");
 * toast.error("Error Msg");
 * toast.warn("warning Msg");
 * toast.info("info Msg");
 * toast("with custo class",{className:class'});
 * toast.POSITION.TOP_LEFT, toast.POSITION.TOP_RIGHT, toast.POSITION.TOP_CENTER
 * toast.POSITION.BOTTOM_LEFT,toast.POSITION.BOTTOM_RIGHT, toast.POSITION.BOTTOM_CENTER
 *
 *********/

export default Helpers;
