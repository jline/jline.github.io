---
sidebar_position: 2
---

# Terminal Handling

JLine provides a powerful abstraction for terminal handling through its `Terminal` interface and implementations. This allows your application to interact with different terminal types in a consistent way.

## Creating a Terminal

The `TerminalBuilder` class provides a fluent API for creating terminal instances:

```java
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

import java.io.IOException;

// Create a system terminal (auto-detected)
Terminal terminal = TerminalBuilder.builder()
        .system(true)
        .build();

// Create a dumb terminal (minimal functionality)
Terminal dumbTerminal = TerminalBuilder.builder()
        .dumb(true)
        .build();

// Create a terminal with specific settings
Terminal customTerminal = TerminalBuilder.builder()
        .name("CustomTerminal")
        .system(false)
        .streams(System.in, System.out)
        .encoding(Charset.forName("UTF-8"))
        .jansi(true)
        .build();
```

## Terminal Capabilities

Once you have a terminal instance, you can query its capabilities:

```java
// Check if the terminal supports ANSI
boolean supportsAnsi = terminal.getType().contains("ansi");

// Get terminal size
Size size = terminal.getSize();
int width = size.getColumns();
int height = size.getRows();

// Check if the terminal is interactive
boolean interactive = terminal.isInteractive();
```

## Terminal Output

You can write directly to the terminal:

```java
// Get the terminal writer
PrintWriter writer = terminal.writer();

// Write text
writer.println("Hello, JLine!");
writer.flush();

// Use ANSI escape sequences for formatting (if supported)
writer.println("\u001B[1;31mThis text is bold and red\u001B[0m");
writer.flush();
```

## Terminal Input

For direct terminal input (without using LineReader):

```java
// Get the terminal reader
NonBlockingReader reader = terminal.reader();

// Read a character (blocking)
int c = reader.read();

// Check if input is available
boolean hasInput = reader.available() > 0;

// Read with timeout
int c = reader.read(100); // Wait up to 100ms
```

## Terminal Signals

JLine can handle terminal signals:

```java
terminal.handle(Signal.INT, signal -> {
    // Handle Ctrl+C
    System.out.println("Received SIGINT");
});

terminal.handle(Signal.WINCH, signal -> {
    // Handle terminal resize
    Size size = terminal.getSize();
    System.out.println("Terminal resized to " + size.getColumns() + "x" + size.getRows());
});
```

## Closing the Terminal

Always close the terminal when you're done with it:

```java
terminal.close();
```

## Advanced Terminal Features

JLine's terminal handling includes several advanced features:

### Raw Mode

```java
// Enter raw mode (disable echo, line buffering, etc.)
terminal.enterRawMode();

// Exit raw mode
terminal.setAttributes(terminal.getAttributes().copy());
```

### Cursor Manipulation

```java
// Get cursor position
CursorPosition position = terminal.getCursorPosition(null);

// Move cursor
writer.write("\u001B[5;10H"); // Move to row 5, column 10
writer.flush();
```

### Screen Clearing

```java
// Clear screen
writer.write("\u001B[2J");
writer.flush();

// Clear line
writer.write("\u001B[K");
writer.flush();
```

## Platform Compatibility

JLine's terminal handling works across different platforms:

- Windows (using JNA or Jansi)
- Unix/Linux (using native PTY)
- macOS (using native PTY)
- Dumb terminals (minimal functionality)

This cross-platform compatibility makes JLine ideal for applications that need to run in various environments.
