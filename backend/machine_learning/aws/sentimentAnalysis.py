import json
import boto3
from pprint import  pprint
dynamodb_table = boto3.resource('dynamodb').Table('Feedback')


def lambda_handler(event, context):
    
    
    client=boto3.client('comprehend')
    feedback=[]
    
    response = dynamodb_table.scan()
    for row in response['Items']:
        
        sentiment= client.detect_sentiment(Text=row['feedback'], LanguageCode="en")
        feedback.append(sentiment)
    
    pprint(sentiment)
    pprint(event)
    return {
        'statusCode': 200,
        # 'body': json.dumps('Hello from Lambda!')
        'body': feedback
        
        
    }