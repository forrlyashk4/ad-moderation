import { useSearchParams } from "react-router";
import type { AdStatus } from "../../../entities/ad";

const categories = [
  "Электроника",
  "Недвижимость",
  "Транспорт",
  "Работа",
  "Услуги",
  "Животные",
  "Мода",
  "Детское",
];

// todo: прописать валидацию инпутов стоимостей
// todo: разбить на несколько файлов по логике

const ALL_STATUSES: AdStatus[] = ["approved", "pending", "rejected", "draft"];

const parseStatus = (value: string | null): AdStatus[] => {
  if (!value) return [];
  return value
    .split(",")
    .filter((status): status is AdStatus =>
      ALL_STATUSES.includes(status as AdStatus)
    );
};

const useAdListQuery = function () {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = {
    status: parseStatus(searchParams.get("status")),
    category: searchParams.get("category") ?? "",
    minPrice: searchParams.get("minPrice") ?? "",
    maxPrice: searchParams.get("maxPrice") ?? "",
    searchText: searchParams.get("searchText") ?? "",
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

export { categories, useAdListQuery };
