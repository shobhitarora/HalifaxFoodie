import json
import boto3
from pprint import  pprint

# Reference: https://github.com/SamWSoftware/ServerlessYoutubeSeries/blob/l15-comprehend/lambdas/endpoints/analyse.js

def lambda_handler(event, context):
    s3=boto3.client('s3')
    body=json.loads(event["body"])
    filename=body["fileName"]
    bucket= "serverless-project-group10"
    key=filename+".txt"
    file=s3.get_object(Bucket=bucket,Key=key)
    paraghaph= str(file['Body'].read())
    
    client=boto3.client('comprehend')
    
    keyPhrase= client.detect_key_phrases(Text=paraghaph, LanguageCode="en")
    KeyPhraseList=[]
    for i in range(len(keyPhrase['KeyPhrases'])):

        KeyPhraseList.append(keyPhrase['KeyPhrases'][i]['Text'])
    

    return {
        'statusCode': 200,
        'body': KeyPhraseList
        
        
    }
