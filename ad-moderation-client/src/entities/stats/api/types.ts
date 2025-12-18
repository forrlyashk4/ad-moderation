import type { StatsPeriod } from "../model";

type GETStatsRequest = {
  period: StatsPeriod;
};

type GETStatsSummaryResponse = {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
};

type GETStatsActivityResponse = ActivityByDate[];

type ActivityByDate = {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
};

type GETStatsDecisionsResponse = {
  approved: number;
  rejected: number;
  requestChanges: number;
};

export type {
  GETStatsRequest,
  GETStatsSummaryResponse,
  GETStatsActivityResponse,
  GETStatsDecisionsResponse,
}; // todo: по каждому api-запросу имеет смысл сделать валидацию ошибок: 400, 404 и 500
