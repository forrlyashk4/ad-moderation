import { useQuery } from "@tanstack/react-query";
import {
  getStatsActivity,
  getStatsCategories,
  getStatsDecisions,
  getStatsSummary,
} from "../../../entities/stats";
import StatsComponent from "./StatsComponent";
import { Result } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import { useState } from "react";

export default function StatsWidget() {
  const [period, setPeriod] = useState<"week" | "month" | "today">("week");

  const {
    isPending: summaryIsPending,
    error: summaryError,
    data: summaryData,
  } = useQuery({
    queryKey: ["statsSummary", period],
    queryFn: () => {
      return getStatsSummary({ period });
    },
  });

  const {
    isPending: activityIsPending,
    error: activityError,
    data: activityData,
  } = useQuery({
    queryKey: ["statsActivity", period],
    queryFn: () => {
      return getStatsActivity({ period });
    },
  });

  const {
    isPending: decisionsIsPending,
    error: decisionsError,
    data: decisionsData,
  } = useQuery({
    queryKey: ["statsDecisions", period],
    queryFn: () => {
      return getStatsDecisions({ period });
    },
  });

  const {
    isPending: categoriesIsPending,
    error: categoriesError,
    data: categoriesData,
  } = useQuery({
    queryKey: ["statsCategories", period],
    queryFn: () => {
      return getStatsCategories({ period });
    },
  });

  if (summaryError || activityError || decisionsError || categoriesError)
    return (
      <Result
        icon={<ExclamationCircleFilled />}
        title={`Произошла ошибка: ${
          summaryError?.message ||
          activityError?.message ||
          decisionsError?.message ||
          categoriesError?.message
        }`}
      />
    );

  return (
    <>
      {summaryIsPending ||
      activityIsPending ||
      decisionsIsPending ||
      categoriesIsPending ? (
        <Result icon={<LoadingOutlined spin />} title="Идёт загрузка" />
      ) : (
        <StatsComponent
          summaryData={summaryData}
          activityData={activityData}
          decisionsData={decisionsData}
          categoriesData={categoriesData}
          period={period}
          setPeriod={setPeriod}
        />
      )}
    </>
  );
}
