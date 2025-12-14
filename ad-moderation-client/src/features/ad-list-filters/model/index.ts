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

  const status = parseStatus(searchParams.get("status"));
  const categoryId = searchParams.get("categoryId") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const search = searchParams.get("search") || "";

  const setParam = (name: string, next: number | string | string[]) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, String(next));
    setSearchParams(params);
  };

  return {
    status,
    categoryId,
    maxPrice,
    minPrice,
    search,
    setParam,
  };
};

export { categories, useAdListQuery };
