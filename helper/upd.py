import csv,json

file = csv.reader(open('Response.csv','r'))

L = []

for line in file:
    L.append(line)
    L[-1].pop(0)

L.pop(0)

def func(name):
    name.strip()
    st = ''
    for i in name:
        st += (i if i!=' ' else '_')
    return st

d = []

count = 3
for line in L:
    d.append({
        "id":count,
        "name":line[1],
        "role":line[2],
        "year":line[3]+' Year'+' '+line[4],
        "bio":line[5],
        "avatar":f'/profile_pictures/{func(line[1])}_photo.jpeg',
        "interests":line[6].split(','),
        "achievements":line[7].split('\\n'),
        "social":{
            "email":line[0],
            "linkedin": line[8],
            "github": line[9],
            "codechef": line[10],
            "codeforces": line[11],
            "leetcode": line[12]
        }
    })
    count += 1

import json

file = open("temp.json","w")
file.write(json.dumps(d))
file.close()