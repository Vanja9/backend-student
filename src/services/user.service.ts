import { AppDataSource } from "../database"
import { User } from "../entities/User"
import crypto from 'crypto'

const repo = AppDataSource.getRepository(User)

export class UserService{

    public static async getAllStudents() {
        const data = await repo.find({
            
            
        });
        return data
    }


    public static async getAllUsers(){

        const data = await repo.find({})

    }


    public static async getUserByUsername(Username : string){
        const data = await repo.findOne({
            where:{
                name: Username
            }
        })
        return data
    }

    public static async getUserById(id : number){
        const data = await repo.findOne({
            where:{
                userId : id
            }
        });
        return data;
    }

    public static async createUser(user: User){
        delete user.userId
        const hash = crypto.createHash('sha512').update(user.password).digest().toString('hex') ;
        user.password = hash;
        return await repo.save(user)
    }

    public static async updateUser(id : number, user: User){
        user.userId = id
    
        return await repo.save(user)
    }

   /////25min








}