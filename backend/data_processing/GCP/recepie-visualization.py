from google.cloud import firestore
import math
import pandas as pd 
from google.cloud import storage

def verify():
  client= firestore.Client("csci5410-365703")
  client1=client.collection("Recipes").get()
  list1=[]

  for doc in client1:
    dict1=doc.to_dict()
    list1.append(dict1)
  print(list1)
  list2=[]

  for recpie in list1:
    data=recpie['recepieName']
    ing=recpie['data']
    for ingredient in ing:
      list3=[]
      list3.append(data)
      list3.append(ingredient)
      list2.append(list3)

  print(list2)
  
  if len(list2)>=1:

    df=pd.DataFrame(list2)
    print(df)
    clientStorage=storage.Client()
    exportbucket=clientStorage.get_bucket("recepie")
    exportbucket.blob('recpie.csv').upload_from_string(df.to_csv(),"text/csv")

  return "uploaded"

def hello_world(request):

    headers={"Access-control-Allow-origin":"*"}
    val=verify()
    return (val,200,headers)
    

