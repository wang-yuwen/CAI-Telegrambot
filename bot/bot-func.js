const {listphoto, listaudio} = require('./bot-media');
const {TGTOKEN, UseMediaPhoto, UseMediaAudio, UsePoll, photoTrigger, audioTrigger, botResetResponse, charname, path2, errormsg1, errormsg2, errormsg3, 
  errormsg4, errormsg5, language} = require('../settings');
const {run, downloadImage, numb} = require('./bot-gemini');



function fixx(nu) {
  if (nu === 1)
return (errormsg1)
  if (nu === 2)
return (errormsg2)
  if (nu === 3)
return (errormsg3) 
if (nu === 4)
return (errormsg4) 
if (nu === 5)
return (errormsg5) 
  if (typeof nu === 'undefined' || nu > 5) 
  return (errormsg5) }

  function get_random (list) {
    return list[Math.floor((Math.random()*list.length))];
  }


const Refresh = async function(ctx, chat) {   // clear chat history
  try {
    const Refresh = chat.saveAndStartNewChat()
    Refresh
    ctx.reply(botResetResponse, {
      reply_to_message_id: ctx.message.message_id
    }, {allow_sending_without_reply: true});}
    catch {
try {ctx.reply (fixx(5).text)}
catch {console.log('Error')}}}


const Hi = async function(ctx, chat) {
  try {
    const userjoins = ctx.message.new_chat_member.first_name;  // greet joining user
const response5 = await chat.sendAndAwaitResponse(promptJoin(userjoins), true);
ctx.reply(response5.text);}
catch {
try {ctx.reply (fixx(5).text)}
catch {console.log('Error')}}}

const Bye = async function(ctx, chat) {
  try {
const userleft = ctx.message.left_chat_member.first_name;
if (ctx.message.left_chat_member.id != tgbotid) {     // say goodbye to the leaving user
const response6 = await chat.sendAndAwaitResponse(promptLeft(userleft), true);
ctx.reply(response6.text);}}
catch {
try {ctx.reply (fixx(5).text)}
catch {console.log('Error')}}}



const botreply = async function(ctx, chat) { // basic reply function
  try {
    const context = ctx.from.first_name;
    const userText = ctx.message.text;
    const textRequest = `${context}: ${userText}`;
    const response = await chat.sendAndAwaitResponse(textRequest, true);
    const PhotoTriggerTrue = response.text.match(photoTrigger)
    const AudioTriggerTrue = response.text.match(audioTrigger)
    if (PhotoTriggerTrue) {
      if (UseMediaPhoto == true) {
      ctx.replyWithPhoto({url: get_random(listphoto)}, {reply_to_message_id: ctx.message.message_id}, {allow_sending_without_reply: true});
    } 
  } 
  else if (AudioTriggerTrue) {
    if (UseMediaAudio == true) {
      ctx.replyWithAudio({url: get_random(listaudio)}, {
        performer: `${charname}`,
        title: 'Voice message'
      }, {reply_to_message_id: ctx.message.message_id}, {allow_sending_without_reply: true});
    }
  }    
    else {
      ctx.reply(response.text, {
        reply_to_message_id: ctx.message.message_id
      }, {allow_sending_without_reply: true});
    }
  }
  catch {
try {ctx.reply (fixx(5).text)}
catch {console.log('Error')}}
}

const botreplyRPL = async function(ctx, chat) { // reply via /rpl command, reply to the *replied* message

  try {
    if (typeof ctx.message.reply_to_message == 'undefined')
    {ctx.reply(fixx(3).text)}
    else {
const context = ctx.message.reply_to_message.from.first_name;
const userText = ctx.message.reply_to_message.text;
const textRequest = `${context}: ${userText}`;
const response = await chat.sendAndAwaitResponse(textRequest, true);
const PhotoTriggerTrue = response.text.match(photoTrigger)
const AudioTriggerTrue = response.text.match(audioTrigger)

if (AudioTriggerTrue) {
  if (UseMediaAudio == true) {
  ctx.replyWithAudio({url: get_random(listaudio)}, {
    performer: `${charname}`,
    title: 'Voice message'
  }, {reply_to_message_id: ctx.message.reply_to_message.message_id}, {allow_sending_without_reply: true});
}}
else if (PhotoTriggerTrue) {
  if (UseMediaPhoto == true) {
  ctx.replyWithPhoto({url: get_random(listphoto)}, {reply_to_message_id: ctx.message.reply_to_message.message_id});
}}

else if (typeof ctx.message.reply_to_message.poll !== 'undefined') {

  if (UsePoll == true) {
  const context3 = ctx.message.reply_to_message.poll.question;
const Option = ctx.message.reply_to_message.poll.options;
let result = Option.map(({text}) => text);
const response3 = await chat.sendAndAwaitResponse(pollPrompt(context3, result), true);
      ctx.reply(response3.text, {
        reply_to_message_id: ctx.message.reply_to_message.message_id
      }, {allow_sending_without_reply: true});
      try {
        ctx.deleteMessage(ctx.message.message_id);}
        catch {ctx.reply (fixx(4).text)}}} 
else  {
  ctx.reply(response.text, {
    reply_to_message_id: ctx.message.reply_to_message.message_id
  }, {allow_sending_without_reply: true});
  try {
  ctx.deleteMessage(ctx.message.message_id);}
  catch {ctx.reply (fixx(4).text)}
}}}
catch {
try {ctx.reply (fixx(5).text)}
catch {console.log('Error')}}}




  const Poll = async function(ctx, chat) {  // Poll on update function
    try {
  const context3 = ctx.message.poll.question;
   const Option = ctx.message.poll.options;
   let result = Option.map(({text}) => text);
    const textRequest3 = `${pollPrompt(context3, result)}`;
     const response3 = await chat.sendAndAwaitResponse(textRequest3, true);
     ctx.reply(response3.text, {
      reply_to_message_id: ctx.message.message_id
            }, {allow_sending_without_reply: true});
          }
          catch {
      try {ctx.reply (fixx(5).text)}
      catch {console.log('Error')}}
        }


        const eyesrpl = async function(ctx, chat) {  //image recognition basic
          try {
          const imageId = ctx.message.photo.pop().file_id; 
          let imgurl = await ctx.telegram.getFileLink(imageId)
          let outputPath = path2+'/'+numb()+'.jpg'
          await downloadImage(imgurl, outputPath)
          .then(() => {
            console.log('Download image');
          })
          .catch((error) => {
            console.error('Error, could not download image', error);
          }); 
         
          const descr = await run(outputPath)
          const context = ctx.message.from.first_name;
          if (typeof ctx.message.caption !== 'undefined') {const photocap = ctx.message.caption
            if (language == 'ru') {eyesreq = `${context}: *изображение* [Описание: ${descr}. Прикрепленный текст: ${photocap}`}
            else if (language == 'en') {eyesreq = `${context}: *image* [image description: ${descr}. Image caption: ${photocap}`}   
          const response = await chat.sendAndAwaitResponse(eyesreq, true);
          ctx.reply(response.text, {
            reply_to_message_id: ctx.message.message_id
          }, {allow_sending_without_reply: true});
        }
        else {const photocap = '--'; 
        if (language == 'ru') {eyesreq = `${context}: *изображение* [Описание: ${descr}. Прикрепленный текст: ${photocap}`}
        else if (language == 'en') {eyesreq = `${context}: *image* [image description: ${descr}. Image caption: ${photocap}`}   
        const response = await chat.sendAndAwaitResponse(eyesreq, true);
        ctx.reply(response.text, {
          reply_to_message_id: ctx.message.message_id
        }, {allow_sending_without_reply: true});}
      }
      catch {
  try {ctx.reply (fixx(5).text)}
  catch {console.log('Error')}} }


  const eyesimg = async function(ctx, chat) {  //image recognition on command
    try {    
    if (typeof ctx.message.reply_to_message != 'undefined') {
      const imageId = ctx.message.reply_to_message.photo.pop().file_id; 
      let imgurl = await ctx.telegram.getFileLink(imageId)
      let outputPath = path2+'/'+numb()+'.jpg'
      await downloadImage(imgurl, outputPath)
      .then(() => {
        console.log('Download image');
      })
      .catch((error) => {
        console.error('Error, could not download image', error);
      }); 
      const descr = await run(outputPath)
      const context1 = ctx.from.first_name;
      const context2 = ctx.message.reply_to_message.from.first_name
      const mess = ctx.message.text.replace("/img", "")
      if (typeof ctx.message.reply_to_message.caption !== 'undefined') {const photocap = ctx.message.reply_to_message.caption;
        if (language == 'en') { forwardreq = `${context1}: ${mess}. [Forwarded]: ${context2}: *Image* [image description: ${descr}}. Image caption: ${photocap}`;}
        else if (language == 'ru') { forwardreq = `${context1}: ${mess}. [Переслано]: ${context2}: *изображение* [описание: ${descr}}. Прикрепленный текст: ${photocap}`;}
      const response = await chat.sendAndAwaitResponse(forwardreq, true);
      ctx.reply(response.text, {
        reply_to_message_id: ctx.message.message_id
      }, {allow_sending_without_reply: true});
    }
    else {const photocap = '--'; 
    if (language == 'ru') {forwardreq = `${context1}: ${mess}. [Переслано]: ${context2}: *изображение* [описание: ${descr}}. Прикрепленный текст: ${photocap}`;}
    else if (language == 'en') {forwardreq = `${context1}: ${mess}. [Forwarded]: ${context2}: *Image* [image description: ${descr}}. Image caption: ${photocap}`;}
    const response = await chat.sendAndAwaitResponse(forwardreq, true);
    ctx.reply(response.text, {
      reply_to_message_id: ctx.message.message_id
    }, {allow_sending_without_reply: true});}}
    else ctx.reply(fixx(2).text)}
    catch {
      try {ctx.reply (fixx(5).text)}
      catch {console.log('Error')}} 
  }
  


  

  const promptJoin = function(userjoins) {
    if (language == 'en') 
    {return `${userjoins} has joined the chat.`}
  else if (language == 'ru') 
  return `${userjoins} присоединяется к чату`}


  const promptLeft = function(userleft) {
    if (language == 'en') 
    {return `${userleft} has left the chat.`}
  else if (language == 'ru') 
  {return `${userleft} выходит из чата`}}


  const pollPrompt = function(context3, result) {
    if (language == 'en') 
    {return `You can vote in a poll. Poll question: ${context3}. Poll options: ${result}`}
    else if (language == 'ru') {
    return `Ты можешь проголосовать в опросе. Тема опроса: ${context3}. Варианты ответов: ${result}`
    }}


const iddqd = TGTOKEN.split(':');
const tgbotid = iddqd[0]





module.exports = { fixx, Refresh, Hi, Bye, botreply, botreplyRPL, Poll, 
  eyesrpl, tgbotid, eyesimg, promptJoin, promptLeft, 
  pollPrompt}


