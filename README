Bowling Scorer Exercise for the BBC
=====================================
This exercise has been completed as per the provided instructions.  It satisfies the suggested test cases and adds
a few intermediary ones which were created during implementation using a red-green-refactor TDD development process.

Setup
------
The exercise uses the 'mocha' and 'chai' testing frameworks which can be installed using npm with the command:

    npm install

This command should be executed in the directory where the exercise is located.

Usage
------
To execute the scorer, run the the score.js file through the node.js interpreter and supply a single command-line
argument command that includes the frames scores as defined in the provided spec.  For example:

    node score 9-7/X655912-95/X23

Explanation
------------
Although a number of functions are used to complete the required task, care has been taken to:

  1. expose only the function that is required to complete the business requirements (ie. score)
  2. create test cases only for the business requirement and not to test internal functions

The purpose of this approach is to reduce the potential for brittle tests that are too tightly bound to implementation
and not focused on requirements.  This increases the ease with which internal refactoring can occur while still ensuring
business requirements are met.

In a number of internal functions, all rolls are passed to the function with an index indicating the current roll.  The
functions use the index to lookup the current roll rather than looking up the roll outside the function and passing the
actual roll value in.  In the 'calculateBonus' function this is required as values in subsequent rolls (not just the
current one) need to be looked-up.  In other instances, this approach has been maintained for consistency with the
choice being made due to the cheapness of looking up values in an array by index.