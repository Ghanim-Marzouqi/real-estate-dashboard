import http from '.';
import {
  SYNC_DATA,
  LOAD_DATA
} from "../config/ApiEndpoints";

const syncData = async () => {
  try {
    const response = await http.get(`${SYNC_DATA}`);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

const cancelSyncData = () => {
  const CancelToken = http.CancelToken;
  const source = CancelToken.source();

  try {
    http.get(`${SYNC_DATA}`, {
      cancelToken: source.token
    });
  } catch (thrown) {
    if (http.isCancel(thrown)) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}

const loadData = async (payload) => {
  try {
    const response = await http.post(`${LOAD_DATA}`, payload);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return null;
  }
}

export { syncData, cancelSyncData, loadData }