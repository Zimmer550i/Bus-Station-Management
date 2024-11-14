# Bus Station Management System (Dockerized LAMP Stack)

This project is a basic bus station management system built on a LAMP (Linux, Apache, MySQL, PHP) stack. It's designed to showcase CRUD operations on the backend and is intended for learning and testing purposes. The system is dockerized for easy setup and deployment, with all services configured to run via Docker Compose.

![Bus Station Management System](https://github.com/Zimmer550i/Bus-Station-Management/blob/main/lamp.png)

## Features
- Manage bus stations, buses, routes, and employees
- Basic CRUD operations implemented with PHP and MySQL
- Includes phpMyAdmin for easy database management
- Easy setup using Docker Compose

## Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed on your system (includes Docker Compose)

## Getting Started
1. **Clone the Repository**
   ```bash
   git clone https://github.com/Zimmer550i/Bus-Station-Management.git
   cd Bus-Station-Management
   ```

2. **Run the Application**
   Start all services using Docker Compose:
   ```bash
   docker-compose up -d
   ```
   This will initialize the following containers:
   - **web**: PHP & Apache server to serve the PHP code
   - **db**: MySQL database to store bus station data
   - **phpmyadmin**: phpMyAdmin interface to manage the MySQL database

3. **Access the Application**
   - **Bus Station Management Application**: [http://localhost](http://localhost)
   - **phpMyAdmin**: [http://localhost:8001](http://localhost:8001)

4. **Stopping the Application**
   To stop and remove the containers, run:
   ```bash
   docker-compose down
   ```

## Database Configuration
The database credentials are pre-configured in `docker-compose.yml` and are set to:
- **Database Name**: `bus_station`
- **User**: `admin`
- **Password**: `admin`
- **Root Password**: `root_password`

You can modify these settings in `docker-compose.yml` if necessary.

## Project Structure
- `src/` - Contains the website files (HTML, CSS, PHP, etc.)
- `db-init/` - Contains SQL files to initialize the database schema and tables
- `docker-compose.yml` - Docker Compose configuration file to set up and link the services

## Notes
This project was developed as a simple demo to practice CRUD operations on the backend. It is not intended to be a fully-fledged bus station management solution.
