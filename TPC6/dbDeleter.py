import requests
import json

with open("dataset/dataset-extra1-ID.json") as f:
    dataset = json.load(f)

for reg in dataset["pessoas"]:
    r = requests.delete("http://localhost:7777/pessoas/"+reg["id"])
    # print(r)