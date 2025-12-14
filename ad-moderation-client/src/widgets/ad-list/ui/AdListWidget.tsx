import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { AdListPagination } from "../../../features/ad-list-pagination";
import { useAdListQuery } from "../../../features/ad-list-filters";
import { getAdsList } from "../../../entities/ad";
import { Result } from "antd";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { paginationStore } from "../../../entities/ad-list";
import { AdList } from "./AdList";

export const AdListWidget = observer(function () {
  const { filters } = useAdListQuery();

  const { isPending, error, data } = useQuery({
    queryKey: [
      "adList", // todo: проверить, нужно ли это вообще
      paginationStore.currentPage,
      filters.status,
      filters.category,
      filters.maxPrice,
      filters.minPrice,
      filters.searchText,
    ],
    queryFn: () => {
      return getAdsList({
        page: paginationStore.currentPage,
        status: filters.status,
        minPrice: filters.minPrice === "" ? undefined : +filters.minPrice,
        maxPrice: filters.maxPrice === "" ? undefined : +filters.maxPrice,
        search: filters.searchText,
        categoryId: filters.category === "" ? undefined : +filters.category,
      });
    },
  });

  if (error)
    return (
      <Result
        icon={<ExclamationCircleFilled />}
        title={`Произошла ошибка: ${error.message}`}
      />
    );

  return (
    <div>
      {isPending ? (
        <Result icon={<LoadingOutlined spin />} title="Идёт загрузка" />
      ) : (
        <AdList data={data} />
      )}
      {data?.pagination && (
        <AdListPagination
          itemsPerPage={data.pagination.itemsPerPage}
          totalItems={data.pagination.totalItems}
        />
      )}
    </div>
  );
});
