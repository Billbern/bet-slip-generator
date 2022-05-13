from itertools import combinations
from random import randint, shuffle
from pprint import pprint


game = list(range(33))

shuffle(game)

game1 = game[:11]
game2 = game[11:23]
game3 = game[23:]

shuffle(game1)
shuffle(game2)
shuffle(game3)


contain1 = []
contain2 = []
contain3 = []

final = []


for item in list(combinations(game1, 7)):
    contain1.append(item)
    
for item in list(combinations(game2, 7)):
    contain2.append(item)
    
for item in list(combinations(game3, 7)):
    contain3.append(item)

randoms1 = randint(0, 10)
randoms2 = randint(0, 10)
randoms3 = randint(0, 10)


for item in contain1[randoms1]:
    final.append(item)
for item in contain2[randoms2]:
    final.append(item)
for item in contain3[randoms3]:
    final.append(item)

pprint(sorted(final))