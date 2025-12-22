import { Pagination } from "antd";
import { paginationStore } from "../../../entities/ad-list-pagination";
import { observer } from "mobx-react-lite";
import styles from "./AdListPagination.module.css";

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
      showTotal={(total) => `Объявлений: ${total}`}
      showSizeChanger={false}
      className={styles.pagination}
    />
  );
});
