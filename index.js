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
      msg = `\xF0\x9F\x91\x8B
      a Branch with name <b>${context.payload.ref}</b> has been created! 
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
    case "delete":
      msg = `\xF0\x9F\x91\x8B
      Branch <b>${context.payload.ref}</b> has been deleted!  
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
    case "pull_request":
      msg = `\xF0\x9F\x91\x8B	
      there a new pull request on github: 
      \xE2\x9A\xA1 ${context.payload.pull_request.title} 
      \xE2\xAD\x90 ${context.payload.pull_request.base.ref} 
      \xF0\x9F\x94\x97 ${context.payload.pull_request._links.html.href} 
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
    case "push":
      if (context.payload.created) return;
      const ref = context.ref.split("/");
      msg = `\xF0\x9F\x91\x8B
      there a new push on <b>${ref[ref.length - 1]}<b/> 
      \xF0\x9F\x91\xA4 ${context.payload.sender.login}`;
      break;
  }
  bot.sendMessage(chatId, msg);
} catch (error) {
  core.setFailed(error.message);
}
