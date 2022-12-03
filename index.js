// TODO: Include packages needed for this application
const fs = require('fs')
const inquirer = require('inquirer')
const axios = require('axios')
const licenses = []

async function fetchLicenses() {
  try {
    const res = await axios.get('https://api.github.com/licenses')
    res.data.forEach(license => {
      licenses.push(license)
    })
  } catch (err) {
    console.log(err)
  }
}

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  const res = licenses.filter(data => data.name === license)
  return res[0].spdx_id
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  const res = licenses.filter(data => data.name === license)
  return res[0].url
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  const badge = renderLicenseBadge(license)
  const url = renderLicenseLink(license)
  return `[![License](https://img.shields.io/badge/License-${badge}-blue.svg)](${url})`
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {

  return `${renderLicenseSection(data.license)}
  
# ${data.title}
  
## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)
- [Tests](#tests)
- [Questions](#questions)
- [License](#license)

## Installation
${data.install}

## Usage
${data.usage}

## Contribution
${data.contribution}

## Tests
${data.tests}

## Questions
Visit my [Github](https://github.com/${data.username}) or contact me via [email](${data.email})

## License
${renderLicenseSection(data.license)}
`
}

// TODO: Create a function to initialize app
async function init() {
  await fetchLicenses()
  const licenseChoices = []
  licenses.forEach(license => {
    licenseChoices.push(license.name)
  })

  inquirer.prompt([
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
      type: 'input',
      message: 'Enter how to test the project',
      name: 'tests'
    },
    {
      type: 'input',
      message: 'Enter GitHub username',
      name: 'username'
    },
    {
      type: 'input',
      message: 'Enter email',
      name: 'email'
    },
    {
      type: 'list',
      message: 'Select a license for your project',
      choices: licenseChoices,
      name: 'license'
    }
  ])
    .then(responses => {
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