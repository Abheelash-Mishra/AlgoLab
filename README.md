# AlgoLab

## Overview
AlgoLab is a web application inspired by LeetCode, designed to provide users with a variety of coding problems to solve using an integrated code editor. This platform aims to enhance learning through practice, offering a range of challenges across different programming languages and difficulty levels.

**DISCLAIMER: The code execution API works, but it is hosted on HTTP. The application is hosted on vercel under HTTPS. As such, your browser will not allow communication between the two unless you disable it for this specific website. Currently working on hosting the code execution API on HTTPS.**

## Demo Video

https://github.com/Abheelash-Mishra/AlgoLab/assets/108271085/8b3ab43b-c2f2-490d-bc1f-31ec1891c28a

## Features
- **Problem Selection**: Users can choose from a diverse set of coding problems categorized by difficulty and type.
- **Inbuilt Code Editor**: Integrated Monaco code editor allows users to write and test solutions directly within the platform.
- **RESTful APIs**: APIs handle problem submissions, integrating with the Judge0 API for real-time code execution and evaluation.
- **User Authentication**: Secure authentication and authorization implemented using NextAuth, ensuring user data privacy and session management.
- **Responsive UI**: Designed with a responsive user interface for optimal user experience across devices.

## Technologies Used
- **Next.js**: React framework for building server-side rendered applications.
- **NextAuth**: Authentication library for Next.js applications.
- **Prisma**: Database toolkit for working with PostgreSQL databases.
- **Monaco Editor**: Browser-based code editor used for syntax highlighting, code completion, and more.
- **Judge0 API**: API for executing and evaluating code submissions in various programming languages.

## Setup Instructions
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Abheelash-Mishra/AlgoLab.git
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Define environment variables like `NEXT_PUBLIC_GOOGLE_CLIENT_ID`, `NEXT_PUBLIC_GOOGLE_CLIENT_SECRET`, and others required by NextAuth.

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

5. Head to the Judge0 github and download their latest release. Locate the configurations file and enter the values as needed. Ensure you have Docker installed and have the Docker Engine running. Using `docker-compose up` while inside the judge0 folder, start the container responsible for code executions.

6. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. Access the application in your browser at `http://localhost:3000`.

## Contributing
Contributions to AlgoLab are welcome! Please fork the repository and submit pull requests to contribute new features, improvements, or bug fixes.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
