# N-Puzzle
The N-puzzle is the generalised version of the [8-puzzle problem](https://en.wikipedia.org/wiki/15_puzzle)) (or the [15-puzzle problem](https://en.wikipedia.org/wiki/15_puzzle)).
**The problem:** The 8-puzzle problem is a puzzle popularized by Sam Loyd in the 1870s. It is played on a 3-by-3 grid with 8 square blocks labeled 1 through 8 and a blank square. The goal is to rearrange the blocks so that they are in order. The player is permitted to slide blocks horizontally or vertically into the blank square. 

##Preview
Here is how it will look like
![N-Puzzle](https://raw.githubusercontent.com/jck-d-rpr/N-Puzzle/master/previews/n-puzzle.png)

## Install
Just copy everything to some folder and then
```shell
$ npm install

$ gulp
```
and you are done.
**NOTE** If you are using gulp for the first time you would also need to do 
```$ npm install -g gulp```
before running the other commands

The game will launch in the web-browser on localhost:9055. (If some application is using that port just simply change the port in gulpfile.js -> conifg -> port).

## Usage
Use the arrow keys to move the tiles and if you can't solve it just hit the solve button the computer will do it for you in the lest number of moves.(Then use space to make a move).

**How? you ask**
It uses the [A\* search algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm) for doing so.

NOTE: Finding a shortest solution to a slider puzzle is NP-hard, so it's likely your PC might hang on some cases.

