# Project Management application

Project Management application is a system for managing projects and tasks for specific project based on various statuses. It enables users to add, complete and remove tasks within project. Also, login using Spring Security is provided

## Screenshots
<img src="screenshots/Screenshot_1.jpg"> 
<img src="screenshots/Screenshot_2.jpg"> 
<img src="screenshots/Screenshot_3.jpg"> 
<img src="screenshots/Screenshot_4.jpg"> 
<img src="screenshots/Screenshot_5.jpg"> 
<img src="screenshots/Screenshot_6.jpg"> 
<img src="screenshots/Screenshot_7.jpg"> 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Java Development Kit [https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html]
- Java IDE, preferably Eclipse Java EE IDE for Web Developers [https://www.eclipse.org/downloads/]
- MySQL Database Server [https://netbeans.org/kb/docs/ide/install-and-configure-mysql-server.html]
- MySQL Workbench for database access (not mandatory) [https://dev.mysql.com/downloads/workbench/]
- Node.js [https://nodejs.org/en/]
- Text editor, preferably Visual Studio Code [https://code.visualstudio.com/Download]

### Installing Backend

1. Import 'projectTasks-backend' in Java IDE (File->Import->General->Existing Projects into Workspace)
2. In case of import errors please check project configuration file (pom.xml)
3. Database connection string can be updated in application.properties file (src\main\resources)
4. Run the application as Spring Boot App
5. Test if REST APIs are successfully exposed (using Postman, Mozilla RESTClient, or some other tool)
Notes:
- List of available endpoints can be seen in controllers (src\main\java\com\scvetkovic\todoapp\web\controller)
- After restarting server, database will be again in initial state (in order to change this see 'spring.jpa.hibernate.ddl-auto' in application.properties)
 
### Installing Frontend

1. Open project 'projectTasks-frontend' in some text editor, preferably Visual Studio Code because of integrated terminal
2. Install dependencies. Make sure you have nodejs installed in your system ($ npm install)
3. Run the project ($ npm start)
4. Application should be available at http://localhost:3000/

## Built With

* [Spring Boot](https://spring.io/projects/spring-boot/) - The web framework used for exposing APIs
* [Maven](https://maven.apache.org/) - Dependency Management
* [ReactJS](https://reactjs.org/) - Used for building user interfaces
* [Redux](https://reactjs.org/) - State container

## Authors

[Slobodan Cvetkovic](https://github.com/slobodanc93)



