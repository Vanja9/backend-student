import { Router } from "express";
import { StudentService } from "../services/student.service";
import { isDefined, sendErrorResponse } from "../utils";

const route = Router();

route.get('/', async function (req, res) {
    res.json(await StudentService.getAllStudents())
})

route.get('/search/:brIndeksa', async function (req, res) {
    const brIndeksa = req.params.brIndeksa
    const data = await StudentService.getStudentByBrIndeksa(brIndeksa)
    isDefined(data, res)
})

route.get('/:id', async function (req, res) {
    const id = req.params.id;
    const data = await StudentService.getStudentById(Number.parseInt(id))
    isDefined(data, res)
})

route.post('/', async function (req, res) {
    try {
        const data = req.body;
        res.json(await StudentService.saveStudent(data))
    } catch (e) {
        sendErrorResponse(e, res);
    }
})

route.put('/:id', async function (req, res) {
    const id = req.params.id;
    const student = req.body;
    res.json(await StudentService.updateStudent(Number.parseInt(id), student))
})

route.delete('/:id', async function (req, res) {
    const id = req.params.id;
    await StudentService.deleteStudent(Number.parseInt(id))
    res.status(204).send();
})

export default route;