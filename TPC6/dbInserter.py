import requests
import json

with open("dataset/dataset-extra1-ID.json") as f:
    dataset = json.load(f)

for reg in dataset["pessoas"]:
    if "_id" not in reg and "id" in reg:
        reg["_id"] = reg["id"]
        del reg["id"]
    resp = requests.post("http://localhost:7777/pessoas", json=reg)
    # print(resp)