import { Input } from "antd";

export default function PriceFilter({
  minPrice,
  maxPrice,
  setParam,
}: {
  minPrice: string;
  maxPrice: string;
  setParam: (name: string, next: string | number | string[]) => void;
}) {
  const handleChangeMinPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setParam("minPrice", inputValue);
  };

  const handleChangeMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    setParam("maxPrice", inputValue);
  };

  return (
    <div>
      <Input
        style={{ width: 90 }}
        value={minPrice === "" ? undefined : minPrice}
        placeholder="От ₽"
        onChange={handleChangeMinPrice}
        maxLength={6}
      />
      <Input
        style={{ width: 90, marginLeft: 12 }}
        value={maxPrice === "" ? undefined : maxPrice}
        placeholder="До ₽"
        onChange={handleChangeMaxPrice}
        maxLength={6}
      />
    </div>
  ); // todo: необходимо добавить валидацию введённых чисел
}
