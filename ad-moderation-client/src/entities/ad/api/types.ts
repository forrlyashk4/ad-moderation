import type { Pagination } from "../../../shared";
import type { Ad } from "../model";

type GETAdsListRequest = {
  page?: number;
  limit?: number;
  status?: "pending" | "approved" | "rejected" | "draft";
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "createdAt" | "price" | "priority";
  sortOrder?: "asc" | "desc";
};

type GETAdsListResponse = {
  ads?: Ad[];
  pagination?: Pagination;
};

export type { GETAdsListRequest, GETAdsListResponse };
