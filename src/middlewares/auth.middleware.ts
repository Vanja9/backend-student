import { NextFunction, Request, Response } from 'express'
import { decodeJWT } from '../misc/jwt';
import { UserService } from '../services/user.service';


export function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers.authorization;
    const userService = new UserService

    if (authHeader == null) {
        console.log("Missing header");
        res.status(401).send();
        return;
    }

    const part = authHeader.split(' ');

    if (part.length != 2) {
        console.log("Parts not equal to 2");
        res.status(401).send;
        return;


    }

    const token = part[1];

    const jwt = decodeJWT(token, process.env.SECRET!);

    if (jwt == null) {
        console.log("Cannot decode jwt")
        res.status(401).send();
        return;
    }

    if (jwt.typ !== "access") {
        console.log("Not access token");
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



    next();
}