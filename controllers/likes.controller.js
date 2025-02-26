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
            include: [{ model: Users, attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"] },
            { model: EducationalCentre, attributes: ['id', 'name', 'image', 'address', 'userID', 'regionID', 'phone'] }],
        });
        res.status(200).send({ data: likes });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

async function getAll(req, res) {
    try {
        let likes = await Likes.findAll({
            include: [{ model: Users, attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"] },
            { model: EducationalCentre, attributes: ['id', 'name', 'image', 'address', 'userID', 'regionID', 'phone'] }],
        });
        if (!likes.length) {
            return res.status(404).send({ msg: "Empty !" });
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
            include: [{ model: Users, attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"] },
            { model: EducationalCentre, attributes: ['id', 'name', 'image', 'address', 'userID', 'regionID', 'phone'] }],
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
        let userID = req.user.id
        let { error } = likesValidation(body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        let newLike = await Likes.create({ ...body, userID });
        res.status(200).send({ msg: "Likes created succesfully ✅", data: newLike });
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
        console.log(1);
        
        const result = await Likes.findAll({
            attributes: ['Likes.educationalCentreID',
                [Sequelize.fn('COUNT', Sequelize.col('Likes.educationalCentreID')), 'likeCount']],
            include: [
                {
                    attributes: ['name', 'address', 'image'],
                    model: EducationalCentre,
                }
            ],
            group: ['Likes.educationalCentreID'],
            order: [[Sequelize.fn('COUNT', Sequelize.col('Likes.educationalCentreID')), 'DESC']]
        });

        const sortedLikes = result.map(item => ({
            educationalCentreID: item.get('Likes.educationalCentreID'),
            educationalCentreName: item.EducationalCentre ? item.EducationalCentre.name : null,
            educationalCentreAddress: item.EducationalCentre ? item.EducationalCentre.address : null,
            educationalCentreImage: item.EducationalCentre ? item.EducationalCentre.image : null,
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
            {
                include: [{ model: Users, attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"] },
                { model: EducationalCentre, attributes: ['id', 'name', 'image', 'address', 'regionID', 'phone'] }],
            }
        );
        if (!likes.length) {
            return res.status(400).send({ msg: "Not found!!!" });
        }
        res.status(200).send({ data: likes });
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export { getAll, getOne, getPaginatedLikes, getBySearch, create, remove, sortLikesCount };
