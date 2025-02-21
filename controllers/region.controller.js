import Region from "../models/regions.model.js";
import { regionValidation } from "../validations/region.validation.js";

async function getPaginatedRegions(req, res) {
  try {
    let { page, limit } = req.query;
    let regions = await Region.findAll({
      offset: (+page - 1) * +limit,
      limit: +limit,
    });
    res.status(200).send({ data: regions });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getAll(req, res) {
  try {
    let regions = await Region.findAll();
    if (!regions.length) {
      return res.status(200).send({ msg: "Empty ❗" });
    }
    res.status(200).send({ data: regions });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getOne(req, res) {
  try {
    let { id } = req.params;
    let region = await Region.findByPk(id);
    if (!region) {
      return res.status(401).send({ msg: "Not found!" });
    }
    res.status(200).send({ data: region });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function create(req, res) {
  try {
    let body = req.body;
    let { error } = regionValidation(body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    let newRegion = await Region.create(body);
    res
      .status(200)
      .send({ msg: "Region created seccesed ✅", data: newRegion });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function update(req, res) {
  try {
    let { id } = req.params;
    await Region.update(req.body, { where: { id } });

    const Result = await Region.findByPk(id);
    res.status(200).json({ message: "Successfully updated!!!", data: Result });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function remove(req, res) {
  try {
    let { id } = req.params;
    await Region.destroy({ where: { id } });

    res.status(200).json({ msg: "Successfully deleted!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function sortByName(req, res) {
  try {
    let { name } = req.query;
    let regions = await Region.findAll({
      order: [["name", name]],
    });
    res.status(200).send({ data: regions });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

async function getBySearch(req, res) {
  try {
    console.log("Query params:", req.query);

    let query = req.query;

    if (!Object.keys(query).length) {
      return res.status(400).send({ msg: "Search query is required" });
    }

    let newQuery = Object.entries(query)
      .filter(([_, val]) => val)
      .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

    let regions = await Region.findAll({ where: newQuery });

    if (!regions.length) {
      return res.status(404).send({ msg: "Not found!!!" });
    }

    res.status(200).send({ data: regions });
  } catch (error) {
    console.error("Error in getBySearch:", error);
    res.status(500).send({ msg: "Internal Server Error", error: error.message });
  }
}


export {
  getAll,
  getBySearch,
  getOne,
  create,
  update,
  remove,
  sortByName,
  getPaginatedRegions,
};
