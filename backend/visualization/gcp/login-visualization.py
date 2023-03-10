from google.cloud import firestore
import math
import pandas as pd 
from google.cloud import storage

def verify():
  client= firestore.Client("csci5410-365703")
  client1=client.collection("login_logs").get()
  print(client)
  print(client1)
  list1=[]
  for doc in client1:
    dict1=doc.to_dict()
    list1.append(dict1)
  print(list1)

  if len(list1)>=1:

    df=pd.DataFrame(list1)
    print(df)
    clientStorage=storage.Client()
    exportbucket=clientStorage.get_bucket("login-logs-group10")
    exportbucket.blob('login.csv').upload_from_string(df.to_csv(),"text/csv")

  return "blob uploaded"



def hello_world(request):

    headers={"Access-control-Allow-origin":"*"}
    val=verify()
    return (val,200,headers)
    
    # request_json=request.get_json()
    # if request.args and "message" in request.args:
    #   x=request.args.get("message")
    #   print(x)
      
    # elif request_json and "message" in request_json:
    #   return request_json["message"]
    # else:
    #   return f"Hello World!"
