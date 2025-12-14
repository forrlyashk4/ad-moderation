import { Select } from "antd";
import { memo } from "react";

export const StatusFilter = memo(function StatusFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextStatus: string) => void;
}) {
  return (
    <Select
      placeholder="Статус"
      mode="multiple"
      value={value === "" ? null : value}
      allowClear
      style={{ minWidth: 160, fontFamily: "var(--ant-font-family)" }}
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
    />
  );
});
