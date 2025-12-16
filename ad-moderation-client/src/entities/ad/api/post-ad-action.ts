import { apiClient } from "../../../shared";
import type { POSTAdActionRequest, POSTAdActionResponse } from "./types";

const postAdAction = async function (params: POSTAdActionRequest) {
  return apiClient<POSTAdActionResponse>(`/ads/${params.id}/${params.action}`, {
    method: "POST",
    json: params.body,
  });
};

export { postAdAction };
