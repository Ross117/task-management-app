A web-based Task Manager app. It allows you to add tasks to a list, and update them. You can add extra information to the tasks, mark them as complete, set the priority level, and add a scheduled date. If you want, you can also delete tasks when you're done with them.

The front end uses React. I've written tests in Jest and Enzyme, and I've used Sass for the styling.

The tasks which you add and the updates which you make to them are stored in a PostgreSQL database, which means that everything you do is saved - i.e. changes you make in one session will be visible in the next session. 

The Node.js backend uses Express.js and routes requests from the client to the database hosted on Heroku (the app itself is also deployed on Heroku). Data is fetched, added, updated and deleted using SQL queries.

I'm currently working on adding some sort functionality to the front end, so that you can re-order the tasks depending on the scheduled date.