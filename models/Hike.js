const { Model } = require("objection")
const database = require("./database-connection")
Model.knex(database)

module.exports = class Hike extends Model {
    static get tableName() {
        return "hike";
    }
    static get relationMappings() {
        const Mountain = require("./Mountain")
        return {
            mountains: {
                relation: Model.BelongsToOneRelation,
                modelClass: Mountain,
                join: {
                from: 'hike.mountain_id',
                to: 'mountain.id'
            }
        }
      }
    };
}