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
  handlePageChange: (name: string, next: number | string | string[]) => void;
}) {
  return (
    <Pagination
      align="center"
      current={currentPage}
      onChange={(page) => handlePageChange("page", page)}
      pageSize={itemsPerPage}
      total={totalItems}
      showSizeChanger={false}
      style={{ marginBottom: "16px" }}
    />
  );
}
