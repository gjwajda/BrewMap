import json
from brewdb import *
from flask import Flask
app = Flask(__name__)

@app.route("/")
def getbreweries():
	BreweryDb.configure("481d514448fd7365873ba9501d928e10")
	brew = BreweryDb.locations({'region':'Illinois'})
	return brew
	# brew = BreweryDb.breweries({'p':1,'geo':1,'lat':41.878,'lng':-87.629,'radius':30,'units':'m'})
	# with open('brew_il.json','wb') as output:
	# 	json.dump(brew,output,indent=4)

if __name__=="__main__":
	app.run()
