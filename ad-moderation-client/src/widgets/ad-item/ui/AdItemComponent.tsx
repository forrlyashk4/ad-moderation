import { Typography, Carousel, Button, Table } from "antd";
import { Link } from "react-router";
import type { Ad } from "../../../entities/ad";
import type { ColumnsType } from "antd/es/table";

const { Title, Paragraph } = Typography;

export default function AdItemComponent({ item }: { item: Ad }) {
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
        <div
          style={{
            width: "48%",
            padding: "15px",
            border: "1px solid #1677ff5b",
            borderRadius: "5px",
            boxSizing: "border-box",
            maxHeight: "500px",
            overflowY: "scroll",
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
            {item.seller.registeredAt}
          </Paragraph>
        </div>
        <div
          style={{
            width: "48%",
            maxHeight: "500px",
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
                  {moderation.timestamp} | {moderation.action}
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          gap: "25px",
          marginTop: "25px",
        }}
      >
        <Button variant="filled" color="blue" size="large">
          Одобрить
        </Button>
        <Button variant="filled" color="danger" size="large">
          Отклонить
        </Button>
        <Button variant="filled" size="large">
          На доработку
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "25px 0 50px",
        }}
      >
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
        <div>
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
        </div>
      </div>
    </div>
  );
}
