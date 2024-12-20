
# qp-assessment

## Application Details
**Application ID**: 29531654  

This project involves building a **Grocery Booking API** with the following roles and features.

---

## Problem Statement

### Design a Grocery Booking API

#### Roles:
1. **Admin**
2. **User**

---

## Functional Requirements

### Admin Responsibilities:
- Add new grocery items to the system.
- View existing grocery items.
- Remove grocery items from the system.
- Update details (e.g., name, price) of existing grocery items.
- Manage inventory levels of grocery items.

### User Responsibilities:
- View the list of available grocery items.
- Book multiple grocery items in a single order.

---

## Advanced Challenge
Containerize the application using **Docker** for ease of deployment and scaling.

---

## Database
Use any relational database of your choice for storing data.

---

## API Endpoints

### Admin Endpoints
| Endpoint                     | Method   | Description                           |
|------------------------------|----------|---------------------------------------|
| `/admin/grocery`             | POST     | Add new grocery item                  |
| `/admin/grocery`             | GET      | View all grocery items                |
| `/admin/grocery/:id`         | PUT      | Update details of a grocery item      |
| `/admin/grocery/:id`         | DELETE   | Remove a grocery item (soft delete)   |
| `/admin/grocery/inventory`   | PATCH    | Manage inventory levels of grocery items |

### User Endpoints
| Endpoint                     | Method   | Description                           |
|------------------------------|----------|---------------------------------------|
| `/user/grocery`              | GET      | View available grocery items          |
| `/user/order`                | POST     | Book multiple grocery items in  order |

### Auth Endpoints
| Endpoint                     | Method   | Description                           |
|------------------------------|----------|---------------------------------------|
| `/auth/register`             | POST     | Register admin/user                         |
| `/auth/login`                | POST     | Login admin/user                            |

---

## How to Submit the Code
1. Create a new GitHub repository with the name: **qp-assessment**.
2. Once the code is complete, submit the GitHub repository link via the designated URL.

---

## Instructions for Execution

### Clone the Repository
```bash
git clone <repository_url>
cd <repository_directory>
```

### Install Dependencies
```bash
npm install
```

### Configure Environment Variables
1. Create a `.env` file in the root directory.
2. Add the following variables to the `.env` file:

```env
DB_HOST=<your_database_host>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_NAME=<your_database_name>
PORT=<application_port>
```

---

### Set Up the Database

#### Option 1: Local Database
1. Ensure that **MySQL** is installed and running on your local machine.
2. Open **MySQL Workbench** or terminal and create the database:
   ```sql
   CREATE DATABASE grocery_booking;
   ```
3. Run the database queries mentioned in the `scripts` folder.

#### Option 2: Online Database
1. Use an online database service (e.g., AWS RDS, Google Cloud SQL, Azure Database for MySQL).
2. Ensure that:
   - The database is accessible from your application.
   - You have the necessary credentials.
3. Update the `.env` file with your online database credentials.

---

### Start the Application
Start the development server:
```bash
npm run dev
```

---

## Project Structure

```plaintext
qp-assessment/
│
├── src/
│   ├── Controllers/       # API controllers
│   ├── Services/          # API services
│   ├── Routes/            # API routes
│   ├── Middleware/        # API Middleware
│   ├── Database/          # Database Connection
│   └── server.ts          # Application entry point
│
├── Scripts/               # Database initialization scripts
├── Dockerfile             # Docker configuration
├── .env.example           # Example environment variables file
├── README.md              # Project documentation
└── package.json           # Node.js dependencies
```

---

## Advanced Setup

### Containerization with Docker
1. Ensure **Docker** is installed on your machine.
2. Build the Docker image:
   ```bash
   docker build -t qp-assessment .
   ```
3. Run the Docker container:
   ```bash
   docker run -p <host_port>:<container_port> qp-assessment
   ```
---