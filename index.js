const Alexa = require('ask-sdk-core');
var https = require('https');
const STATION_NAME = 'Back2House Radio';
const LOGO ='https://back2houseradio.com/wp-content/uploads/2025/04/Logo.png'
const LOGO_SMALL = 'https://res.cloudinary.com/dje3rwthu/image/upload/v1771587493/B2H-RADIO-LOGO_nm1604.png';
const BACKGROUND_IMAGE = 'https://res.cloudinary.com/dje3rwthu/image/upload/v1771587405/ascascasas_qr59qa.jpg';

// Your UK radio stream
const podcastUrl = 'https://back2house.radioca.st/stream';


const PlayHandler = {
	canHandle(handlerInput)
	{
		return (
			handlerInput.requestEnvelope.request.type === 'LaunchRequest' ||
			(
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				handlerInput.requestEnvelope.request.intent.name === 'Play'
			) ||
			(
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				(   handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent'  ||           
				    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.LoopOnIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ShuffleOnIntent' ||
                    handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent'
                )
			)
		);
	},
	handle(handlerInput)
	{
		const speechText = `You are now listening to Back2House Radio`;
    	return handlerInput.responseBuilder
			.speak(speechText)
			.withStandardCard(
				STATION_NAME, 
				'Your Number One House Music Radio Station',  
				LOGO , 
				LOGO_SMALL,  
				
			)
			.addDirective({
				type: 'AudioPlayer.Play',
				playBehavior: 'REPLACE_ALL',
				audioItem:{
					stream:{
						token: '0',
						url: podcastUrl,
						offsetInMilliseconds: 0
					},
					metadata : {
                      title: "Back2House Radio",
                      subtitle: "back2houseradio.com",
                      "art": {
                    "sources": [
                      {
                        "contentDescription": "",
                        "url": LOGO_SMALL,
                        "widthPixels": 512,
                        "heightPixels": 512
                      }
                    ]
                  },
                  "backgroundImage": {
                    "sources": [
                      {
                        "contentDescription": "",
                        "url": BACKGROUND_IMAGE,
                        "widthPixels": 1200,
                        "heightPixels": 800
                      }
                    ]
                  }
                }
				},
			})
			.getResponse();
	}
};

const PauseStopHandler = {
	canHandle(handlerInput)
	{
		return (
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				(
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
					handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent'
				)
			) ||
			(
				handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
				handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent'
			);
	},
	handle(handlerInput)
	{
    	return handlerInput.responseBuilder
			.addDirective({
				type: 'AudioPlayer.ClearQueue',
				clearBehavior: 'CLEAR_ALL'
			})
			.getResponse();
	}
};

const HelpIntentHandler = {
	canHandle(handlerInput)
	{
		return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
	},
	handle(handlerInput)
	{
		const speechText = 'You can say Play, Stop or Resume.';
		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};

const SessionEndedRequestHandler = {
	canHandle(handlerInput)
	{
		return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
	},
	handle(handlerInput)
	{
		return handlerInput.responseBuilder.getResponse();
	}
};

const IntentReflectorHandler = {
	canHandle(handlerInput)
	{
		return handlerInput.requestEnvelope.request.type === 'IntentRequest';
	},
	handle(handlerInput)
	{
		const intentName = handlerInput.requestEnvelope.request.intent.name;
		const speechText = 'NO INTENT HELP TEXT';
		return handlerInput.responseBuilder
			.speak(speechText)
			.getResponse();
	}
};

const ErrorHandler = {
	canHandle()
	{
		return true;
	},
	handle(handlerInput, error)
	{
		const speechText = `Sorry, I could not understand what you said. Please try again.`;
		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.getResponse();
	}
};

exports.handler = Alexa.SkillBuilders.custom()
	.addRequestHandlers(
		PlayHandler,
		PauseStopHandler,
		HelpIntentHandler,
		SessionEndedRequestHandler,
		IntentReflectorHandler)
	.addErrorHandlers(
		ErrorHandler)
	.lambda();
