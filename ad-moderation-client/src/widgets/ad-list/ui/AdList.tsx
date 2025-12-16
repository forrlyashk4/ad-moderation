import {
  SmileOutlined,
  FireOutlined,
  FireFilled,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { StatusTitles } from "../../../entities/ad";
import { Flex, Card, Result, Typography } from "antd";
import { formatDate } from "../../../shared";
import { Link } from "react-router";
const { Title, Paragraph } = Typography;

import type { GETAdsListResponse } from "../../../entities/ad/api/types"; // todo: нужно прочекать КАЖДЫЙ импорт на предмет того, что не нарушаются правила FSD

export const AdList = function ({ data }: { data: GETAdsListResponse }) {
  return (
    <Flex // todo: change to Grid component
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
                  <FireFilled style={{ color: "#1677ff", cursor: "default" }} />
                ) : (
                  <FireOutlined style={{ cursor: "default" }} /> // todo: remove hover effect
                ),
                <Link to={`/item/${adItem.id}`}>Открыть</Link>,
              ]}
            >
              <Title level={5} style={{ marginTop: 0 }}>
                {adItem.title}
              </Title>
              <Paragraph>
                {adItem.price} ₽
                <br />
                {adItem.category}
                <br />
                {formatDate(adItem.createdAt)}
                <br />
                {StatusTitles[adItem.status]}
              </Paragraph>
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
  );
};
