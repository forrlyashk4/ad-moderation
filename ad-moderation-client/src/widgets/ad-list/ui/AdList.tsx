import { Flex, Card, Col, Row, Typography, Button, Result } from "antd";
import {
  SmileOutlined,
  LoadingOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getAdsList } from "../../../entities/ad";
import { AdListPagination } from "../../../features/ad-list-pagination";
import { Link, useSearchParams } from "react-router";

const { Title, Text } = Typography;

const parsePage = (value: string | null): number => {
  const n = Number(value);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

export default function AdList() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parsePage(searchParams.get("page"));

  const handlePageChange = (nextPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", String(nextPage));
      return params;
    });
  };

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
    <Flex vertical>
      {data.ads.map((adItem) => {
        return (
          <Card style={{ marginBottom: 16 }} key={adItem.id}>
            <Row gutter={16}>
              <Col span={8}>
                <div
                  style={{
                    width: "100%",
                    minWidth: "100%",
                    position: "relative",
                    paddingTop: "66.666%",
                    overflow: "hidden",
                  }}
                >
                  {/* Кастыль, чтобы при подгрузке картинок верстка
                  не прыгала. Может, стоит заюзать Skeleton и в целом сделать
                  это по-красивше... todo */}
                  <img
                    draggable={false}
                    alt={adItem.title}
                    src={adItem.images[0] || "https://placehold.co/600x400"}
                    width={600}
                    height={400}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>
              <Col span={10}>
                <Flex vertical>
                  <Title level={4}>{adItem.title}</Title>
                  <Text>{adItem.price} ₽</Text>
                  <Text>{adItem.category}</Text>
                  <Text>{adItem.createdAt}</Text>
                </Flex>
              </Col>
              <Col span={6}>
                <Flex
                  vertical
                  justify="space-between"
                  align="end"
                  style={{ height: "100%", width: "100%" }}
                >
                  <Title level={5} type="warning">
                    {adItem.priority}
                  </Title>
                  <div style={{ width: "100%", textAlign: "right" }}>
                    <Text style={{ display: "block", marginBottom: "10px" }}>
                      {adItem.status}
                    </Text>
                    <Link to={`/item/${adItem.id}`}>
                      <Button
                        color="default"
                        variant="filled"
                        size="large"
                        block
                      >
                        Открыть
                      </Button>
                    </Link>
                  </div>
                </Flex>
              </Col>
            </Row>
          </Card>
        );
      })}
      {data.pagination && (
        <AdListPagination
          itemsPerPage={data.pagination.itemsPerPage}
          totalItems={data.pagination.totalItems}
          currentPage={page}
          handlePageChange={handlePageChange}
        />
      )}
    </Flex>
  );
}
