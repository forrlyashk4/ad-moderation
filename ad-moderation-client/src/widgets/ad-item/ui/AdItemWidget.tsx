import { getAdByID } from "../../../entities/ad/api/get-ad-by-id";
import { useQuery } from "@tanstack/react-query";
import AdItemComponent from "./AdItemComponent";
import { Result } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";

export default function AdItemWidget({ id }: { id: string | undefined }) {
  const { isPending, error, data } = useQuery({
    queryKey: [
      "adItem", // todo: проверить, нужно ли это вообще
      id,
    ],
    queryFn: () => {
      return getAdByID({
        id: Number(id),
      });
    },
  });

  return (
    <>
      {data && <AdItemComponent item={data} />}
      {error && (
        <Result
          icon={<ExclamationCircleFilled />}
          title={`Произошла ошибка: ${error.message}`}
        />
      )}
      {isPending && (
        <Result icon={<LoadingOutlined spin />} title="Идёт загрузка" />
      )}
    </>
  );
}
