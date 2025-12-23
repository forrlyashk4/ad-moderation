import { Typography, Carousel, Button, Table, FloatButton } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ModerationActions } from "../../../entities/ad";
import { formatDate } from "../../../shared";
import type { UseMutateFunction } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router";
import type {
  POSTAdActionResponse,
  POSTAdActionRequest,
  Ad,
} from "../../../entities/ad";
import { AdAbort } from "../../../features/ad-abort";
import styles from "./AdItemComponent.module.css";

const { Title, Paragraph } = Typography;

export default function AdItemComponent({
  item,
  mutateFn,
}: {
  item: Ad;
  mutateFn: UseMutateFunction<POSTAdActionResponse, Error, POSTAdActionRequest>;
}) {
  const navigate = useNavigate();
  const dataSource = Object.entries(item.characteristics).map(
    ([key, value]) => ({
      key,
      property: key,
      value,
    })
  );

  const columns: ColumnsType<{ key: string; property: string; value: string }> =
    [
      { title: "Свойство", dataIndex: "property", key: "property" },
      { title: "Значение", dataIndex: "value", key: "value" },
    ];
  return (
    <div className={styles.container}>
      <Title level={2}>{item.title}</Title>
      <Carousel arrows adaptiveHeight autoplay>
        {item.images.map((img) => {
          return (
            <div key={img}>
              <img
                src={img}
                alt={item.title}
                className={styles.carouselImage}
              />
            </div>
          );
        })}
      </Carousel>
      <div className={styles.topRow}>
        <Typography className={styles.leftPanel}>
          <Paragraph>{item.description}</Paragraph>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            className={styles.tableMargin}
          />
          <Paragraph>
            Продавец: {item.seller.name} | {item.seller.rating}
          </Paragraph>
          <Paragraph>
            {item.seller.totalAds} объявлений | На сайте с{" "}
            {formatDate(item.seller.registeredAt)}
          </Paragraph>
        </Typography>
        <Typography className={styles.rightPanel}>
          <Paragraph>История модерации</Paragraph>
          {item.moderationHistory.length > 0 ? (
            item.moderationHistory.map((moderation) => {
              return (
                <Paragraph key={moderation.id}>
                  Модератор: {moderation.moderatorName}
                  <br />
                  {formatDate(moderation.timestamp)} |{" "}
                  {ModerationActions[moderation.action]}
                  {moderation.comment && (
                    <>
                      <br />
                      {moderation.comment}
                    </>
                  )}
                </Paragraph>
              );
            })
          ) : (
            <Paragraph>Здесь ничего нет :(</Paragraph>
          )}
        </Typography>
      </div>
      <div className={styles.actionsRow}>
        <Button
          variant="filled"
          color="green"
          size="large"
          onClick={() => mutateFn({ id: item.id, action: "approve" })}
        >
          Одобрить
        </Button>
        <AdAbort
          id={item.id}
          title="Отклонить"
          mutateFn={mutateFn}
          actionName="reject"
        />
        <AdAbort
          id={item.id}
          title="На доработку"
          mutateFn={mutateFn}
          actionName="request-changes"
        />
      </div>
      <div className={styles.navRow}>
        <Paragraph>
          <Link to="/list" className={styles.link}>
            К списку
          </Link>
        </Paragraph>
        <div className={styles.navLinks}>
          <Paragraph>
            <Link
              to={`/item/${item.id - 1}`} // todo: провалидировать чтобы не падало ниже начала списка (скорее всего единицы)
              className={`${styles.link} ${styles.prevLink}`}
            >
              Предыдущее
            </Link>
          </Paragraph>
          <Paragraph>
            <Link
              to={`/item/${item.id + 1}`} // todo: провалидировать чтобы не падало выше конца списка
              className={styles.link}
            >
              Следующее
            </Link>
          </Paragraph>
        </div>
      </div>
      <FloatButton onClick={() => navigate("/stats")} />
    </div>
  );
}
