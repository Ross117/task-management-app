A web-based Task Manager app. It allows you to add tasks to a list, and update them. You can add extra information to the tasks, mark them as complete, set the priority level, and add a scheduled date. If you want, you can also delete tasks when you're done with them.

The app might be a little slow to open. This is because I'm using the free Heroku deployment plan, and the dyno may need a few seconds to wake up.

The front end uses React, and was set up using Create React App. I've written tests in Jest and Enzyme, and I've used Sass for the styling.

The tasks which you add and the updates which you make to them are stored in a PostgreSQL database, which means that everything you do is saved - i.e. changes you make in one session will be visible in the next session. 

The Node.js backend uses Express.js and routes requests from the client to the database also hosted on Heroku. Data is fetched, added, updated and deleted using SQL queries.

I'm currently working on adding some sort functionality to the front end, so that you can re-order the tasks depending on the scheduled date.