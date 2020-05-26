const { Model } = require("objection")
const database = require("./database-connection")
Model.knex(database)

module.exports = class Mountain extends Model {
    static get tableName() {
        return 'mountain';
    }
    static get relationMappings() {
        const User = require("./User")
        return {
            users: {
                modelClass: User,
                relation: Model.ManyToManyRelation,
                join: {
                    from: "mountain.id",
                    through: {
                        modelClass: Hike,
                        from: "hike.mountain_id",
                        to: "hike.user_id",
                        extra: ["title", "description", "image"]
                    },
                    to: "user.id"
                }
            }
        }
    }
}