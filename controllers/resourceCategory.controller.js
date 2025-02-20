import ResourceCategory from "../models/resourceCategory.model.js";
import {
  resourceCategoryValidation,
  resourceCategoryValidationUpdate,
} from "../validations/resourceCategory.validation.js";

const create = async (req, res) => {
  try {
    const { error } = resourceCategoryValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const newCategory = await ResourceCategory.create(req.body);
    res.status(200).send({ data: newCategory });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

const getAll = async (req, res) => {
  try {
    const categories = await ResourceCategory.findAll();
    if (!categories.length) {
      return res.status(400).send({ messsage: 'ResourceCategories are empty ❗' });
    }
    res.status(200).send({ data: categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ResourceCategory.findByPk(id);

    if (!category)
      return res.status(404).json({ message: "ResourceCategory not found" });

    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = resourceCategoryValidationUpdate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const category = await ResourceCategory.findByPk(id);
    if (!category)
      return res.status(404).json({ message: "ResourceCategory not found" });

    await category.update(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ResourceCategory.findByPk(id);
    if (!category)
      return res.status(404).json({ message: "ResourceCategory not found" });

    await category.destroy();
    res.status(200).json({ message: "ResourceCategory deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getAll, getOne, create, update, remove };