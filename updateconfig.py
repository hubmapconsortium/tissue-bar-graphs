import json
import os

jsonfile = open('config/main.config.json')
data = json.load(jsonfile)

for folder in os.listdir('temp'):
    if not folder.startswith('.'):
        data['cxg_'+'_'.join(folder.split("_")[:-2]).lower()]=  {   "label": folder.replace("_"," ")+"({} datasets)".format(len(os.listdir(os.path.join("temp",folder)))), 
                                                                    "basepath": "https://raw.githubusercontent.com/hubmapconsortium/tissue-bar-graphs/static/csv/"+folder, 
                                                                    "datasets": [file[:-4] for file in os.listdir(os.path.join("temp",folder))],
                                                                    "groupTypes": {"race": "Ethnicity","sex": "Sex"},
                                                                    "fixed": 0,
                                                                    "colorPalette": [
                                                                        "#db95cd",
                                                                        "#c8feba",
                                                                        "#ddb1f6",
                                                                        "#c2db90",
                                                                        "#f8b8f6",
                                                                        "#99d99d",
                                                                        "#a5a6e4",
                                                                        "#e1e294",
                                                                        "#3bb7ed",
                                                                        "#eda17a",
                                                                        "#6efcfa",
                                                                        "#ffa498",
                                                                        "#2ecdce",
                                                                        "#e395ad",
                                                                        "#98ffdf",
                                                                        "#dd99a2",
                                                                        "#87fff1",
                                                                        "#ffb1b5",
                                                                        "#2ebfb2",
                                                                        "#d3a36a",
                                                                        "#6bb2ed",
                                                                        "#ffe79f",
                                                                        "#8dc5ff",
                                                                        "#c0b46a",
                                                                        "#d5cfff",
                                                                        "#80e2b9",
                                                                        "#cf9fa8",
                                                                        "#beffd4",
                                                                        "#cfa19a",
                                                                        "#87f0ff",
                                                                        "#d2a186",
                                                                        "#42bbcc",
                                                                        "#ffd2a3",
                                                                        "#9ddfff",
                                                                        "#fff5b5",
                                                                        "#b7d4ff",
                                                                        "#e1ffca",
                                                                        "#ffd4e4",
                                                                        "#6ebb96",
                                                                        "#ffd2c1",
                                                                        "#71b6c3",
                                                                        "#c8a580",
                                                                        "#c0fff8",
                                                                        "#c8a491",
                                                                        "#ddffe6",
                                                                        "#bca98f",
                                                                        "#d6e8ff",
                                                                        "#87b78b",
                                                                        "#fdf7ff",
                                                                        "#a3b090",
                                                                        "#fff8ee",
                                                                        "#89b3ba",
                                                                        "#f7ffeb",
                                                                        "#aeaba5",
                                                                        "#9fb0a0"
                                                                    ],
                                                                    "sortAttributes": []
                                                                }
with open("sample.json", "w") as outfile:
    json.dump(data, outfile, indent = 4)

jsonfile.close()