<template>
  <div v-show="showSearch" id="search" class="search-box clearfix">
    <div class="input-group input-group-sm search-input-wrap">
      <input type="text"
             v-el:search-input
             id="search-input"
             class="form-control search-input ng-pristine ng-valid ng-touched"
             v-model="keyword"
             @keydown="handleKeyDown"
             aria-describedby="basic-addon2"/>
      <span class="input-group-addon search-addon" id="basic-addon2"
            v-show="showTip">{{'第 ' + curIndex + ' 条，共 ' + resultNum + ' 条'}}</span>
    </div>
    <div class="btn-group btn-group-sm prev-and-next-btn" role="group">
      <button type="button" class="btn btn-default" @click="doSearch(keyword, 'prev')">
        <span class="glyphicon glyphicon-chevron-up"></span>
      </button>
      <button type="button" class="btn btn-default" @click="doSearch(keyword, 'next')">
        <span class="glyphicon glyphicon-chevron-down"></span>
      </button>
    </div>
    <!--<div class="close-search" @click="exitSearch()">-->
    <!--<span class="glyphicon glyphicon-remove"></span>-->
    <!--</div>-->
  </div>
</template>
<script>
  export default {
    props: {
      kityminder: {
        type: Object
      }
    },
    watch: {
      kityminder(v, old) {
        if(v !== old) {
          this.minder = v;
          this._setupEvents();
        }
      }
    },
    data() {
      return {
        keyword: '',
        showTip: false,
        curIndex: 0,
        resultNum: 0,
        searchSequence: [],
        nodeSequence: [],
        direction: 'next',
        showSearch: this.$parent.showSearch,
        minder: null
      };
    },

    methods: {
      handleKeyDown(e) {
        this.keyword = e.target.value.trim();
        if(e.keyCode == 13) {
          this.direction = e.shiftKey ? 'prev' : 'next';
          this.doSearch(this.keyword, this.direction);
        }
        if(e.keyCode == 27) {
          this.exitSearch();
        }
      },
      _setupEvents() {
        this.getNodes();
        this.minder.setup = true;
        this.minder.on('contentchange', () => {
          this.getNodes();
        });
        this.minder.on('searchNode', () => this.enterSearch());
      },
      _makeSearchSequence(keyword) {
        this.searchSequence = [];

        for(var i = 0; i < this.nodeSequence.length; i++) {
          var node = this.nodeSequence[i];
          var text = node.getText();
          if(text && text.toLowerCase().indexOf(keyword) != -1) {
            this.searchSequence.push({node: node});
          }
          var note = node.getData('note');
          if(note && note.toLowerCase().indexOf(keyword) != -1) {
            this.searchSequence.push({node: node, keyword: keyword});
          }
        }
        console.log(keyword, this.nodeSequence, this.searchSequence);
      },
      doSearch(keyword, type, minder) {
        console.log('xx', arguments);
        var self = this;
        this.showTip = false;
        this.minder.fire('hidenoterequest');

        if(!keyword || !/\S/.exec(keyword)) {
          this.$els.searchInput.focus();
          return;
        }

        // 当搜索不到节点时候默认的选项
        this.showTip = true;
        this.curIndex = 0;
        this.resultNum = 0;


        var newSearch = this.doSearch.lastKeyword != keyword;

        this.doSearch.lastKeyword = keyword;

        if(newSearch) {
          this._makeSearchSequence(keyword);
        }

        this.resultNum = this.searchSequence.length;
        console.log(this.searchSequence);

        if(this.searchSequence.length) {
          var curIndex = newSearch ? 0 : (this.direction === 'next' ? this.doSearch.lastIndex + 1 : this.doSearch.lastIndex - 1) || 0;
          curIndex = (this.searchSequence.length + curIndex) % this.searchSequence.length;
          setSearchResult(this.searchSequence[curIndex].node, this.searchSequence[curIndex].keyword, this.minder);

          this.doSearch.lastIndex = curIndex;

          this.curIndex = curIndex + 1;

          function setSearchResult(node, previewKeyword, minder) {
            minder.execCommand('camera', node, 50);
            setTimeout(function() {
              minder.select(node, true);
              if(!node.isExpanded()) {
                while(node.parent) {
                  node.expand();
                  node = node.parent;
                }
                node.renderTree();
                self.minder.layout(100);
              }
              if(previewKeyword) {
                minder.fire('shownoterequest', {node: node, keyword: previewKeyword});
              }
            }, 60);
          }
        }
      },
      exitSearch() {
        this.$els.searchInput.blur();
        minder.fire('hidenoterequest');
      },
      enterSearch() {
        this.showSearch = true;
        this.$nextTick(() => {
          this.$els.searchInput.focus();
          if(this.keyword) {
            this.$els.searchInput.setSelectionRange(0, this.keyword.length);
          }
        });
      },
      getNodes() {
        if(this.minder) {
          this.nodeSequence = [];
          this.minder.getRoot().traverse(node => {
            this.nodeSequence.push(node);
          });
        }
      }
    },
    ready() {
      document.body.addEventListener('keydown', e => {
        if(e.keyCode == 70 && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
          this.enterSearch();
          e.preventDefault();
        }
      });
    }
  };
</script>
