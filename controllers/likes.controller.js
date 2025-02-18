import { Sequelize } from "sequelize"
import EducationalCentre from "../models/educationalCenter.model.js"
import Likes from "../models/likes.model.js"
import Users from "../models/users.model.js"
import { likesValidation } from "../validations/likes.validation.js"

async function getPaginatedLikes(req, res) {
    try {
        let { page, limit } = req.query;
        let likes = await Likes.findAll({
            offset: (+page - 1) * +limit,
            limit: +limit,
        });
        res.status(200).send({ data: likes });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getAll(req, res) {
    try {
        let likes = await Likes.findAll({
            include: [{ model: Users }, { model: EducationalCentre }],
        });
        if (!likes.length) {
            return res.status(404).send({ msg: "Not found!" });
        }
        res.status(200).send({ data: likes });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getOne(req, res) {
    try {
        let { id } = req.params;
        let like = await Likes.findByPk(id, {
            include: [{ model: Users }, { model: EducationalCentre }],
        });
        if (!like) {
            return res.status(404).send({ msg: "Not found!" });
        }
        res.status(200).send({ data: like });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function create(req, res) {
    try {
        let body = req.body;
        let { error } = likesValidation(body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        let newLike = await Likes.create(body);
        res.status(200).send(newLike);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function remove(req, res) {
    try {
        let { id } = req.params;
        await Likes.destroy({ where: { id } });
        res.status(200).json({ msg: "Successfully deleted!" });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


async function sortLikesCount(req, res) {
    try {
        const result = await Likes.findAll({
            attributes: ['educationalCentreID',
                [Sequelize.fn('COUNT', Sequelize.col('educationalCentreID')), 'likeCount']],
            group: ['educationalCentreID'],
            order: [[Sequelize.fn('COUNT', Sequelize.col('educationalCentreID')), 'DESC']]
        });

        const sortedLikes = result.map(item => ({
            educationalCentreID: item.get('educationalCentreID'),
            likeCount: item.get('likeCount')
        }));

        return res.json(sortedLikes);
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: error.message });
    }
}

async function getBySearch(req, res) {
    try {
        let query = req.query
        let keys = Object.keys(query)
        let values = Object.values(query)
        let newQuery = {};

        values.forEach((val, index) => {
            if (val) {
                newQuery[keys[index]] = val;
                return;
            }
        });
        let likes = await Likes.findAll(
            { where: newQuery },
            { include: [{ model: Users }, { model: EducationalCentre }] }
        );
        if (!likes.length) {
            return res.status(400).send({ msg: "Not found!!!" });
        }
        res.status(200).send({ data: likes });
    } catch (error) {
        res.status(400).send(error.message);
    }
}


async function sortByLikes(req, res) {
    try {
        let { name } = req.query
        let likes = await Likes.findAll({
            order: [['name', name]]
        })
        res.status(200).send({ data: likes })
    } catch (error) {
        res.status(400).send(error.message)
    }
}


export { getAll, getOne, getPaginatedLikes, getBySearch, create, remove, sortByLikes, sortLikesCount };
