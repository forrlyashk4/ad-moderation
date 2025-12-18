import { apiClient } from "../../../shared";
import type { GETStatsRequest, GETStatsCategoriesResponse } from "./types";

const getStatsCategories = async function (params?: GETStatsRequest) {
  return apiClient<GETStatsCategoriesResponse>("/stats/chart/categories", {
    params,
  });
};

export { getStatsCategories };
