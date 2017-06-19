let welcomeMessage = (message) => {
  let date = '2017';
  console.log(`Welcome ${message} ${date}`);
  // alert(`Welcome ${message} ${date}`);

  if(process.env.NODE_ENV == 'development') {
    console.log(message);
  }
}

let a = 1;

module.exports = welcomeMessage;
