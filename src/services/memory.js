function isQuotaExceeded(e) {
  var quotaExceeded = false;
  if(e) {
    if(e.code) {
      switch(e.code) {
        case 22:
          quotaExceeded = true;
          break;
        case 1014:
          // Firefox
          if(e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
            quotaExceeded = true;
          }
          break;
      }
    } else if(e.number === -2147024882) {
      // Internet Explorer 8
      quotaExceeded = true;
    }
  }
  return quotaExceeded;
}

module.exports = {
  get: function(key) {
    var value = window.localStorage.getItem(key);
    return null || JSON.parse(value);
  },
  
  set: function(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch(e) {
      if(isQuotaExceeded(e)) {
        return false;
      }
    }
  },
  remove: function(key) {
    var value = window.localStorage.getItem(key);
    window.localStorage.removeItem(key);
    return value;
  },
  clear: function() {
    window.localStorage.clear();
  }
};
