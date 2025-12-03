import { Input } from "antd";

export default function SearchFilter({
  search,
  setParam,
}: {
  search: string;
  setParam: (name: string, next: string | number | string[]) => void;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setParam("search", inputValue);
  };

  return (
    <Input
      style={{ width: 240 }}
      value={search === "" ? undefined : search}
      onChange={handleChange}
      placeholder="Поиск по названию"
    />
  );
}
