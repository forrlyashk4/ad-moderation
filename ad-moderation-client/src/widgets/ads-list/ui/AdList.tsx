import { Flex, Card, Col, Row, Typography, Button, Result } from "antd";
import {
  SmileOutlined,
  LoadingOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { getAdsList } from "../../../entities/ad";

const { Title, Text } = Typography;

export default function AdList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["adsList"],
    queryFn: () => getAdsList(),
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
                <img
                  draggable={false}
                  alt={adItem.title}
                  src={adItem.images[0] || "https://placehold.co/600x400"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
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
                    <Button color="default" variant="filled" size="large" block>
                      Открыть
                    </Button>
                  </div>
                </Flex>
              </Col>
            </Row>
          </Card>
        );
      })}
    </Flex>
  );
}
