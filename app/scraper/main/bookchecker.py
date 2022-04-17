import time
from os import getcwd
from bs4 import BeautifulSoup

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class BookChecker:
    def __init__(self):
        self.driver = None
        self.__initializeDeps()
    
    def __calcOdds(self, games):
        res = 1
        for game in games:
            if game["odds"].replace(".", "").isdecimal():
                res *= float(game["odds"])
        return "{:.2f}".format(res)
    
    
    def __initializeDeps(self):
        options = webdriver.FirefoxOptions()
        options.set_preference("permissions.default.image", 2)
        options.add_argument('--ignore-certificate-errors')
        options.add_argument('--incognito')
        options.add_argument('--headless')
        self.driver = webdriver.Firefox(service=Service(executable_path=f"{getcwd()}/app/scraper/main/geckodriver"),options=options, log_path=f"{getcwd()}/app/scraper/logs/", service_log_path=f"{getcwd()}/app/scraper/logs/")
        self.driver.get("https://www.sportybet.com/gh/m")
        
        time.sleep(2)
        
        try:
            floater = self.driver.find_element(By.CLASS_NAME, "layout")
            if floater.is_displayed():
                self.driver.execute_script("document.querySelector('.layout').style.zIndex = '1200'")
                time.sleep(0.5)
                floater.click()
        except Exception as e:
            print(e)
            
    
    def getSlipContent(self, slip):
        resultant = {"betcode": slip, "games": [], "odds": ""}
        
        try:    
            WebDriverWait(self.driver, 1000000).until(EC.element_to_be_clickable((By.CLASS_NAME, 'betslip-float-wrapper'))).click()
            elem = self.driver.find_element(by=By.CLASS_NAME, value="m-input-wap")
            elem.send_keys(slip)
            WebDriverWait(self.driver, 1000000).until(EC.element_to_be_clickable((By.CLASS_NAME, 'share-code-btn'))).click()
        except Exception as e:
            print(e)
        
        
        time.sleep(1)
        
        newsoup = BeautifulSoup(self.driver.page_source, "lxml")
        
        self.driver.quit()
        
        gamescontainer = newsoup.find("div", attrs={"class": "m-outcomes-list"})
        
        if gamescontainer != None:
            games = gamescontainer.find_all("div", attrs={"class":"m-bet-container"})
            
            data = []
            for item in games:
                data.append(item.find("div", attrs={"class":"m-outcomes-row"}).find("div", attrs={"class": "m-outcome-right"}).find("div", attrs={"class": "m-team-cell"}).find("a").find_all("div"))

            all_slips = []
            for item in data:
                temp = []
                for dec in item:
                    temp.append(dec.text)
                all_slips.append({"option": temp[1].strip(" "), "odds": temp[2].replace("\n", '').strip(" "), "game": temp[-1]})
            resultant["games"] = all_slips
            resultant["odds"] = self.__calcOdds(all_slips)
        
        return resultant

    