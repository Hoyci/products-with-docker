![image](https://github.com/user-attachments/assets/72993bcc-9d4d-4aa1-9f81-0edcd51d4d25)

### Application Description
This application is a product management system designed to handle product creation, deletion, and listing operations. It consists of three primary components: the client, the server, and the database, all orchestrated using Docker Compose for efficient development and deployment.

**Client**: 
The client-side interface is built with HTML and JavaScript, utilizing Tailwind CSS for styling. The HTML file defines the structure of the web page, including a button to create new products and a section to display the list of products. The JavaScript file handles the logic for fetching product data from the server, creating new products, and deleting existing products. The client interacts with the server through HTTP requests.

**Server**: 
The server is built using Express.js, a Node.js web application framework. It defines endpoints for listing products (`GET /products`), creating products (`POST /products`), and deleting products (`DELETE /products/:id`). The server processes these requests and interacts with the PostgreSQL database to perform the necessary operations. CORS is configured to allow communication between the client and the server.

**Database**: 
PostgreSQL is used as the database management system. It stores the product data and is initialized with a SQL script upon container startup. The database is managed within a Docker container, providing persistence and isolation.

**NGINX**: 
NGINX acts as a reverse proxy, routing client requests to the appropriate server endpoints. It serves the static files for the client and proxies API requests to the Express.js server. The configuration ensures that client requests to `/products` are forwarded to the backend server for processing.

**Docker Compose**: 
Docker Compose is used to manage the multi-container setup, including the client, server, and database. It simplifies the deployment process by defining the services, networks, and volumes required for the application. Each service runs in its own container, ensuring a consistent and reproducible environment.

This architecture provides a robust and scalable solution for managing product data, with clear separation of concerns and efficient communication between components.
