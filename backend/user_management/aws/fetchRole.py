import json
import boto3

dynamodb_table = boto3.resource('dynamodb').Table('users')

def lambda_handler(event, context):
    # TODO implement
    print(event)
    userTable = dynamodb_table.scan()
    body=json.loads(event["body"])
    email=body["email"]
    print('test1',email)
    print(userTable["Items"])
    flag=0
    
    for data in userTable["Items"]:
        print(data)
        if data['email']==email:
            role=data['role']
            return {
                'statusCode':200,
                'body':data['role']
            }
        else:
            flag=1