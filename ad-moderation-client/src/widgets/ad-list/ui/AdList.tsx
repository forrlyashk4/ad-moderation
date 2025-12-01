import {
  SmileOutlined,
  LoadingOutlined,
  ExclamationCircleFilled,
  FireOutlined,
  FireFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { AdListPagination } from "../../../features/ad-list-pagination";
import { useAdListQuery } from "../../../features/ad-list-query";
import { getAdsList, StatusTitles } from "../../../entities/ad";
import { Flex, Card, Result, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../../shared";
import { Link } from "react-router";

const { Title } = Typography;

export default function AdList() {
  const { page, setPage } = useAdListQuery();

  const { isPending, error, data } = useQuery({
    queryKey: ["adsList", page],
    queryFn: () => getAdsList({ page }),
  });

  if (isPending)
    return <Result icon={<LoadingOutlined spin />} title="Идёт загрузка" />;

  if (error)
    return (
      <Result
        icon={<ExclamationCircleFilled />}
        title={`Произошла ошибка: ${error.message}`}
      />
    );

  if (!data?.ads?.length)
    return (
      <Result
        icon={<SmileOutlined />}
        title="Объявлений к модерации не найдено!"
      />
    );

  return (
    <div>
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        style={{ marginBottom: "24px" }}
      >
        {data.ads.map((adItem) => {
          return (
            <Card
              style={
                adItem.priority === "urgent"
                  ? {
                      width: 300,
                      boxShadow: "0 2px 8px #7aa9eaff",
                      borderRadius: 8,
                      border: `1px solid #7aa9eaff`,
                    }
                  : { width: 300 }
              }
              cover={
                <img
                  alt={adItem.title}
                  src={adItem.images[0]}
                  style={
                    adItem.priority === "urgent"
                      ? {
                          border: "1px solid #7aa9eaff",
                          borderBottom: "none",
                          boxSizing: "border-box",
                        }
                      : { boxSizing: "border-box" }
                  }
                />
              }
              actions={[
                <CheckCircleOutlined />, // todo: add checking
                adItem.priority === "urgent" ? (
                  <FireFilled style={{ color: "#1677ff", cursor: "default" }} />
                ) : (
                  <FireOutlined style={{ cursor: "default" }} />
                ),
                <Link to={`/item/${adItem.id}`}>Открыть</Link>,
              ]}
            >
              <Title level={5} style={{ marginTop: 0 }}>
                {adItem.title}
              </Title>
              <p>
                {adItem.price} ₽
                <br />
                {adItem.category}
                <br />
                {formatDate(adItem.createdAt)}
                <br />
                {StatusTitles[adItem.status]}
              </p>
            </Card>
          );
        })}
      </Flex>
      {data.pagination && (
        <AdListPagination
          itemsPerPage={data.pagination.itemsPerPage}
          totalItems={data.pagination.totalItems}
          currentPage={page}
          handlePageChange={setPage}
        />
      )}
    </div>
  );
}
