// send data from hre

function encrypt(data) {
  return "encrypted data";
}
function send(url, data) {
  const encryptedData = encrypt(data);
  console.log(`sending ${encryptedData} Data to : ${url}`);
}

module.exports = {
  send,
};
