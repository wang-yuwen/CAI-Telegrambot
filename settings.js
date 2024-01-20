// ***TOKENS***
const CHARTOKEN = '' //character ai access token
const CHARIDTOKEN = '' //character ai id token
const CHARID = '' //character id from url 
const TGTOKEN = '' //Telegram bot token
const GoogleAiToken = '' // Google Gemini Token



// ***SETTINGS***
const language = 'en' // choose en(glish) or ru(ssian)
const UseMediaPhoto = true  // whether bot will send random pictures. you will need to train your bot to send trigger commands
const UseMediaAudio = true  // same for audio files
const UseGemini = true // whether you want this bot to use google gemini (image recognition). you will need Google AI token. 
const UseJoinResponse = true  // whether you want the bot to greet users on joining
const UseLeftResponse = true // and say goodbye when they're leaving
const UsePoll = true // if you want the bot to "vote" in polls.
const UseTextTrigger = true // if you want the bot to answer to the messages containing trigger words
const UseResetTrigger = true // if you want to be able to clear history via a text message
const UseRPL = true // whether to use /rpl command (reply to the selected message)
const UseBotReply = true // whether your bot will reply to the replies to his messages.
const UseOnOffCommands = true // enables /onoff command which lets you disable the bot until you enable it with the same command
const botTextTrigger = /Sample|SAMPLE/ // bot will reply to the messages containing these words (case sensitive)
const botResetTrigger = /Sample|SAMPLE/ // bot will clear its chat history when you send a message with the trigger (case sensitive)
const photoTrigger = 'sample' // read readme. you can train your c.ai bot to send specific trigger commands so that 
                                // when the bot's reply contain these commands it will send a random image instead
const audioTrigger = 'sample' // same for audio files



const botResetResponse = 'History cleared' // message to send when chat history is cleared
const defaultResponse = 'Hello world!' // default message to send via /sup and /start commands


// ***misc***
const charname = 'Bot' // Set character name. Used mainly in audio messages.
const path2 = './files' // path to the files directory. No need to change unless you really want to. Just leave it as is.



// error messages

const errormsg1 = {"text": "Error, no message to send"}  // usually happens when C.ai NSFW filter is triggered so that theres no response
const errormsg2 = {"text": "Server error"}
const errormsg3 = {"text": "Error"}
const errormsg4 = {"text": "Message not found "}
const errormsg5 = {"text": "Unknown error"} // general error used to catch all functions



module.exports = {CHARTOKEN, CHARIDTOKEN, CHARID, TGTOKEN, GoogleAiToken,
    UseMediaPhoto, UseMediaAudio, UseGemini, UseJoinResponse, UseLeftResponse, 
    UsePoll, UseRPL, UseBotReply, UseOnOffCommands, botTextTrigger, botResetTrigger, 
    photoTrigger, audioTrigger, botResetResponse, defaultResponse, charname, path2, errormsg1, errormsg2, errormsg3, 
    errormsg4, errormsg5, UseTextTrigger, UseResetTrigger, language
}