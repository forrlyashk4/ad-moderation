import { Input } from "antd";

export default function PriceFilter() {
  return (
    <div>
      <Input style={{ width: 90 }} placeholder="От ₽" maxLength={6} />
      <Input
        style={{ width: 90, marginLeft: 12 }}
        placeholder="До ₽"
        maxLength={6}
      />
    </div>
  ); // todo: необходимо добавить валидацию введённых чисел
}
