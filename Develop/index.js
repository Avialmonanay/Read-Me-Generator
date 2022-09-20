//Required resources
const fs = require('fs')
const inquirer = require('inquirer');
const License = require('./generateMarkdown');


// inquirer questions created to intake user information and assign it a variable.
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
  //with inquirer answers finesh we call to the "generateMarkdown.js" to generate a license image and license information to be called on by index.js
.then((answers) => {
  const license = new License()
  const str = answers.license;
  const strYear = answers.year;
  const strName = answers.lname;
  const licenseBadgeRender = license.renderLicenseBadge(str);
  
  //if licenseBadgeRender or licenseLinkRender does not exist then set their variables to emptry strings. Else set the variables with user input
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

    //generates the README Format with user input. Calls to the writToFile function
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

  //creates the README.md with data provided from above.
function writeToFile(fileName, data,) {
    console.log(fileName)

  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
  
}


