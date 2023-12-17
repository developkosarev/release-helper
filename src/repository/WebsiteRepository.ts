import { Website } from "../entities/Website.js";
import { BaseRepository } from "./BaseRepository.js";

//const findAll = async (connection: mysql.Connection): Promise<void> => {
//  const sql: string = `SELECT * FROM store_website`
//
//  // query database
//  const [rows, fields] = await connection.execute(sql, ['Morty', 14]);
//
//  console.log(fields);
//  console.log(rows);
//
//  //return rows;
//}
//
//export { findAll }


export class WebsiteRepository extends BaseRepository<Website>{

  async findOne(id: number): Promise<Website | null> {
    const sql: string = `SELECT * FROM store_website WHERE website_id=${id}`

    const [rows] = await this.connection.execute(sql);

    if (!Array.isArray(rows)) {
      throw new Error("Result is not array.");
    }

    if (rows.length === 0) {
      return null;
    }
    const tempResult: any = rows[0];

    return new Website(tempResult.website_id, tempResult.code, tempResult.name)
  }
}
