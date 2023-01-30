[![Actions Status](https://github.com/constvict/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/constvict/frontend-project-46/actions)[![Maintainability](https://api.codeclimate.com/v1/badges/f4bca26ec6a2a71e627e/maintainability)](https://codeclimate.com/github/constvict/frontend-project-46/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/f4bca26ec6a2a71e627e/test_coverage)](https://codeclimate.com/github/constvict/frontend-project-46/test_coverage)[![Actions Status](https://github.com/constvict/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/constvict/frontend-project-46/actions/workflows/main.yml)

# Gendiff

Gendiff is a CLI tool for comparing two files and display the difference

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/constvict/frontend-project-46.git
   ```
2. Install NPM packages
   ```sh
   make install
   ```

## Usage
 For help type command
  ```
  gendiff -h
  ```
 To use gendiff run following command with paths for files you want to compare

  ```
  gendiff <filepath1> <filepath2>
  ```
 You can specify the output format with the `-f` or `--format` option. The default output format is `stylish`

  ```
  gendiff <filepath1> <filepath2> -f [format]
  ```

### Examples:

##### Stylish format
[![asciicast](https://asciinema.org/a/HGlGOhgou59C3vNks3Zp7d1r1.svg)](https://asciinema.org/a/HGlGOhgou59C3vNks3Zp7d1r1)

##### Plain format
[![asciicast](https://asciinema.org/a/bcu86LTeopaE6mNi99jicRjbn.svg)](https://asciinema.org/a/bcu86LTeopaE6mNi99jicRjbn)

##### JSON format
[![asciicast](https://asciinema.org/a/8X0jchI0g3T9PzvLSpXFPAcwT.svg)](https://asciinema.org/a/8X0jchI0g3T9PzvLSpXFPAcwT)