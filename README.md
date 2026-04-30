# School Trip Management & GPS Simulator

A system for managing school trips, featuring student/teacher registration and a real-time GPS simulation on a map.

##  Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/354dafa9-7c2a-4e11-976c-081b5ffaab90" width="45%" />
  <img src="https://github.com/user-attachments/assets/504b7b04-ad86-48ef-8246-8ae1aaa516ef" width="45%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/c6042ff4-7071-4f56-b469-0a20918f5950" width="30%" />
  <img src="https://github.com/user-attachments/assets/019e7a8b-9935-45b8-aa22-1d18239d85a0" width="30%" />
  <img src="https://github.com/user-attachments/assets/547d8ee2-dc86-4d67-b968-a60c964a4d11" width="30%" />
</p>

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

