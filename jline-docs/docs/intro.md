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
            // Create a terminal
            Terminal terminal = TerminalBuilder.builder()
                    .system(true)
                    .build();

            // Create a line reader
            LineReader reader = LineReaderBuilder.builder()
                    .terminal(terminal)
                    .build();

            // Read lines from the user
            while (true) {
                String line = reader.readLine("prompt> ");

                // Exit if requested
                if ("exit".equalsIgnoreCase(line)) {
                    break;
                }

                // Echo the line back to the user
                terminal.writer().println("You entered: " + line);
                terminal.flush();
            }

            terminal.writer().println("Goodbye!");
            terminal.close();

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

Now that you have a basic understanding of JLine, here's a recommended learning path:

1. **Terminal Handling**: Learn how to [create and configure terminals](./terminal.md) for different environments

2. **Line Reading**: Explore the [LineReader](./line-reader.md) capabilities for advanced input handling

3. **Tab Completion**: Add [tab completion](./tab-completion.md) to provide suggestions as users type

4. **Command History**: Implement [history](./history.md) to allow users to recall previous commands

5. **Advanced Features**: Dive into advanced topics like:
   - [Syntax highlighting](./advanced/syntax-highlighting.md)
   - [Key bindings](./advanced/key-bindings.md)
   - [Attributed strings](./advanced/attributed-strings.md)
   - [Mouse support](./advanced/mouse-support.md)

6. **Modules**: Explore JLine's specialized modules:
   - [Terminal providers](./modules/terminal-providers.md)
   - [Builtins](./modules/builtins.md)
   - [Style](./modules/style.md)
   - [Console](./modules/console.md)
   - [Console UI](./modules/console-ui.md)

7. **Troubleshooting**: Refer to the [troubleshooting guide](./troubleshooting.md) if you encounter issues

JLine offers a rich set of features to create sophisticated command-line interfaces. The examples in this documentation will help you leverage these capabilities in your applications.
