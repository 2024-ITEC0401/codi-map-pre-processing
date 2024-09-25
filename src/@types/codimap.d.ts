declare type Model = {
  gender: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  skinTone: string;
};

declare type Aggregation = {
  likeCount: number;
  commentCount: number;
  scrapCount: number;
  reportCount: number;
};

declare type Status = {
  snapDisplayStatus: string;
  snapAdminCheckStatus: string;
  adminCheckCompletedAt: string | null;
  snapReviewStatus: string | null;
  rewardStatusCode: string | null;
};

declare type MediaRatio = {
  width: number;
  height: number;
};

declare type Good = {
  id: number;
  isMatched: boolean;
  goodsPlatform: string;
  goodsNo: string;
  options: object;
};

declare type Label = {
  id: number;
};

declare type Tag = {
  name: string;
};

declare type Media = {
  id: number;
  type: string;
  path: string;
  videoId: string | null;
};

declare type SnapData = {
  data: {
    list: CodiMapItem[];
  };
  meta: {
    result: string;
    errorCode: string | null;
    message: string;
  };
  link: {
    next: string;
  };
};

declare interface CodiMapItem {
  id: string;
  createdBy: { id: string };
  contentType: string;
  detail: { title: string; content: string };

  goods: Good[];
  aggregations: Aggregation;
  labels: Label[];
  tags: Tag[];
  mediaRatio: MediaRatio;
  medias: Media[];
  status: Status;

  createdAt: string;
  updatedAt: string;
  displayedFrom: string;
  displayedTo: string | null;
  orderConfirmDate: string | null;
  rewardPoint: number | null;
  deleteGuide: {
    content: string;
    subContent: string;
  };
}
