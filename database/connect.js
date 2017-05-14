const config = require('../config.json');

module.exports = (sequelize) => {

    let options = {
        define: {
            paranoid: false,
            timestamps: false
        }
    };

    let connect = new sequelize(config.database.name, config.database.user, config.database.password, options);
    let team = require('../models/team') (sequelize, connect);
    let match = require('../models/match') (sequelize, connect, team);
    let client = require('../models/client') (sequelize, connect);
    let bet = require('../models/bet') (sequelize, connect, match, client);
    let personal = require('../models/personal') (sequelize, connect);
    let balance = require('../models/balance') (sequelize, connect);

    return {
        sequelize: connect,
        team: team,
        match: match,
        client: client,
        bet: bet,
        personal: personal,
        balance: balance
    }
};