import { Router } from "express";
import { OcenaService } from "../services/ocena.service";
import {isDefined, sendErrorResponse} from "../utils"
 const route = Router();


 route.get('/', async function (req, res) {
    res.json(await OcenaService.getAllOcenas())
 })


route.get('/predmet/:id', async function(req,res){
    const id = req.params.id
    const data = await OcenaService.getOcenaByPredmet(Number.parseInt(id))
    isDefined(data, res)
})



route.post('/', async function(req,res){

    try{
        const data = req.body
        res.json(await OcenaService.createOcena(data))
    } catch(e){
        sendErrorResponse(e, res)
    }
})

route.put('/predmet/:id', async function(req, res){
    const id = req.params.id
    const student = req.body
    res.json(await OcenaService.updateOcena(Number.parseInt(id), student))
})







export default route