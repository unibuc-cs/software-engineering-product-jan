# Questify

## Table of contents
### Intermediate Product
<ol>
  <li> Product Vision</li>
  <li> Requirements</li>
  <li> User Personas</li>
  <li> Features</li>
  <li> Backlog </li>
  <li> Design </li>
</ol>

### Final Product
1. [Architectural Description](#architectural-description) <br/>
    i. [Product Syntesis](#product-syntesis) <br/>
   ii. [C4 Diagrams](#c4-diagrams) <br/>
  iii. [Non-functional Requirements](#non-functional-requirements) <br/>
2. [QA - Testing](#qa---testing) <br/>
3. [Security Analysis](#security-analysis) <br/>
4. [CI/CD](#cicd) <br/>
5. [Demo](#demo) </br>

##

## Product Vision
<li> <b>FOR</b> people in need of a productivity tool </li> 
<li> <b>WHO</b> are searchig for motivation and a fun way to stay focused. </li>
<li> <b>Questify</b> is a productivity mobile app </li> 
<li> <b>THAT</b> disguises mundane tasks in a story-like manner </li>
<li> <b>UNLIKE</b> overwhelming, too complex, unengaging task managers(Habitica) </li>
<li> <b>OUR PRODUCT</b> offers a more intuitive and accessible user interface </li> 

## Requirements
<li> Must have a specific (iconic), engrossing interface </li>
<li> Must be easy to use and intuitive </li>
<li> Must engage the user and motivate them to keep using the app </li>
<li> Should offer a rewarding experience </li>
<li> Should make the user feel like a hero going through their character development </li>
<li> Should have a slightly social part too, let the user engage with their friends</li>

## User Personas 
<li> People in need of a productivity tool, regardless of their job or education level, who are searching for motivation and a fun way to stay focused </li>

## Features
<li> Account Creation </li>
<ul>
  <li> <I>Input:</I> Account details</li>
  <li> <I>Activation:</I> Press on Sign-up </li>
  <li> <I>Action:</I> A user account is being created</li>
  <li> <I>Output:</I> Gain access to application functionality</li>
</ul>
<li> Account Login </li>
<ul>
  <li> <I>Input:</I> Account credentials</li>
  <li> <I>Activation:</I> Press on Sign-in </li>
  <li> <I>Action: </I>User credentials are being checked for validation </li>
  <li> <I>Output: </I>Access to application </li>
</ul>
<li> Task Creation and Control </li>
<ul>
  <li> <I>Input: </I>Task details (Title, Description, Due Date/Time, Priority Level, Task Type)</li>
  <li> <I>Activation: </I>Press on "Create Task" and other task related butons </li>
  <li> <I>Action: </I>ask details are processed; unique logic is applied based on the selected task type (e.g., Standard, Habit,etc)</li>
  <li> <I>Output: </I>Task is added to the task list with appropriate settings and indicators; points are allocated; confirmation message is displayed</li>
</ul>
<li> Points System </li>
<ul>
  <li> <I>Input: </I>created tasks </li>
  <li> <I>Activation: </I>navigate to designated screen </li>
  <li> <I>Action: </I>Calculate levels for every stat based on the completed task</li>
  <li> <I>Output: </I>Stats are acccurately updated and displayed</li>
</ul>
<li> Task Recommendation system</li>
<ul>
  <li><I>Input: </I>Recorded Tasks, interests and friends </li>
  <li><I>Activation: </I>Navigate to designated section for recommandations </li>
  <li><I>Action: </I>Use different methods to create new customized tasks for the user </li>
  <li><I>Output: </I>Display the recommended task list</li>
</ul>
<li> Progress Visualization </li>
<ul>
  <li> <I>Input: </I>Recorded and completed Tasks </li>
  <li> <I>Activation: </I>Navigate to designated page </li>
  <li> <I>Action: </I>Calculate and create progress related information </li>
  <li> <I>Output: </I>Display the progress-related  information in an intuitive manner</li>
</ul>
<li> Friends </li>
<ul>
  <li> <I>Input: </I>Search other users and/ or accept friend requests </li>
  <li> <I>Activation: </I>press invite/ accept invitation buttons</li>
  <li> <I>Action: </I>Associate two user accounts as being friends </li>
  <li> <I>Output: </I>Display the new friend in the friends list </li>
</ul>

## Backlog
Prioritized backlog is situated in projects on Github, based on the User Stories from Issues

## Design
<li> UML Diagram</li>
<br/>

![image](https://github.com/user-attachments/assets/97f27a39-0ed2-44b5-b46b-4ddef0836502)

<li> C4 Container Diagram </li>
<br/>

![image](https://github.com/user-attachments/assets/ff6e85e7-023e-48cb-a3c8-5c279bed2110)

##

## Architectural Description
### Product Syntesis

Gamify is a mobile application that enables users to manage their daily activities more efficiently, interact with friends, and stay motivated through a gamification system. It combines task management functionalities with social interaction, aiming to boost users' motivation to complete their tasks and to keep their interest in the application for as long as possible.

At the intermediate deliverable, the team has established the following functional objectives for the final deliverable:

- the ability to make an account
- the ability to manage three different types of tasks to organize work more efficiently.
- the ability to receive daily tasks suggested by the app
- the ability to log in
- the ability to connect with one or more friends
- the ability to give and receive challenges from buddies
- the ability to level up my character, based on my achievements and in-app progress
- the ability to choose the initial appearance of my character
- the ability to have suggestions that are tailored to my interests

Whilst some of the objectives, like: authentication, login and, the creation of three different tasks(without the possibility to edit or delete them :)))  were already completed at the intermediate deliverable, for the final deliverable we still had many functionalities to implement. Now we can say that we managed to implement all the above-mentioned features, except the ability to level up your character, based on your achievements. We decided to give up on this idea because none of us have previously worked with animation tools and this process would have been a burden given this context. Nevertheless, we still created a feature that increases each character’s stats based on personal accomplishments.
### C4 Diagrams
<li> C4 Container Diagram </li>
<br/>

![image](https://github.com/user-attachments/assets/79d7b4fa-b8e1-48ab-90f4-4ad6d4df426d)

<li> C4 Context Diagram </li>
<br/>

<img width="712" alt="Screenshot 2025-01-31 at 16 53 42" src="https://github.com/user-attachments/assets/d7be912f-8c5e-42d1-8682-5b8bc69a0e0d" />




### Non-functional Requirements
<ul>
  <li> Load a user’s tasks within one second. </li>
  <li> Don’t let users wait for their suggestions. </li>
  <li> Searching a buddy should not take more than 2 seconds. </li>
  <li> The user should be aware of any loading processes. </li>
  <li> No loading process should take forever. </li>
</ul>
Our non-functional requirements regard mainly performance and responsiveness, as these were the quality attributes on which we chose to focus during the development of our project. Meeting them was accomplished by the following architectural decisions:
<ul>
  <li> switching to a NoSQL database whose documents have been organized in a manner in which our main search processes would be as efficient as possible </li>
  <li> working with contexts which fetch all our user data when the app is opened, guaranteeing no loading time for the user afterwards </li>
  <li> scheduling the LLM which provides the suggestions to asynchronously generate them at the beginning of each day; this way, our users won’t have to wait for the tasks to generate (~ 8 seconds / task) the first time they enter the suggestions screen </li>
</ul>

## QA - Testing

## Security Analysis
Main Threats: 
<ul>
  <li> No Data Encryption </li>
  <li> Unsafe Communication Protocol (HTTP) </li>
  <li> Insecure Authentication </li>
  <li> Client-side Injection </li>
</ul>

Best Practices to Avoid Mentioned Threats:
<ul>
  <li> Encrypt data & use proper encryption key management solutions </li>
  <li> Use a safer communication protocol with the server (HTTPS, TSL) </li>
  <li> Use access control to restrict access to the stored data </li>
  <li> Add requirements to users’ passwords to make them more robust </li>
  <li> Add input validation in order to prevent code injection </li>
</ul>

## CI/CD

# Demo


https://github.com/user-attachments/assets/9a2c6eae-6156-4ad6-9731-debe143731f6


