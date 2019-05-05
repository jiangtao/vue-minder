<template>
  <ul class="breadcrumb__list">
    <li v-for="(index, item) in list">
      {{item.data.id}}
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
    props: {},
    data() {
      return {
        list: [],
        minder: null,
        target: null,
        root: null,
        nodes: {}
      };
    },
    ready() {
      this.$nextTick(() => {
        this.minder = window.minder;

        this.minder.on('contentchange', (node) => {
          console.log('content change')
          this.root = this.minder.getRoot()
          this.getNodes(this.root)
        });
        this.minder.on('selectionchange', () => {
          this.target = null;
          // console.log(this.minder.getSelectedNode())
        });
        this.minder.on('dblclick', () => {
          const n = this.minder.getSelectedNode();
          if(n && !n.isLeaf() && n != this.root) {
            this.target = n;
            this.list = this.getBreadcrumb(this.target);
            this.importRoot(this.target);
          }
        });
      });
    },
    methods: {
      getNodes(node) {
        node.traverse(n => {
          this.nodes[n.data.id] = n.clone()
        })
      },
      patch(node) {
        
      },
      getBreadcrumb(node) {
        var list = [], cloned
        while(node && node.parent) {
          cloned = node.parent.clone()
          list.unshift(cloned);
          node = node.parent;
        }
        return list;
      },
      showNode(node, e) {
        console.log(e.target.id, this.nodes[node.data.id])
        this.importRoot(this.nodes[node.data.id]);
      },
      importRoot(node) {
        if(!node) return;
        // 删除当前所有节点
        const root = this.minder.getRoot();
        while(root.getChildren().length) {
          this.minder.removeNode(root.getChildren()[0]);
        }
        console.log('be', root.data.id);
        this.minder.importNode(root, node);
        console.log('af', root.data.id);
        this.minder.select(root, true);
        if (!root.isExpanded()) root.expand()
        this.minder.refresh()
      }
    },
    beforeDestroy() {
      this.nodes = {};
      this.target = null;
      this.list = [];
    }
  };
</script>
