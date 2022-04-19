/**
 * @param {code} string
 * @returns {any} AST
 */
function parse(code) {
  // validate string
  code = code.trim();
  if (code[0] !== '<' || code[code.length - 1] !== '>') {
    return;
  }
  if (code.split('<').length !== code.split('>').length) {
    return;
  }

  // process opening tag
  var openTagIndex = code.indexOf('<');
  var closeTagIndex = code.indexOf('>');
  var s = code.slice(openTagIndex + 1, closeTagIndex).trim();
  if (s.indexOf('/') >= 0) {
    // error check in opening tag
    return;
  }
  var arr = s.split(' ');
  var tagName = arr[0];
  // process props on current tag
  var props = {};
  for (var i = 1; i < arr.length; i++) {
    var [k, v] = arr[i].split('=');
    props[k] = v;
  }

  // process closing tag
  var lastOpenTagIndex = code.lastIndexOf('<');
  var lastCloseTagIndex = code.lastIndexOf('>');
  var tagName2 = code
    .slice(lastOpenTagIndex + 1, lastCloseTagIndex)
    .replaceAll(' ', '');
  if (tagName2[0] !== '/' || tagName !== tagName2.slice(1)) {
    // error check in closing tag
    return;
  }

  // process child text string
  var child = code.slice(closeTagIndex + 1, lastOpenTagIndex); // NO trim() on child texts
  props.children = child ? [child] : [];

  return {
    openingElement: {
      name: tagName,
    },
    closingElement: {
      name: tagName,
    },
    props,
  };
}
/**
 * @param {any} your AST
 * @returns {string}
 */
function generate(ast) {
  return {
    type: ast.openingElement.name,
    props: ast.props,
    // {
    //   ...props,
    //   children
    // }
  };
}
