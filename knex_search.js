const settings = require("./settings.json");
const knex = require("knex")({
  client: "pg",
  connection : {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});
const name = [process.argv[2]];


knex.select().table("famous_people")
.where("first_name", `${name}`)
.orWhere("last_name", `${name}`)
.asCallback(function(err, result) {
  console.log("Searching...");
  if (err) return console.error(err);
  result.forEach(function(person) {
    let birthday = person.birthdate.toISOString().slice(0,10);
    console.log(`Found ${result.length} person(s) by the name of '${name}':`)
    console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${birthday}'`);
  })
  knex.destroy();
})