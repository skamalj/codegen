var exec = require('child_process').exec;
var fs = require('fs');

var genCode = function(req, res){
    text = req.params.text;
    jdlinput = JSON.parse(text)
    jdlinput.databaseType = "sql"
    jdlstring = ""
    for (var key in jdlinput) {
          jdlstring = jdlstring + "\n\t\t\t" + key + " " + jdlinput[key]
    }
    jdlheader = `application {
        config {`
    jdlfooter = `
        }
    }` 
    jdlstring = jdlheader + jdlstring + jdlfooter       
    console.log("Recieved: " + jdlstring);
    fs.mkdirSync(jdlinput.baseName);
    fs.writeFile(jdlinput.baseName+"/"+jdlinput.baseName + '.jdl', jdlstring, function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

    exec('jhipster import-jdl ' + jdlinput.baseName + '.jdl', {
        cwd: './' + jdlinput.baseName
        } , function(error, stdout, stderr) {
        if (error) throw error;
        console.log(stdout);
    });
	};
  

module.exports = {
		genCode: genCode
}