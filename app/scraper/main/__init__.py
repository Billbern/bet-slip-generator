import time
import json
from os import getcwd
from pprint import pprint
from random import randint
from app.scraper.main.datastructure import CharTree
from app.scraper.main.bookchecker import BookChecker


def generator(n):
    data = None
    slipgames = None
    
    data_files = [f"{getcwd()}/app/data/data.json", f"{getcwd()}/app/data/games.json"]

    with open(data_files[0]) as f:
        data = json.load(f)

    with open(data_files[1]) as f:
        slipgames = json.load(f)

    code = data[-1]

    chartree = CharTree()
    slips = chartree.generateSlip(code)

    count = 0
    temps = []

    while len(slipgames) <= n:
        
        time.sleep(10)
        
        randoms = randint(0,99)
        bookchecker = BookChecker()
        
        
        if slips[randoms] not in temps:
            
            try:
                games = bookchecker.getSlipContent(slips[randoms])
                pprint(games)
                
                if len(games["games"]) > 0 and float(games["odds"]) > 1:
                    temps.append(slips[randoms])
                    slipgames.append(games)
            
            except Exception as e:
                print(e)
        
        if count >= 99:
            break    
        
        count += 1


    data.append(slips[-1])

    with open(data_files[1], 'w') as f:
        json.dump(slipgames, f)

    with open(data_files[0], 'w') as f:
        json.dump(data, f)
    
    return True