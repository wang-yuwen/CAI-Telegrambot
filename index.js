const CharacterAI = require('./lib');
const {Telegraf} = require('telegraf');
const {CHARTOKEN, CHARIDTOKEN, CHARID, TGTOKEN, UseGemini, UseJoinResponse, UseLeftResponse, 
  UsePoll, UseRPL, UseBotReply, UseOnOffCommands, botTextTrigger, botResetTrigger, 
 defaultResponse, UseTextTrigger} = require('./settings');
  const {fixx, Refresh, Hi, Bye, botreply, botreplyRPL, Poll, 
    eyesrpl, tgbotid, eyesimg} = require('./bot/bot-func');

const bot = new Telegraf(TGTOKEN);
const characterAI = new CharacterAI();



(async () => {


  On = true
async function OnOff() {
    On = !On;
}

  await characterAI.authenticateWithToken(CHARTOKEN, CHARIDTOKEN);
  const chat = await characterAI.createOrContinueChat(CHARID);

  bot.start((ctx) => {            // /start
    ctx.reply(defaultResponse)
});

bot.command('sup', (ctx) => {    // /sup command, greeting, can be used to check if everything is working
  if (On == true) {
  ctx.reply(defaultResponse)
}});

bot.command('onoff', async (ctx) => {  // /onoff, enables and disables the bot
  if (UseOnOffCommands == true) {
 await OnOff()
  if (On == true) {ctx.reply ('Bot is enabled. Type /onoff to disable')}
  else if (On == false) {ctx.reply ('Bot is diabled. Type /onoff again to enable')}
}});

bot.command('clear', async (ctx) => {   // clear chat history using /clear command
  if (On == true) {
  Refresh(ctx, chat)}
})

bot.on('poll', async (ctx) => {  //vote in polls
  if (On == true) {
    if (UsePoll == true) {
    Poll(ctx, chat)
  }}       
}); 

bot.command('rpl', async (ctx) => {   // reply via /rpl
  if (On == true) {
    if (UseRPL == true) {
      botreplyRPL(ctx, chat)
  }}
})

bot.command('img', async (ctx) => {   // image recognition on command
  if (On == true) {
    if (UseGemini == true) {
  if (typeof ctx.message.reply_to_message.photo == 'undefined') {ctx.reply(fixx(4).text)}
   else {eyesimg(ctx, chat)}
     }}   
    })

bot.hears(botResetTrigger, async (ctx) => {  // same but via a trigger message
  if (On == true) {
    Refresh(ctx, chat)}
});

bot.hears(botTextTrigger, async (ctx) => {  // reply on text trigger
  if (On == true) {
    if (UseTextTrigger == true) {
      botreply(ctx, chat)
    }}})

  bot.on('text', async (ctx) => {   // reply to the replies to the bot's messages
    if (On == true) {
      if (UseBotReply == true) {
        if (typeof ctx.message.reply_to_message != 'undefined') {
          let testin = JSON.stringify (ctx.message.reply_to_message);
          let testin2 = testin.match(tgbotid)
          if (testin2) {botreply(ctx, chat)}
      }      
      }
    }    
  })


  bot.on('new_chat_members', async (ctx) => {  // say hi
    if (On == true) {
      if (UseJoinResponse == true) {
    Hi(ctx, chat)}
  }});
 
bot.on('left_chat_member', async (ctx) => {  // say goodbye
  if (On == true) {
    if (UseLeftResponse == true) {
    Bye(ctx, chat)}}})
    


  
bot.on('photo', async (ctx) => {   // image recognition on photo
      if (On == true) {
        if (UseGemini == true) {
          if (UseBotReply == true) {
            if (typeof ctx.message.reply_to_message != 'undefined') {
              let testin = JSON.stringify (ctx.message.reply_to_message);
              let testin2 = testin.match(tgbotid)
              if (testin2) {
                eyesrpl(ctx, chat)
        }}
        else if (typeof ctx.message.caption != 'undefined') {
          if (UseTextTrigger == true) {
          const hear = JSON.stringify(ctx.message.caption)
          if (hear.match(botTextTrigger)) {eyesrpl(ctx, chat)} }}
        }}}})



bot.on('message', async (ctx) => {   // reply on reply
  if (On == true) {
    if (UseBotReply == true) {
  if (typeof ctx.message.reply_to_message != 'undefined') {
let testin = JSON.stringify (ctx.message.reply_to_message);
let testin2 = testin.match(tgbotid)
if (testin2) {botreply(ctx, chat)}}
  }}
}) 
})(); 
 

bot.launch();

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));