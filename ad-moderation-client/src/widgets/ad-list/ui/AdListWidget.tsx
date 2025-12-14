import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { AdListPagination } from "../../../features/ad-list-pagination";
import {
  AdListFilters,
  useAdListQuery,
} from "../../../features/ad-list-filters";
import { getAdsList } from "../../../entities/ad";
import { Result } from "antd";
import { useQuery } from "@tanstack/react-query";
import { observer } from "mobx-react-lite";
import { paginationStore } from "../../../entities/ad-list";
import { AdList } from "./AdList";

export const AdListWidget = observer(function () {
  const { status, maxPrice, minPrice, categoryId, search, setParam } =
    useAdListQuery();

  const { isPending, error, data } = useQuery({
    queryKey: [
      "adsList", // todo: проверить, нужно ли это вообще
      paginationStore.currentPage,
      status,
      categoryId,
      maxPrice,
      minPrice,
      search,
    ],
    queryFn: () => {
      return getAdsList({
        page: paginationStore.currentPage,
        status,
        minPrice: minPrice === "" ? undefined : +minPrice,
        maxPrice: maxPrice === "" ? undefined : +maxPrice,
        search,
        categoryId: categoryId === "" ? undefined : +categoryId,
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
      <AdListFilters
        status={status}
        categoryId={categoryId}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setParam={setParam}
        search={search}
      />
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
