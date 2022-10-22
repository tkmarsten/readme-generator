// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')
const axios = require('axios')

let licenses = []

// TODO: Create an array of questions for user input
const questions = [
  {
    type: 'input',
    message: 'Enter the title of your README',
    name: 'title'
  },
  {
    type: 'input',
    message: 'Enter the descripton of your project',
    name: 'description'
  },
  {
    type: 'input',
    message: 'Enter the installation instructions for your project',
    name: 'install'
  },
  {
    type: 'input',
    message: 'Enter how to use the project',
    name: 'usage'
  },
  {
    type: 'input',
    message: 'Enter contributors to the project',
    name: 'contribution'
  },
  {
    type: 'list',
    message: 'Select a license for your project',
    choices: ['MIT'],
    name: 'license'
  }
];

async function fetchLicenses() {
  try {
    await axios.get('https://api.github.com/licenses')
      .then((response) => {
        //console.log(response.data)
        licenses = response.data
      })
  } catch (err) {
    console.log(err)
  }
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
async function renderLicenseBadge(license) {
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {

}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  return `# ${data.title}
  
## Description
${data.description}

## Installation
${data.install}

## Usage
${data.usage}

## Contribution
${data.contribution}

## License
`
}

// TODO: Create a function to initialize app
function init() {
  const prompt = inquirer.createPromptModule()
  prompt(questions)
    .then((responses) => {
      //console.log(responses)
      fs.writeFile('sample.md', generateMarkdown(responses), (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('success')
        }
      })
    })
}

// Function call to initialize app
init();