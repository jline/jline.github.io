---
sidebar_position: 1
---

# Getting Started with JLine

JLine is a Java library that brings advanced console input handling capabilities to your applications. It provides functionality similar to BSD editline and GNU readline, while offering additional features that rival the sophisticated ZSH line editor.

## Overview

JLine enhances your command-line applications with:

- Rich command-line editing capabilities
- Customizable tab completion
- History management with search
- Syntax highlighting
- Multi-line editing
- Unicode support
- Platform-independent implementation
- Flexible keyboard mapping
- Advanced line editing features (cut/paste, word movement, etc.)

## Installation

### Maven Dependency

Add JLine to your project using Maven:

```xml
<dependency>
    <groupId>org.jline</groupId>
    <artifactId>jline</artifactId>
    <version>3.29.0</version>
</dependency>
```

### Gradle Dependency

Or if you're using Gradle:

```groovy
implementation 'org.jline:jline:3.29.0'
```

## Basic Usage

Here's a simple example to get you started with JLine:

```java title="JLineExample.java" showLineNumbers
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

public class JLineExample {
    public static void main(String[] args) {
        try {
            // highlight-start
            // Setup the terminal
            Terminal terminal = TerminalBuilder.builder()
                    .system(true)
                    .build();

            // Create the line reader
            LineReader lineReader = LineReaderBuilder.builder()
                    .terminal(terminal)
                    .build();
            // highlight-end

            // Read a line
            String line = lineReader.readLine("JLine > ");
            System.out.println("You entered: " + line);

        } catch (IOException e) {
            System.err.println("Error creating terminal: " + e.getMessage());
        }
    }
}
```

This simple example demonstrates how to:

1. Create a terminal instance
2. Build a line reader
3. Read input from the user with a custom prompt

## Next Steps

Explore the documentation to learn more about JLine's advanced features:
