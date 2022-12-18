
export class IGetNewsRequest {
  author?: string;
  tag?: string;
  title?: string;
  month?: string;

  page?: number;
  limit?: number;
}