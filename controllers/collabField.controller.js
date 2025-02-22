import CollabField from '../models/collabField.model.js';
import collabFieldValidation from '../validations/collabField.validation.js';

async function create(req, res) {
    try {
        let body = req.body;
        let { error, value } = collabFieldValidation(body);
        if(error) {
            return res.status(422).send({message: error.details[0].message});
        }

        const createCollabField = await CollabField.create(value);
        res.status(200).send({ message: 'Created CollabField successfully', data: createCollabField });
    } catch (error) {
        res.status(500).send({ error_message: error.message });
    }
}

export { create };
