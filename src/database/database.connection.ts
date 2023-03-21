import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "../modules/Users/entities/User";


const myDataSource = new DataSource({
  type: "mongodb",
  host: "localhost",
  port: 27017,
  database: "marketing_place",
  entities: [User],
  migrations: [],
  subscribers: [],
});

export default myDataSource;
