import { Pagination } from "antd";

export default function AdListPagination({
  totalItems,
  itemsPerPage,
  currentPage,
  handlePageChange,
}: {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  handlePageChange: (nextPage: number) => void;
}) {
  return (
    <Pagination
      align="center"
      current={currentPage}
      onChange={handlePageChange}
      pageSize={itemsPerPage}
      total={totalItems}
      showSizeChanger={false}
      style={{ marginBottom: "16px" }}
    />
  );
}
