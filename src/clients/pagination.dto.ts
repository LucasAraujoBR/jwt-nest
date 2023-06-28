export class PaginationDto<T> {
  totalPages?: number;
  totalItems?: number;
  nextPageUrl?: any;
  prevPageUrl?: any;
  data: any;
}
