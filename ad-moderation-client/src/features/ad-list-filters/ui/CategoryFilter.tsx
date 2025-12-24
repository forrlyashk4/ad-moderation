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
  let currentValue: string = "";
  if (!Number.isNaN(Number(value)) && value !== "") {
    currentValue = categories[Number(value)];
  } else {
    currentValue = value;
  }
  return (
    <Select
      placeholder="Категория"
      value={currentValue.length === 0 ? null : currentValue}
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
      notFoundContent={<p className={styles.notFound}>Ничего не найдено</p>}
    />
  );
});
