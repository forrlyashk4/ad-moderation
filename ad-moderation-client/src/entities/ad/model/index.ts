type Ad = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  categoryId: number;
  status: "pending" | "approved" | "rejected";
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

const StatusTitles = {
  pending: "На модерации",
  rejected: "Отклонено",
  approved: "Одобрено",
} as const;

export { type Ad, StatusTitles };
