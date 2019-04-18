#!/bin/python

import json

toeflDict = {}
fi = open('./CET6.txt', 'r')
with fi :
    for i,line in enumerate(fi) :
        tmp = line.split('/')
        if len(tmp) < 3 :
            continue
        toeflDict[tmp[0].strip()] = tmp[2].strip()        
fi = open('./CET4.txt', 'r')
with fi:
    for line in fi :
        try :
            ind = line.index(' ')
        except ValueError :
            print(line)
            continue
        toeflDict[str(line[:ind]).strip()] = str(line[ind+1:]).strip()
wordList = []
index = 0
for key,val in toeflDict.items() :
    wordList.append({ 'text': val, 'link': index })
    wordList.append({ 'text': key, 'link': index })
    index = index + 1
json = json.dumps(wordList)
fo = open('./dict3.js', 'w')
fo.write(json)
