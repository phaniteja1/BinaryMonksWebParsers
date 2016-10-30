var normalizedPath = require("path").join(__dirname, "");

require("fs").readdirSync(normalizedPath).forEach(function(file) {
    if(require("path").extname(file) =='.js'){
        if(file != 'automation.js'){
            require("./" + file);
        }
    }
});