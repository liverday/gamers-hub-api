export default interface PagedResult<T> {
  total: number;
  data: T[];
}