# qp-assessment
Application Details:
Application ID : 29531654

Problem Statement:
Design a Grocery Booking API:
Roles:
- Admin
- User

Mandatory Requirements:
If you have applied for Fullstack Node position, please use typescript. 

Design API endpoints
1. Admin Responsibilities:
   - Add new grocery items to the system
   - View existing grocery items
   - Remove grocery items from the system
   - Update details (e.g., name, price) of existing grocery items
   - Manage inventory levels of grocery items
2. User Responsibilities:
   - View the list of available grocery items
   - Ability to book multiple grocery items in a single order
Advanced Challenge:
- Containerize the application using Docker for ease of deployment and scaling.
Database:
- Use any relational database of your choice.
How to submit the code?
Create a new GitHub repository with name : qp-assessment
Once you are ready with the code, you can come back on this URL to submit the GitHub Repo Link.

# Execute code
1. Clone the Repository
git clone <repository-url>
cd <project-directory>

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file in the root directory.
Add the following variables to the .env file:

4. Set Up the Database
Option 1:
Ensure that MySQL is installed and running on your local machine.
Open the MySQL Workbench or terminal.
Create the database: CREATE DATABASE grocery_booking;
Run the database queries mentioned in scripts folder:

Option 2: Use an Online Database
If you are using an online database service (e.g., AWS RDS, Google Cloud SQL, Azure Database for MySQL), ensure that:
The database is accessible from your application.
You have the necessary credentials for the online database.
Update the .env file with your online database credentials:

5. Start the Application
Start the development server:
npm run dev
