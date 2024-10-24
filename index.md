---
title: JLine
layout: default
---

# JLine - Advanced Console Input for Java

## Overview

JLine is a powerful Java library that brings advanced console input handling capabilities to your applications. It provides functionality similar to [BSD editline](http://www.thrysoee.dk/editline/) and [GNU readline](http://www.gnu.org/s/readline/), while offering additional features that rival the sophisticated [ZSH line editor](http://zsh.sourceforge.net/Doc/Release/Zsh-Line-Editor.html).

### Key Features

- Rich command-line editing capabilities
- Customizable tab completion
- History management with search
- Syntax highlighting
- Multi-line editing
- Unicode support
- Platform-independent implementation
- Flexible keyboard mapping
- Advanced line editing features (cut/paste, word movement, etc.)

## See It in Action

Watch JLine's capabilities in this interactive demo:

[![JLine gogo demo](https://asciinema.org/a/683979.svg)](https://asciinema.org/a/683979)

## Getting Started

### Maven Dependency

```xml
<dependency>
    <groupId>org.jline</groupId>
    <artifactId>jline</artifactId>
    <version>3.x.x</version>
</dependency>
```

### Quick Example

```java
Terminal terminal = TerminalBuilder.terminal();
LineReader lineReader = LineReaderBuilder.builder()
        .terminal(terminal)
        .build();

String line = lineReader.readLine("prompt> ");
```

## Evolution of JLine

JLine has evolved significantly since its inception:

- **JLine 3** (2015-Present)
  - Current active version
  - Complete rewrite with modern Java features
  - Enhanced terminal support
  - Rich building blocks for creating interactive applications
  - [Repository](https://github.com/jline/jline3)

- **JLine 2** (2009-2015)
  - Major evolution of the original codebase
  - Improved architecture and features
  - [Repository](https://github.com/jline/jline2)

- **JLine 1** (2002-2009)
  - Original version by Marc Prud'hommeaux
  - Established core functionality
  - [Repository](https://github.com/jline/jline1)

## Documentation

- [User Guide](https://github.com/jline/jline3/wiki)
- [API Documentation](https://github.com/jline/jline3/blob/master/README.md)
- [Examples](https://github.com/jline/jline3/tree/master/demo/src/main/java/org/jline/demo)

## Community

- [GitHub Issues](https://github.com/jline/jline3/issues)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/jline)
- [Release Notes](https://github.com/jline/jline3/releases)

## License

JLine is released under the [BSD License](https://github.com/jline/jline3/blob/master/LICENSE.txt).

---

*JLine is actively maintained and welcomes contributions from the community.*
