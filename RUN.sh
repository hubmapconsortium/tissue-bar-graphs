#!/bin/sh

mkdir tissue-bar-graphs/azimuth-predictions;
cp -R hra-azimuth-predictions/ tissue-bar-graphs/azimuth-predictions/;
cd tissue-bar-graphs;
npm install utils/package.json;
cd utils;
node azimuth_aggregator.js;
cd ..;
python3 azimuth-predictions/hubmap-kidney/append_donor_metadata.py;
cd ..;


