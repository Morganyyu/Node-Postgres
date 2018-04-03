const pg = require("pg");
const settings = require("./settings");
const name = [process.argv[2]];
const client = new pg.Client(settings);

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", name, (err, result) => {
    console.log("Searching...");
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach(function(person) {
      let birthday = person.birthdate.toISOString().slice(0,10);
      console.log(`Found ${result.rowCount} person(s) by the name of '${name}':`)
      console.log(`- ${person.id}: ${person.first_name} ${person.last_name}, born '${birthday}'`);
    })
    client.end();
  })
});