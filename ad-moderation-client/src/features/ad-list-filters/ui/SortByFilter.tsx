import { Select } from "antd";
import { sortBy } from "../model";
import { memo } from "react";

import styles from "./AdListFilters.module.css";

export const SortByFilter = memo(function SortByFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextStatus: string) => void;
}) {
  return (
    <Select
      placeholder="Сортировать"
      value={value === "" ? null : value}
      allowClear
      className={styles.select}
      showSearch={{
        optionFilterProp: "label",
        filterSort: (optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase()),
      }}
      onChange={(next: string) =>
        next != undefined ? onChange(next) : onChange("")
      }
      options={sortBy}
      notFoundContent={<p className={styles.notFound}>Ничего не найдено</p>}
    />
  );
});
