import { Select } from "antd";
import { sortBy } from "../model";
import { memo } from "react";

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
      style={{
        minWidth: 160,
        fontFamily: "var(--ant-font-family)",
      }}
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
    />
  );
});
