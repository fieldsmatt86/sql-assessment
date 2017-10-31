module.exports = {

    getUsers:(req, res, next) => {
        let db = req.app.get('db');

        db.queries.get_users()
        .then(users => res.status(200).send(users))
        .catch(() => res.status(500).send());
    },
    getVehicles:(req, res, next) => {
        let db = req.app.get('db');

        db.queries.get_vehicles()
        .then(vehicles => res.status(200).send(vehicles))
        .catch(() => res.status(500).send());
    },
    createUser:(req, res, next) => {
        let db = req.app.get('db');
        let {name, email} = req.body;

        db.queries.create_user([name, email])
        .then(users => res.status(200).send(users))
        .catch(() => res.status(500).send());
    },
    addVehicle:(req, res, next) => {
        let db = req.app.get('db');
        let {make, model, year, owner_id} = req.body;

        db.queries.add_vehicle([make, model, year, owner_id])
        .then(vehicles => res.status(200).send(vehicles))
        .catch(() => res.status(500).send());
    },
    vehicleCountByOwner:(req, res, next) => {
        let db = req.app.get('db');
        let {params} = req;

        db.queries.vehicle_count_by_owner([params.userID])
        .then(count => res.status(200).send(count))
        .catch(() => res.status(500).send());
    },
    vehiclesByOwner:(req, res, next) => {
        let db = req.app.get('db');
        let {params} = req;

        db.queries.vehicles_by_owner([params.userID])
        .then(vehicles => res.status(200).send(vehicles))
        .catch(() => res.status(500).send());
    },
    vehiclesByQuery:(req, res, next) => {
        let db = req.app.get('db');
        let {query} = req;
        if(query.userEmail) {
            db.queries.vehicles_by_email([query.userEmail])
            .then(vehicles => res.status(200).send(vehicles))
            .catch(() => res.status(500).send());
        }
        else if(query.userFirstStart) {
             db.queries.vehicles_by_letters([query.userFirstStart])
            .then(vehicles => res.status(200).send(vehicles))
            .catch(() => res.status(500).send());           
        }
    },
    vehiclesByYear:(req, res, next) => {
        let db = req.app.get('db');

        db.queries.vehicles_by_year()
        .then(vehicles => res.status(200).send(vehicles))
        .catch(() => res.status(500).send());
    },
    updateOwner:(req, res, next) => {
        let db = req.app.get('db');
        let {params} = req;

        db.queries.update_vehicle_owner([params.userID, params.vehicleID])
        .then(vehicle => res.status(200).send(vehicle))
        .catch(() => res.status(500).send());
    },
    removeOwner:(req, res, next) => {
        let db = req.app.get('db');
        let {params} = req;

        db.queries.remove_vehicle_owner([params.vehicleID])
        .then(vehicle => res.status(200).send(vehicle))
        .catch(() => res.status(500).send());
    },
    removeVehicle:(req, res, next) => {
        let db = req.app.get('db');
        let {params} = req;

        db.queries.delete_vehicle_by_id([params.vehicleID])
        .then(vehicle => res.status(200).send(vehicle))
        .catch(() => res.status(500).send());
    }



}
