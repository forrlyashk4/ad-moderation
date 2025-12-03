import { useSearchParams } from "react-router";
import type { AdStatus } from "../../../entities/ad";

const parsePage = (value: string | null): number => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

const ALL_STATUSES: AdStatus[] = ["approved", "pending", "rejected", "draft"];

const parseStatus = (value: string | null): AdStatus[] => {
  if (!value) return [];
  return value
    .split(",")
    .filter((status): status is AdStatus =>
      ALL_STATUSES.includes(status as AdStatus)
    );
};

export function useAdListQuery() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parsePage(searchParams.get("page"));
  const status = parseStatus(searchParams.get("status"));
  const categoryID = searchParams.get("category") || "";
  const priceFrom = searchParams.get("priceFrom") || "";
  const priceTo = searchParams.get("priceTo") || "";
  const searchText = searchParams.get("searchText") || "";

  const setParam = (name: string, next: number | string | string[]) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, String(next));
    setSearchParams(params);
  };

  return {
    page,
    status,
    categoryID,
    priceFrom,
    priceTo,
    searchText,
    setParam,
  };
}
