import time
from pprint import pprint
from random import choice
from app.models import *
from app import db
from app.scraper.main.datastructure import CharTree
from app.scraper.main.bookchecker import BookChecker


def generator(n, country='ghana'):
    
    data = Zero.query.filter(Zero.country == country).all()
    
    slipgames = []

    code = data[-1].code

    chartree = CharTree()
    slips = chartree.generateSlip(code, n)

    count = 0
    temps = []
    
    print(slips)

    while count <= (n//2) + 5:
        
        time.sleep(10)
        
        randoms = choice(slips)
        bookchecker = BookChecker()
        
        
        if randoms not in temps:
            
            try:
                games = bookchecker.getSlipContent(randoms, country)
                print(count, end=" ")
                pprint(games)
                
                if len(games["games"]) > 0 and float(games["odds"]) > 1:
                    temps.append(randoms)
                    slipgames.append(games)
            
            except Exception as e:
                print(e)
        
        count += 1
        
    addone = Zero(code=slips[-1], country=country)
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