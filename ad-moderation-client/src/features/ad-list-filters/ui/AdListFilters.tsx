import { CategoryFilter } from "./CategoryFilter";
import { StatusFilter } from "./StatusFilter";
import { SearchFilter } from "./SearchInput";
import { PriceFilter } from "./PriceFilter";
import { Flex, Button, Typography } from "antd";
import { useState, useCallback } from "react";
import { useAdListQuery } from "../model";

const { Text } = Typography;

type Filters = {
  status: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  searchText: string;
};

const initialFilters: Filters = {
  status: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  searchText: "",
};

export default function AdListFilters() {
  const { filters: queryFilters, setParams } = useAdListQuery();
  const [currentFilters, setCurrentFilters] = useState<Filters>(() => ({
    // todo: а нужен ли теперь вообще useState, если мы храним всё в URL?
    status: queryFilters.status.join(","),
    category: queryFilters.category,
    minPrice: queryFilters.minPrice,
    maxPrice: queryFilters.maxPrice,
    searchText: queryFilters.searchText,
  }));

  const setFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      setCurrentFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const setStatus = useCallback(
    (v: Filters["status"]) => setFilter("status", v),
    [setFilter]
  );

  const setCategory = useCallback(
    (v: Filters["category"]) => setFilter("category", v),
    [setFilter]
  );

  const setMinPrice = useCallback(
    (v: Filters["minPrice"]) => setFilter("minPrice", v),
    [setFilter]
  );

  const setMaxPrice = useCallback(
    (v: Filters["maxPrice"]) => setFilter("maxPrice", v),
    [setFilter]
  );

  const setSearch = useCallback(
    (v: Filters["searchText"]) => setFilter("searchText", v),
    [setFilter]
  );

  const onSearch = useCallback(() => {
    setParams(currentFilters);
    console.log(currentFilters);
  }, [currentFilters, setParams]);

  const resetFilters = useCallback(() => {
    setCurrentFilters(initialFilters);
    setParams(initialFilters);
  }, [setParams]);

  return (
    <Flex
      justify="center"
      align="center"
      gap={12}
      style={{ margin: "24px 0 24px" }}
    >
      <Text strong>Фильтры: </Text>
      <StatusFilter value={currentFilters.status} onChange={setStatus} />
      <CategoryFilter value={currentFilters.category} onChange={setCategory} />
      <PriceFilter
        minPrice={currentFilters.minPrice}
        maxPrice={currentFilters.maxPrice}
        onChangeMin={setMinPrice}
        onChangeMax={setMaxPrice}
      />
      <SearchFilter value={currentFilters.searchText} onChange={setSearch} />
      <Button
        color="blue"
        variant="outlined"
        size="middle"
        style={{ lineHeight: 1 }}
        onClick={onSearch}
      >
        Поиск
      </Button>
      <Button
        color="danger"
        variant="text"
        size="middle"
        style={{ lineHeight: 1 }}
        onClick={resetFilters}
      >
        Сбросить
      </Button>
    </Flex>
  );
}
