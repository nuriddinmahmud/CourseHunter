import Branch from "../models/branches.model.js";
import Region from "../models/regions.model.js";
import { branchesValidation, branchesValidationUpdate } from "../validations/branches.validation.js";
import { Op } from "sequelize";

const create = async (req, res) => {
  try {
    const { error, value } = branchesValidation(req.body);
    if (error) return res.status(422).send({ error: error.details[0].message });

    const newBranch = await Branch.create(value);
    res.status(200).send({data: newBranch});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    let { search, page, limit, regionID } = req.query;
    let whereClause = {};

    if (search) {
      whereClause.name = { [Op.iLike]: `%${search}%` };
    }
    if (regionID) {
      whereClause.regionID = regionID;
    }

    const pageSize = limit ? parseInt(limit) : 10;
    const pageNumber = page ? parseInt(page) : 1;

    const branches = await Branch.findAndCountAll({
      where: whereClause,
      include: [{ model: Region, attributes: ["id", "name", "createdAt", "updatedAt"] }],
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
    });

    res.status(200).json({
      total: branches.count,
      page: pageNumber,
      pageSize: pageSize,
      data: branches.rows,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findByPk(id, {
      include: [{ model: Region, attributes: ["id", "name", "createdAt", "updatedAt"] }],
    });

    if (!branch) return res.status(404).json({ message: "Branch not found" });

    res.status(200).send({data: branch});
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = branchesValidationUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let updateBranch = await Branch.update(value, {where: {id}});
    if(!updateBranch) {
      return res.status(404).send({message: "Branch not found ❗"});
    }
    
    const result = await Branch.findByPk(id);
    res.status(200).send({data: result});
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    let deleteBranch = await Branch.destroy({where: {id}});
    if(!deleteBranch) {
      return res.status(404).send({message: "Branch not found ❗"});
    }
    
    res.status(200).send({ message: "Branch deleted successfully" });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

export { create, getAll, getOne, update, remove }
