
import { getAccessToken } from "../../utils/helpers/authHelper";
import { randomInt } from "../../utils/randomUtils";
import { encodeQueryString } from "../../utils/urlUtils";
import { accessDenied, API, apiEnd, apiError, apiStart } from "../actions/app/apiActions";
const config = require("config") as { apiUrl: string, apiMode: string };

const BASE_URL = config.apiUrl;
const ISMOCK = config.apiMode === "mock";
const apiMiddleware = ({ dispatch }: { dispatch: any }) => (next: any) => (action: any) => {
  next(action);

  if (action.type !== API) { return; }

  let accessTokenData: any;
  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers,
  } = action.payload;

  if (!accessToken) {
    accessTokenData = getAccessToken();
  } else {
    accessTokenData = { accessToken, accessTokenType: "Bearer" };
  }


  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";
  let murl = url;
  if (dataOrParams === "params") {
    murl = `${url}${encodeQueryString(data)}`;
  }
  if (label) {
    dispatch(apiStart(label));
  }
  let contentType = "application/json";
  let mdata = data;
  if (mdata instanceof File) {
    contentType = "multipart/form-data";
    const tdata = new FormData();
    tdata.append("file", data);
    mdata = tdata;
  }
  const headerObj: any = {
    "accept": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST , DELETE, PUT , PATCH",
    "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Origin ,Access-Control-Allow-Headers , Access-Control-Allow-Headers, Authorization, X-Requested-With",
    "accept-encoding": "gzip, deflate",
    "Authorization": `${accessTokenData.accessTokenType || ""} ${accessTokenData.accessToken || ""}`,
    // "Content-Type": "application/x-www-form-urlencoded",
  };
  if (!(data instanceof File)) {
    headerObj["Content-Type"] = contentType;
  }
  const isMocked = ISMOCK;
  const fetchApi = isMocked ? fetchMock : fetch;

  let reqOpts: any = {
    method: method || "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    headers: headers || headerObj,
    // redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client

  };
  if (dataOrParams === "data") {
    reqOpts = {
      ...reqOpts,
      body: data instanceof File ? mdata : JSON.stringify(mdata), // body data type must match "Content-Type" header}
    };
  }
  fetchApi(`${BASE_URL}${murl}`, reqOpts)
    .then((response) => Promise.all([response, response.json()]))
    .then(([response, json]) => { dispatch(onSuccess(json, response)); })
    .catch((error) => {
      dispatch(apiError(error));
      dispatch(onFailure(error));
      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(url));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

function fetchMock(url: string, options?: RequestInit): Promise<Response> {
  const p = new Promise<Response>((resolve, reject) => {
    setTimeout(() => {
      fetchMockProces(url, options)
        .then((d) => resolve(d))
        .catch((error) => reject(error));
    }, randomInt(500, 3000));
  });
  return p;
}

function fetchMockProces(url: string, options?: RequestInit): Promise<any> {
  const dataset = require("../../../mock/mock-data.json");
  if (url.toLowerCase().endsWith("/api/account/signin")) {
    const data = {
      accessToken: "fakeToken", tokenType: "Bearer", user: {
        firstname: "admin",
        lastname: "system", roles: ["sys_admin"],
      },
    };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/account/notification") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.notifications.length, data: dataset.notifications };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/account/mail") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.systemMails.length, data: dataset.systemMails };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/configuration/settings/transactions") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.transactions.length, data: dataset.transactions };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/apps/user") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.userApps.length, data: dataset.userApps };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/dashboard/profile") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.dashboardProfile.length, data: dataset.dashboardProfile };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/dashboard/navigation") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.navigation.length, data: dataset.navigation };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/dashboard/appbar") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.appbar.length, data: dataset.appbar };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/support/tickets") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.myTickets.length, data: dataset.myTickets };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/accounts") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.personalAccounts.length, data: dataset.personalAccounts };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/product/factor") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.factor.length, data: dataset.factor };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/product/list") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.productList.length, data: dataset.productList };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/operations/rm") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.rmOperations.length, data: dataset.rmOperations };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/system/mission") && options.method === "GET") {
    if (url.endsWith("filter") && options.method === "GET") {
      const data = { page: 1, limit: 10, total: dataset.systemMissionFilter.length, data: dataset.systemMissionFilter };
      const mockBody = JSON.stringify(data);
      const result = new Response(mockBody, { headers: [], status: 200 });
      return Promise.resolve(result);
    }
  }
  if (url.includes("/api/system/mission") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.systemMission.length, data: dataset.systemMission };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
 
  if (url.endsWith("/api/system/driver") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.systemDriver.length, data: dataset.systemDriver };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.endsWith("/api/system/driver/filter") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.systemDriverFilter.length, data: dataset.systemDriverFilter };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  } /// api/users/
  if (url.includes("/api/users/user") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.usersManagment.length, data: dataset.usersManagment };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/users/group") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.groupsManagment.length, data: dataset.groupsManagment };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/users/resource") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.resourcesManagment.length, data: dataset.resourcesManagment };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  /// api/report/
  if (url.includes("/api/report/abstract") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.reportAbstract.length, data: dataset.reportAbstract };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/report/daily") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.reportDaily.length, data: dataset.reportDaily };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/report/fuel") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.reportFuel.length, data: dataset.reportFuel };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/report/abstract") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.reportAbstract.length, data: dataset.reportAbstract };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/report/mission") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.reportMission.length, data: dataset.reportMission };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/report/traverse") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.reportTraverse.length, data: dataset.reportTraverse };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  if (url.includes("/api/report/zone") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.reportZone.length, data: dataset.reportZone };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  }
  //api/administration
  if (url.includes("/api/administration/users") && options.method === "GET") {
    const data = { page: 1, limit: 10, total: dataset.administrationUsers.length, data: dataset.administrationUsers };
    const mockBody = JSON.stringify(data);
    const result = new Response(mockBody, { headers: [], status: 200 });
    return Promise.resolve(result);
  } else {
    return Promise.reject(new Error("Mocked fetch process not implemented."));
  }
}

export default apiMiddleware;
