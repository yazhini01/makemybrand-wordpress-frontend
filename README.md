React WordPress Frontend

## Overview

This project provides a React-based frontend for the MakeMyBrand Infographics plugin, allowing users to generate and manage infographic images directly within their WordPress posts.

## Prerequisites

-   Node.js and npm installed on your machine.
-   WordPress installation with the MakeMyBrand Infographics plugin.

## Installation

1.  Clone the repository or download the source code.
2.  Navigate to the project directory:
    ```bash
    cd path/to/react-wordpress-frontend
    ```
3.  Install the necessary dependencies:
    ```bash
    npm install
    ```

## Building the Project

To compile the React code, run the following command:

```bash
npm run build
```

## Deployment

After building the project, you need to copy the compiled script into the appropriate directory:

1.  Copy the makemybrand-block-editor.js file to the `assets` folder:
2.  Copy the entire `assets` folder into your WordPress plugin folder where the MakeMyBrand Infographics plugin is located.

## Usage

Once the `assets` folder is copied, the React components will be available within the WordPress admin interface for use in post creation and editing.

## License

This project is licensed under the GNU General Public License v2. See the LICENSE file for more details.
