function typedError(name, defaults) {
  defaults = defaults || {}

  var e = function TypedError(message, inner) {

    if (!(this instanceof TypedError)) {
      return new TypedError(message, inner);
    }

    var err = new Error();
    var self = this;
    var stack

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      get: function () {
        if (stack) return stack
        stack = err.stack;
        stack = stack.substring(nthIndexOf(stack, '\n', 3));
        stack = self.toString() + stack;
        return stack
      }
    , set: function (val) {
        stack = val;
      }
    });

    this.name = name;

    if (defaults.code) {
      this.code = defaults.code;
    }

    if (!inner) {
      inner = message;
    }

    if (message && typeof message === 'string') {
      this.message = message;
    } else {
      this.message = defaults.message || ''
    }

    if (inner && inner instanceof Error) {
      this.inner = inner;
    }

  }
  e.prototype = Error.prototype;

  return e;
}

module.exports = typedError

function nthIndexOf(string, match, n) {
  var index = -1
  while (n--) {
    index = string.indexOf(match, index + 1)
  }

  return index
}