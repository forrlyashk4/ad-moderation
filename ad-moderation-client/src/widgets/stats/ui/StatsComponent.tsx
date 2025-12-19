import { Typography, Card, Row, Col, Statistic, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title: TypographyTitle } = Typography;

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import type {
  GETStatsActivityResponse,
  GETStatsCategoriesResponse,
  GETStatsDecisionsResponse,
  GETStatsSummaryResponse,
} from "../../../entities/stats";
import { Link } from "react-router";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const activityOptions = {
  plugins: {
    title: {
      display: true,
      text: "Активность в течение последней недели",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const decisionsOptions = {
  plugins: {
    title: {
      display: true,
      text: "Распределение решений",
    },
  },
  responsive: true,
};

const categoriesOptions = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Категории проверенных объявлений",
    },
  },
};

export default function StatsComponent({
  summaryData,
  activityData,
  decisionsData,
  categoriesData,
  period,
  setPeriod,
}: {
  summaryData: GETStatsSummaryResponse;
  activityData: GETStatsActivityResponse;
  decisionsData: GETStatsDecisionsResponse;
  categoriesData: GETStatsCategoriesResponse;
  period: "week" | "month" | "today";
  setPeriod: React.Dispatch<React.SetStateAction<"week" | "month" | "today">>;
}) {
  // todo: ощущение, что так формировать объекты - ошибка, медленно и неэффективно. узнать
  const normalizedActivityData = {
    labels: [] as string[],
    datasets: [
      {
        label: "Одобрено",
        data: [] as number[],
        borderColor: "rgba(54, 235, 96, 0.5)",
        backgroundColor: "rgba(54, 235, 96, 0.5)",
      },
      {
        label: "Отклонено",
        data: [] as number[],
        borderColor: "rgba(255, 99, 132, 0.5)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "На доработку",
        data: [] as number[],
        borderColor: "rgba(255, 206, 86, 0.5)",
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ],
  };

  const normalizedDecisionsData = {
    labels: ["Отклонено", "Принято", "На доработку"],
    datasets: [
      {
        label: "Количество объявлений, %",
        data: [] as number[],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 235, 96, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // todo: наверное стоит привести все цвета, а уж тем более цвета отклонено принято на доработку В КОНСТАНТЫ и их реюзать
          "rgba(54, 235, 96, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const normalizedCategoriesData = {
    labels: [] as string[],
    datasets: [
      {
        label: "Объявлений проверено",
        data: [] as number[],
        borderColor: "rgba(22, 119, 255, 0.5)",
        backgroundColor: "rgba(22, 119, 255, 0.5)",
      },
    ],
  };

  activityData.forEach((item) => {
    normalizedActivityData.labels.push(item.date);
    normalizedActivityData.datasets[0].data.push(item.approved);
    normalizedActivityData.datasets[1].data.push(item.rejected);
    normalizedActivityData.datasets[2].data.push(item.requestChanges);
  });

  normalizedDecisionsData.datasets[0].data.push(
    decisionsData.rejected,
    decisionsData.approved,
    decisionsData.requestChanges
  );

  for (const [category, value] of Object.entries(categoriesData)) {
    normalizedCategoriesData.labels.push(category);
    normalizedCategoriesData.datasets[0].data.push(value);
  }

  return (
    <div style={{ maxWidth: "786px", margin: "0 auto" }}>
      <TypographyTitle
        level={5}
        style={{ marginBottom: 0, fontSize: 14, fontWeight: 400 }}
      >
        <Link
          to={`/list`}
          style={{
            color: "black",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <ArrowLeftOutlined style={{ fontSize: 10 }} /> К списку
        </Link>
      </TypographyTitle>
      <TypographyTitle
        level={2}
        style={{
          marginTop: "5px",
          marginBottom: "25px",
          display: "flex",
          gap: "16px",
        }}
      >
        Ваша статистика за{" "}
        <Select
          value={period}
          style={{ width: 120, color: "rgb(22, 119, 255)" }}
          onChange={setPeriod}
          options={[
            { value: "today", label: "сегодня" },
            { value: "week", label: "неделю" },
            { value: "month", label: "месяц" },
          ]}
        />
      </TypographyTitle>
      <Row gutter={24} style={{ marginBottom: "25px" }}>
        <Col span={12}>
          <Card variant="outlined">
            <Statistic
              title="Всего проверено"
              value={summaryData.totalReviewed}
              styles={{ content: { color: "rgb(22, 119, 255)" } }}
              suffix="объявлений"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="outlined">
            <Statistic
              title="Среднее время на объявление"
              value={summaryData.averageReviewTime}
              styles={{ content: { color: "rgb(22, 119, 255)" } }}
              suffix="сек."
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24} style={{ marginBottom: "25px" }}>
        <Col span={12}>
          <Card variant="outlined">
            <Statistic
              title="Процент одобренных"
              value={summaryData.approvedPercentage}
              precision={2}
              styles={{ content: { color: "rgba(54, 235, 96, 1)" } }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="outlined">
            <Statistic
              title="Процент отклонённых"
              value={summaryData.rejectedPercentage}
              precision={2}
              styles={{ content: { color: "rgba(255, 99, 132, 1)" } }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <div
        style={{
          marginBottom: "25px",
          padding: "25px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          maxHeight: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Bar options={activityOptions} data={normalizedActivityData} />
      </div>
      <div
        style={{
          marginBottom: "25px",
          padding: "25px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          maxHeight: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pie options={decisionsOptions} data={normalizedDecisionsData} />
      </div>
      <div
        style={{
          marginBottom: "75px",
          padding: "25px",
          border: "1px solid #f0f0f0",
          borderRadius: "8px",
          maxHeight: "300px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Bar options={categoriesOptions} data={normalizedCategoriesData} />
      </div>
    </div>
  );
}
