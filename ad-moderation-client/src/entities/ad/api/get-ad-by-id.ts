import { apiClient } from "../../../shared";
import type { GETAdItemRequest, GETAdItemResponse } from "./types";

const getAdByID = async function (params: GETAdItemRequest) {
  return apiClient<GETAdItemResponse>(`/ads/${params.id}`);
};

export { getAdByID };
