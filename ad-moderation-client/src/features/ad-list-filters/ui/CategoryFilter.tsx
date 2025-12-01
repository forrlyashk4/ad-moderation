import { Select } from "antd";
import { categories } from "../model";

export default function StatusFilter() {
  return (
    <Select
      placeholder="Категория"
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
      //   onChange={handleChange}
      options={categories.map((label, index) => {
        return { value: index, label };
      })}
    />
  );
}
