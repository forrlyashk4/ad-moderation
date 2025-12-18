import { apiClient } from "../../../shared";
import type { GETStatsRequest, GETStatsActivityResponse } from "./types";

const getStatsActivity = async function (params?: GETStatsRequest) {
  return apiClient<GETStatsActivityResponse>("/stats/chart/activity", {
    params,
  });
};

export { getStatsActivity };
