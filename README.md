## Lieferspatz

A food delivery website that allows users to order food from different restaurants according to their zip-code, with both user and restaurant interfaces.


## Project Status

This project is finished and fully functional.

## Project Screen Shots
![Home Page](https://github.com/user-attachments/assets/9688c7df-f0fc-4b3b-8c3a-3cc7b0e6f58c)

![Orders](https://github.com/user-attachments/assets/58ccd98c-2da0-4ca3-b351-85901a1c5fa1)

![Order Preview](https://github.com/user-attachments/assets/074be7e0-b21c-41b5-9601-49997e68dfd7)

![Profile](https://github.com/user-attachments/assets/bfeef006-fb4f-4f00-9487-ced502e1ce0d)

<br />

## Installation and Setup Instructions
Note that both frontend and backend initiallization is required for the website to function as intended.

### Initializing Frontend

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:
Open the terminal and navigate to the folder /frontend and execute the following commands.
```
npm install

npm install react-router-dom

npm install socket.io-client
```
To Start Frontend Server:

`npm run dev`

To Visit Website (after starting server):
visit `http://localhost:5173/`

### Initializing Backend
You will need `python` installed globally on your machine.

Installation:
Open another terminal different from the terminal used in initiallizing frontend. <br />
Navigate to the folder /backend and execute the following commands.

```
python -m venv venv

venv/scripts/activate

pip install -r requirements.txt
```

To Start Backend Server:
`python main.py`
<br />

There is a prepared database for testing, you can log in with the credentials: 
<br />
Restaurant: `Email`: asia@live.com `Password`: Test123 
<br />
Customer: `Email`: jane.will@lieferspatz.com `Password`: 57634

<br />

## Reflection

This project is built originally for a group project for the University.
<br />

The requirement for the project was to build the simplest website possible to interact with a database. However, we took it to the next level and built an interactive user interface that makes the website easy to use and visually appealing, with alot more functionalities that originally required.
<br />

We started by building individual pages using `create-react-app`, then added communication and navigation between pages Using `react-router-6.28`, then building the backend using python's `Flask` and `SQLite`.
