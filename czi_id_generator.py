import os
import pandas as pd

csv_dir = "csv"
folders = [folder for folder in os.listdir(csv_dir) if "CxG" in folder]

bar_graph_cxg_datasets = []

for folder in folders:
    if folder != ".DS_Store":
       bar_graph_cxg_datasets.extend(os.listdir(os.path.join(csv_dir,folder)))

cxg_id_info = pd.DataFrame()

cxg_id_info['bar_graph_portal_id'] = bar_graph_cxg_datasets
cxg_id_info['dataset_id'] = cxg_id_info.apply(lambda row: row['bar_graph_portal_id'].split("_")[0], axis=1)

cxg_dataset_collection = pd.read_csv('czi_dataset_collection.csv')

cxg_id_info = cxg_id_info.merge(cxg_dataset_collection[['dataset_id','collection_id']],how='left')

cxg_id_info.loc[(cxg_id_info.collection_id.isna()) & ~(cxg_id_info['dataset_id'].isin(['37817db3-8da1-45ba-946d-a4f054f8f837','2a441d72-459c-4a5e-b97b-88c9278bcf09','0b504a72-9d51-43f1-ae63-b880ac307bc5'])), 'collection_id'] = 'b1a879f6-5638-48d3-8f64-f6592c1b1561'

cxg_id_info.loc[(cxg_id_info.collection_id.isna()) & (cxg_id_info['dataset_id'] == '37817db3-8da1-45ba-946d-a4f054f8f837'), 'collection_id'] = '9b02383a-9358-4f0f-9795-a891ec523bcc'

cxg_id_info.loc[(cxg_id_info.collection_id.isna()) & (cxg_id_info['dataset_id'] == '2a441d72-459c-4a5e-b97b-88c9278bcf09'), 'collection_id'] = 'd36ca85c-3e8b-444c-ba3e-a645040c6185'

cxg_id_info['url'] = cxg_id_info.apply(lambda row: "https://api.cellxgene.cziscience.com/dp/v1/collections/"+str(row['collection_id'])+"#"+str(row['bar_graph_portal_id'].split("_")[-1][:-4])+"_"+str(row['dataset_id']),axis=1)
cxg_id_info.to_csv('czi_id_info.csv')