<template>
  <div>
    <div class="nav-bar">
      <div class="nav-btn zoom-in"
           @click="exec('zoomIn')"
           title="zoom-in"
           :class="zoomInCls">
        <div class="icon"></div>
      </div>
      <div v-el:zoom-pan class="zoom-pan">
        <div class="origin"
             :style="originStyle"
             @click="exec('zoom', 100);"></div>
        <div class="indicator"
             :style="indicatorStyle"></div>
      </div>
      <div class="nav-btn zoom-out"
           @click="exec('zoomOut')"
           title="zoom-out"
           :class="zoomOutCls">
        <div class="icon"></div>
      </div>
      <div class="nav-btn hand"
           @click="exec('hand')"
           title="hand"
           :class="handCls">
        <div class="icon"></div>
      </div>
      <div class="nav-btn camera"
           @click="exec('camera', minder.getRoot(), 600)"
           title="camera">
        <div class="icon"></div>
      </div>
      <div class="nav-btn nav-trigger"
           :class="{'active' : isNavOpen}"
           @click="toggleNavOpen()"
           title="navigator">
        <div class="icon"></div>
      </div>
    </div>
    <div v-el:nav-previewer class="nav-previewer" v-show="isNavOpen"></div>
  </div>
</template>
<script>
  import memory from '../../services/memory';
  import config from '../../services/config';

  function bind(minder, ctx) {
    minder.on('layout layoutallfinish', () => {
      updateContentView(minder, ctx);
    });
    minder.on('viewchange', () => {
      updateVisibleView(minder, ctx);
    });
  }

  function unbind(minder, ctx) {
    minder.off('layout layoutallfinish', () => updateContentView(minder, ctx));
    minder.off('viewchange', () => updateVisibleView(minder, ctx));
  }

  function updateContentView(minder, ctx) {

    var view = minder.getRenderContainer().getBoundaryBox();

    ctx.contentView = view;

    var padding = 30;

    ctx.paper.setViewBox(
      view.x - padding - 0.5,
      view.y - padding - 0.5,
      view.width + padding * 2 + 1,
      view.height + padding * 2 + 1);

    var nodePathData = [];
    var connectionThumbData = [];

    minder.getRoot().traverse(function(node) {
      var box = node.getLayoutBox();
      ctx.pathHandler(nodePathData, box.x, box.y, box.width, box.height);
      if(node.getConnection() && node.parent && node.parent.isExpanded()) {
        connectionThumbData.push(node.getConnection().getPathData());
      }
    });

    ctx.paper.setStyle('background', minder.getStyle('background'));

    if(nodePathData.length) {
      ctx.nodeThumb.fill(minder.getStyle('root-background')).setPathData(nodePathData);
    } else {
      ctx.nodeThumb.setPathData(null);
    }

    if(connectionThumbData.length) {
      ctx.connectionThumb.stroke(minder.getStyle('connect-color'), '0.5%').setPathData(connectionThumbData);
    } else {
      ctx.connectionThumb.setPathData(null);
    }

    updateVisibleView(ctx.minder, ctx);
  }

  function updateVisibleView(minder, ctx) {
    ctx.visibleView = minder.getViewDragger().getView();
    ctx.visibleRect.setBox(ctx.visibleView.intersect(ctx.contentView));
  }


  export default {
    props: {},
    data() {
      return {
        isNavOpen: false,
        originStyle: {},
        zoom: 100,
        minder: null,
        view: null,
        contentview: null,
        paper: null
      };
    },
    methods: {
      exec() {
        this.minder.execCommand.apply(this.minder, arguments);
      },
      execState(v) {
        return this.minder.queryCommandState(v);
      },
      getZoomRadio(value) {
        var zoomStack = this.minder.getOption('zoom');
        var minValue = zoomStack[0];
        var maxValue = zoomStack[zoomStack.length - 1];
        var valueRange = maxValue - minValue;

        return (1 - (value - minValue) / valueRange);
      },
      getCss(el, attr) {
        return parseFloat(window.getComputedStyle(el, null)[attr]);
      },
      getHeight(value) {
        var totalHeight = this.getCss(this.$els.zoomPan, 'height');
        return this.getZoomRadio(value) * totalHeight;
      },
      toggleNavOpen() {
        this.isNavOpen = !this.isNavOpen;
        memory.set('navigator-hidden', !this.isNavOpen);

        if(this.isNavOpen) {
          bind(this.minder, this);
          updateContentView(this.minder, this);
          updateVisibleView(this.minder, this);
        } else {
          unbind(this.minder, this);
        }
      }
    },
    computed: {
      handCls() {
        if(!this.minder) return {};
        return {'active': this.execState('hand') == 1};
      },
      zoomInCls() {
        if(!this.minder) return {};
        return {active: this.getZoomRadio(this.zoom) == 0};
      },
      zoomOutCls() {
        if(!this.minder) return {};
        return {'active': this.getZoomRadio(this.zoom) == 1};
      },
      indicatorStyle() {
        if(!this.minder) return {};
        return {
          'transform': 'translate(0, ' + this.getHeight(this.zoom) + 'px)',
          'transition': 'transform 200ms'
        };
      }
    },
    ready() {
      this.$nextTick(() => {
        const ctx = this;
        this.minder = window.minder;
        const scope = this;
        const minder = this.minder;
        window.minder.setDefaultOptions({zoom: config.get('zoom')});
        this.originStyle = {'transform': 'translate(0, ' + this.getHeight(100) + 'px)'};

        scope.isNavOpen = !memory.get('navigator-hidden');

        // 发生缩放事件时
        minder.on('zoom', function(e) {
          scope.zoom = e.zoom;
        });


        setTimeout(() => {
          if(scope.isNavOpen) {
            bind(this.minder, this);
            updateContentView(this.minder, this);
            updateVisibleView(this.minder, this);
          } else {
            unbind(this.minder, this);
          }
        }, 0);

        /**  以下部分是缩略图导航器 *
         * */

        // 画布，渲染缩略图
        this.paper = new kity.Paper(this.$els.navPreviewer);
        var paper = this.paper;

        // 用两个路径来挥之节点和连线的缩略图
        var nodeThumb = this.nodeThumb = paper.put(new kity.Path());
        var connectionThumb = this.connectionThumb = this.connectionThumb = paper.put(new kity.Path());

        // 表示可视区域的矩形
        var visibleRect = this.visibleRect = paper.put(new kity.Rect(100, 100).stroke('red', '1%'));

        var contentView = this.contentView = new kity.Box(), visibleView = new kity.Box();

        /**
         * 增加一个对天盘图情况缩略图的处理,
         * @Editor: Naixor line 104~129
         * @Date: 2015.11.3
         */
        this.pathHandler = getPathHandler(minder.getTheme());

        // 主题切换事件
        minder.on('themechange', function(e) {
          ctx.pathHandler = getPathHandler(e.theme);
        });

        function getPathHandler(theme) {
          switch(theme) {
            case 'tianpan':
            case 'tianpan-compact':
              return function(nodePathData, x, y, width, height) {
                var r = width >> 1;
                nodePathData.push('M', x, y + r,
                  'a', r, r, 0, 1, 1, 0, 0.01,
                  'z');
              };
            default: {
              return function(nodePathData, x, y, width, height) {
                nodePathData.push('M', x, y,
                  'h', width, 'v', height,
                  'h', -width, 'z');
              };
            }
          }
        }

        navigate();

        function navigate() {
          // navigate center
          function moveView(center, duration) {
            var box = ctx.visibleView;
            center.x = -center.x;
            center.y = -center.y;

            var viewMatrix = minder.getPaper().getViewPortMatrix();
            box = viewMatrix.transformBox(box);

            var targetPosition = center.offset(box.width / 2, box.height / 2);

            minder.getViewDragger().moveTo(targetPosition, duration);
          }

          var dragging = false;

          paper.on('mousedown', function(e) {
            dragging = true;
            moveView(e.getPosition('top'), 200);
            if(ctx.$els.navPreviewer)
              ctx.$els.navPreviewer.classList.add('grab');
          });

          paper.on('mousemove', function(e) {
            if(dragging) {
              moveView(e.getPosition('top'));
            }
          });
          window.addEventListener('mouseup', () => {
            dragging = false;
            if(ctx.$els.navPreviewer)
              ctx.$els.navPreviewer.classList.remove('grab');
          });
        }
      });
    }
  };
</script>
