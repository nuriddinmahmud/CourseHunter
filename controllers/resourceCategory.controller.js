import ResourceCategory from "../models/resourceCategory.model.js";
import {
  resourceCategoryValidation,
  resourceCategoryValidationUpdate,
} from "../validations/resourceCategory.validation.js";
import path from "path";
import fs from 'fs';

const deleteOldImage = (imgPath) => { 
  if (imgPath) { 
    const fullPath = path.join("uploads", imgPath); 
    if (fs.existsSync(fullPath)) { 
      fs.unlinkSync(fullPath); 
    } 
  } 
};

const create = async (req, res) => {
  try {
    const { error, value } = resourceCategoryValidation(req.body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }
    const newCategory = await ResourceCategory.create(value);
    res.status(200).send({message: "ResourceCategory created successfully", data: newCategory });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const findAllCategory = await ResourceCategory.findAll();
    if(!findAllCategory.length) {
        return res.status(200).send({message: "ResourceCategories are empty ❗"});
    }
    res.status(200).send({data: findAllCategory});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const findOneResourceCategory = await ResourceCategory.findByPk(id);

    if (!findOneResourceCategory){
      return res.status(404).send({ message: "ResourceCategory not found ❗" });
    }

    res.status(200).send({data: findOneResourceCategory});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, value } = resourceCategoryValidationUpdate(req.body);
    if (error) {
      return res.status(422).send({ message: error.details[0].message });
    }

    let findCategory = await ResourceCategory.findByPk(id);
    if(findCategory.image) {
      deleteOldImage(findCategory.image);
    }

    let updateResourceCategory = await ResourceCategory.update(value, {where: {id}});
    if (!updateResourceCategory) {
      return res.status(404).send({ message: "ResourceCategory not found ❗" });
    }

    let result = await ResourceCategory.findByPk(id);
    res.status(200).send({message: "ResourceCategory updated successfully", data: result});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;
    let findCategory = await ResourceCategory.findByPk(id);
    if(findCategory.image) {
      deleteOldImage(findCategory.image);
    } 

    let deleteResourceCategory = await ResourceCategory.destroy({where: {id}});

    if(!deleteResourceCategory) {
      return res.status(404).send({messsage: 'ResourceCategory not found ❗'});
    }

    res.status(200).send({message: 'ResourceCategory deleted successfully'});
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

export { getAll, getOne, create, update, remove };