const fs = require('fs')
const inquirer = require('inquirer');
const License = require('./generateMarkdown');
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
        type: 'checkbox',
        message: 'What kind of license does your application have? please choose 1',
        choices: ['Apache 2.0', 'GNU General Public License v3.0', 'MIT', 'ISC' ],
        name: 'license',
      },
      {
        type: 'input',
        message: 'What is the year of your license?',
        name: 'year',
      },
      {
        type: 'input',
        message: 'What is your full name for license information',
        name: 'lname',
      },
  ])
.then((answers) => {
  const license = new License()
  const str = answers.license;
  const strYear = answers.year;
  const strName = answers.lname;
  const licenseBadgeRender = license.renderLicenseBadge(str);
  if (!licenseBadgeRender){
    var licenseBadge = ""
  }
  else {
    var licenseBadge = licenseBadgeRender
  }

  
  const licenseLinkRender = license.renderLicenseLink(str, strYear, strName)
  if (!licenseLinkRender){
    var licenseLink = ""
    var licenseSection = ""
    var licenseTOC = ""
  }
  else {
    var licenseSection = "## License"
    var licenseLink = licenseLinkRender
    var licenseTOC = "- [License](#license)"
  }
    // console.log(str);
    console.log (licenseBadge)
    console.log(licenseLink)
    const generateFile = (answers) => {
      return `# ${answers.title}        ${licenseBadge}
${answers.description}


## Table of Contents (Optional)

- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Testing](#testing)
- [Features](#features)
- [Contact](#questions)
${licenseTOC}


## Installation
${answers.install}

## Usage
${answers.userUse}

## Contribution
${answers.contribute}

## Testing
${answers.tests}

## Features
${answers.feature}

## Questions
Github Username:${answers.github}
If you have any additional questions please email me at ${answers.email}

${licenseSection}
${licenseLink}`





    };
    writeToFile('README.md', generateFile(answers), answers);
  });
function writeToFile(fileName, data,) {
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
