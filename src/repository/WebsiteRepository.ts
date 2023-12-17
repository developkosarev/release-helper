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

  async findOne(id: number): Promise<Website> {
    const sql: string = `SELECT * FROM store_website WHERE website_id=${id}`

    const [rows, fields] = await this.connection.execute(sql);

    console.log(fields);
    console.log(rows);

    return new Website(1, 'de', 'de')
  }
}
