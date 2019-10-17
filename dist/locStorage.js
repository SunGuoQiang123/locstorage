(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('@babel/runtime/helpers/typeof')) :
  typeof define === 'function' && define.amd ? define(['@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', '@babel/runtime/helpers/typeof'], factory) :
  (global = global || self, global.locStorage = factory(global._classCallCheck, global._createClass, global._typeof));
}(this, function (_classCallCheck, _createClass, _typeof) { 'use strict';

  _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
  _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
  _typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;

  function isBaseType(val) {
    return _typeof(val) !== 'object' && typeof val !== 'function' || val == null;
  }

  var _instance = null;

  var LocStorage =
  /*#__PURE__*/
  function () {
    function LocStorage() {
      _classCallCheck(this, LocStorage);
    }

    _createClass(LocStorage, [{
      key: "get",
      value: function get(key) {
        var data = localStorage.getItem(key);

        if (!data) {
          return data;
        }

        try {
          var parsedData = JSON.parse(data);

          if (!parsedData.timestamp || parsedData.timestamp > new Date().getTime()) {
            var realStr = parsedData.data.slice(0, -1);
            var type = parsedData.data.slice(-1);
            return type === '0' ? realStr : type === '1' ? JSON.parse(realStr) : null;
          } else {
            this.remove(key);
          }
        } catch (error) {
          return null;
        }
      }
    }, {
      key: "set",
      value: function set(key, value, seconds) {
        var data = isBaseType(value) ? value + '0' : JSON.stringify(value) + '1';
        var realValue;

        if (seconds > 0) {
          var timeToOverdue = new Date().getTime() + seconds * 1000;
          realValue = JSON.stringify({
            data: data,
            timestamp: timeToOverdue
          });
        } else {
          realValue = JSON.stringify({
            data: data
          });
        }

        localStorage.setItem(key, realValue);
      }
    }, {
      key: "clear",
      value: function clear() {
        return localStorage.clear();
      }
    }, {
      key: "remove",
      value: function remove(key) {
        return localStorage.removeItem(key);
      }
    }, {
      key: "length",
      get: function get() {
        return localStorage.length;
      }
    }], [{
      key: "getInstancce",
      value: function getInstancce() {
        if (!_instance) {
          _instance = new LocStorage();
        }

        return _instance;
      }
    }]);

    return LocStorage;
  }();

  return LocStorage;

}));
