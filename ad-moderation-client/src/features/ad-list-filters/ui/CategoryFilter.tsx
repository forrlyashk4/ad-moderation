import { Select } from "antd";
import { categories } from "../model";

export default function StatusFilter({
  categoryId,
  setParam,
}: {
  categoryId: string;
  setParam: (name: string, next: string | number | string[]) => void;
}) {
  const handleChange = (value: number) => {
    setParam("categoryId", value === 0 ? "0" : String(value || ""));
  };

  return (
    <Select
      placeholder="Категория"
      value={categoryId === "" ? undefined : Number(categoryId)}
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
      onChange={handleChange}
      options={categories.map((label, index) => {
        return { value: index, label };
      })}
    />
  );
}
