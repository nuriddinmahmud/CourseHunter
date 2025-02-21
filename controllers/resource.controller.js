import Resource from '../models/resource.model.js';
import ResourceCategory from '../models/resourceCategory.model.js';
import Users from '../models/users.model.js';
import {resourceValidation, resourceValidationUpdate } from '../validations/resource.validation.js';

async function findAll(req, res) {
    try {
        const findAllResource = await Resource.findAll({include:[ {model: ResourceCategory, attributes: ["id", "name", "image", "createdAt", "updatedAt"]}, 
            {model: ResourceCategory, attributes: ["id", "name",  "image"]},
            {model: Users, attributes: {exclude: ['password', 'status']}}
        ]});
        if(!findAllResource.length) {
            return res.status(200).send({message: "Resources are empty ❗"});
        }
        res.status(200).send({data: findAllResource});
    } catch (error) {
        res.status(400).send({message_error: error.message});
    }
}

async function create(req, res) {
    try {
        const body = req.body;
        const createdBy = req.user.id
        const { error, value } = resourceValidation(body);
        if(error) {
            return res.status(422).send({message: error.details[0].message});
        }
        const createResources = await Resource.create({...value, createdBy});
        res.status(200).send({message: "Resource created successfully", data: createResources});
    } catch (error) {
        res.status(400).send({message_error: error.message});
    }
}

async function findOne(req, res) {
    try {
        let { id } = req.params;
        const findOneResource = await Resource.findByPk(id, {include:[
            {model: ResourceCategory, attributes: ["id", "name", "image", "createdAt", "updatedAt"]}, 
            {model: ResourceCategory, attributes: ["id", "name",  "image"]},
            {model: Users, attributes: {exclude: ['password', 'status']}}]
        });
        if(!findOneResource) {
            return res.status(404).send({message: "Resource not found ❗"});
        }

        res.status(200).send({data: findOneResource});
    } catch (error) {
        res.status(400).send({message_error: error.message});
    }
}

async function update(req, res) {
    try {
        let { id } = req.params;
        let { error, value } = resourceValidationUpdate(req.body);

        if(error) {
            return res.status(422).send({message: error.details[0].message});
        }

        const updateResource = await Resource.update(value, {where: {id}});

        if(!updateResource) {
            return res.status(404).send({message: 'Resource not found ❗'});
        }

        const result = await Resource.findByPk(id);
        res.status(200).send({message: 'Resource updated successfully', data: result});
    } catch (error) {
        res.status(400).send({message_error: error.message});
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params;
        const deleteResource = await Resource.destroy({where: {id}});
        if(!deleteResource) {
            return res.status(404).send({message: "Resource not found ❗"});
        }

        res.status(200).send({message: 'Resource deleted successfully'});
    } catch (error) {
        res.status(400).send({message_error: error.message});
    }
}

export { findAll, create, findOne, update, remove };
