import time
from pprint import pprint
from random import randint
from app.models import *
from app import db
from app.scraper.main.datastructure import CharTree
from app.scraper.main.bookchecker import BookChecker


def generator(n):
    data = Zero.query.all()
    slipgames = []

    code = data[-1].code

    chartree = CharTree()
    slips = chartree.generateSlip(code, n)

    count = 0
    temps = []
    
    print(slips)

    while count <= (n//2) + 5:
        
        time.sleep(10)
        
        randoms = randint(0, n-1)
        bookchecker = BookChecker()
        
        
        if slips[randoms] not in temps:
            
            try:
                games = bookchecker.getSlipContent(slips[randoms])
                print(count, end=" ")
                pprint(games)
                
                if len(games["games"]) > 0 and float(games["odds"]) > 1:
                    temps.append(slips[randoms])
                    slipgames.append(games)
            
            except Exception as e:
                print(e)
        
        count += 1
        
    addone = Zero(code=slips[-1])
    db.session.add(addone)
    db.session.commit()
    
    if slipgames:
        for slip in slipgames:
            newslip = Slip(code=slip["betcode"], odds=float(slip["odds"]))
            db.session.add(newslip)
            db.session.flush()
            db.session.refresh(newslip)
            
            for game in slip["games"]:
                newodds = 0
                if game["odds"].replace(".", "").isdecimal():
                    newodds = game["odds"]
                newgame = Game(match=game["game"], option=game["option"], odds=newodds, slip_id=newslip.id)
                db.session.add(newgame)
                db.session.commit()
        
    
    return True