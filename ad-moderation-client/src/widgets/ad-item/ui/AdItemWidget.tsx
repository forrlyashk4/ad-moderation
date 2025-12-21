import { getAdByID } from "../../../entities/ad/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AdItemComponent from "./AdItemComponent";
import { Result } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { postAdAction } from "../../../entities/ad/api";
import type {
  POSTAdActionRequest,
  POSTAdActionResponse,
} from "../../../entities/ad/api";

export default function AdItemWidget({ id }: { id: string | undefined }) {
  const { isPending, error, data } = useQuery({
    queryKey: ["adItem", id],
    queryFn: () => {
      return getAdByID({
        id: Number(id),
      });
    },
  });

  const queryClient = useQueryClient();
  const action = useMutation<POSTAdActionResponse, Error, POSTAdActionRequest>({
    mutationFn: ({ id, action, body }) => postAdAction({ id, action, body }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["adItem"] }),
  });

  if (error)
    return (
      <Result
        icon={<ExclamationCircleFilled />}
        title={`Произошла ошибка: ${error.message}`}
      />
    );

  if (isPending)
    return <Result icon={<LoadingOutlined spin />} title="Идёт загрузка" />;

  return <AdItemComponent item={data} mutateFn={action.mutate} />;
}
