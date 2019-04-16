#!/bin/python

import json

fi = open('./toefl.txt', 'r')
with fi :
    toeflDict = []
    for i,line in enumerate(fi) :
        ind1 = line.index('[')
        ind2 = line.index(']')
        toeflDict.append({ 'text': line[:ind1], 'link': i })
        toeflDict.append({ 'text': line[ind2+1:-1], 'link': i })
json = json.dumps(toeflDict)
fo = open('./dict.js', 'w')
fo.write(json)
