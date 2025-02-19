import Field from "../models/field.model.js";
import Course from "../models/courses.model.js";
import {
  fieldValidation,
  fieldValidationUpdate,
} from "../validations/field.validation.js";
import { Op, where } from "sequelize";

export const create = async (req, res) => {
  try {
    const { error } = fieldValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newField = await Field.create(req.body);
    res.status(201).json(newField);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAll = async (req, res) => {
  try {
    let { search, page, limit } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` }; // Mashini insetitive qilib ketildi!
    }

    const pageSize = limit ? parseInt(limit) : 10;
    const pageNumber = page ? parseInt(page) : 1;

    const fields = await Field.findAndCountAll({
      where: whereClause,
      include: [{ model: Course, attributes: ["id", "name", "image", "type"] }],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });

    res.status(200).json({
      total: fields.count,
      page: pageNumber,
      pageSize: pageSize,
      data: fields,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await Field.findByPk(id, {
      include: [{ model: Course }],
    });

    if (!field) return res.status(404).json({ message: "Field not found" });

    res.status(200).json(field);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = fieldValidationUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const field = await Field.findByPk(id);
    if (!field) return res.status(404).json({ message: "Field not found" });

    await field.update(req.body, {where: {id}});
    res.status(200).json(field);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const field = await Field.findByPk(id);
    if (!field) return res.status(404).json({ message: "Field not found" });

    await field.destroy(id);
    res.status(200).json({ message: "Field deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
