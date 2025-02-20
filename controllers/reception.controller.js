import Branch from '../models/branches.model.js';
import EducationalCentre from '../models/educationalCenter.model.js';
import Field from '../models/field.model.js';
import Reception from '../models/reception.model.js';
import Users from '../models/users.model.js';
import { receptionValidation, receptionValidationUpdate } from '../validations/reception.validation.js';

async function findAll(req, res) {
    try {
        const findAll = await Reception.findAll({ include: [{ model: Field }, { model: Users }, { model: Branch }, { model: EducationalCentre }] });
        if (!findAll.length) {
            return res.status(404).send({ message: 'Receptions are empty ❗' });
        }
        res.status(200).send({ data: findAll });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function create(req, res) {
    try {
        let body = req.body;
        const { error, value } = receptionValidation(body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        let createReceptions = await Reception.create(value);
        res.status(200).send({ message: 'Reception created successfully', data: createReceptions });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function findOne(req, res) {
    try {
        let { id } = req.params;
        const findOneReception = await Reception.findByPk(id, { include: [{ model: Field }, { model: Users }, { model: Branch }, { model: EducationalCentre }] });
        if (!findOneReception) {
            return res.status(404).send({ message: 'Reception not found ❗' });
        }

        res.status(200).send({ data: findOneReception });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function update(req, res) {
    try {
        let { id } = req.params;
        let body = req.body;

        const { error, value } = receptionValidationUpdate(body);
        if (error) {
            return res.status(404).send({ message: error.details[0].message });
        }

        const updateReception = await Reception.update(value, { where: { id } });
        if (!updateReception) {
            return res.status(404).send({ message: 'Reception not found ❗' });
        }

        let result = await Reception.findByPk(id);
        res.status(200).send({ message: 'Reception updated successfully', data: result });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params;
        const deleteReception = await Reception.destroy({ where: { id } });
        if (!deleteReception) {
            return res.status(404).send({ message: 'Reception not found ❗' });
        }
        res.status(200).send({ message: 'Reception deleted successfully' });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

export { findAll, create, findOne, update, remove };