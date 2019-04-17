#!/bin/python

import json

fi = open('./CET6.txt', 'r')
with fi :
    toeflDict = []
    for i,line in enumerate(fi) :
        tmp = line.split('/')
        if len(tmp) < 3 :
            continue
        toeflDict.append({ 'text': tmp[0].strip(), 'link': i })
        toeflDict.append({ 'text': tmp[2].strip(), 'link': i })
json = json.dumps(toeflDict)
fo = open('./dict2.js', 'w')
fo.write(json)
