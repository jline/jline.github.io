---
sidebar_position: 3
---

# Line Reading

The `LineReader` is one of JLine's core components, providing sophisticated line editing capabilities for your command-line applications.

## Creating a LineReader

Use the `LineReaderBuilder` to create a `LineReader` instance:

```java
import org.jline.reader.LineReader;
import org.jline.reader.LineReaderBuilder;
import org.jline.terminal.Terminal;
import org.jline.terminal.TerminalBuilder;

// Create a terminal
Terminal terminal = TerminalBuilder.builder().build();

// Create a basic line reader
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .build();

// Create a line reader with custom configuration
LineReader customReader = LineReaderBuilder.builder()
        .terminal(terminal)
        .appName("MyApp")
        .variable(LineReader.HISTORY_FILE, Paths.get("history.txt"))
        .option(LineReader.Option.AUTO_FRESH_LINE, true)
        .option(LineReader.Option.HISTORY_BEEP, false)
        .build();
```

## Reading Input

The basic method for reading input is `readLine()`:

```java
// Read a line with a prompt
String line = reader.readLine("prompt> ");

// Read a line with a right prompt (displayed at the right edge)
String line = reader.readLine("prompt> ", "right prompt", (Character) null);

// Read a masked line (for passwords)
String password = reader.readLine('*');
```

## Line Reader Options

JLine's `LineReader` supports numerous options to customize behavior:

```java
// Configure options during creation
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .option(LineReader.Option.CASE_INSENSITIVE, true)
        .option(LineReader.Option.AUTO_REMOVE_SLASH, true)
        .build();

// Or set options after creation
reader.setOpt(LineReader.Option.HISTORY_IGNORE_DUPS);
reader.unsetOpt(LineReader.Option.HISTORY_BEEP);
```

Common options include:

- `CASE_INSENSITIVE`: Case-insensitive completion
- `AUTO_FRESH_LINE`: Automatically add a newline if the cursor isn't at the start of a line
- `HISTORY_BEEP`: Beep when navigating past the end of history
- `HISTORY_IGNORE_DUPS`: Don't add duplicate entries to history
- `HISTORY_IGNORE_SPACE`: Don't add entries starting with space to history
- `MENU_COMPLETE`: Cycle through completions on tab

## Customizing Prompts

JLine supports rich prompt customization:

```java
// Simple text prompt
String line = reader.readLine("simple> ");

// Colored prompt (ANSI escape sequences)
String line = reader.readLine("\u001B[1;32msimple>\u001B[0m ");

// Dynamic prompt
String line = reader.readLine(() -> {
    LocalTime now = LocalTime.now();
    return now.format(DateTimeFormatter.ofPattern("HH:mm:ss")) + "> ";
});
```

## Handling Special Keys

You can customize how the `LineReader` responds to key presses:

```java
// Create a custom key map
KeyMap<Binding> keyMap = reader.getKeyMaps().get(LineReader.MAIN);

// Bind a key to a widget
keyMap.bind(new Reference("clear-screen"), KeyMap.ctrl('L'));

// Bind a key to a custom action
keyMap.bind(
    () -> {
        System.out.println("Custom action executed!");
        return true;
    },
    KeyMap.alt('X')
);
```

## Line Editing Features

JLine's `LineReader` provides numerous line editing features:

- **Navigation**: Move by character, word, or line
- **Editing**: Insert, delete, cut, paste, transpose
- **History**: Navigate, search, and filter command history
- **Completion**: Tab completion with customizable behavior
- **Search**: Incremental search through current line or history

## Advanced Usage

### Multi-line Input

JLine supports multi-line input with proper continuation:

```java
// Configure multi-line support
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .parser(new DefaultParser())
        .variable(LineReader.SECONDARY_PROMPT_PATTERN, "%M> ")
        .build();

// Read multi-line input (e.g., with unclosed quotes or brackets)
String multiLine = reader.readLine("multi> ");
```

### Custom Validators

You can validate input before accepting it:

```java
// Create a validator
Validator validator = line -> {
    if (line.isEmpty()) {
        throw new ValidationException("Input cannot be empty");
    }
};

// Use the validator
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .validator(validator)
        .build();
```

### Custom Highlighters

JLine can highlight input as it's typed:

```java
// Create a highlighter
Highlighter highlighter = (reader, buffer, list) -> {
    AttributedString highlighted = new AttributedStringBuilder()
            .append(buffer.toString(), AttributedStyle.BOLD)
            .toAttributedString();
    list.add(highlighted);
    return highlighted;
};

// Use the highlighter
LineReader reader = LineReaderBuilder.builder()
        .terminal(terminal)
        .highlighter(highlighter)
        .build();
```

## Best Practices

- Always close the terminal when your application exits
- Use try-with-resources for automatic resource management
- Configure history appropriately for your application
- Consider using a parser for complex command syntax
- Provide helpful completion options for better user experience
