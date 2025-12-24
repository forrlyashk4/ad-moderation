import { useSearchParams } from "react-router";
import type { AdStatus, AdSorting } from "../../../entities/ad";

const ALL_STATUSES: AdStatus[] = ["approved", "pending", "rejected", "draft"];
const ALL_SORTINGS: AdSorting[] = ["createdAt", "price", "priority"] as const;

const parseStatus = (value: string | null): AdStatus[] => {
  if (!value) return [];
  return value
    .split(",")
    .filter((status): status is AdStatus =>
      ALL_STATUSES.includes(status as AdStatus)
    );
};

const isAdSorting = (value: string): value is AdSorting =>
  (ALL_SORTINGS as readonly string[]).includes(value);

const parseSortings = (value: string | null): AdSorting | "" => {
  if (!value) return "";
  return isAdSorting(value) ? value : "";
};

export const useAdListQuery = function () {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    status: parseStatus(searchParams.get("status")),
    category: searchParams.get("category") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    searchText: searchParams.get("searchText") ?? "",
    sortBy: parseSortings(searchParams.get("sortBy")),
  };

  const setParams = (next: Record<string, string | number | string[]>) => {
    const params = new URLSearchParams(searchParams);

    for (const [name, value] of Object.entries(next)) {
      const v = Array.isArray(value) ? value.join(",") : String(value);

      if (v === "") params.delete(name);
      else params.set(name, v);
    }

    setSearchParams(params);
  };

  return { filters, setParams };
};
