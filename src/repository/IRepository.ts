export interface IRepository<T> {
  findOne(id: number): Promise<T>;
}
