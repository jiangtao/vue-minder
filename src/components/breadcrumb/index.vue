<template>
  <ul class="breadcrumb__list">
    <li v-for="(index, item) in list">
      <span :id="item.data.id" @click="showNode(item, $event)" class="item">{{item.data.name}}</span>
      <span v-if="index !== list.length - 1" class="arrow">&gt;</span>
    </li>
  </ul>
</template>
<style>
  .breadcrumb__list {
    display: flex;
    color: #777;
    line-height: 30px;
    font-size: 16px;
    padding: 5px 0;
    margin-left: 10px;
    float: left;
  }

  .breadcrumb__list li {
    list-style: none;
    display: flex;
    align-items: center;
  }

  .breadcrumb__list .item {
    cursor: pointer;
    display: block;
    max-width: 100px;
    border-radius: 3px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .breadcrumb__list .arrow {
    float: left;
    margin: 0 6px;
    font-size: 13px;
  }
</style>
<script>
  export default {
    props: {
      uniqueIndexFn: {
        type: Function,
        default: function indexFunc(node) {
          return node.getData('id') || node.getData('_id') || node.getText();
        }
      }
    },
    data() {
      return {
        list: [],
        minder: null,
        root: null,
        nodes: {},
        lock: false
      };
    },
    ready() {
      this.$nextTick(() => {
        this.minder = window.minder;
        this.minder.on('contentchange', (node) => {
          this.root = this.minder.getRoot();
          this.getNodes(this.root);
        });
        this.minder.on('selectionchange', () => {
          // nothing
        });
        this.minder.on('dblclick', () => {
          const n = this.minder.getSelectedNode();
          if(n && !n.isLeaf() && n != this.root) {
            this.getBreadcrumb(n);
            this.importRoot(n);
          }
        });
      });
    },
    methods: {
      getNodes(node) {
        node.traverse(n => {
          var uniqueKey = this.uniqueIndexFn(n);
          if(uniqueKey) this.nodes[uniqueKey] = n.clone();
        });
        this.lock = true
      },
      getBreadcrumb(node) {
        var list = [], cloned;
        while(node && node.parent) {
          list.unshift(node.parent.clone());
          node = node.parent;
        }
        this.list = list;
        return list;
      },
      showNode(node, e) {
        const uid = this.uniqueIndexFn(node)
        if(uid) {
          this.importRoot(this.nodes[uid])
        } else {
          console.log('check unique key function');
        }
      },
      importRoot(node) {
        if(!node) return;
        // 删除当前所有节点
        const root = this.minder.getRoot();
        while(root.getChildren().length) {
          this.minder.removeNode(root.getChildren()[0]);
        }
        if(!node.isExpanded()) node.expand();

        this.minder.importNode(root, node);
        // node.data.expandState = 'expand'
        // this.minder.importJson({root: node});
        this.minder.select(root, true);
        this.minder.refresh();
        this.lock = true;
      }
    },
    beforeDestroy() {
      this.nodes = {};
      this.list = [];
    }
  };
</script>
