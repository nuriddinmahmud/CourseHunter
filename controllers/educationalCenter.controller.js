import EducationalCentre from "../models/educationalCenter.model.js"
import Region from "../models/regions.model.js"
import User from "../models/users.model.js"
import { educationalCenterValidationUpdate, educationCenterValidation } from "../validations/educationalCenter.validation.js"

async function getPaginatedEducationalCentres(req, res) {
    try {
        let { page, limit } = req.query
        let educationalCenters = await EducationalCentre.findAll({
            offset: (+page - 1) * +limit,
            limit: +limit,
        }, { include: [{ model: User }, { model: Region }] })
        res.status(200).send({ data: educationalCenters })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function getAll(req, res) {
    try {
        let educationalCenters = await EducationalCentre.findAll({ include: [{ model: User }, { model: Region }] })
        if (!educationalCenters.length) {
            return res.status(401).send({ msg: "Not found!" })
        }
        res.status(200).send({ data: educationalCenters })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params
        let educationalCenter = await EducationalCentre.findByPk(id, { include: [{ model: User }, { model: Region }] })
        if (!educationalCenter) {
            return res.status(401).send({ msg: "Not found!" })
        }
        res.status(200).send({ data: educationalCenter })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function create(req, res) {
    try {
        let body = req.body
        let { error } = educationCenterValidation(body)
        if (error) {
            return res.status(400).send(error.details[0].message)
        }
        const uploadPath = `./uploads/${req.file.filename}`;
        let newEducationalCenter = await Region.create({...body, image: uploadPath})
        res.status(200).send(newEducationalCenter)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function update(req, res) {
    try {
        let { id } = req.params
        let body = req.body
        let { error } = educationalCenterValidationUpdate(body)
        if (error) {
            res.status(400).send(error.details[0].message)
        }
        await Region.update(body, { where: { id } })
        res.status(200).json({ message: "Successfully updated!!!" })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params
        await EducationalCentre.destroy({ where: { id } })
        res.status(200).json({ msg: "Successfully deleted!" })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function getBySearch(req, res) {
    try {
        let query = req.query
        let keys = Object.keys(query)
        let values = Object.values(query)

        let newQuery = {}

        values.forEach((val, index) => {
            if (val) {
                newQuery[keys[index]] = val
                return
            }
        })
        let educationalCenters = await EducationalCentre.findAll({ where: newQuery }, { include: [{ model: User }, { model: Region }] })
        if (!educationalCenters.length) {
            return res.status(400).send({ msg: "Not found!!!" })
        }
        res.status(200).send({ data: educationalCenters })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function sortByName(req, res) {
    try {
        let { name } = req.query
        let educationalCenters = await EducationalCentre.findAll({
            order: [['name', name]]
        }, { include: [{ model: User }, { model: Region }] })
        res.status(200).send({ data: educationalCenters })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

async function sortByAddress(req, res) {
    try {
        let { address } = req.query
        let educationalCenters = await EducationalCentre.findAll({
            order: [['address', address]]
        }, { include: [{ model: User }, { model: Region }] })
        res.status(200).send({ data: educationalCenters })
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export { getAll, getBySearch, getOne, getPaginatedEducationalCentres, sortByAddress, sortByName, create, update, remove }
