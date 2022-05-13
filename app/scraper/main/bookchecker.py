import time
from os import getcwd
from random import choice
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
        proxies = ["41.73.4.106:8080", "80.240.201.62:83", "154.113.19.30:8080", "105.112.134.70:8080", "197.251.233.122:8080", '41.84.152.241:8080', '154.159.243.117:8080']
        options = webdriver.FirefoxOptions()
        options.set_preference("permissions.default.image", 2)
        options.add_argument('--ignore-certificate-errors')
        # options.add_argument(f'--proxy-server={choice(proxies)}')
        options.add_argument('--incognito')
        options.add_argument('--headless')
        self.driver = webdriver.Firefox(service=Service(executable_path=f"{getcwd()}/app/scraper/main/geckodriver", log_path=f"{getcwd()}/app/scraper/logs/geckodriver.log"), options=options, service_log_path=f"{getcwd()}/app/scraper/logs/services.log")
        self.driver.get("https://www.sportybet.com/gh/m")
        
        time.sleep(10)
        
        try:
            floater = self.driver.find_element(By.CSS_SELECTOR, ".es-dialog-wrap .layout")
            WebDriverWait(self.driver, 40).until(EC.visibility_of_element_located(floater))
            if floater.is_displayed():
                self.driver.execute_script("document.querySelector('.layout').style.zIndex = '1200'")
                floater.click()
        except Exception as e:
            print(e)
            
    
    def getSlipContent(self, slip, country):
        resultant = {"betcode": slip, "games": [], "odds": ""}
        
        try:    
            WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CLASS_NAME, 'betslip-float-wrapper'))).click()
            
            if country == 'nigeria':
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".country-main > .af-select-title"))).click()
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".af-select-list > span[data-id='2']"))).click()
            elif country == 'kenya':
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".country-main > .af-select-title"))).click()
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".af-select-list > span[data-id='1']"))).click()
            elif country == 'tanzania':
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".country-main > .af-select-title"))).click()
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".af-select-list > span[data-id='3']"))).click()
            elif country == 'uganda':
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".country-main > .af-select-title"))).click()
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".af-select-list > span[data-id='4']"))).click()
            elif country == 'zambia':
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".country-main > .af-select-title"))).click()
                WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CSS_SELECTOR, ".af-select-list > span[data-id='5']"))).click()
            else:
                pass
            
            elem = self.driver.find_element(by=By.CLASS_NAME, value="m-input-wap")
            elem.send_keys(slip)
            WebDriverWait(self.driver, 20).until(EC.element_to_be_clickable((By.CLASS_NAME, 'share-code-btn'))).click()
            WebDriverWait(self.driver, 40).until(EC.presence_of_element_located((By.CSS_SELECTOR, '.m-betslips-show .m-betslips-outcomes')))
        except Exception as e:
            print(e)
        
        
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

    