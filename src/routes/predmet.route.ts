import { Router } from "express";
import { PredmetService } from "../services/predmet.service";
import { isDefined, sendErrorResponse } from "../utils";
import { authMiddleware } from "../middlewares/auth.middleware";

const route = Router();

route.post('/',async function(req,res){
    
    try {
        const data = req.body;
        res.json(await PredmetService.createPredmet(data))
    } catch (e) {
        sendErrorResponse(e, res);
    }
 })

 route.put('/:id', async function (req, res) {
    const id = req.params.id;
    const student = req.body;
    res.json(await PredmetService.updatePredmet(Number.parseInt(id), student))
})

route.delete('/:id', async function (req, res) {
    const id = req.params.id;
    await PredmetService.deletePredmet(Number.parseInt(id))
    res.status(204).send();
})

route.get('/espb/:espb',async function (req,res){
    const espb = req.params.espb
    res.json(await PredmetService.getPredmetsWhereESPB(Number.parseInt(espb)))
})

route.get('/:id',async function(req,res){
   const id =  req.params.id
   const data = await PredmetService.getPredmetById(Number.parseInt(id))
   isDefined(data, res)
    
})

 route.use(authMiddleware)

 route.get('/',async function(req,res){
    res.json(await PredmetService.getAllPredmets());
})



 

export default route;