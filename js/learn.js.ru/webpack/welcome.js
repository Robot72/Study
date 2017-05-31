let welcomeMessage = (message) => {
    console.log(`Welcome ${message}`);

    if(process.env.NODE_ENV == 'development') {
        console.log(message);
    }
}

module.exports = welcomeMessage;
