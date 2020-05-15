
exports.up = function(knex) {
  return knex.schema.createTable("mountain", mountain => {
      mountain.increments()
      mountain.string("name")
      mountain.decimal("latitude")
      mountain.decimal("longitude")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("mountain")
};
