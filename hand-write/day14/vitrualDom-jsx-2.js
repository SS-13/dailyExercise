const types = {
  openingElement: 'JSXOpeningElement',
  closingElement: 'JSXClosingElement',
  element: 'JSXElement',
  textElement: 'JSXText',
};

/**
 * @param {code} string
 * @returns {any} AST
 */

const parse = (code) => {
  const str = code.trim();
  if (!str.startsWith('<') || !str.endsWith('>')) {
    throw new Error('One root elment expected');
  }

  let stack = [];
  let cursor = 0;
  while (cursor < str.length) {
    if (str.charAt(cursor) === '<') {
      const [elem, next] = parseTag(str, cursor);

      if (elem.type === types.closingElement) {
        // Collect children
        let children = [];

        while (
          stack.length &&
          stack[stack.length - 1].type !== types.openingElement
        ) {
          children.unshift(stack.pop());
        }

        // Check tags matching
        const openingElement = stack.pop();

        if (elem.name !== openingElement.name) {
          throw new Error('Opening and closing tags must match');
        }

        // Create new Element
        stack.push({
          openingElement,
          children,
          closingElement: elem,
          type: types.element,
        });
      } else {
        stack.push(elem);
      }

      cursor = next;
    } else {
      const [textElement, next] = parseText(str, cursor);
      stack.push(textElement);
      cursor = next;
    }
  }

  if (stack.length !== 1 && stack[0].type !== types.element) {
    throw new Error('Single root element expected');
  }

  return stack[0];
};

const parseTag = (str, cursor) => {
  if (str.length < 2 || str.charAt(cursor) !== '<') {
    throw new Error('Not a valid tag');
  }

  let i = cursor + 1;
  let start = null;
  let end = null;

  let isClosing = false;
  while (i < str.length) {
    if (!start && str.charAt(i) === '/') {
      isClosing = true;
    }

    if (!start && str.charAt(i) !== ' ' && str.charAt(i) !== '/') {
      start = i;
    }

    if ((start && str.charAt(i) === ' ') || str.charAt(i) === '>') {
      end = i;
      break;
    }

    i++;
  }

  if (start === null || end === null) {
    throw new Error('Error while parsing tag name');
  }

  let tag = {
    type: isClosing ? types.closingElement : types.openingElement,
    name: str.slice(start, end).trim(),
  };

  if (!isClosing && str.charAt(end) !== '>') {
    const [attributes, next] = parseAttributes(str, end);
    tag.attributes = attributes;
    end = next;
  }

  while (isClosing && end < str.length && str.charAt(end) !== '>') {
    end++;
  }

  return [tag, end + 1];
};

const parseText = (str, cursor) => {
  let i = cursor;
  while (i < str.length && str.charAt(i) !== '<') {
    // Don't agree with testcase invalid: "<a>></a>", this is valid JSX with ">" as a text child - try AST explorer
    if (str.charAt(i) === '>') {
      throw new Error('Unexpected Character');
    }
    i++;
  }

  return [
    {
      type: types.textElement,
      value: str.slice(cursor, i),
    },
    i,
  ];
};

const parseAttributes = (str, cursor) => {
  let i = cursor;
  let end = null;
  while (i < str.length) {
    if (str.charAt(i) === '>') {
      end = i;
      break;
    }

    i++;
  }

  if (end == null) {
    throw new Error('Error while parsing attributes');
  }

  let attributes = [];
  if (end != null) {
    const attrStr = str.slice(cursor, end).trim();

    attributes = attrStr.split(/\s/);
    attributes = attributes.map((attr) => attr.split('='));
  }

  return [attributes, end];
};

/**
 * @param {any} your AST
 * @returns {string}
 */
function generate(ast) {
  const { openingElement, children } = ast;

  const childrenStr = children.reduce((acc, ch) => {
    if (ch.type === types.textElement) {
      return acc + ch.value;
    } else if (ch.type === types.element) {
      return acc + generate(ch);
    }

    return acc;
  }, '');

  if (childrenStr.length) {
    return h(openingElement.name, null, childrenStr);
  } else {
    return h(openingElement.name, null);
  }
}
