import json

mapa = {}
with open("dataset-extra1.json", "r") as f:
    mapa = json.load(f)

idt = 0

for p in mapa["pessoas"]:
    p["id"] = idt
    idt += 1

with open("dataset-result.json", "w") as f:
    json.dump(mapa, f, indent=2, ensure_ascii=False)