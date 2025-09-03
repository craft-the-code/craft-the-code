---
title: 'Creating a Keyboard Shortcut Hook in React'
description: 'Building a robust React hook for handling keyboard shortcuts with proper performance optimization, state management, and support for complex key combinations.'
pubDate: 'Sep 03 2025'
author: 'hoanld'
---

# Creating a Keyboard Shortcut Hook in React

While working on a data management dashboard, I needed to implement keyboard shortcuts for efficient navigation. What started as a simple event listener quickly evolved into a comprehensive solution handling everything from single key presses to complex modifier combinations and sequential patterns.

## What We're Building

I built a custom React hook that handles various keyboard interaction patterns. Check out the [working demo](https://c5s8wp.csb.app) and [complete source code](https://codesandbox.io/p/sandbox/purple-paper-c5s8wp) to see it in action.

**Supported features:**
- Single key presses: `X`
- Modifier combinations: `Option + X`
- Multiple modifiers: `Command + Shift + X`
- Sequential key patterns: `↑ ↑ ↓ ↓ ← → ← → B A` (includes the classic [Konami Code](https://en.wikipedia.org/wiki/Konami_Code))

**Technical highlights:**
- Performance optimized with `useCallback` memoization
- Prevents stale closure issues using `useLayoutEffect` with refs
- Context-aware - disabled in text inputs by default
- Handles complex key sequences and combinations

The API is straightforward:

```jsx
useShortcut('Command+Shift+X', () => console.log('Shortcut triggered!'))
```

Let me walk through the implementation, the challenges I faced, and how I solved them.

## Initial Setup

For demonstration purposes, I'll use a simple counter example. While contrived, it clearly shows state access patterns and hook behavior:

```jsx
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <button type="button" onClick={() => setCount((prev) => prev + 1)}>
        Count: {count}
      </button>
      <button type="button" onClick={() => setCount(0)}>
        Reset
      </button>
      <input type="text" placeholder="Try typing here" />
    </div>
  )
}
```

The input field will be useful later for testing context-aware behavior.

## Basic Hook Implementation

Let's start with the simplest approach. The hook takes two parameters:

- `shortcut` - string representing the key or key combination
- `callback` - function to execute when the shortcut is triggered

```jsx
import { useState } from 'react'
import { useShortcut } from './useShortcut'

export default function App() {
  const [count, setCount] = useState(0)

  useShortcut('a', () => { 
    setCount((prev) => prev + 1) 
  })

  return <div>{/* ... */}</div>
}
```

Here's the initial implementation:

```jsx
import { useEffect } from 'react'

export const useShortcut = (shortcut, callback) => {
  const handleKeyDown = (event) => {
    if (shortcut === event.key) {
      return callback(event)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })
}
```

This works - pressing 'a' increments the counter. But there's a performance problem.

## Performance Issues

Without a dependency array, the `useEffect` runs on every render, creating new event listeners each time. You can observe this in Chrome DevTools Performance Monitor - dozens of listeners accumulate with each interaction.

To fix this, I'll memoize the handler with `useCallback`:

```jsx
import { useCallback, useEffect } from 'react'

export const useShortcut = (shortcut, callback) => {
  const handleKeyDown = useCallback((event) => {
    if (shortcut === event.key) {
      return callback(event)
    }
  }, []) // Empty dependency array

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
```

This reduces the listener count significantly, but introduces a new problem.

**Note:** React 19 will reduce the need for manual memoization, but understanding these patterns is still valuable for existing codebases.

## The Stale Closure Problem

The performance optimization works when using functional state updates (`prev => prev + 1`), but breaks with direct state access. Try this shortcut:

```jsx
useShortcut('w', () => {
  setCount(count + count) // Direct state access
})
```

After incrementing the count to 3 and pressing 'w', you'd expect 6. Instead, you get 0.

This happens because the empty dependency array in `useCallback` captures the initial `count` value (0) and never updates it.

## Solving Stale State with Refs

One solution is requiring users to always memoize their callbacks properly:

```jsx
const handleW = useCallback(() => setCount(count + count), [count])
useShortcut('w', handleW)
```

But this puts the burden on the hook consumer and is error-prone. Instead, I'll use a ref pattern with `useLayoutEffect`:

```jsx
import { useRef, useLayoutEffect, useCallback, useEffect } from 'react'

export const useShortcut = (shortcut, callback) => {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const handleKeyDown = useCallback((event) => {
    if (shortcut === event.key) {
      return callbackRef.current(event)
    }
  }, [shortcut])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
```

This pattern ensures the callback always has access to current state while maintaining performance optimization. I've used `useLayoutEffect` for DOM measurements before, but this ref-updating pattern is particularly elegant.

## Adding Modifier Support

Real keyboard shortcuts often use modifier keys. The browser provides boolean properties for each:

- Control: `event.ctrlKey`
- Alt/Option: `event.altKey`  
- Command/Windows: `event.metaKey`
- Shift: `event.shiftKey`

I want to support combinations like:

```jsx
useShortcut('Control+C', () => {
  // Copy functionality
})

useShortcut('Command+Shift+X', () => {
  // Complex shortcut
})
```

I'll create a modifier mapping and parse the shortcut string:

```jsx
const handleKeyDown = useCallback((event) => {
  const modifierMap = {
    Control: event.ctrlKey,
    Alt: event.altKey,
    Command: event.metaKey,
    Shift: event.shiftKey,
  }

  if (shortcut.includes('+')) {
    const keyArray = shortcut.split('+')

    // Check if it starts with a modifier
    if (Object.keys(modifierMap).includes(keyArray[0])) {
      const finalKey = keyArray.pop()

      // Verify all modifiers are pressed and key matches
      if (keyArray.every((k) => modifierMap[k]) && finalKey === event.key) {
        return callbackRef.current(event)
      }
    }
  }

  // Single key fallback
  if (shortcut === event.key) {
    return callbackRef.current(event)
  }
}, [shortcut])
```

Now modifier combinations work correctly.

**Note:** Alt key handling can be tricky since Alt+C produces 'ç' instead of 'C' as the `event.key` value.

## Context-Aware Behavior

Shortcuts shouldn't trigger while users are typing in forms. I'll add an options parameter with smart input detection:

```jsx
export const useShortcut = (
  shortcut,
  callback,
  options = { disableTextInputs: true }
) => {
  const callbackRef = useRef(callback)

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const handleKeyDown = useCallback((event) => {
    const isTextInput =
      event.target instanceof HTMLTextAreaElement ||
      (event.target instanceof HTMLInputElement &&
        (!event.target.type || event.target.type === 'text')) ||
      event.target.isContentEditable

    // Skip shortcuts in text inputs by default
    if (options.disableTextInputs && isTextInput) {
      return event.stopPropagation()
    }

    // ... rest of the logic
  }, [shortcut, options.disableTextInputs])

  // ... useEffect remains the same
}
```

This approach is more precise than checking `tagName === "INPUT"` since it only affects text-type inputs.

## Sequential Key Patterns

For sequences like the Konami Code, I need to track key combinations over time:

```jsx
const handleKonamiCode = () => {
  console.log('30 lives unlocked!')
}

useShortcut(
  'ArrowUp+ArrowUp+ArrowDown+ArrowDown+ArrowLeft+ArrowRight+ArrowLeft+ArrowRight+b+a',
  handleKonamiCode
)
```

I'll add state to track the current sequence:

```jsx
import { useState } from 'react' // Add to imports

export const useShortcut = (
  shortcut,
  callback,
  options = { disableTextInputs: true }
) => {
  const callbackRef = useRef(callback)
  const [keyCombo, setKeyCombo] = useState([])

  // ... existing code

  const handleKeyDown = useCallback(
    (event) => {
      // ... input checking and modifiers

      if (shortcut.includes('+')) {
        const keyArray = shortcut.split('+')

        // Modifier combinations (existing logic)
        if (Object.keys(modifierMap).includes(keyArray[0])) {
          // ... existing modifier logic
        } else {
          // Sequential patterns
          if (keyArray[keyCombo.length] === event.key) {
            // Check if this completes the sequence
            if (
              keyArray[keyArray.length - 1] === event.key &&
              keyCombo.length === keyArray.length - 1
            ) {
              callbackRef.current(event)
              return setKeyCombo([])
            }

            // Add to sequence
            return setKeyCombo((prev) => [...prev, event.key])
          }

          // Reset on wrong key
          if (keyCombo.length > 0) {
            return setKeyCombo([])
          }
        }
      }

      // ... single key logic
    },
    [shortcut, keyCombo.length, options.disableTextInputs]
  )

  // ... rest of hook
}
```

The sequence state needs to be in the dependency array since the logic depends on it.

## Complete Implementation

Here's the final hook with all features and a key-hold prevention:

```jsx
import { useCallback, useRef, useLayoutEffect, useState, useEffect } from 'react'

export const useShortcut = (
  shortcut,
  callback,
  options = { disableTextInputs: true }
) => {
  const callbackRef = useRef(callback)
  const [keyCombo, setKeyCombo] = useState([])

  useLayoutEffect(() => {
    callbackRef.current = callback
  })

  const handleKeyDown = useCallback(
    (event) => {
      const isTextInput =
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLInputElement &&
          (!event.target.type || event.target.type === 'text')) ||
        event.target.isContentEditable

      const modifierMap = {
        Control: event.ctrlKey,
        Alt: event.altKey,
        Command: event.metaKey,
        Shift: event.shiftKey,
      }

      // Ignore held keys
      if (event.repeat) {
        return null
      }

      // Skip text inputs unless explicitly enabled
      if (options.disableTextInputs && isTextInput) {
        return event.stopPropagation()
      }

      if (shortcut.includes('+')) {
        const keyArray = shortcut.split('+')

        // Modifier combinations
        if (Object.keys(modifierMap).includes(keyArray[0])) {
          const finalKey = keyArray.pop()

          if (keyArray.every((k) => modifierMap[k]) && finalKey === event.key) {
            return callbackRef.current(event)
          }
        } else {
          // Sequential patterns
          if (keyArray[keyCombo.length] === event.key) {
            if (
              keyArray[keyArray.length - 1] === event.key &&
              keyCombo.length === keyArray.length - 1
            ) {
              callbackRef.current(event)
              return setKeyCombo([])
            }

            return setKeyCombo((prev) => [...prev, event.key])
          }

          if (keyCombo.length > 0) {
            return setKeyCombo([])
          }
        }
      }

      // Single key shortcuts
      if (shortcut === event.key) {
        return callbackRef.current(event)
      }
    },
    [shortcut, keyCombo.length, options.disableTextInputs]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}
```

## Testing and Edge Cases

You can test the complete implementation with the [demo application](https://c5s8wp.csb.app) or explore the [source code](https://codesandbox.io/p/sandbox/purple-paper-c5s8wp).

Some remaining challenges include:
- Alt key combinations producing accented characters
- Overlapping shortcut conflicts on the same page
- Cross-browser modifier key differences

The hook demonstrates several important React patterns: performance optimization with `useCallback`, stale closure prevention with refs and `useLayoutEffect`, and complex state management for sequences.

This implementation provides a solid foundation for keyboard shortcuts in React applications while handling the common pitfalls I encountered during development.
