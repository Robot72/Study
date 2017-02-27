let fs = require('fs');

module.exports = () => {
    fc.readFile(__filename, (err, data) => {
        if(err) {
            console.log('Error read file!');
        }
        return data.toString();
    });    
};
