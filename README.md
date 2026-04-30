# School Trip Management 

A system for managing school trips, featuring student/teacher registration and a real-time GPS simulation on a map.

##  Screenshots
<img width="1729" height="854" alt="צילום מסך 2026-04-30 175220" src="https://github.com/user-attachments/assets/c26c4f41-ec63-4864-9f91-bff806d3d197" />
<img width="1196" height="855" alt="צילום מסך 2026-04-30 175423" src="https://github.com/user-attachments/assets/59b0d85f-2ae4-4ac7-8568-b564104e2b82" />
<img width="1122" height="774" alt="צילום מסך 2026-04-30 175456" src="https://github.com/user-attachments/assets/103cc237-b38d-4262-85a5-90a4e5c5b286" />
<img width="1346" height="797" alt="צילום מסך 2026-04-30 175643" src="https://github.com/user-attachments/assets/432f81a2-393f-4863-9310-ecd90a25d26e" />
<img width="1329" height="833" alt="צילום מסך 2026-04-30 175713" src="https://github.com/user-attachments/assets/493efaf4-6bbf-4d59-98d1-56da13a8adb5" />
<img width="1519" height="792" alt="צילום מסך 2026-04-30 175739" src="https://github.com/user-attachments/assets/1a9f5135-dc42-41f3-bd34-87442af341c0" />


##  External Dependencies & Installation
### Prerequisites
- React 
- Java Spring boot 
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

