import { Select } from "antd";

export default function StatusFilter({
  status,
  setParam,
}: {
  status: string[];
  setParam: (name: string, next: string | number | string[]) => void;
}) {
  const handleChange = (value: string[]) => {
    setParam("status", value);
  };

  return (
    <Select
      placeholder="Статус"
      mode="multiple"
      value={status}
      allowClear
      style={{ minWidth: 160, fontFamily: "var(--ant-font-family)" }}
      showSearch={{
        optionFilterProp: "label",
        filterSort: (optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase()),
      }}
      onChange={handleChange}
      options={[
        { value: "pending", label: "На рассмотрении" },
        { value: "approved", label: "Одобрено" },
        { value: "rejected", label: "Отклонено" },
        { value: "draft", label: "Черновик" },
      ]}
    />
  );
}
