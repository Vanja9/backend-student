import dotenv from "dotenv"
import { DataSource } from "typeorm"
import { Student } from "./entities/Student";
import { Predmet } from "./entities/Predmet";
import { User } from "./entities/User";
import { StudentPredmet } from "./entities/StudentPredmet";
import { Ocena } from "./entities/Ocena";


dotenv.config();
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number.parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Student, Predmet, User, StudentPredmet, Ocena],
    logging: false,
})