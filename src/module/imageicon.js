var kity = window.kity;
var utils = require('kityminder-core/src/core/utils');
var Minder = window.kityminder.Minder;
var MinderNode = window.kityminder.Node;
var Command = window.kityminder.Command;
var Module = window.kityminder.Module;
var Renderer = window.kityminder.Render;

module.exports = Module.register('imageicon', function() {
  var self = this;
  
  function loadImageSize(url, callback) {
    var img = document.createElement('img');
    img.onload = function() {
      callback(img.width, img.height);
    };
    img.onerror = function() {
      callback(null);
    };
    img.src = url;
  }
  
  function fitImageSize(width, height, maxWidth, maxHeight) {
    var ratio = width / height,
      fitRatio = maxWidth / maxHeight;
    
    // 宽高比大于最大尺寸的宽高比，以宽度为标准适应
    if(width > maxWidth && ratio > fitRatio) {
      width = maxWidth;
      height = width / ratio;
    } else if(height > maxHeight) {
      height = maxHeight;
      width = height * ratio;
    }
    
    return {
      width: width | 0,
      height: height | 0
    };
  }
  
  /**
   * @command Image
   * @description 为选中的节点添加图片
   * @param {string} url 图片的 URL，设置为 null 移除
   * @param {string} title 图片的说明
   * @state
   *   0: 当前有选中的节点
   *  -1: 当前没有选中的节点
   * @return 返回首个选中节点的图片信息，JSON 对象： `{url: url, title: title}`
   */
  var ImageIconCommand = kity.createClass('ImageIconCommand', {
    base: Command,
    
    execute: function(km, url, title) {
      var nodes = km.getSelectedNodes();
      
      loadImageSize(url, function(width, height) {
        nodes.forEach(function(n) {
          var size = fitImageSize(
            width, height,
            km.getOption('maxImageWidth'),
            km.getOption('maxImageHeight'));
          n.setData('imageicon', url);
          n.setData('imageTitle', url && title);
          n.setData('imageSize', url && size);
          n.render();
        });
        km.fire('saveScene');
        km.layout(300);
      });
      
    },
    queryState: function(km) {
      var nodes = km.getSelectedNodes(),
        result = 0;
      if(nodes.length === 0) {
        return -1;
      }
      nodes.forEach(function(n) {
        if(n && n.getData('image')) {
          result = 0;
          return false;
        }
      });
      return result;
    },
    queryValue: function(km) {
      var node = km.getSelectedNode();
      return {
        url: node.getData('image'),
        title: node.getData('imageTitle')
      };
    }
  });
  
  var ImageRenderer = kity.createClass('ImageRenderer', {
    base: Renderer,
    
    create: function(node) {
      return new kity.Image(node.getData('imageicon'));
    },
    
    shouldRender: function(node) {
      return node.getData('imageicon') || node.getData('hexType');
    },
    
    update: function(image, node, box) {
      var url = node.getData('imageicon');
      var title = node.getData('imageTitle');
      var size = node.getData('imageSize');
      var spaceTop = node.getStyle('space-top');
      var type = node.getData('hexType');
      
      
      var HEX_WIDTH = self.getOption('hex_width') || 20;
      var HEX_HEIGHT = self.getOption('hex_height') || 20;
      var urls = {
        app: self.getOption('app_url'),
        project: self.getOption('project_url'),
        dir: self.getOption('dir_url'),
        page: self.getOption('page_url')
      };
      
      if(type && urls[type]) {
        size = size || {width: HEX_WIDTH, height: HEX_HEIGHT};
        url = urls[type]
      }
  
      if(!size ) return;
      
      if(title) {
        image.node.setAttributeNS('http://www.w3.org/1999/xlink', 'title', title);
      }
      
      var x = -1 * size.width ;
      var y = box.y - spaceTop;
      
      image.setUrl(url).setX(x | 0).setY(y | 0).setWidth(size.width | 0).setHeight(size.height | 0);
      
      // use kity svg
      var items = node.rc.getItems();
      var group = items.find(a => a.constructor.name === 'Group');
      group.setTranslate(2, (size.height - group.getHeight()) / 2 - spaceTop);
      
      node.layout();
      
      return new kity.Box(x | 0, y | 0, size.width | 0, size.height | 0);
    }
  });
  
  return {
    'defaultOptions': {
      'hex_width': 20,
      'hex_height': 20
    },
    'commands': {
      'imageicon': ImageIconCommand
    },
    'renderers': {
      'top': ImageRenderer
    }
  };
});
