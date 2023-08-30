import { Router } from "express";
import { UserService } from "../services/user.service";
import crypto from 'crypto'
import { createJWT } from "../misc/jwt";

const route = Router();

route.post('/login', async function(req,res){
  
    const name = req.body.name;
    const password = req.body.password;

    const user = await UserService.getUserByUsername(name)
    
    if(user == null){
        res.status(404).send();
        return
    }

    const hash = crypto.createHash('sha512').update(password).digest().toString('hex')

    if(user.password != hash){
        res.status(401).send()
        return
    }


    const accessToken = createJWT("api.example.com", parseInt(process.env.ACCESS_DURATION!),"access", user.userId, "admin", req.ip, req.header["user-agent"] ?? "" , process.env.SECRET!)
    const refreshToken = createJWT("api.example.com", parseInt(process.env.REFRESH_DURATION!),"refresh", user.userId, "admin", req.ip, req.header["user-agent"] ?? "" , process.env.SECRET!)

    res.json({
        access: accessToken,
        refresh: refreshToken
    })

})

export default route
