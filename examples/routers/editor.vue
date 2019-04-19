<template>
  <minder v-ref:minder :style="defaultStyle"></minder>
</template>
<script>
  export default {
    data() {
      return {
        defaultStyle: {
          width: '1000px',
          height: '600px'
        },
        snap: {}
      };
    },
    computed: {},
    methods: {},
    ready() {
      console.log('minder loader is finished');
      var self = this;
      var o = {
        'root': {
          'data': {
            'hexType': 'project',
            '_id': '5c64d94c7e7add6f94136be2',
            'name': '测试使用'
          },
          'children': [
            {
              'data': {
                'hexType': 'app',
                '_id': '5c64d96492c5df6f7e121d55',
                'name': '测试新功能使用',
                'wxAppSecret': '',
                'wxAppSecretPay': ''
              },
              'children': {
                'data': {
                  'hexType': 'dir',
                  '_id': '5c64d969818ab36d67d79fd7',
                  'dir_ids': [
                    '5b8ba642cf5850b5c9a59b2bf7378d44'
                  ],
                  'page_ids': [
                    '45918caa84bd08dde287a0b3e996bddc',
                    '099ba851b135526cd672acf8914fc597',
                    '1becc5660319c537c246cd1a62d308fb',
                    '15874da9bbd78500a3dd1e6cdfb1780d',
                    'c7ffe08860f39de7612ca67f571fb663',
                    '6800e6626bf2bd4298946f953bc0b124',
                    'bae33dfabc1d6f67bb33780d68574960',
                    'da221b592470749bb84ab8cb6fd9edac',
                    '968e31abc906c29b93e5516268aae7d9',
                    'a4b8545c675f4cc981a789823f3e9d90',
                    'e43b5bb08570ac7982a05aa71aba565e'
                  ],
                  'dir_id': '0ee22e1878216b2dc14bbad034f172fc',
                  'name': 'rootdir'
                },
                'children': [
                  {
                    'data': {
                      'hexType': 'dir',
                      '_id': '5c64d969818ab36d67d79fd6',
                      'dir_ids': [],
                      'page_ids': [
                        '19c7f67c389fa41397fb3d138298a41b',
                        'd92596a903d2f0d951650316fd3d2ee3',
                        '27174e86c232eca7b2bc60b37443ef18',
                        '8e21aae3ff26ea3ac3f9b2ef93d356c5'
                      ],
                      'dir_id': '5b8ba642cf5850b5c9a59b2bf7378d44',
                      'name': '页面模版'
                    },
                    'children': [
                      {
                        'data': {
                          '_id': '5c64d969818ab36d67d79fd3',
                          'is_home': 0,
                          'name': '页面头部',
                          'page_id': '19c7f67c389fa41397fb3d138298a41b',
                          'hexType': 'page',
                        },
                        'children': []
                      },
                      {
                        'data': {
                          '_id': '5c64d969818ab36d67d79fd4',
                          'is_home': 0,
                          'name': '左侧边栏',
                          'page_id': 'd92596a903d2f0d951650316fd3d2ee3',
                          'hexType': 'page'
                        },
                        'children': []
                      },
                      {
                        'data': {
                          '_id': '5c64d969818ab36d67d79fd5',
                          'is_home': 0,
                          'name': '页面底部',
                          'page_id': '27174e86c232eca7b2bc60b37443ef18',
                          'hexType': 'page'
                        },

                        'children': []
                      },
                      {
                        'data': {
                          '_id': '5cae9c0d7639c723b3124332',
                          'is_home': 0,
                          'name': '测试接口',
                          'page_id': '8e21aae3ff26ea3ac3f9b2ef93d356c5',
                          'hexType': 'page'
                        },
                        'children': []
                      }
                    ]
                  },
                  {
                    'data': {
                      '_id': '5c64d969818ab36d67d79fd2',
                      'is_home': 1,
                      'name': '第一页',
                      'page_id': '45918caa84bd08dde287a0b3e996bddc',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5c64dda292c5df6f7e121d5a',
                      'is_home': 0,
                      'name': '新增用户',
                      'page_id': '099ba851b135526cd672acf8914fc597',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5c652fac92c5df6f7e121d74',
                      'is_home': 0,
                      'name': '查看用户',
                      'page_id': '1becc5660319c537c246cd1a62d308fb',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5c652fe28dbd856da56919ab',
                      'is_home': 0,
                      'name': '查看用户-子页面',
                      'page_id': '15874da9bbd78500a3dd1e6cdfb1780d',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5c665ee46c19ed2b41a5567e',
                      'is_home': 0,
                      'name': '测试搜索',
                      'page_id': 'c7ffe08860f39de7612ca67f571fb663',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5ca17d0f3d70b315b80abf13',
                      'is_home': 0,
                      'name': '时间测试',
                      'page_id': '6800e6626bf2bd4298946f953bc0b124',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5ca3222901daa63d25b757df',
                      'is_home': 0,
                      'name': '公告页',
                      'page_id': 'bae33dfabc1d6f67bb33780d68574960',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5ca32494f6be183d6cf032de',
                      'is_home': 0,
                      'name': '需求页',
                      'page_id': 'da221b592470749bb84ab8cb6fd9edac',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5ca3418de091a23ab6560cbf',
                      'is_home': 0,
                      'name': '数据表',
                      'page_id': '968e31abc906c29b93e5516268aae7d9',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5ca45b3c155d6c41c9dc1e15',
                      'is_home': 0,
                      'name': '数据库',
                      'page_id': 'a4b8545c675f4cc981a789823f3e9d90',
                      'hexType': 'page'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5cac5d251a190b41db5c9ca1',
                      'is_home': 0,
                      'name': '树状图测试',
                      'page_id': 'e43b5bb08570ac7982a05aa71aba565e',
                      'hexType': 'page'
                    },
                    'children': []
                  }
                ]
              }
            },
            {
              'data': {
                'hexType': 'app',
                '_id': '5caeae6a6847ca639d895c9f',
                'name': '增加使用测试',
                'wxAppSecret': '',
                'wxAppSecretPay': ''
              },
              'children': {
                'data': {
                  'hexType': 'dir',
                  '_id': '5caeae6c4c0b686330dec5e1',
                  'dir_ids': [
                    '774e08bc44d30af755d3f2d75af42e4c',
                    '0e86006ee0dd9aa8ca3b906300934206',
                    '365703b59a0d34fc44e404d0830bd435'
                  ],
                  'page_ids': [
                    '4977bbcbaef0e41cccf03499167c74d7'
                  ],
                  'dir_id': '31aa98cea9de77b4ec900f7ac211158e',
                  'name': 'rootdir'
                },
                'children': [
                  {
                    'data': {
                      'hexType': 'dir',
                      '_id': '5caeae6c4c0b686330dec5e0',
                      'dir_ids': [],
                      'page_ids': [
                        '2bdfe2419daa403909dc07e37c807361',
                        '494d10fa87a82195c11aeeeb9f03824b',
                        '9a6b07d938d77e4131362aaea8e79e06'
                      ],
                      'dir_id': '774e08bc44d30af755d3f2d75af42e4c',
                      'name': '页面模版'
                    },
                    'children': [
                      {
                        'data': {
                          '_id': '5caeae6c4c0b686330dec5dd',
                          'is_home': 0,
                          'name': '页面头部',
                          'page_id': '2bdfe2419daa403909dc07e37c807361',
                          'hexType': 'page',
                        },
                        'children': []
                      },
                      {
                        'data': {
                          '_id': '5caeae6c4c0b686330dec5de',
                          'is_home': 0,
                          'name': '左侧边栏',
                          'page_id': '494d10fa87a82195c11aeeeb9f03824b',
                          'hexType': 'page'
                        },
                        'children': []
                      },
                      {
                        'data': {
                          '_id': '5caeae6c4c0b686330dec5df',
                          'is_home': 0,
                          'name': '页面底部',
                          'page_id': '9a6b07d938d77e4131362aaea8e79e06',
                          'hexType': 'page'
                        },
                        'children': []
                      }
                    ]
                  },
                  {
                    'data': {
                      'hexType': 'dir',
                      '_id': '5caedf5ea1c4e473883cf451',
                      'dir_ids': [],
                      'page_ids': [],
                      'dir_id': '0e86006ee0dd9aa8ca3b906300934206',
                      'name': '1'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      'hexType': 'dir',
                      '_id': '5caedf686e5f2873a7d91182',
                      'dir_ids': [],
                      'page_ids': [],
                      'dir_id': '365703b59a0d34fc44e404d0830bd435',
                      'name': '页面测试'
                    },
                    'children': []
                  },
                  {
                    'data': {
                      '_id': '5caeae6c4c0b686330dec5dc',
                      'is_home': 1,
                      'name': '第一页',
                      'page_id': '4977bbcbaef0e41cccf03499167c74d7',
                      'hexType': 'page'
                    },
                    'children': []
                  }
                ]
              }
            }
          ]
        }
      };
      this.$nextTick(function() {
        var minder = this.$refs.minder.minder;
        minder.importJson(o);
        var snap = this.snap;
        // contentchange
        minder.on('editText', function(e, minder) {
          var node = e.minder.getSelectedNode();
          console.log(e, node);
        });
        // 只有选中的时候会触发
        minder.on('selectionchange', function(e) {
          self.minder = e.minder;
          var node = e.minder.getSelectedNode();
          self.currentNode = node;
          if(self.lock && node) {
          }
          self.lock = true;
        });

        minder.on('beforeExecCommand', function(e) {
          var node = e.minder.getSelectedNode();
          console.log(node);
          if(/append/i.test(e.commandName)) {
            console.log('add', node);
            self.snap[node.data.id] = node;
          } else if(/remove/i.test(e.commandName)) {
            console.log('remove', node);
            delete self.snap[node.data.id];
          }
        });
        minder.on('beforeExecCommand', function(e) {
          var node = e.minder.getSelectedNode();
          console.log(node);
          if(/append/i.test(e.commandName)) {
            console.log('add', node);
            self.snap[node.data.id] = node;
          } else if(/remove/i.test(e.commandName)) {
            console.log('remove', node);
            delete self.snap[node.data.id];
          }
        });
      });
    }
  };
</script>
<style>
</style>
