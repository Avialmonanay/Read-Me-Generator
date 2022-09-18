const fs = require('fs')
const inquirer = require('inquirer')
// TODO: Create an array of questions for user input
inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the Title of your application?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Give a description of your application',
      name: 'description',
    },
    {
      type: 'input',
      message: 'Explain how to install the application?',
      name: 'install',
    },
    {
        type: 'input',
        message: 'Explain how users will use the application',
        name: 'userUse',
      },
      {
        type: 'input',
        message: 'How will others contribute to your application?',
        name: 'contribute',
      },
      {
        type: 'input',
        message: 'What kind of tests does your application have?',
        name: 'tests',
      },
      {
        type: 'input',
        message: 'What are the applications features?',
        name: 'feature',
      },
      {
        type: 'input',
        message: 'What is your GitHub Username??',
        name: 'github',
      },
      {
        type: 'input',
        message: 'What is your Email for additional questions?',
        name: 'email',
      },
      {
        type: 'license',
        message: 'Please provide the license information of your application',
        name: 'license',
      },
  ])
.then((answers) => {
    console.log(answers);
    const generateFile = (answers) => {
      return `# ${answers.title}
${answers.description}


## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)


## Installation
${answers.install}

## Usage
${answers.userUse}

## How to Contribute
${answers.contribute}

## Testing
${answers.tests}

## Features
${answers.feature}

## Questions
Github Username:${answers.github}
If you have any additional questions please email me at ${answers.email}`





    };
    writeToFile('README.md', generateFile(answers));
  });
function writeToFile(fileName, data) {
    console.log(fileName)
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
}


// TODO: Create a function to write README file
// function writeToFile(fileName, data) {}

// // TODO: Create a function to initialize app
// function init() {}

// // Function call to initialize app
// init();
