export function encodeQueryString(params: any) {
    const data = {...params};
    Object.keys(data).forEach((key) => data[key] === undefined && delete data[key]);
    const keys = Object.keys(data);
    return keys.length
      ? "?" + keys
        .map((key) => params[key] !== undefined ? encodeURIComponent(key)
          + "=" + encodeURIComponent(params[key]) : "")
        .join("&")
      : "";
  }
