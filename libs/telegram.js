const fetch = require("node-fetch");

module.exports = {
  token: null,
  endPoint(api) {
    try {
      fetch(`https://api.telegram.org/bot${this.token}/${api}`);
    } catch {
      throw new Error(500);
    }
  },
  sendMessage(chatId, message) {
    return this.endPoint(
      `sendMessage?chat_id=${chatId}&text=${message}&parse_mode=html`
    );
  }
};
