const Alexa = require('ask-sdk-core');

const PlayHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest' ||
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
                (Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayRadioIntent' ||
                 Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent'))
        );
    },
    handle(handlerInput) {
        const speechText = 'You are now listening to Sunset Soul Radio.';
        const streamUrl = 'https://c40.radioboss.fm:8079/stream';

        return handlerInput.responseBuilder
            .speak(speechText)
            .addDirective({
                type: 'AudioPlayer.Play',
                playBehavior: 'REPLACE_ALL',
                audioItem: {
                    stream: {
                        token: '0',
                        url: streamUrl,
                        offsetInMilliseconds: 0
                    },
                    metadata: {
                        title: "Sunset Sol Radio",
                        subtitle: 'www.sunsetsolradio.com',
                        art: {
                            sources: [
                                {
                                    url: "https://res.cloudinary.com/dje3rwthu/image/upload/v1768762929/512_logo_qr_uog0gq.jpg",
                                    widthPixels: 512,
                                    heightPixels: 512
                                }
                            ]
                        },
                        backgroundImage: {
                            sources: [
                                {
                                    url: "https://res.cloudinary.com/dje3rwthu/image/upload/v1768840348/8af7f8a2b607bd22d16d067975b2e2f9507e6521-5616x3744_lrg8th.webp",
                                    widthPixels: 1200,
                                    heightPixels: 800
                                }
                            ]
                        }
                    }
                }
            })
            .getResponse();
    }
};

const PauseStopHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent' ||
             Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent' ||
             Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent')
        );
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addDirective({
                type: 'AudioPlayer.Stop'
            })
            .getResponse();
    }
};

// Required for Audio Streaming Skills
const AudioPlayerEventHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope).startsWith('AudioPlayer.');
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return (
            Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
            Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent'
        );
    },
    handle(handlerInput) {
        const speechText = 'You can say play the radio, or stop to turn it off.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('Sorry, I had trouble doing what you asked. Please try again.')
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        PlayHandler,
        PauseStopHandler,
        HelpIntentHandler,
        AudioPlayerEventHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
