import { AppDataSource } from "../database";
import { Ocena } from "../entities/Ocena";

const repo = AppDataSource.getRepository(Ocena)

export class OcenaService {
    public static async getOcenaByPredmet(predmet: number) {
        const data = await repo.find({
            where: {
                predmetId: predmet
            },
            relations: {
                predmet: true,
                student: true
            }

        })

        return data
    }



    public static async getAllOcenas() {
        const data = await repo.find({
            relations: {
                student: true,
                predmet: true
            }
        })

        return data
    }


    public static async createOcena(ocena: Ocena) {
        delete ocena.ocenaId
        return await repo.save(ocena)
    }

    public static async updateOcena(id: number, ocena: Ocena) {
        ocena.ocenaId = id

        return await repo.save(ocena)
    }





}