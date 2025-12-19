import {
  SmileOutlined,
  FireOutlined,
  FireFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { postAdAction, StatusTitles } from "../../../entities/ad";
import { Flex, Card, Result, Typography, FloatButton } from "antd";
import { formatDate } from "../../../shared";
import { Link, useNavigate } from "react-router";
const { Title, Paragraph } = Typography;

import type {
  GETAdsListResponse,
  POSTAdActionRequest,
  POSTAdActionResponse,
} from "../../../entities/ad/api/types"; // todo: нужно прочекать КАЖДЫЙ импорт на предмет того, что не нарушаются правила FSD
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AdAbortFloat } from "../../../features/ad-abort";

export const AdList = function ({ data }: { data: GETAdsListResponse }) {
  const navigate = useNavigate();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const queryClient = useQueryClient();
  const action = useMutation<POSTAdActionResponse, Error, POSTAdActionRequest>({
    mutationFn: ({ id, action, body }) => postAdAction({ id, action, body }),
  });

  const handleApprove = async () => {
    await Promise.all(
      selectedIds.map((id) =>
        action.mutateAsync({
          id,
          action: "approve",
        })
      )
    );

    setSelectedIds([]);
    queryClient.invalidateQueries({ queryKey: ["adList"] });
  };

  const handleAdAction = async (
    selectedIds: number[],
    actionName: "approve" | "reject" | "request-changes",
    reason:
      | "Запрещенный товар"
      | "Неверная категория"
      | "Некорректное описание"
      | "Проблемы с фото"
      | "Подозрение на мошенничество"
      | "Другое",
    comment?: string
  ) => {
    await Promise.all(
      selectedIds.map((id) =>
        action.mutateAsync({
          id,
          action: actionName,
          body: {
            reason,
            comment,
          },
        })
      )
    );

    setSelectedIds([]);
    queryClient.invalidateQueries({ queryKey: ["adList"] });
  }; // todo: точно ли нужно здесь по FSD хранить эти функции

  // todo: почему-то при назад/вперед в браузере не происходит прогрузка страницы, хотя /stats и /list прогружаются
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
                selectedIds.includes(adItem.id) ? (
                  <CheckCircleFilled
                    style={{ color: "#1677ff" }}
                    onClick={() =>
                      setSelectedIds((prev) =>
                        prev.filter((item) => item !== adItem.id)
                      )
                    }
                  />
                ) : (
                  <CheckCircleOutlined
                    onClick={() =>
                      setSelectedIds((prev) => [...prev, adItem.id])
                    }
                  />
                ),
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
      {selectedIds.length > 0 && (
        <>
          <FloatButton
            content={`Выбрано объявлений: ${selectedIds.length}`}
            shape="square"
            style={{ insetInlineEnd: 270, width: "175px" }} // todo: remove hover effect of THIS button
          />
          <AdAbortFloat
            selectedIds={selectedIds}
            handleAdAction={handleAdAction}
            actionName="reject"
            insetInlineEnd={206}
            icon={<CloseCircleOutlined />}
          />
          <AdAbortFloat
            selectedIds={selectedIds}
            handleAdAction={handleAdAction}
            actionName="request-changes"
            insetInlineEnd={152}
            icon={<QuestionCircleOutlined />}
          />
          <FloatButton
            onClick={handleApprove}
            style={{ insetInlineEnd: 98 }}
            icon={<CheckCircleOutlined />}
          />
        </>
      )}
      <FloatButton
        onClick={() => navigate("/stats")}
        style={{ insetInlineEnd: 24 }}
      />
    </Flex>
  );
};
