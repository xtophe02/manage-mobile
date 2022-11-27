import axios from "axios";

import {
  BACKEND_URL,
  createManageHeaders,
  MANAGE_API_URL,
} from "../constants/constants";

export async function storeExpense(expenseData, token) {
  const data = new FormData();
  data.append("effective_date", expenseData.effectiveDate);
  data.append("file", {
    uri: expenseData.file.uri,
    type: expenseData.file.type,
    name: expenseData.file.name,
  });
  data.append("description", expenseData.description);
  data.append("amount", expenseData.total);
  data.append("type_id", expenseData.expenseType);

  const response = await axios
    .post(`${MANAGE_API_URL}/v1/expenses/type-other`, data, {
      headers: createManageHeaders(token, "multipart/form-data"),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return response.data;
}
export async function storeMileage(expenseData, token) {
  const data = new FormData();
  console.log("HTTP_MILEAGE", expenseData);
  data.append("effective_date", expenseData.effectiveDate);
  data.append("file", {
    uri: expenseData.file.uri,
    type: expenseData.file.type,
    name: expenseData.file.name,
  });
  data.append("amount", expenseData.amount);

  const response = await axios
    .post(`${MANAGE_API_URL}/v1/expenses/type-mileage`, data, {
      headers: createManageHeaders(token, "multipart/form-data"),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        throw error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  return response.data;
}

export async function fetchExpenses(token, year, month) {
  const response = await axios
    .get(`${MANAGE_API_URL}/v1/expenses?year=${year}&month=${month}`, {
      headers: createManageHeaders(token),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  return response.data;
}

export async function updateHttpMileage(id, expenseData, token) {
  // console.log(expenseData);
  const data = new FormData();
  data.append("effective_date", expenseData.effectiveDate);
  // console.log(expenseData);
  if (expenseData.file?.uri.split(":")[0] === "file") {
    data.append("file", {
      uri: expenseData.file.uri,
      type: expenseData.file.type,
      name: expenseData.file.name,
    });
  }
  // data.append("description", expenseData.description);
  data.append("amount", expenseData.amount);
  // data.append("type_id", expenseData.expenseType);

  const response = await axios
    .patch(`${MANAGE_API_URL}/v1/expenses/${id}/type-mileage`, data, {
      headers: createManageHeaders(token, "multipart/form-data"),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return response.data;
}
export async function updateHttpExpense(id, expenseData, token) {
  // console.log("OTHER_TYPE:", expenseData);
  const data = new FormData();
  data.append("effective_date", expenseData.effectiveDate);
  if (expenseData.file?.uri.split(":")[0] === "file") {
    data.append("file", {
      uri: expenseData.file.uri,
      type: expenseData.file.type,
      name: expenseData.file.name,
    });
  }

  data.append("description", expenseData.description);
  data.append("amount", expenseData.total);
  data.append("type_id", expenseData.expenseType);
  data.append("unit_price", 1);

  const response = await axios
    .patch(`${MANAGE_API_URL}/v1/expenses/${id}/type-other`, data, {
      headers: createManageHeaders(token, "multipart/form-data"),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
  return response.data;
}
export async function deleteHttpExpense(uuid, token) {
  return axios
    .delete(`${MANAGE_API_URL}/v1/expenses/${uuid}`, {
      headers: createManageHeaders(token),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });
}

export async function getSpecialTypes(token) {
  const response = await axios.get(
    "https://api.dev.hellomanage.app/v1/expenses/types?special_type",
    {
      headers: createHeaders(token),
    }
  );

  return response.data;
}

export async function fecthAboutMe(token) {
  const response = await axios
    .get(`${MANAGE_API_URL}/v1/workers/me/info`, {
      headers: createManageHeaders(token),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  return response.data;
}
export async function fetchSpecialTypes(token) {
  const response = await axios
    .get(`${MANAGE_API_URL}/v1/expenses/types?special_type`, {
      headers: createManageHeaders(token),
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

  return response.data;
}
