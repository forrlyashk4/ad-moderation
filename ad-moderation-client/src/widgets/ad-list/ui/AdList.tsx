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
import styles from "./AdList.module.css";
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
      className={styles.container}
      key={data.pagination?.currentPage}
    >
      {data.ads?.length ? (
        data.ads.map((adItem) => {
          // todo: add Skeleton
          return (
            <Card
              key={adItem.id}
              className={`${styles.card} ${
                adItem.priority === "urgent" ? styles.urgent : ""
              }`}
              cover={
                <img
                  alt={adItem.title}
                  src={adItem.images[0]}
                  className={`${styles.coverImage} ${
                    adItem.priority === "urgent" ? styles.coverImageUrgent : ""
                  }`}
                />
              }
              actions={[
                selectedIds.includes(adItem.id) ? (
                  <CheckCircleFilled
                    className={styles.checkFilled}
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
                  <FireFilled className={styles.fireFilled} />
                ) : (
                  <FireOutlined className={styles.fireOutlined} />
                ),
                <Link to={`/item/${adItem.id}`}>Открыть</Link>,
              ]}
            >
              <Title level={5} className={styles.adItemTitle}>
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
            className={styles.floatCount}
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
            className={styles.floatApprove}
            icon={<CheckCircleOutlined />}
          />
        </>
      )}
      <FloatButton
        onClick={() => navigate("/stats")}
        className={styles.floatStats}
      />
    </Flex>
  );
};
