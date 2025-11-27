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
  characteristics: AdCharacteristics;
  moderationHistory: AdModerationHistory[];
};

type AdCharacteristics = {
  Состояние: "Новое" | "Б/у" | "Отличное" | "Хорошее" | "Удовлетворительное";
  Гарантия: "Есть" | "Нет" | "Частичная";
  Производитель: string;
  Модель: string | number;
  Цвет: string;
};

type AdModerationHistory = {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: string;
  reason: string | null;
  comment:
    | "Объявление не соответствует правилам платформы"
    | "Объявление прошло модерацию успешно";
  timestamp: string;
};

export type { Ad };
