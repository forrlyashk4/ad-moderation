import {
  SmileOutlined,
  LoadingOutlined,
  ExclamationCircleFilled,
  FireOutlined,
  FireFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { AdListPagination } from "../../../features/ad-list-pagination";
import { AdListFilters } from "../../../features/ad-list-filters";
import { useAdListQuery } from "../../../features/ad-list-query";
import { getAdsList, StatusTitles } from "../../../entities/ad";
import { Flex, Card, Result, Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "../../../shared";
import { Link } from "react-router";

const { Title } = Typography;

export default function AdList() {
  const { page, status, categoryID, setParam } = useAdListQuery();

  const { isPending, error, data } = useQuery({
    queryKey: ["adsList", page, status],
    queryFn: () => {
      return getAdsList({ page, status });
    },
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

  return (
    <div>
      <AdListFilters
        status={status}
        categoryID={categoryID}
        setParam={setParam}
      />
      <Flex
        wrap
        gap="large"
        justify="space-evenly"
        style={{ marginBottom: "24px" }}
        key={data.pagination?.currentPage}
      >
        {data.ads?.length ? (
          data.ads.map((adItem) => {
            // todo: add Skeleton
            return (
              <Card
                key={adItem.id}
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
                    <FireFilled
                      style={{ color: "#1677ff", cursor: "default" }}
                    />
                  ) : (
                    <FireOutlined style={{ cursor: "default" }} /> // todo: remove hover effect
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
          })
        ) : (
          <Result
            icon={<SmileOutlined />}
            title="Объявлений к модерации не найдено!"
          />
        )}
      </Flex>
      {data.pagination && (
        <AdListPagination
          itemsPerPage={data.pagination.itemsPerPage}
          totalItems={data.pagination.totalItems}
          currentPage={page}
          handlePageChange={setParam}
        />
      )}
    </div>
  );
}
