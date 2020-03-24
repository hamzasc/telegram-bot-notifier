# 🚀 Telegram bot notifier
GitHub Action for notify your team about any update on your github repository

# Usage

- **Create** github bot from @botFather on telegeram
- **Create** new flow on your github repository 
- **Add** following step to the end of your workflow:
```
on:
  push:
  pull_request:
  create:
  delete:
  
    .......
    uses: m9hmood/github-telegram-notifyer@master
    with:
        token: BotToken
        chat_id: ChatID
```