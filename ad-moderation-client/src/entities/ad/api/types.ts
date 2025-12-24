import type { Pagination } from "../../../shared";
import type { Ad, AdStatus } from "../model";

type GETAdsListRequest = {
  page?: number;
  limit?: number;
  status?: AdStatus[];
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "createdAt" | "price" | "priority";
  sortOrder?: "asc" | "desc";
};

type GETAdItemRequest = {
  id: number;
};

type GETAdsListResponse = {
  ads?: Ad[];
  pagination?: Pagination;
};

type GETAdItemResponse = Ad;

type POSTAdActionRequest = {
  id: number;
  body?: {
    reason:
      | "Запрещенный товар"
      | "Неверная категория"
      | "Некорректное описание"
      | "Проблемы с фото"
      | "Подозрение на мошенничество"
      | "Другое";
    comment?: string;
  };
  action: "approve" | "reject" | "request-changes";
};

type POSTAdActionResponse = {
  message: string;
  ad: Ad;
};

export type {
  GETAdsListRequest,
  GETAdsListResponse,
  GETAdItemRequest,
  GETAdItemResponse,
  POSTAdActionRequest,
  POSTAdActionResponse,
};
