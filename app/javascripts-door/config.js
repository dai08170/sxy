/**
 * Created by lonelydawn on 2017-03-24.
 */

var app = angular.module('app', ['ui.router', 'jsonFormatter', 'toaster', 'ngAnimate', 'ngSanitize', 'ngCookies']);

// 全局数据配置
var global_config = {
    "homepage": {
        "slide": [
            {
                "path": "images/door/slide1.jpg",
                "alt": "slide one",
                "active": true
            },{
                "path": "images/door/slide2.jpg",
                "alt": "slide two"
            },{
                "path": "images/door/slide3.jpg",
                "alt": "slide three"
            },{
                "path": "images/door/slide4.jpg",
                "alt": "slide four"
            },{
                "path": "images/door/slide5.jpg",
                "alt": "slide five"
            },{
                "path": "images/door/slide6.jpg",
                "alt": "slide six"
            },{
                "path": "images/door/slide7.jpg",
                "alt": "slide seven"
            }
        ],
        "intro":[
            "格局商学是中国第一家在线互动直播的管理教育平台，利用互联网技术搭建一个符合企业家学习习惯的全新在线直播互动学习系统，打造世界一流学习环境，提供世界级品质的教学内容和学习解决方案，帮助企业家企业轻松实现全员学习，助推企业持续成长。同时，格局商学关注企业家的家庭成长 ，提供家庭教育、隔代教育、青少年梦想教育等公益课程。",
            "格局商学已在全国85个城市建立分院，成功招募10000多位企业家成为梦想发起人。格局商学计划未来5年在全国建立1000个分院，格局商学将成为国内规模最大的管理教育机构，不仅为企业家聚集本地校友资源，更为企业家构建中国最大校友资源共享网络。"
        ],
        "advantage": [
            {
                "label": "学习最高效",
                "content": "全国百家分院就读，可利用各种碎片时间，就近选择学院学习"
            },{
                "label": "费用最低廉",
                "content": "平均每次课程学费不到150元，拒绝天价总裁班。"
            },{
                "label": "师资最顶级",
                "content": "国内外知名前沿专家教授、商界大咖、企业新锐参与教学。"
            },{
                "label": "知识最前瞻",
                "content": "直播不录播，有效保证教学内容最新鲜、最具前瞻性。"
            },{
                "label": "气氛最浓郁",
                "content": "百人同班，万人同课，小组竞赛，分院互访，教学方式丰富多彩。"
            }
        ],
        "feature": [
            {
                "title": "直播",
                "contents" :["权威师资，鲜活观点","世界顶尖商学院教室","巨幕全息，还原场景","全国资源，当地平台"]
            },{
                "title": "互动",
                "contents" :["互联网技术","符合企业家学习习惯","全新互动学习系统","世界级品质"]
            },{
                "title": "夜读",
                "contents" :["学习成本低","时间成本低","差旅成本低","..."]
            },{
                "title": "氛围",
                "contents" :["互联网思维","创新教学场景","企业家集体学习","..."]
            }
        ],
        "creater": {
            "picture_path": "images/door/character_xingzhiqing.jpg",
            "speech": "格局商学将建立一个更大的健康和谐的知识文化平台，聚集一批又一批积极向上，有着朗朗人格的商业精英、社会贤达和精神上流，孕育出一桩又一桩对社会有益，推动社会前进的行为和行动，凡参与其中者都会有意想不到的收获！"
        },
        "creater_team": {
            "picture_path": "images/door/creater_team.jpg"
        },
        "service": {
            "picture_path": "images/door/activity_banner.jpg"
        }
    },
    "teaching": {
        "views": [
            [
                {
                    "label": "哈佛教授在美国远程进入格局系统全国直播授课",
                    "picture_path": "images/door/teach_way1.jpg"
                },{
                "label": "罗杰斯在格局商学北京千人大会与全国百个教师教学互动",
                "picture_path": "images/door/teach_way2.jpg"
            }
            ],[
                {
                    "label": "孙中一老师在北京格局总部直播室（全国百家分院转播）",
                    "picture_path": "images/door/teach_way3.jpg"
                },{
                    "label": "毛大庆老师在北京格局总部直播室（全国百家分院转播）",
                    "picture_path": "images/door/teach_way4.jpg"
                }
            ],[
                {
                    "label": "学员在格局全国分院教室上课",
                    "picture_path": "images/door/teach_way5.jpg"
                },{
                    "label": "冯鑫老师在北京直播室与各分院学员互动提问",
                    "picture_path": "images/door/teach_way6.jpg"
                }

            ],[
                {
                    "label": "分院学员之间在大屏上互动交流",
                    "picture_path": "images/door/teach_way7.jpg"
                },{
                    "label": "周鸿祎老师在武汉分院给全国分院上课",
                    "picture_path": "images/door/teach_way8.jpg"
                }
            ]
        ],
        "feature": [
            {
                "picture_path": "images/door/teach_feature1.jpg",
                "label": "权威师资鲜活观点",
                "class": "glyphicon glyphicon-user"
            },{
                "picture_path": "images/door/teach_feature2.jpg",
                "label": "世界顶级商学院教室",
                "class": "glyphicon glyphicon-home"
            },{
                "picture_path": "images/door/teach_feature3.jpg",
                "label": "巨幕全息还原真是教学场景",
                "class": "glyphicon glyphicon-facetime-video"
            },{
                "picture_path": "images/door/teach_feature4.jpg",
                "label": "多地实时互动学习",
                "class": "glyphicon glyphicon-globe"
            },{
                "picture_path": "images/door/teach_feature5.jpg",
                "label": "全国资源当地平台社区链接",
                "class": "glyphicon glyphicon-folder-open"
            }
        ]
    },
    "course": {
        "weekCourse": {
            "weekday": ["星期一","星期二","星期三","星期四","星期五","星期六","星期天"],
            "course": [
                ["无","无","思想格局"],
                ["隔代教育","无","思想格局"],
                ["家庭教育","家族传承","思想格局"],
                ["创新格局","创新格局","思想格局"],
                ["品牌格局","品牌格局","系统格局"],
                ["格局新资本","青少年梦想教育格局素养","系统格局"],
                ["格局新资本","格局素养","系统格局"]
            ]
        },
        "publicCourse": [
            {
                "title": "A 企业家•卓越家族成长课程",
                "label": ["课程体系","课程内容"],
                "cols": [
                    {
                        "col1": "开篇",
                        "col2": "《社会转型期——家庭教育十大误区与十大败局》"
                    },{
                        "col1": "“爱”系列",
                        "col2": "《爱情真相与婚姻的经营之道》"
                    },{
                        "col1": "",
                        "col2": "《智慧母亲，家（民）族卓越与繁盛的基石》"
                    },{
                        "col1": "",
                        "col2": "《童年经历•心灵成长与舞动减压》"
                    },{
                        "col1": "“育”系列",
                        "col2": "《少年领袖“三商”（情商、智商、财商）培养方案》"
                    },{
                        "col1": "",
                        "col2": "《考试制度变革与子女培养目标异动方略》"
                    },{
                        "col1": "“家”系列",
                        "col2": "《子女成长红线图:生涯规划与出国留学》"
                    },{
                        "col1": "",
                        "col2": "《名门望族耀眼星河的传世秘籍》"
                    },{
                        "col1": "",
                        "col2": "《有“礼”走遍天下:礼文化在子女教育中的妙用》"
                    }
                ]
            },{
                "title": "B 夫人•家长教练工坊",
                "label": ["课程体系","课程内容"],
                "cols": [
                    {
                        "col1": "家庭幸福密码",
                        "col2": "《一个好母亲兴旺四代人》"
                    },{
                        "col1": "",
                        "col2": "《女性三重角色定位与自我修养》"
                    },{
                        "col1": "",
                        "col2": "《爱情与婚姻关系》"
                    },{
                        "col1": "",
                        "col2": "《家庭幸福教练》"
                    },{
                        "col1": "学习力提升宝典",
                        "col2": "《注意力训练》"
                    },{
                        "col1": "",
                        "col2": "《记忆力提升》"
                    },{
                        "col1": "",
                        "col2": "《阅读能力培养》"
                    },{
                        "col1": "",
                        "col2": "《时间管理秘方》"
                    },{
                        "col1": "",
                        "col2": "《创新能力拓展》"
                    },{
                        "col1": "情商训练秘籍",
                        "col2": "《情感•情绪•价值观》"
                    },{
                        "col1": "",
                        "col2": "《培养好习惯•客服坏习惯》"
                    },{
                        "col1": "",
                        "col2": "《女孩•男孩培养策略》"
                    },{
                        "col1": "",
                        "col2": "《人际关系•沟通技巧》"
                    }
                ]
            },{
                "title": "C 子女•少年领袖梦想训",
                "label": ["课程体系","课程内容"],
                "cols": [
                    {
                        "col1": "开篇",
                        "col2": "《站在未来看现在》"
                    },{
                        "col1": "梦想起航系列",
                        "col2": "《点燃与唤醒生命内在的能量》"
                    },{
                        "col1": "修身养德系列",
                        "col2": "《汉字:国学传统的大河之源》"
                    },{
                        "col1": "动手实践系列",
                        "col2": "《生活中的科学实验》"
                    },{
                        "col1": "科学观察系列",
                        "col2": "《仰望星空与太空探秘》"
                    }
                ]
            },{
                "title": "D 祖辈•隔代教养方法与学习课程",
                "label": ["项目共享课程","项目独享活动课程"],
                "cols": [
                    {
                        "col1": "《社会转型期——家庭教育十大误区与十大败局》",
                        "col2": "《祖辈家庭教育中的角色定位与代际关系》"
                    },{
                        "col1": "《少年领袖“三商”（情商、智商、财商）培养方案》",
                        "col2": "《隔代教育的“孙子兵法”与习惯养成训练》"
                    },{
                        "col1": "《子女成长红线图:生涯规划与出国留学》",
                        "col2": "《电子产品替代玩具、学具与“管惯”策略应付》"
                    },{
                        "col1": "《有“礼”走遍天下:生涯规划与出国留学》",
                        "col2": "《童年经历、原生家庭与孩子人格养成》"
                    }
                ]
            }
        ]
    },
    "branch": {
        "xuzhou": {
            "president": {
                "picture_path": "images/door/character_gaoning.jpg",
                "speech": ""
            }
        },
        "jiangsu": {
            "president": {
                "picture_path": "images/door/character_wangfang.jpg",
                "speech": "格局商学不是互联网公司，是一家商学院，我们只是用互联网提高教学效率，保留传统教育氛围，我们是在做教育+互联网，未来格局商学会把高端教育做到极致，把学员服务做到极致。"
            },
            "prospect": "格局商学江苏分院计划在未来的3年里，成立40家以上地市分院，计划年服务培养长期班企业家3万人次。并充分利用格局商学线上线下的互联网教学平台，增加各地平台相互的联动性，不断为江苏企业家提供各类增值服务，致力成为江苏地区最大的企业家校友圈，为校友提供在管理教育以为的商业信息、科技信息、金融信息、管理咨询等服务内容，以广泛的活跃度、多样性的活动内容，以不断沉淀的企业家校友资源大数据，搭建各类服务平台，助力江苏地区民营经济企业腾飞。塑造厚德、崇文、实业、创新的苏商精神。",
            "increment": {
                "picture_path": "images/door/increment.jpg"
            }
        },
        "other_college": [
            [
                {
                    "label": "格局商学无锡锡山分院",
                    "picture_path": "images/door/college_wuxixishan.jpg"
                },{
                "label": "格局商学无锡惠山分院",
                "picture_path": "images/door/college_wuxihuishan.jpg"
            }
            ],[
                {
                    "label": "格局商学江阴分院",
                    "picture_path": "images/door/college_jiangyin.jpg"
                },{
                    "label": "格局商学宜兴分院",
                    "picture_path": "images/door/college_yixing.jpg"
                }
            ],[
                {
                    "label": "格局商学常州分院",
                    "picture_path": "images/door/college_changzhou.jpg"
                },{
                    "label": "格局商学苏州分院",
                    "picture_path": "images/door/college_suzhou.jpg"
                }
            ],[
                {
                    "label": "格局商学昆山分院",
                    "picture_path": "images/door/college_kunshan.jpg"
                },{
                    "label": "格局商学南京分院",
                    "picture_path": "images/door/college_nanjing.jpg"
                }
            ],[
                {
                    "label": "格局商学张家港分院",
                    "picture_path": "images/door/college_zhangjiagang.jpg"
                }
            ]
        ]
    },
    "appDownload": {
        "background_path": "images/door/download_bg.jpg",
        "QRCode_path": "images/door/QRCode.jpg"
    },
    "about": {
        "college": {
            "txts": [
                {
                    "label": "地址:",
                    "content": "徐州市格局商学院（泉山区大学路7号矿大南湖校区东门北600米晴朗谷)"
                },{
                    "label": "临近地点:",
                    "content": "云龙湖、矿大南湖校区、泉山森林公园、晴朗谷游泳馆、张伯英艺术馆等"
                },{
                    "label": "联系电话:",
                    "content": "83897966 83897968"
                }
            ],
            "QRCode": {
                "label": "微信公众号:",
                "content": "images/door/QRCode_weixin.jpg"
            }
        },
        "developer": {
            "txts": [
                {
                    "label": "电子邮箱",
                    "content": "lonelydawn@sina.com"
                }
            ]
        }
    }
};

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'JSONFormatterConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, JSONFormatterConfigProvider) {
    // 在请求中设置 X-Requested-With 向服务器声明这是一个XHR请求
    $httpProvider.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest'
    };

    // 默认启用html5模式，使用history api
    $locationProvider.html5Mode({
        enabled: true,
        requireBases: false
    });

    JSONFormatterConfigProvider.hoverPreviewEnabled = true;
    window.httpProvider = $httpProvider;
    $httpProvider.defaults.headers.common.pageSize = 1000;
    $httpProvider.defaults.headers.common.pageNum = 1;
    $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
    $httpProvider.defaults.headers.common.Pragma = "no-cache";

    $urlRouterProvider.otherwise('/index/homepage');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                'rootView@': {
                    templateUrl: '/partial/door/index.html',
                    controller: 'indexCtrl'
                }
            }
        })
        .state('index.homepage', {
            url: '/homepage',
            views: {
                'content': {
                    templateUrl: '/partial/door/homepage.html',
                    controller: 'homepageCtrl'
                }
            }
        })
        .state('index.teaching',{
            url: '/teaching',
            views: {
                'content': {
                    templateUrl: '/partial/door/teaching.html',
                    controller: 'teachingCtrl'
                }
            }
        })
        .state('index.course',{
            url: '/course',
            views: {
                'content': {
                    templateUrl: '/partial/door/course.html',
                    controller: 'courseCtrl'
                }
            }
        })
        .state('index.jiangsu',{
            url: '/jiangsu',
            views: {
                'content': {
                    templateUrl: '/partial/door/jiangsu.html',
                    controller: 'jiangsuCtrl'
                }
            }
        })
        .state('index.xuzhou',{
            url: '/xuzhou',
            views: {
                'content': {
                    templateUrl: '/partial/door/xuzhou.html',
                    controller: 'xuzhouCtrl'
                }
            }
        })
        .state('index.branch',{
            url: '/branch',
            views: {
                'content': {
                    templateUrl: '/partial/door/branch.html',
                    controller: 'branchCtrl'
                }
            }
        })
        .state('index.appDownload',{
            url: '/appDownload',
            views: {
                'content': {
                    templateUrl: '/partial/door/appDownload.html',
                    controller: 'appDownloadCtrl'
                }
            }
        })
        .state('index.about',{
            url: '/about',
            views: {
                'content': {
                    templateUrl: '/partial/door/about.html',
                    controller: 'aboutCtrl'
                }
            }
        });
}]);
