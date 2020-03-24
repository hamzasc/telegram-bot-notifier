const core = require("@actions/core");
const { context } = require("@actions/github");
const bot = require("./libs/telegram");

try {
  const token = core.getInput("token");
  const chatId = core.getInput("chat_id");
  bot.token = token;
  let msg = "unsupported action!";
  switch (context.eventName) {
    case "create":
      msg = `\xF0\x9F\x91\x8B	\n;
      a Brunch with name <b>${context.payload.ref}</b> has been created! \n
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
    case "delete":
      msg = `\xF0\x9F\x91\x8B	\n
      brunch <b>${context.payload.ref}</b> has been deleted! \n 
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
    case "pull_request":
      msg = `\xF0\x9F\x91\x8B	\n
      there a new pull request on github: \n
      \xE2\x9A\xA1 ${context.payload.pull_request.title} \n
      \xE2\xAD\x90 ${context.payload.pull_request.base.ref} \n
      \xF0\x9F\x94\x97 ${context.payload.pull_request._links.html.href} \n
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
    case "push":
      if (context.payload.created) return;
      const ref = context.ref.split("/");
      msg = `\xF0\x9F\x91\x8B	\n
      there a new push on <b>${ref[ref.length - 1]}<b/> \n
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
  }
  bot.sendMessage(chatId, msg);
} catch (error) {
  core.setFailed(error.message);
}
