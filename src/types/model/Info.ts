export interface Info {
  Title: string;
  Category: string;
  Date: string;
  Operator: string;
}

export interface InfoListReq {
  category?: number;
  start?: string;
  end?: string;
  title?: string;
  id?: number;
  pageNumber: number;
  pageSize: number;
}

export interface InfoListRes {
  categoryId: number;
  content: string;
  createDate: Date;
  id: number;
  title: string;
}
