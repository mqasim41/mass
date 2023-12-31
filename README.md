#Semester Project - Massively Available Surveillance System

<b>Class</b> : BESE-12A <br>
<b>Name</b> : Attiya Waqar <br>
<b>CMS ID</b> : 369841 <br>
<b>Name</b> : Muhammad Qasim <br>
<b>CMS ID</b> : 365788 <br>


<h1> Working </h1>
<h3> Technologies </h3>
<ul>
  <li> MongoDB for the database </li>
  <li> Express for routing </li>
  <li> React for frontend </li>
  <li> Node JS for backend </li>
  <li> Bootstrap for basic styling</li>
  <li> Arduino IDE for burning microcontroller </li>
  <li> Ardiono for image capturing and sending </li>
</ul>

<h1> Architectural Diagram </h1>
![image](https://github.com/mqasim41/mass/assets/107126273/0ca6b660-0931-44a9-ac2a-85848f17438c)

<h3> Implementation </h3>
The landing page for the website is the Login Page where the user has to login and authenticate himself. On each login the user gets assigned a refresh and access token that gets stored in the database. 
If the user doesn't already have an existing account, the user can register himself at the 'register' page. After registering himself with valid information, the user account gets stored in the backend where API calls send the information entered by the user to the backend for storage and vaidation. Then the user is brought back to the login page where he is asked to enter his credentials so he can login to the website and access all the private routes well. 
The only public routes are the login and register routes which can be accessed by anyone. All other routes will be private and will only be accessible by authenticated logged in users.
When a user logs out, information about the user gets removed and the user has to log back to get authenticated again.

On the Dashboar page, the user gets access to the camera feeds from the active cameras. Each camera feed has an Image Detection Algorithm running at the backend that constantly scans for the appearance of any human in a frame. If a human is detected, an Alert is sent to the frontend from the badckend server notifying the user of the Alert.

<h1>Login and Register</h1> 
<p> 
  The interface provides simple and self-expanatory input fields. Where<br>
  <b> Username </b> : The username is unique and is the attribute used to identify different users <br>
  <b> Password </b> : The password field allows the user to enter anything as password <br>
</p><br>
![Screenshot 2023-12-31 212242](https://github.com/mqasim41/mass/assets/107126273/f37aae5b-b389-46c3-aa5c-674befd1d9f3)


<h1> Validating User Input</h1>
<p>
 The Login Page asks the user for their “username” and “password”. At the backend side, the data is received using the POST API method and the database is checked for if such a user exists. If such a user doesn’t exist an error message is displayed telling the user that invalid credentials were entered.

The “Dont have an account?” link is set, so users who don’t already have an account can go to this link and register one with the register form.<br>
</p>
![Screenshot 2023-12-31 212242](https://github.com/mqasim41/mass/assets/107126273/dd426b03-8e57-4b4f-9de1-fd55fbdcd82a) 
<br>
![Screenshot 2023-12-31 212242](https://github.com/mqasim41/mass/assets/107126273/aebb6fcb-7b1d-4514-a20a-3af2a0fa1740)

When the user enters their details in the register form and submits, a POST API call to the backend is sent, where the backend checks the database if such a user already exists or not. If such a username already exists, an error message is displayed telling the user that the User Already Exists.<br>
![Screenshot 2023-12-31 212242](https://github.com/mqasim41/mass/assets/107126273/c7b42335-798b-4ac4-abc0-dc3677d43ae6)

<br>
<h3> The user can not submit an empty field </h3>
  ![image](https://github.com/mqasim41/mass/assets/107126273/2c29c1c2-d2f2-4aa8-8e44-1031be7b39a9)

<h1> Storing User Accounts in a Database </h1>
All the user accounts are stored in the MongoDB database running at the backend side.<br>
![WhatsApp Image 2023-12-31 at 10 11 15 PM](https://github.com/mqasim41/mass/assets/107126273/e5784aa1-4e55-4778-b769-67dc071179a1)

<h1> Dashboard </h1>
Every page has the ‘header’ component that contains the navigation bar along with the Logout button that allows the user to sign out of his account.

The ‘Dashboard’ page contains the live feeds of all the active cameras along with the current state of the map and real time alerts on the other side of the page. The alerts get updated as a camera picks up a feed of a human entering the camera vision and sends it to the front end for the user to see. <br>
![Screenshot 2023-12-29 040956](https://github.com/mqasim41/mass/assets/107126273/3f8e19f0-2fff-432e-8d87-b00d6c84e7ea)

<h1> Header </h1>
![Screenshot 2023-12-31 212409](https://github.com/mqasim41/mass/assets/107126273/8edc6bc7-1457-4949-a134-1609016e4b89)

<h1> Add Configuration </h1>
The ‘Add Configuration’ form allows the user to set up another camera associated with a specific location on the map and stores it at the backend as well. <br>
![Screenshot 2023-12-31 212509](https://github.com/mqasim41/mass/assets/107126273/6af71690-9a56-4d58-b031-f0d5d1526c5c)






