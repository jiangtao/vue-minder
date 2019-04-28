<template>
  <minder :enable="enable" v-ref:minder :style="defaultStyle"></minder>
</template>
<script>
export default {
  data() {
    return {
      defaultStyle: {
        width: "1000px",
        height: "600px"
      },
      snap: {},
      enable: false
    };
  },
  computed: {},
  methods: {},
  ready() {
    var self = this;
    
    var appNode = {
      "root": {
        "data": {
          "id": "btp5w6s5r1s0",
          "created": 1556422963909,
          "name": "中心主题",
          "hexType": "app"
        },
        "children": [
          {
            "data": {
              "id": "btp5w800w480",
              "created": 1556422966562,
              "name": "111",
              "expandState": "collapse",
              "hexType": "project"
            },
            "children": [
              {
                "data": {
                  "id": "btp5xznvm6w0",
                  "created": 1556423105141,
                  "name": "1111111",
                  "hexType": "dir"
                },
                "children": []
              },
              {
                "data": {
                  "id": "btp5xznvm6w0",
                  "created": 1556423105141,
                  "name": "1111111",
                  "hexType": "dir"
                },
                "children": []
              },
              {
                "data": {
                  "id": "btp5xznvm6w0",
                  "created": 1556423105141,
                  "name": "1111111",
                  "hexType": "dir"
                },
                "children": []
              },
              {
                "data": {
                  "id": "btp5xznvm6w0",
                  "created": 1556423105141,
                  "name": "1111111",
                  "hexType": "dir"
                },
                "children": []
              },
              {
                "data": {
                  "id": "btp5y0oymy80",
                  "created": 1556423107383,
                  "name": "11在",
                  "hexType": "page"
                },
                "children": []
              }
            ]
          },
          {
            "data": {
              "id": "btp5w94xb8g0",
              "created": 1556422969035,
              "name": "222"
            },
            "children": []
          },
          {
            "data": {
              "id": "xxaa112233",
              "created": 1556422969300,
              "name": "哈哈哈",
              "hexType": "page"
            },
            "children": []
          },
          {
            "data": {
              "id": "btp5wa7frcw0",
              "created": 1556422971363,
              "name": "333"
            },
            "children": []
          },
          {
            "data": {
              "id": "btp5wb3tqhs0",
              "created": 1556422973322,
              "name": "444",
              "hexType": "app"
            },
            "children": []
          },
          {
            "data": {
              "id": "btp5wbww1i80",
              "created": 1556422975079,
              "name": "555"
            },
            "children": []
          },
          {
            "data": {
              "id": "btp5wcxx7ag0",
              "created": 1556422977318,
              "name": "666"
            },
            "children": []
          }
        ]
      },
      "template": "default",
      "theme": "fresh-blue",
      "version": "1.4.43"
    }
    
    function addNodeByData(node, root) {
      var addNodeByData = function(node, root) {
        var newNode = window.minder.createNode(root.data, node);
        if (Array.isArray(root.children)) {
          for (let n of root.children) {
            addNodeByData(newNode, n);
          }
        }
        return newNode;
      };
      var newNode = addNodeByData(node, root);
      newNode.renderTree();
      newNode.layout();
    }

    this.$nextTick(function() {
      var minder = this.$refs.minder.minder;
      minder.setOption('app_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/app.png')
      minder.setOption('project_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/project.png')
      minder.setOption('page_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/page.png')
      minder.setOption('dir_url', 'https://hexyuncdn.oss-cn-beijing.aliyuncs.com/mind/dir.png')
      setTimeout(() => {
        minder.importJson(appNode);
      }, 1000);
      var snap = this.snap;
      minder.on("editText", function(e, minder) {
        var node = e.minder.getSelectedNode();
      });
      // 只有选中的时候会触发
      minder.on("selectionchange", function(e) {
        self.minder = e.minder;
        var node = e.minder.getSelectedNode();
        self.currentNode = node;
        if(node && node.parent) {
          setTimeout(function(){
            node.parent.layout()
          }, 0)
        }
        if (self.lock && node) {
        }
        self.lock = true;
      });

      minder.on("beforeExecCommand", function(e) {
        var node = e.minder.getSelectedNode();
        if (/append/i.test(e.commandName)) {
          console.log("add", node);
          self.snap[node.data.id] = node;
        } else if (/remove/i.test(e.commandName)) {
          console.log("remove", node);
          delete self.snap[node.data.id];
        }
      });
      minder.on("beforeExecCommand", function(e) {
        var node = e.minder.getSelectedNode();
        console.log(node);
        if (/append/i.test(e.commandName)) {
          console.log("add", node);
          self.snap[node.data.id] = node;
        } else if (/remove/i.test(e.commandName)) {
          console.log("remove", node);
          delete self.snap[node.data.id];
        }
      });
      minder.on("AfterExecCommand", function(e) {
        var node = e.minder.getSelectedNode();
        console.log('after',node);
        if (/append/i.test(e.commandName)) {
          console.log("after add", node);
        } else if (/remove/i.test(e.commandName)) {
          console.log("after remove", node);
        }
      });
    });
  }
};
</script>
<style>
</style>
