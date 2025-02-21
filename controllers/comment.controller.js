import EducationalCentre from "../models/educationalCenter.model.js";
import Users from "../models/users.model.js";
import {
  commentValidation,
  commentValidationUpdate,
} from "../validations/comment.validation.js";
import Comment from "../models/comment.model.js"
import { Sequelize } from "sequelize"

async function getPaginatedComments(req, res) {
  try {
    let { page, limit } = req.query;
    let comments = await Comment.findAll(
      {
        offset: (+page - 1) * +limit,
        limit: +limit,
      },
      { include: [{ model: EducationalCentre }, { model: Users }] }
    );
    res.status(200).send({ data: comments });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getAll(req, res) {
  try {
    let comments = await Comment.findAll({
      include: [{ model: EducationalCentre, attributes: ['id', 'name', 'image', 'address', 'userID', 'regionID', 'phone'] }, {
        model: Users, attributes: ["id", "firstName", "lastName", "email", "password", "phone", "role", "avatar", "status"]
      }]
    });
    if (!comments.length) {
      return res.status(401).send({ msg: "Not found!" });
    }
    res.status(200).send({ data: comments });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getOne(req, res) {
  try {
    let { id } = req.params;
    let comment = await Comment.findByPk(id, {
      include: [{ model: EducationalCentre }, { model: Users }],
    });
    if (!comment) {
      return res.status(401).send({ msg: "Not found!" });
    }
    res.status(200).send({ data: comment });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function create(req, res) {
  try {
    let userID = req.user.id

    let body = req.body;
    let { error } = commentValidation(body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let newComment = await Comment.create({
      ...body, userID
    });
    res.status(200).send({ data: newComment });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function update(req, res) {
  try {
    let { id } = req.params;
    let body = req.body;
    let { error } = commentValidationUpdate(body);
    if (error) {
      res.status(400).send(error.details[0].message);
    }
    await Comment.update(body, { where: { id } });
    res.status(200).json({ message: "Successfully updated!!!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function remove(req, res) {
  try {
    let { id } = req.params;
    await Comment.destroy({ where: { id } });
    res.status(200).json({ msg: "Successfully deleted!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getBySearch(req, res) {
  try {
    let query = req.query;
    let keys = Object.keys(query);
    let values = Object.values(query);

    let newQuery = {};

    values.forEach((val, index) => {
      if (val) {
        newQuery[keys[index]] = val;
        return;
      }
    });
    let comments = await Comment.findAll(
      { where: newQuery },
      { include: [{ model: EducationalCentre }, { model: Users }] }
    );
    if (!comments.length) {
      return res.status(400).send({ msg: "Not found!!!" });
    }
    res.status(200).send({ data: comments });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function sortByStar(req, res) {
  try {
    let { star } = req.query;
    let comments = await Comment.findAll(
      {
        order: [["star", star]],
      },
      { include: [{ model: EducationalCentre }, { model: Users }] }
    );
    res.status(200).send({ data: comments });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function sortByCreatedDate(req, res) {
  try {
    let { date } = req.query;
    let comments = await Comment.findAll(
      {
        order: [["createdAt", date]],
      },
      { include: [{ model: EducationalCentre }, { model: Users }] }
    );
    res.status(200).send({ data: comments });
  } catch (error) {
    res.status(400).send(error.message);
  }
}


async function sortCommenstCount(req, res) {
  try {
    const result = await Comment.findAll({
      attributes: ['Comment.educationalCentreID',
        [Sequelize.fn('COUNT', Sequelize.col('Comment.educationalCentreID')), 'commentCount']],
      include: [
        {
          attributes: ['name', 'address', 'image'],
          model: EducationalCentre,
        }
      ],
      group: ['Comment.educationalCentreID'],
      order: [[Sequelize.fn('COUNT', Sequelize.col('Comment.educationalCentreID')), 'DESC']]
    });

    const sortedComments = result.map(item => ({
      educationalCentreID: item.get('Comment.educationalCentreID'),
      educationalCentreName: item.EducationalCentre ? item.EducationalCentre.name : null,
      educationalCentreAddress: item.EducationalCentre ? item.EducationalCentre.address : null,
      educationalCentreImage: item.EducationalCentre ? item.EducationalCentre.image : null,
      commentCount: item.get('commentCount')
    }));

    return res.json(sortedComments);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: error.message });
  }
}

export { getAll, getBySearch, getOne, getPaginatedComments, create, update, remove, sortByStar, sortByCreatedDate, sortCommenstCount }
