import { Connection } from "mysql2/promise";
import { IRepository } from "./IRepository.js";

export abstract class BaseRepository<T> implements IRepository<T> {

  protected readonly connection: Connection;

  constructor(connection: Connection) {
    this.connection = connection;
  }

  findOne(id: number): Promise<T | null> {
    throw new Error("Method not implemented.");
  }
}
