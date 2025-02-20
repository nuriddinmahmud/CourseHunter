import CollabField from '../models/collabField.model.js';

async function create(req, res) {
    try {
        let body = req.body;
        const createCollabField = await CollabField.create(body);
        res.status(200).send({message: 'Created CollabField successfully', data: createCollabField});
    } catch (error) {
        res.status(500).send({error_message: error.message});
    }
}

export { create };
