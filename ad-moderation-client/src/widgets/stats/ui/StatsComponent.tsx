import { Typography, Card, Row, Col, Statistic, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styles from "./Stats.module.css";

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

const periodOptions = [
  { value: "today", label: "сегодня" },
  { value: "week", label: "неделю" },
  { value: "month", label: "месяц" },
];

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
    <div className={styles.container}>
      <TypographyTitle level={5} className={styles.forwardBack}>
        <Link to={`/list`} className={styles.forwardBackLink}>
          <ArrowLeftOutlined /> К списку объявлений
        </Link>
      </TypographyTitle>
      <TypographyTitle level={2} className={styles.title}>
        Ваша статистика за{" "}
        <Select
          value={period}
          className={styles.select}
          onChange={setPeriod}
          options={periodOptions}
        />
      </TypographyTitle>
      <Row gutter={24} className={styles.cardRow}>
        <Col span={12}>
          <Card variant="outlined" className={styles.cardRootDefault}>
            <Statistic
              title="Всего проверено"
              value={summaryData.totalReviewed}
              suffix="объявлений"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="outlined" className={styles.cardRootDefault}>
            <Statistic
              title="Среднее время на объявление"
              value={summaryData.averageReviewTime}
              suffix="сек."
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={24} className={styles.cardRow}>
        <Col span={12}>
          <Card variant="outlined" className={styles.cardRootPrimary}>
            <Statistic
              title="Процент одобренных"
              value={summaryData.approvedPercentage}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card variant="outlined" className={styles.cardRootDanger}>
            <Statistic
              title="Процент отклонённых"
              value={summaryData.rejectedPercentage}
              precision={2}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>
      <div className={styles.chartItem}>
        <Bar options={activityOptions} data={normalizedActivityData} />
      </div>
      <div className={styles.chartItem}>
        <Pie options={decisionsOptions} data={normalizedDecisionsData} />
      </div>
      <div className={styles.chartItem}>
        <Bar options={categoriesOptions} data={normalizedCategoriesData} />
      </div>
    </div>
  );
}
