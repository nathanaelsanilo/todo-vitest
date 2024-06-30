# Problem Solving Technique

## Floyd's Tortoise and Hare Algorithm

Pointer Algorithm that uses only two pointers, moving through the sequence at different speeds.

1. This algorithm is used to find a loop in a linked list
2. One pointer will moving twice as fast as the other one

## Sliding Window

## Two Pointer

Two pointer technique is commonly used to solve array

1. typically used for searching pairs in a sorted array
2. one pointer slow-runner and the other fast-runner
3. the input array should be sorted before using two pointer technique

Example: [see here](../src/utils/TwoPointer.ts)

## Divide and Conquer

[Source](https://www.geeksforgeeks.org/divide-and-conquer/)

Strategy that involves breaking down a complex problem into smaller subproblems, solving them independently
and then combining their solutions to solve the original problem

- smaller
- more manageable parts
- solving each part individually
- then combining the solutions to solve the original problem

Used by **Merge Sort** algorithm

Three stages of divide and conquer algorithm Divide, Conquer, Merge

1. Divide

   - break down the original problem into smaller subproblems
   - each subproblem should represent a part of the original problem
   - the goal is to divide the problem until no further division is possible

2. Conquer

   - solve each of the smaller subproblems individually
   - if a subproblem is small enough (common terms is base case), we solve it directly without further recursion
   - the goal is to find solutions for these subproblems independently

3. Merge

   - combine the sub-problems to get the final solution of the whole problem
   - once the smaller subproblems are solved, we recursively combine their solutions to get the solution of larger problem
   - the goal is to formulate a solution for the original problem by merging the results from the subproblems
