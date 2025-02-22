import Course from '../models/courses.model.js';
import { coursesValidation, coursesValidationUpdate } from '../validations/courses.validation.js';

async function findAll(req, res) {
    try {
        const findAllCourses = await Course.findAll();
        res.status(200).send({ data: findAllCourses });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function create(req, res) {
    try {
        let body = req.body;
        const { error, value } = coursesValidation(body);
        if (error) {
            return res.status(403).send({ message: error.details[0].message });
        }

        const createCourse = await Course.create(value);
        res.status(200).send({ message: 'Course created succesfully', data: createCourse });        
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function findOne(req, res) {
    try {
        let { id } = req.params;
        let findOneCourse = await Course.findByPk(id);
        if (!findOneCourse) {
            return res.status(404).send({ message: 'Course not found ❗' });
        }
        res.status(200).send({ data: findOneCourse });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function update(req, res) {
    try {
        let { id } = req.params;
        const { error, value } = coursesValidationUpdate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        let updateCourses = await Course.update(value, { where: { id } });
        if (!updateCourses[0]) {
            return res.status(404).send({ message: 'Course not found ❗' });
        }

        let result = await Course.findByPk(id);
        res.status(200).send({ message: 'Course updated successfully', data: result });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params;
        const deleteCourse = await Course.destroy({ where: { id } });
        if (!deleteCourse) {
            return res.status(404).send({ message: 'Course not found ❗' });
        }
        res.status(200).send({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

export { findAll, create, findOne, update, remove };