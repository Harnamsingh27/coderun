export const LANGUAGES = [
  { id: 71, name: 'Python',              monaco: 'python' },
  { id: 63, name: 'JavaScript (Node.js)',monaco: 'javascript' },
  { id: 62, name: 'Java',               monaco: 'java' },
  { id: 50, name: 'C',                  monaco: 'c' },
  { id: 54, name: 'C++',               monaco: 'cpp' },
  { id: 74, name: 'TypeScript',         monaco: 'typescript' },
  { id: 60, name: 'Go',                 monaco: 'go' },
  { id: 73, name: 'Rust',               monaco: 'rust' },
  { id: 72, name: 'Ruby',               monaco: 'ruby' },
  { id: 68, name: 'PHP',                monaco: 'php' },
  { id: 83, name: 'Swift',              monaco: 'swift' },
  { id: 78, name: 'Kotlin',             monaco: 'kotlin' },
  { id: 51, name: 'C#',                 monaco: 'csharp' },
  { id: 80, name: 'R',                  monaco: 'r' },
  { id: 46, name: 'Bash',               monaco: 'shell' },
];

export const DEFAULT_SNIPPETS = {
  71: `# Python
print("Hello from CodeRun!")

numbers = [1, 2, 3, 4, 5]
squares = [n ** 2 for n in numbers]
print("Squares:", squares)
`,
  63: `// JavaScript (Node.js)
console.log("Hello from CodeRun!");

const fruits = ["apple", "banana", "cherry"];
const upper = fruits.map(f => f.toUpperCase());
console.log("Fruits:", upper);
`,
  62: `// Java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello from CodeRun!");

        int[] nums = {1, 2, 3, 4, 5};
        int sum = 0;
        for (int n : nums) sum += n;
        System.out.println("Sum: " + sum);
    }
}
`,
  50: `// C
#include <stdio.h>

int main() {
    printf("Hello from CodeRun!\\n");

    int i;
    for (i = 1; i <= 5; i++) {
        printf("Count: %d\\n", i);
    }
    return 0;
}
`,
  54: `// C++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    cout << "Hello from CodeRun!" << endl;

    vector<int> v = {1, 2, 3, 4, 5};
    for (int x : v) {
        cout << x * x << " ";
    }
    cout << endl;
    return 0;
}
`,
  74: `// TypeScript
interface Person {
    name: string;
    age: number;
}

const greet = (p: Person): string => \`Hello, \${p.name}! You are \${p.age} years old.\`;

const user: Person = { name: "CodeRun", age: 1 };
console.log(greet(user));
`,
  60: `// Go
package main

import "fmt"

func main() {
    fmt.Println("Hello from CodeRun!")

    nums := []int{1, 2, 3, 4, 5}
    for _, n := range nums {
        fmt.Printf("%d squared = %d\\n", n, n*n)
    }
}
`,
  73: `// Rust
fn main() {
    println!("Hello from CodeRun!");

    let nums: Vec<i32> = (1..=5).collect();
    for n in &nums {
        println!("{} squared = {}", n, n * n);
    }
}
`,
  72: `# Ruby
puts "Hello from CodeRun!"

(1..5).each do |n|
  puts "#{n} squared = #{n ** 2}"
end
`,
  68: `<?php
// PHP
echo "Hello from CodeRun!\\n";

$fruits = ["apple", "banana", "cherry"];
foreach ($fruits as $fruit) {
    echo strtoupper($fruit) . "\\n";
}
`,
  83: `// Swift
import Foundation

print("Hello from CodeRun!")

let numbers = [1, 2, 3, 4, 5]
for n in numbers {
    print("\\(n) squared = \\(n * n)")
}
`,
  78: `// Kotlin
fun main() {
    println("Hello from CodeRun!")

    val nums = listOf(1, 2, 3, 4, 5)
    nums.forEach { n -> println("$n squared = \${n * n}") }
}
`,
  51: `// C#
using System;
using System.Collections.Generic;

class Program {
    static void Main() {
        Console.WriteLine("Hello from CodeRun!");

        var nums = new List<int> { 1, 2, 3, 4, 5 };
        foreach (var n in nums) {
            Console.WriteLine($"{n} squared = {n * n}");
        }
    }
}
`,
  80: `# R
cat("Hello from CodeRun!\\n")

nums <- 1:5
squares <- nums^2
cat("Squares:", squares, "\\n")
`,
  46: `#!/bin/bash
# Bash
echo "Hello from CodeRun!"

for i in 1 2 3 4 5; do
  echo "$i squared = $((i * i))"
done
`,
};
