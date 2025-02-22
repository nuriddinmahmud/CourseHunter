import EducationalCentre from "../models/educationalCenter.model.js";
import Region from "../models/regions.model.js";
import Users from "../models/users.model.js";
import {
  educationalCenterValidationUpdate,
  educationCenterValidation,
} from "../validations/educationalCenter.validation.js";

async function getPaginatedEducationalCentres(req, res) {
  try {
    let { page, limit } = req.query;
    let educationalCenters = await EducationalCentre.findAll(
      {
        offset: (+page - 1) * +limit,
        limit: +limit,
      },
      { include: [{ model: Users, attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"] }, { model: Region }] }
    );
    res.status(200).send({ data: educationalCenters });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getAll(req, res) {
  try {
    let educationalCenters = await EducationalCentre.findAll({attributes: ["id", "name", "image", "address", "phone", "createdAt", "updatedAt"], include: [{ model: Users, attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"] }, { model: Region, attributes: ["id", "name", "createdAT", "updatedAt"]}]});
    if (!educationalCenters.length) {
      return res.status(200).send({ msg: "Empty" });
    }
    res.status(200).send({ data: educationalCenters });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function getOne(req, res) {
  try {
    let { id } = req.params;
    let educationalCenter = await EducationalCentre.findByPk(id, {
      attributes: ["id", "name", "image", "address", "phone", "createdAt", "updatedAt"],
      include: [{ model: Users, attributes: ["id", "firstName", "lastName", "email", "phone", "role", "avatar", "status"] }, { model: Region, attributes: ["id", "name", "createdAt", "updatedAt"]}],
    });
    if (!educationalCenter) {
      return res.status(404).send({ msg: "EducationalCentre not found ❗" });
    }
    res.status(200).send({ data: educationalCenter });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function create(req, res) {
  try {
    let body = req.body;
    let { role, id } = req.user;
    let { error, value } = educationCenterValidation(body);
    if (error) {
      return res.status(422).send({message: error.details[0].message});
    }

    if (role === "Ceo" || role == "Admin") {
      let newEducationalCenter = await EducationalCentre.create({ ...value, userID: id });
      res.status(200).send({ message: "Created successfully✅", data: newEducationalCenter });
    } else {
      res.status(405).send({ message: 'Not permission. Only Ceo and Admin can create Educational Centre' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function update(req, res) {
  try {
    let { id } = req.params;
    let { role } = req.user;
    let body = req.body;
    let { error, value } = educationalCenterValidationUpdate(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (role == "Admin" || role == "Ceo") {
      let [updateCentre] = await EducationalCentre.update(value, { where: { id }});
      if(!updateCentre) {
        return res.status(404).send({message: "Educational Centre not found ❗"});
      }

      let result = await EducationalCentre.findByPk(id, {attributes: ["id", "name", "image", "address", "phone", "createdAt", "updatedAt"]});
      res.status(200).send({ message: "Successfully updated!!!", data: result});
    } else {
      res.status(405).send({ message: 'Not permission. Only Ceo and Admin can update Educational Centre' });
    }
  } catch (error) {
    res.status(500).send({message: error.message});
  }
}

async function remove(req, res) {
  try {
    let { id } = req.params;
    let { role } = req.user;

    if (role == "Admin" || role == "Ceo") {
      let deleteCentres = await EducationalCentre.destroy({ where: { id } });
      if(!deleteCentres) {
        return res.status(404).send({message: "Educational Centre not found ❗"});
      }
      res.status(200).json({ msg: "Successfully deleted!" });
    } else {
      res.status(405).send({ message: 'Not permission. Only Ceo and Admin can delete Educational Centre' });
    }
  } catch (error) {
    res.status(500).send(error.message);
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

    let educationalCenters = await EducationalCentre.findAll(
      { where: newQuery },
      { include: [{ model: Users }, { model: Region }] }
    );
    if (!educationalCenters.length) {
      return res.status(400).send({ msg: "Not found!!!" });
    }
    res.status(200).send({ data: educationalCenters });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function sortByName(req, res) {
  try {
    let { name } = req.query;
    let educationalCenters = await EducationalCentre.findAll(
      {
        order: [["name", name]],
      },
      { include: [{ model: Users}, { model: Region }] }
    );
    res.status(200).send({ data: educationalCenters });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function sortByAddress(req, res) {
  try {
    let { address } = req.query;
    let educationalCenters = await EducationalCentre.findAll(
      {
        order: [["address", address]],
      },
      { include: [{ model: Users }, { model: Region }] }
    );
    res.status(200).send({ data: educationalCenters });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export {
  getAll,
  getBySearch,
  getOne,
  getPaginatedEducationalCentres,
  sortByAddress,
  sortByName,
  create,
  update,
  remove,
};
