# School Trip Management 

A system for managing school trips, featuring student/teacher registration and a real-time GPS simulation on a map.

##  Screenshots
<img width="1729" height="854" alt="צילום מסך 2026-04-30 175220" src="https://github.com/user-attachments/assets/c26c4f41-ec63-4864-9f91-bff806d3d197" />

##  External Dependencies & Installation
### Prerequisites
- Node.js & npm
- Java JDK 23
- MongoDB 

### Setup & Running
1. **Server**: 
   - Navigate to the `server` folder.
   - Run: `./mvnw spring-boot:run`
2. **Client**: 
   - Navigate to the `Hadasim_client` folder.
   - Enter the sub-folder: `cd my-client--`
   - Run: `npm install`
   - Run: `npm start`

##  Key Features
- **Multi-Role Access**: Separate login flows for **Admins** (School management) and **Teachers**.
- **GPS Simulation**: Custom engine simulating live student locations in the required JSON format.
- **Teacher Dashboard**: Advanced filtering to view only students within a specific teacher's class.
- **Bonus**: Teacher-Student distance calculation (3km alert).

##  Implementation Assumptions
- **Role-Based Logic**: The system distinguishes between Admins and Teachers to control data visibility and access levels.
- **Location Data**: The system uses a simulation engine to generate GPS coordinates, mimicking real-time device updates.
- **Database**: MongoDB is used for persistent storage of users, students, and location logs.

