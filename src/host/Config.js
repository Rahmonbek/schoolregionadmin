import { httpRequest, url } from "./Host";
import GLOBAL from "./Global";

export const getNews = () => {
  var config = {
    url: `${url}/new`,
    method: "get",
  };
  return httpRequest(config);
};

export const getAchievment = () => {
  var config = {
    url: `${url}/achiviment/`,
    method: "get",
  };
  return httpRequest(config);
};
export const getNew = () => {
  var config = {
    url: `${url}/new/${GLOBAL.id}`,
    method: "get",
  };
  return httpRequest(config);
};
export const getPupil = () => {
  var config = {
    url: `${url}/pupil/`,
    method: "get",
  };
  return httpRequest(config);
};
export const getClass = () => {
  var config = {
    url: `${url}/class/`,
    method: "get",
  };
  return httpRequest(config);
};
export const getExcellent = () => {
  var config = {
    url: `${url}/excellent/`,
    method: "get",
  };
  return httpRequest(config);
};
export const getEvents = () => {
  var config = {
    url: `${url}/event`,
    method: "get",
  };
  return httpRequest(config);
};

export const getEvent = () => {
  var config = {
    url: `${url}/event/${GLOBAL.id}`,
    method: "get",
  };
  return httpRequest(config);
};

export const getSchools = () => {
  var config = {
    url: `${url}/school/${GLOBAL.region}`,
    method: "get",
  };
  return httpRequest(config);
};

export const getStaffs = () => {
  var config = {
    url: `${url}/staff`,
    method: "get",
  };
  return httpRequest(config);
};

export const getStaff = () => {
  var config = {
    url: `${url}/staff`,
    method: "get",
  };
  return httpRequest(config);
};

export const getRegion = () => {
  var config = {
    url: `${url}/region`,
    method: "get",
  };
  return httpRequest(config);
};
