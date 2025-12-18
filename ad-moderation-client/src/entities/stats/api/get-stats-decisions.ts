import { apiClient } from "../../../shared";
import type { GETStatsRequest, GETStatsDecisionsResponse } from "./types";

const getStatsDecisions = async function (params?: GETStatsRequest) {
  return apiClient<GETStatsDecisionsResponse>("/stats/chart/decisions", {
    params,
  });
};

export { getStatsDecisions };
