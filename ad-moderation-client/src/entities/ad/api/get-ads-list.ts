import { apiClient } from "../../../shared";
import type { GETAdsListRequest, GETAdsListResponse } from "./types";

const getAdsList = async function (params?: GETAdsListRequest) {
  return apiClient<GETAdsListResponse>("/ads", { params });
};

export { getAdsList };
