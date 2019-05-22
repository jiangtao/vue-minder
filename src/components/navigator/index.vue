<style>
  .nav-bar{
    background-color: #fff !important;
  }
  .nav-btn{
    vertical-align: middle;
  }
  .icon{
    width: 20px !important;
    height: 20px !important;
  }
  .zoom--pan .text{
    color: #222;
    display: inline-block;
    text-align: center;
    width: 30px;
    user-select: none;
  }
</style>
<template>
  <div>
    <div class="nav-bar">
      <div class="nav-btn zoom-in"
           @click="exec('zoomIn')"
           title="{{ 'zoom-in' | ml 'ui' }}"
           :class="zoomInCls">
<svg t="1557915928818" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1989" xmlns:xlink="http://www.w3.org/1999/xlink"width="32" height="32"><defs><style type="text/css"></style></defs><path d="M604.16 430.08c0 11.264-9.216 20.48-20.48 20.48H450.56v133.12c0 11.264-9.216 20.48-20.48 20.48s-20.48-9.216-20.48-20.48V450.56H276.48c-11.264 0-20.48-9.216-20.48-20.48s9.216-20.48 20.48-20.48h133.12V276.48c0-11.264 9.216-20.48 20.48-20.48s20.48 9.216 20.48 20.48v133.12h133.12c11.264 0 20.48 9.216 20.48 20.48z m359.424 533.504c-4.096 4.096-9.216 6.144-14.336 6.144s-10.24-2.048-14.336-6.144L683.008 711.68C615.424 772.096 527.36 808.96 430.08 808.96 221.184 808.96 51.2 638.976 51.2 430.08S221.184 51.2 430.08 51.2s378.88 169.984 378.88 378.88c0 97.28-36.864 185.344-97.28 252.928l251.904 251.904c8.192 8.192 8.192 20.48 0 28.672zM768 430.08C768 243.712 616.448 92.16 430.08 92.16S92.16 243.712 92.16 430.08s151.552 337.92 337.92 337.92 337.92-151.552 337.92-337.92z" p-id="1990" fill="#2c2c2c"></path></svg>
      </div>

      <div @click="exec('zoom', 100);" v-el:zoom-pan class="zoom--pan">

        <span class="text">{{zoom}}%</span>
      </div>
      <div class="nav-btn zoom-out"
           @click="exec('zoomOut')"
           title="{{ 'zoom-out' | ml 'ui' }}"
           :class="zoomOutCls">
<svg t="1557916627763" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6026" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M426.666667 785.066667c-98.679467 0-183.995733-35.259733-253.559467-104.840534S68.266667 525.346133 68.266667 426.666667s35.2768-183.995733 104.840533-253.559467S327.9872 68.266667 426.666667 68.266667c98.082133 0 183.381333 35.259733 253.508266 104.789333C749.806933 242.670933 785.066667 327.9872 785.066667 426.666667c0 36.078933-4.522667 70.638933-13.4144 102.7072-16.469333 55.227733-46.336 105.0112-88.917334 148.343466a15.752533 15.752533 0 0 1-2.6112 3.4816c-30.225067 29.610667-63.624533 53.367467-99.242666 70.6048C534.272 773.905067 482.423467 785.066667 426.666667 785.066667z m0-682.666667c-89.2928 0-166.485333 31.914667-229.4272 94.839467S102.4 337.373867 102.4 426.666667s31.914667 166.485333 94.839467 229.4272C260.181333 719.035733 337.373867 750.933333 426.666667 750.933333c50.653867 0 97.5872-10.069333 139.451733-29.917866 31.197867-15.086933 60.689067-35.874133 87.586133-61.7472a15.394133 15.394133 0 0 1 2.4064-3.1744c39.850667-39.850667 67.703467-85.674667 82.756267-136.174934 7.970133-28.7744 12.066133-60.245333 12.066133-93.252266 0-89.2928-31.8976-166.485333-94.839466-229.4272C592.64 134.331733 515.4304 102.4 426.666667 102.4z" p-id="6027"></path><path d="M938.666667 973.653333a33.9968 33.9968 0 0 1-24.132267-10.001066l-120.32-120.32a34.133333 34.133333 0 1 1 48.264533-48.264534l120.32 120.32A34.133333 34.133333 0 0 1 938.666667 973.653333zM597.333333 462.506667H256a34.133333 34.133333 0 0 1 0-68.266667h341.333333a34.133333 34.133333 0 0 1 0 68.266667z" p-id="6028"></path><path d="M692.309333 644.864l150.186667 150.186667-48.2816 48.2816-150.186667-150.186667z" p-id="6029"></path></svg>
      </div>
      
      <div class="nav-btn hand"
           @click="exec('hand')"
           title="{{ 'hand' | ml 'ui' }}"
           :class="handCls">
        <svg t="1558500239573" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3391" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M870.4 204.8c-18.6368 0-36.1472 5.0176-51.2 13.7728V153.6a102.5024 102.5024 0 0 0-159.3856-85.0432C645.7856 28.672 607.7952 0 563.2 0S480.5632 28.672 466.5856 68.5568A102.5024 102.5024 0 0 0 307.2 153.6v377.4976L238.2848 411.648a99.6864 99.6864 0 0 0-61.3888-48.7936 95.5392 95.5392 0 0 0-74.8544 10.3424c-46.4384 27.8528-64.1536 90.8288-39.424 140.3904 1.536 3.1232 34.2016 70.0416 136.192 273.92 48.0256 96 100.7104 164.6592 156.6208 203.9808 43.8784 30.8736 74.1888 32.4608 79.8208 32.4608h256c43.5712 0 84.0704-14.1824 120.4224-42.0864 34.1504-26.2656 63.7952-64.256 88.064-112.8448 47.8208-95.6416 73.1136-227.9424 73.1136-382.6688v-179.2c0-56.4736-45.9264-102.4-102.4-102.4z m51.2 281.6c0 146.7904-23.3984 271.1552-67.6864 359.7312C825.0368 903.8848 773.3248 972.8 691.2 972.8H435.712c-1.9968-0.1536-23.552-2.56-56.064-26.88-32.4096-24.2688-82.176-75.3664-135.0656-181.248-103.7824-207.5648-135.68-272.9472-135.9872-273.5616l-0.1024-0.2048c-12.8512-25.7536-3.7376-59.4944 19.9168-73.6768a44.8512 44.8512 0 0 1 35.072-4.864 48.9472 48.9472 0 0 1 30.0544 24.1664l0.3072 0.512 79.9232 138.496c16.3328 29.8496 34.7136 42.3936 54.6304 37.3248 19.968-5.0688 30.0544-25.0368 30.0544-59.2384V153.6c0-28.2112 22.9888-51.2 51.2-51.2s51.2 22.9888 51.2 51.2v332.8a25.6 25.6 0 0 0 51.2 0V102.4c0-28.2112 22.9888-51.2 51.2-51.2s51.2 22.9888 51.2 51.2v384a25.6 25.6 0 0 0 51.2 0V153.6c0-28.2112 22.9888-51.2 51.2-51.2s51.2 22.9888 51.2 51.2v384a25.6 25.6 0 0 0 51.2 0V307.2c0-28.2112 22.9888-51.2 51.2-51.2s51.2 22.9888 51.2 51.2v179.2z" p-id="3392"></path></svg>
      </div>
      <div class="nav-btn camera"
           @click="exec('camera', minder.getRoot(), 600)"
           title="{{ 'camera' | ml 'ui' }}">
        <svg t="1557916189173" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3417" xmlns:xlink="http://www.w3.org/1999/xlink"width="32" height="32"><defs><style type="text/css"></style></defs><path d="M509.625554 16.443431c-236.516402 0-428.260118 191.743716-428.260118 428.258104 0 73.074757 18.309966 141.871785 50.582704 202.064026 5.407315 14.80241 18.173047 34.052692 35.908153 56.029283 12.851307 16.990102 26.936903 32.994586 42.12893 47.875523 111.732375 119.007231 299.639324 273.441383 299.639324 273.441383C690.54558 894.244586 791.744212 781.407794 842.918892 713.640683c59.393879-73.514712 94.964766-167.073032 94.964766-268.939147C937.883658 208.186141 746.139942 16.443431 509.625554 16.443431zM840.391921 646.233991l-3.276001 0c0 0-146.204886 234.22904-327.490366 302.300194 0 0-237.649008-158.10883-327.493387-302.300194l-3.274994 0c-30.014572-55.986999-47.108371-120.397568-47.108371-188.935859 0-215.655302 169.183204-390.472342 377.876752-390.472342 208.690528 0 377.874739 174.81704 377.874739 390.472342C887.500292 525.83743 870.406494 590.246993 840.391921 646.233991zM509.625554 243.168073c-111.322623 0-201.533463 90.238022-201.533463 201.533463 0 111.296447 90.21084 201.533463 201.533463 201.533463 111.319602 0 201.533463-90.237016 201.533463-201.533463C711.159016 333.406095 620.946163 243.168073 509.625554 243.168073zM509.625554 596.196952c-83.620581 0-151.422929-67.800335-151.422929-151.446085s67.802348-151.446085 151.422929-151.446085c83.618567 0 151.419909 67.800335 151.419909 151.446085S593.244121 596.196952 509.625554 596.196952z" p-id="3418"></path></svg>
      </div>
      <div v-show="showNavigator" class="nav-btn nav-trigger"
           :class="{'active' : isNavOpen}"
           @click="toggleNavOpen()"
           title="{{ 'navigator' | ml 'ui' }}">
        <div class="icon"></div>
      </div>
      <div class="nav-btn nav-trigger"
           :class="{'active' : isTopOpen}"
           @click="toggleTop()"
           title="{{ 'topbar' | ml 'ui' }}"><svg t="1557918633391" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8391" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="8392"></path><path d="M512 128C170.666667 128 0 513.770667 0 513.770667S170.666667 896 512 896s512-384 512-384-170.666667-384-512-384z m0 682.666667C286.442667 810.666667 144.032 598.592 96.032 513.578667 144 427.754667 286.442667 213.333333 512 213.333333c225.6 0 368.021333 213.312 415.978667 298.666667C879.936 597.504 737.546667 810.666667 512 810.666667z m0-469.333334c-94.250667 0-170.666667 76.416-170.666667 170.666667 0 94.261333 76.416 170.666667 170.666667 170.666667 94.261333 0 170.666667-76.405333 170.666667-170.666667 0-94.250667-76.405333-170.666667-170.666667-170.666667z m0 256c-47.050667 0-85.333333-38.282667-85.333333-85.333333s38.282667-85.333333 85.333333-85.333333 85.333333 38.282667 85.333333 85.333333-38.282667 85.333333-85.333333 85.333333z" p-id="8393"></path></svg>
      </div>
      <div class="nav-btn nav-expand"
           @click="toggleExpand()"
           title="{{ 'expandtoleaf' | ml 'ui' }}">
        <svg v-if="!isExpand" t="1558495427185" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1332" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M377.6 620.8l-224 224V697.6c0-6.4 0-6.4-6.4-6.4l-6.4-6.4c-6.4 0-6.4 0-6.4 6.4-6.4 0-6.4 0-6.4 6.4v185.6h192c6.4 0 6.4 0 6.4-6.4l6.4-6.4c0-6.4 0-6.4-6.4-6.4l-6.4-6.4H172.8L396.8 640c6.4-6.4 6.4-12.8 0-19.2h-19.2m249.6 19.2l224 224H704c-6.4 0-6.4 0-6.4 6.4l-6.4 6.4c0 6.4 6.4 12.8 12.8 12.8h185.6v-192c0-6.4 0-6.4-6.4-6.4l-6.4-6.4c-6.4 0-6.4 0-6.4 6.4l-6.4 6.4v147.2L646.4 620.8h-19.2c-6.4 6.4-6.4 12.8 0 19.2m19.2-243.2l224-224V320c0 6.4 6.4 12.8 12.8 12.8s12.8-6.4 12.8-12.8V140.8v-6.4h-192c-6.4-6.4-12.8 0-12.8 6.4s6.4 12.8 12.8 12.8h147.2L627.2 377.6l-6.4 6.4c0 6.4 0 12.8 6.4 12.8 6.4 6.4 12.8 0 19.2 0m-249.6-19.2L172.8 153.6H320c6.4 0 12.8-6.4 12.8-12.8S326.4 128 320 128H140.8h-6.4v192c0 6.4 6.4 12.8 12.8 12.8s12.8-6.4 12.8-12.8V172.8L384 396.8l6.4 6.4c6.4 0 6.4 0 6.4-6.4 6.4-6.4 6.4-12.8 0-19.2" fill="" p-id="1333"></path></svg>
        <svg v-if="isExpand" t="1558500583625" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17894" xmlns:xlink="http://www.w3.org/1999/xlink" width="32" height="32"><defs><style type="text/css"></style></defs><path d="M122.88 491.52h778.24v40.96H122.88zM690.3808 219.3408l-29.0816-29.0816-128.8192 129.024V0h-40.96v319.2832l-128.8192-129.024-29.0816 29.0816 178.3808 178.176 178.3808-178.176zM333.6192 804.6592l29.0816 29.0816 128.8192-129.024V1024h40.96V704.7168l128.8192 129.024 29.0816-29.0816-178.3808-178.176-178.3808 178.176z" p-id="17895"></path></svg>
      </div>
    </div>
    <div v-el:nav-previewer class="nav-previewer" v-show="showNavigator && isNavOpen"></div>
  </div>
</template>
<style>
  .zoom-in .icon{
    font-size: 24px;
  }
</style>
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
        isTopOpen: this.$parent.showTop && this.$parent.showTopTab,
        isExpand: false,
        originStyle: {},
        zoom: 100,
        minder: null,
        view: null,
        contentview: null,
        paper: null,
        showNavigator: false
      };
    },
    methods: {
      toggleExpand() {
        console.log(this.isExpand)
        if(this.isExpand) {
          this.minder.execCommand('ExpandToLevel', 1)
        } else{
          this.minder.execCommand('ExpandToLevel', 9999)
        }
        
        this.isExpand = !this.isExpand
      },
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
      toggleTop() {
        this.isTopOpen = !this.isTopOpen;
        this.$emit('open-top', this.isTopOpen)
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
        return {}
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
