type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: AdStatus;
  priority: "normal" | "urgent";
  createdAt: string;
  updatedAt: string;
  images: string[];
  seller: {
    id: number;
    name: string;
    rating: number;
    totalAds: number;
    registeredAt: string;
  };
  characteristics: Record<string, string>;
  moderationHistory: AdModerationHistory[];
};

type AdModerationHistory = {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: string;
  reason: string | null;
  comment: string;
  timestamp: string;
};

type AdStatus = "pending" | "approved" | "rejected" | "draft";

const StatusTitles = {
  pending: "На модерации",
  rejected: "Отклонено",
  approved: "Одобрено",
  draft: "Черновик",
} as const;

export { type Ad, type AdStatus, StatusTitles };
