const Alexa = require('ask-sdk-core');
const podcastUrl = 'https://listen.streamaudio.co/proxy/hcr/stream';
const STATION_NAME = 'Ouse Valley';
const LOGO_SMALL = "https://res.cloudinary.com/dje3rwthu/image/upload/v1767426225/small_csb13k.png";
const LOGO_LARGE = "https://res.cloudinary.com/dje3rwthu/image/upload/v1767426228/large_tdi6ct.png";


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = `Playing ${STATION_NAME} Radio...`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .withStandardCard(
                `${STATION_NAME} Radio`,
                speakOutput,
                LOGO_SMALL,
                LOGO_LARGE
            )
            .addAudioPlayerPlayDirective('REPLACE_ALL', podcastUrl, 'radio_token', 0)
            .getResponse();
    }
};

const PlayAudioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayAudioIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Playing ${STATION_NAME} Radio.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective('REPLACE_ALL', podcastUrl, 'radio_token', 0)
            .getResponse();
    }
};

const PlayAudioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayAudioIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Playing ${STATION_NAME} Radio.`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective('REPLACE_ALL', podcastUrl, 'radio_token', 0)
            .getResponse();
    }
};

const PauseIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Pausing ${STATION_NAME} Radio.`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const ResumeIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput) {
        const speakOutput = `Resuming ${STATION_NAME} Radio.`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerPlayDirective('REPLACE_ALL', podcastUrl, 'radio_token', 0)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = `Stopping ${STATION_NAME} Radio. Goodbye!`;
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say "play audio" to start the radio, or "pause" to pause it. How can I help?';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        PlayAudioIntentHandler,
        PauseIntentHandler,
        ResumeIntentHandler,
        CancelAndStopIntentHandler,
        HelpIntentHandler
    )
    .addErrorHandlers(ErrorHandler)
    .lambda();
    .addErrorHandlers(ErrorHandler)
    .lambda();
