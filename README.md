# User Management Role-Based Access Control (RBAC) System

This project is a User Management System developed using React-JS, offering functionality to manage users and roles in a tabular format. It allows for the creation, updating, and removal of users and roles, with each user having attributes like name, email, role, and status (active/inactive). User data is persistently stored in localStorage, ensuring data remains intact even after refreshing the page.


## Features

- **Add Users**:  Easily add users through a form by entering details like name, email, and role. The email field includes validation to ensure correct formatting before submission. q
- **Edit Users**: Update user details by selecting the "Edit" button in the table. The form will load pre-filled user information for easy editing. 
- **Delete Users**:Remove users permanently by clicking the "Delete" button associated with their record.
- **Responsiveness**: The app adjusts seamlessly across desktop and mobile devices for a consistent user experience.
- **Role Management**:Define and assign roles to users when creating or updating their details, offering control over access levels.
- **Data Persistence**: All data is saved in the browser's localStorage, enabling persistence even after the browser is closed or refreshed.  
-**Search and Sorting**: Quickly find users in the table using the search bar by typing their name, email, or role.

## Technologies Utilized

- **React** For building the user interface and managing component interactions.
- **Tailwind CSS** For responsive and modern styling.
- **localStorage** To store and persist user and role data locally.


## How to Use

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harver2001/RBAC-VRV-Security

2. **Install dependencies:**

   - (Assuming you have Node.js and npm installed)
   - Run the below command to install all the required dependencies.
   
    npm install

2. **Start the application:**

   - Run the below command to start the project locally.
   
    npm start


## Usage Instructions

- Create Roles: Before adding users, define roles that can be assigned to users.
-Add Users: Use the "Add User" button to open the form for adding new users. Fill in the required details and assign a role.
-Edit Users: Update user details by clicking the "Edit" button next to the user’s entry. Modify the information as needed and save the changes.
-Delete Users: Permanently remove users by clicking the "Delete" button corresponding to their record.
-Data Persistence: All user and role data is automatically saved to the browser's localStorage, ensuring the information remains available even after a page reload.
-Search and Sort Users: Use the search bar at the top of the table to filter users by typing a name, email, or role. The list updates dynamically as you type.