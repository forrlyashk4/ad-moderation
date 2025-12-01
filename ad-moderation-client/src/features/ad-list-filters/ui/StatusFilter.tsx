import { Select } from "antd";

export default function StatusFilter() {
  return (
    <Select
      placeholder="Статус"
      mode="multiple"
      allowClear
      style={{ minWidth: 160, fontFamily: "var(--ant-font-family)" }}
      showSearch={{
        optionFilterProp: "label",
        filterSort: (optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase()),
      }}
      //   onChange={handleChange}
      options={[
        { value: "pending", label: "На рассмотрении" },
        { value: "approved", label: "Одобрено" },
        { value: "rejected", label: "Отклонено" },
        { value: "draft", label: "Черновик" },
      ]}
    />
  );
}
