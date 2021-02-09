# Mars Rover Dashboard

**Functional Programming with Javascript**
Project 2 from the Udacity Intermediate JavaScript Nanodegree program. 

## Description
This project is a web app for a Mars rover dashboard that consumes the NASA API. Your dashboard will allow the user to select which rover's information they want to view. Once they have selected a rover, they will be able to see the most recent images taken by that rover, as well as important information about the rover and its mission. Your app will make use of all the functional concepts and practices you have learned in this course, and the goal is that you would become very comfortable using pure functions and iterating over, reshaping, and accessing information from complex API responses. 


## Prerequisite & Installation
Follow these steps to get started:

1. Clone this repo:

```git clone https://github.com/irinakramer/mars-dashboard.git```

For this project we are using yarn as our package manager, so to install your depencies run:

```yarn install``` 

**If you don’t have yarn installed globally, follow their installation documentation here according to your operating system: https://yarnpkg.com/lang/en/docs/install

2. Next you'll need a NASA developer API key in order to access the API endpoints. To do that, go here: https://api.nasa.gov/. If you want to simply look around at what api endpoints NASA offers, you can use their provided DEMO_KEY to do this.

3. In your repo, you will see a .env-example file with a place for your API key. Rename or copy the file to one called `.env` and enter in your key. Now that you have your key, just remember to add it as a parameter to every request you make to NASA.

5. Run `yarn start` in your terminal and go to `http:localhost:3000` to check that your app is working. If you don't see an image on the page, check that your api key is set up correctly.


## Usage
On the homepage select which rover's information you want to view. On the next page you will see extended info about this rover mission and a long gallery of photos taken by this rover on a specific date. Use 'back' button to navigate back to the homepage.


## Demo
Homepage:
![Mars rover dashboard - homepage](/src/public/assets/images/screenshot_home.png?raw=true "Mars rover dashboard - homepage")

Rover page:
![Mars rover dashboard - rover page](/src/public/assets/images/screenshot_rover.png?raw=true "Mars rover dashboard - rover page")


## Author
Code is created by Irina Kramer, using starter code by Udacity.



