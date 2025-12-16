import { Pagination } from "antd";
import { paginationStore } from "../../../entities/ad-list-pagination";
import { observer } from "mobx-react-lite";

export const AdListPagination = observer(function ({
  totalItems,
  itemsPerPage,
}: {
  totalItems: number;
  itemsPerPage: number;
}) {
  return (
    <Pagination
      align="center"
      current={paginationStore.currentPage}
      onChange={paginationStore.changePage}
      pageSize={itemsPerPage}
      total={totalItems}
      showSizeChanger={false}
      style={{ marginBottom: "16px" }}
    />
  );
});
