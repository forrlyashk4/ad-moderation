import { useQuery } from "@tanstack/react-query";
import {
  getStatsActivity,
  getStatsDecisions,
  getStatsSummary,
} from "../../../entities/stats";
import StatsComponent from "./StatsComponent";
import { Result } from "antd";
import { LoadingOutlined, ExclamationCircleFilled } from "@ant-design/icons";

export default function StatsWidget() {
  const period = "month";

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

  if (summaryError || activityError || decisionsError)
    return (
      <Result
        icon={<ExclamationCircleFilled />}
        title={`Произошла ошибка: ${
          summaryError?.message ||
          activityError?.message ||
          decisionsError?.message
        }`}
      />
    );

  return (
    <>
      {summaryIsPending || activityIsPending || decisionsIsPending ? (
        <Result icon={<LoadingOutlined spin />} title="Идёт загрузка" />
      ) : (
        <StatsComponent
          summaryData={summaryData}
          activityData={activityData}
          decisionsData={decisionsData}
        />
      )}
    </>
  );
}
