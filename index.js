function typedError(name, defaults) {
  defaults = defaults || {}

  var e = function TypedError(message, inner) {

    if (!(this instanceof TypedError)) {
      return new TypedError(message, inner);
    }

    var err = new Error();

    Object.defineProperty(this, 'stack', {
      configurable: true,
      enumerable: false,
      get: function () {
        return err.stack;
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