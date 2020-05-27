
exports.seed = function(knex) {
  return knex("hike").del()
    .then(function () {
      return knex("hike").insert([
        {title: "fun at torreys", image: "pic of torreys", description: "beautiful day", user_id: 1, mountain_id: 116}
      ]);
    });
};
