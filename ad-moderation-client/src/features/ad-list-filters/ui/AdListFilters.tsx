import CategoryFilter from "./CategoryFilter";
import StatusFilter from "./StatusFilter";
import SearchFilter from "./SearchInput";
import PriceFilter from "./PriceFilter";
import { Flex, Button, Typography } from "antd";

const { Text } = Typography;

export default function AdListFilters() {
  return (
    <Flex
      justify="center"
      align="center"
      gap={12}
      style={{ margin: "24px 0 24px" }}
    >
      <Text strong>Фильтры: </Text>
      <StatusFilter />
      <CategoryFilter />
      <PriceFilter />
      <SearchFilter />
      <Button color="danger" variant="text" size="small">
        Сбросить
      </Button>
    </Flex>
  );
}
