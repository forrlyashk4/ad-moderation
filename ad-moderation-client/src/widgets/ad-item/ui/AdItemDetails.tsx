import { Typography, Carousel, Button, Table } from "antd";
import { Link } from "react-router";

const { Title, Paragraph } = Typography;

export default function AdItemDetails({ id }: { id: string | undefined }) {
  const dataSource = [
    {
      key: "1",
      value: "Размер",
      property: "Гигантский",
    },
    {
      key: "2",
      value: "Цвет",
      property: "Черный",
    },
  ];

  const columns = [
    {
      title: "Свойство",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "Значение",
      dataIndex: "value",
      key: "value",
    },
  ];
  return (
    <div style={{ maxWidth: "786px", margin: "0 auto" }}>
      <Title level={2}>Объявление {id}</Title>
      <Carousel arrows>
        <div>
          <h3
            style={{
              margin: 0,
              height: "160px",
              color: "#fff",
              lineHeight: "160px",
              textAlign: "center",
              background: "#364d79",
            }}
          >
            1
          </h3>
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              height: "160px",
              color: "#fff",
              lineHeight: "160px",
              textAlign: "center",
              background: "#364d79",
            }}
          >
            2
          </h3>
        </div>
        <div>
          <h3
            style={{
              margin: 0,
              height: "160px",
              color: "#fff",
              lineHeight: "160px",
              textAlign: "center",
              background: "#364d79",
            }}
          >
            3
          </h3>
        </div>
      </Carousel>
      <div
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
          <Paragraph>Полное описание</Paragraph>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            style={{ margin: "15px 0" }}
          />
          <Paragraph>Продавец: Юлия | 5.0</Paragraph>
          <Paragraph>15 объявлений | На сайте 3 года</Paragraph>
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
          <Paragraph>
            Модератор: Иван Хмельницкий
            <br />
            24.10.2026 11:00 | Одобрено
            <br />
            Комментарий:
          </Paragraph>
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
          marginTop: "25px",
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
            to={`/item/${(Number(id) || 1) - 1}`} // todo: провалидировать чтобы не падало ниже единицы
            style={{
              marginRight: "15px",
              textDecoration: "none",
              color: "inherit",
              fontFamily:
                '-apple-system, "system-ui", "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
            }} // todo: сделать стили нормальными
          >
            Предыдущее
          </Link>
          <Link
            to={`/item/${(Number(id) || 1) + 1}`}
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
