import { apiClient } from "../../../shared";
import type { GETStatsRequest, GETStatsSummaryResponse } from "./types";

const getStatsSummary = async function (params?: GETStatsRequest) {
  return apiClient<GETStatsSummaryResponse>("/stats/summary", { params });
};

export { getStatsSummary };
