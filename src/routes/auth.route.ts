import { Router } from "express";
import { UserService } from "../services/user.service";
import crypto from 'crypto'
import { createJWT, decodeJWT } from "../misc/jwt";

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

    const accessToken = createJWT("student-api", parseInt(process.env.ACCESS_DURATION!),"access", user.userId, "admin", req.ip, req.headers["user-agent"] ?? "" , process.env.SECRET!)
    const refreshToken = createJWT("student-api", parseInt(process.env.REFRESH_DURATION!),"refresh", user.userId, "admin", req.ip, req.headers["user-agent"] ?? "" , process.env.SECRET!)

    res.json({
        access: accessToken,
        refresh: refreshToken
    })

})

route.post("/refresh", async(req,res)=>{

    const token = req.body.refreshToken;

    const jwt = decodeJWT(token, process.env.SECRET!);

    if (jwt == null) {
        console.log("Cannot decode jwt")
        res.status(401).send();
        return;
    }

    if (jwt.typ !== "refresh") {
        console.log("Not refresh token");
        res.status(401).send();
        return;
    }

    if (new Date(jwt.iat * 1000) > new Date()) {
        console.log("Iat is generated then now");
        res.status(401).send();
        return;
    }

    if (new Date(jwt.exp * 1000) < new Date()) {
        console.log("Token has expired");
        res.status(401).send();
        return;
    }

    if (jwt.iss !== "student-api") {
        console.log("Wrong Iss");
        res.status(401).send();
        return;
    }

    if (jwt.ip !== req.ip) {
        console.log("Wrong IP");
        res.status(401).send();
        return;
    }

    if (jwt.ua !== req.headers["user-agent"]) {
        console.log('Wrong UA');
        res.status(401).send();
        return;
    }

    if (jwt.role === "admin") {
        const adminUser = UserService.getUserById(jwt.sub);

        if (adminUser == null) {
            console.log('User dose not exist');
            res.status(401).send();
            return;
        }


    } else{
        console.log('Unknow role');
        res.status(401).send();
        return;
    }

    const accessToken = createJWT(jwt.iss, parseInt(process.env.ACCESS_DURATION!),"access", jwt.sub, jwt.role, jwt.ip, jwt.ua, process.env.SECRET!)
    const refreshToken = createJWT(jwt.iss, parseInt(process.env.REFRESH_DURATION!),"refresh", jwt.sub, jwt.role, jwt.ip, jwt.ua, process.env.SECRET!)

    res.json({
        access: accessToken,
        refresh: refreshToken
    })

})


export default route
