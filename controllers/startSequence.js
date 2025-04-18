// confirmationCodes.js
const confirmationCodes = new Map();

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
}

function setCode(gadgetId, code) {
  confirmationCodes.set(gadgetId, code);
}

function getCode(gadgetId) {
  return confirmationCodes.get(gadgetId);
}

function clearCode(gadgetId) {
  confirmationCodes.delete(gadgetId);
}

module.exports = { generateCode, setCode, getCode, clearCode };
