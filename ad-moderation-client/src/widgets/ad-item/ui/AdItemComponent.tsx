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
    <div style={{ maxWidth: "786px", margin: "0 auto" }}>
      <Title level={2}>{item.title}</Title>
      <Carousel arrows adaptiveHeight autoplay>
        {item.images.map((img) => {
          return (
            <div key={img}>
              <img src={img} alt={item.title} style={{ margin: "0 auto" }} />
            </div>
          );
        })}
      </Carousel>
      <style>{`
        .ant-carousel .slick-prev,
        .ant-carousel .slick-next,
        .ant-carousel .slick-prev:hover,
        .ant-carousel .slick-next:hover {
            color: black;
        }
      `}</style>
      <div // todo: ну это полный пиздец со стилями сверху :)))) надеюсь уйдет после css modules
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
        }}
      >
        <Typography
          style={{
            width: "48%",
            padding: "15px",
            border: "1px solid #1677ff5b",
            borderRadius: "5px",
            boxSizing: "border-box",
            maxHeight: "400px",
            overflowY: "auto",
          }}
        >
          <Paragraph>{item.description}</Paragraph>
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            style={{ margin: "15px 0" }}
          />
          <Paragraph>
            Продавец: {item.seller.name} | {item.seller.rating}
          </Paragraph>
          <Paragraph>
            {item.seller.totalAds} объявлений | На сайте с{" "}
            {formatDate(item.seller.registeredAt)}
          </Paragraph>
        </Typography>
        <Typography
          style={{
            width: "48%",
            maxHeight: "400px",
            overflowY: "scroll",
            padding: "15px",
            border: "1px solid #1677ff5b",
            borderRadius: "5px",
            boxSizing: "border-box",
          }}
        >
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "25px",
          marginTop: "25px",
        }}
      >
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "25px 0 50px",
        }}
      >
        <Paragraph>
          <Link
            to="/list"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontFamily:
                '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            }}
          >
            К списку
          </Link>
        </Paragraph>
        <div style={{ display: "flex", gap: "8px" }}>
          <Paragraph>
            <Link
              to={`/item/${item.id - 1}`} // todo: провалидировать чтобы не падало ниже начала списка (скорее всего единицы)
              style={{
                marginRight: "15px",
                textDecoration: "none",
                color: "inherit",
                fontFamily:
                  '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              }} // todo: сделать стили нормальными - CSS Modules как вариант
            >
              Предыдущее
            </Link>
          </Paragraph>
          <Paragraph>
            <Link
              to={`/item/${item.id + 1}`} // todo: провалидировать чтобы не падало выше конца списка
              style={{
                textDecoration: "none",
                color: "inherit",
                fontFamily:
                  '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
              }}
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
