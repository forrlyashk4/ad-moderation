import { Select } from "antd";
import { categories } from "../model";
import { memo } from "react";

import styles from "./AdListFilters.module.css";

export const CategoryFilter = memo(function CategoryFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextStatus: string) => void;
}) {
  return (
    <Select
      placeholder="Категория"
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
      options={categories.map((label, index) => {
        return { value: index, label };
      })}
    />
  );
});
