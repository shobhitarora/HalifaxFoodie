import json
import boto3
import json
import dateutil.parser
import datetime
import time
import os
import math
import random
import logging
from botocore.vendored import requests

dynamodb_table = boto3.resource('dynamodb').Table('users')
dynamodb_table2 = boto3.resource('dynamodb').Table('orders')

logger = logging.getLogger()
logger.setLevel(logging.DEBUG)

def safe_int(n):
    if n is not None:
        return int(n)
    return n
    
def try_ex(func):
    """
    Call passed in function in try block. If KeyError is encountered return None.
    This function is intended to be used to safely access dictionary.

    Note that this function would have negative impact on performance.
    """

    try:
        return func()
    except KeyError:
        return None
        
def elicit_slot(session_attributes, intent_name, slots, slot_to_elicit, message):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ElicitSlot',
            'intentName': intent_name,
            'slots': slots,
            'slotToElicit': slot_to_elicit,
            'message': message
        }
    }
    
def confirm_intent(session_attributes, intent_name, slots, message, response_card):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'ConfirmIntent',
            'intentName': intent_name,
            'slots': slots,
            'message': message,
            'responseCard': response_card
        }
    }
    
def close(session_attributes, fulfillment_state, message):
    response = {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Close',
            'fulfillmentState': fulfillment_state,
            'message': message
        }
    }

    return response
    
def delegate(session_attributes, slots):
    return {
        'sessionAttributes': session_attributes,
        'dialogAction': {
            'type': 'Delegate',
            'slots': slots
        }
    }
    
def validate_student(slots):
        
    return {'isValid':True}
    
def build_validation_result(is_valid, violated_slot, message_content):
    return {
        'isValid': is_valid,
        'violatedSlot': violated_slot,
        'message': {'contentType': 'PlainText', 'content': message_content}
    }
    
def dispatch(intent_request):
    """
    Called when the user specifies an intent for this bot.
    """
    # logger.debug('dispatch userId={}, intentName={}'.format(intent_request['userId'], intent_request['currentIntent']['name']))
    intent_name = intent_request['currentIntent']['name']

    # Dispatch to your bot's intent handlers
    if intent_name == 'TrackOrder':
        return verify_student(intent_request)
    raise Exception('Intent with name ' + intent_name + ' not supported')
    
def verify_student(intent_request):
    slots = intent_request['currentIntent']['slots']
    email=slots['Email']
    order=slots['OrderNumber']
    source = intent_request['invocationSource']
    output_session_attributes = intent_request['sessionAttributes'] if intent_request['sessionAttributes'] is not None else {}
    if source == 'DialogCodeHook':
        validation_result = validate_student(intent_request['currentIntent']['slots'])
        if not validation_result['isValid']:
            slots[validation_result['violatedSlot']] = None
            return elicit_slot(
                output_session_attributes,
                intent_request['currentIntent']['name'],
                slots,
                validation_result['violatedSlot'],
                validation_result['message'],
            )
        return delegate(output_session_attributes, slots)
    str=check_student(email,order)
    return close(
        output_session_attributes,
        'Fulfilled',
        {
            'contentType': 'PlainText',
            'content': str
        }
    )
        
    
    
def check_student(email,orderId):
    try:
        request_data={'email': email}
        result=requests.post('https://lebl72tcrioqrhxb5csb4blcja0lmqvv.lambda-url.us-east-1.on.aws/',json=request_data)
        print(result)
        return 'success'
    except Exception as e:
        print(e)

def lambda_handler(event, context):
    # TODO implement
    # TODO implement
    print(event)
    logger.debug('event.bot.name={}'.format(event['bot']['name']))
    return dispatch(event)
