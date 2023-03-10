from google.cloud import firestore
import math
import pandas as pd 
from google.cloud import storage

def verify():
  client= firestore.Client("csci5410-365703")
  client1=client.collection("polarity").get()
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
    exportbucket=clientStorage.get_bucket("customer-feedback-sentiment")
    exportbucket.blob('polarity.csv').upload_from_string(df.to_csv(),"text/csv")

  return "blob uploaded"



def hello_world(request):

    headers={"Access-control-Allow-origin":"*"}
    val=verify()
    return (val,200,headers)
    

