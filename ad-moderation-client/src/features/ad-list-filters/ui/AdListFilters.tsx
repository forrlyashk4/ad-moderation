import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import SearchFilter from "./SearchInput";
import PriceFilter from "./PriceFilter";
import { Flex, Button, Typography } from "antd";

const { Text } = Typography;

export default function AdListFilters({
  status,
  categoryId,
  minPrice,
  maxPrice,
  setParam,
  search,
}: {
  status: string[];
  categoryId: string;
  minPrice: string;
  maxPrice: string;
  search: string;
  setParam: (name: string, next: string | number | string[]) => void;
}) {
  return (
    <Flex
      justify="center"
      align="center"
      gap={12}
      style={{ margin: "24px 0 24px" }}
    >
      <Text strong>Фильтры: </Text>
      <StatusFilter status={status} setParam={setParam} />
      <CategoryFilter categoryId={categoryId} setParam={setParam} />
      <PriceFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        setParam={setParam}
      />
      <SearchFilter search={search} setParam={setParam} />
      <Button color="danger" variant="text" size="small">
        Сбросить
      </Button>
    </Flex>
  );
}
