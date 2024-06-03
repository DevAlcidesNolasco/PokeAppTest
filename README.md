# PokeApp

PokeApp is a web application developed in Angular that consumes the PokeApi v2 to display information about Pokémon. This project serves as a technical test to demonstrate knowledge in Angular and the use of RESTful APIs.

## Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Usage](#usage)
5. [Testing](#testing)
6. [License](#license)

## Requirements

List of necessary requirements to run the project:

- Operating system (e.g., Windows, macOS, Linux)
- Node.js v20.13.1
- Angular CLI

## Installation

Steps to install dependencies and set up the environment:

1. Install Node.js v20.13.1:

    - **Windows and macOS:**
      Download the Node.js v20.13.1 installer from the [official Node.js page](https://nodejs.org/download/release/v20.13.1/) and follow the installation instructions.

    - **Linux:**
      Use `nvm` (Node Version Manager) to install the specific version of Node.js:
      ```bash
      curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
      source ~/.nvm/nvm.sh
      nvm install v20.13.1
      ```

2. Install Angular CLI globally:
    ```bash
    npm install -g @angular/cli
    ```

3. Clone the repository:
    ```bash
    git clone https://github.com/user/PokeApp.git
    cd PokeApp
    ```

4. Install project dependencies:
    ```bash
    npm install
    ```

## Configuration

Instructions to configure any necessary environment variables or configuration files to run the project:

No additional configuration is required for this project.

## Usage

Instructions to run the project:

1. Start the application:
    ```bash
    ng serve
    ```

2. Open a web browser and navigate to the URL:
    ```
    http://localhost:4200
    ```

## License

This project is licensed under the MIT License.
