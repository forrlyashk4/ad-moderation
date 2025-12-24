import { Select } from "antd";
import { memo } from "react";

import styles from "./AdListFilters.module.css";

export const StatusFilter = memo(function StatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextStatus: string) => void;
}) {
  const currentValue = Array.isArray(value) ? value : value.split(",");
  return (
    <Select
      placeholder="Статус"
      mode="multiple"
      value={currentValue[0] === "" ? null : currentValue}
      allowClear
      className={styles.select}
      showSearch={{
        optionFilterProp: "label",
        filterSort: (optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase()),
      }}
      onChange={onChange}
      options={[
        { value: "pending", label: "На рассмотрении" },
        { value: "approved", label: "Одобрено" },
        { value: "rejected", label: "Отклонено" },
        { value: "draft", label: "Черновик" },
      ]}
      notFoundContent={<p className={styles.notFound}>Ничего не найдено</p>}
    />
  );
});
