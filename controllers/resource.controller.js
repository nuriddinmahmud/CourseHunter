import Resource from '../models/resource.model.js';
import {resourceValidation, resourceValidationUpdate } from '../validations/resource.validation.js';

async function findAll(req, res) {
    try {
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

async function create(req, res) {
    try {
        const body = req.body;
        const { error, value } = resourceValidation(body);
        if(error) {
            return res.status(400).send({message: error.details[0].message});
        }
        const createResources = await Resource.create(value);
        res.status(200).send({message: 'Resource created successfully', data: createResources});
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

async function findOne(req, res) {
    try {
        
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

async function update(req, res) {
    try {
        
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

async function remove(req, res) {
    try {
        
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

export { findAll, create, findOne, update, remove };