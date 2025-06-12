import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const enTranslations = {
  header: {
    about: 'About Us',
    join: 'Join Us',
    events: 'Events',
    QinSociety: 'Qin Society',
    NYConcert: 'New Year Concert',
    contact: 'Contact',
    language: 'Language',
    home: 'Home',
    viewMore: 'View More',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode'
  },
  home: {
    hero: {
      title: 'UTChinese Network',
      subtitle: 'Connecting Chinese culture with UofT community',
      cta: 'Join Our Community'
    },
    about: {
      title: 'What is UTChinese?',
      content: 'UTChinese Network is a student organization dedicated to promoting Chinese culture and providing a platform for cultural exchange at the University of Toronto.'
    },
    scroll: 'Scroll'
  },
  about: {
    title: 'What is UTChinese?',
    story1: 'Some say the essence of UTChinese is passion. We\'ve held charity concerts for 14 consecutive years, donating hundreds of thousands of dollars to UNICEF.',
    story2: 'Initially, our members wanted to host entrepreneur forums. They quickly invited Yu Minhong, the founder of Roots, Microsoft Canada\'s CTO, and Coca-Cola\'s Global VP. I admired their resources, but after joining, I realized they had searched the entire internet, found contact information for entrepreneurs and executives, sent hundreds of invitation emails, and finally got lucky with that one percent chance. Later, I joined them.',
    story3: 'Following this approach, we organized the Ace Career Fair. No one expected Apple, Microsoft, and the Big Five banks to become our guests.',
    story4: 'Later, we discovered that as Chinese living in Canada, we sometimes wanted to introduce our homeland but didn\'t know where to start. For this reason, UTChinese\'s founders created the Mulan International Film Festival. We succeeded in "enabling Chinese people to better tell China\'s story, and non-Chinese people to see China comprehensively and objectively" through film.',
    story5: 'We\'ve received praise along the way, even from renowned producer Nai An, who expressed appreciation and admiration for us. After receiving countless encouragement and support, we are more convinced that what we\'re doing is truly meaningful!',
    quote: "We're not a prestigious club - just a group of perfectionists who never compromise on the things we love.",
    authorName: "UTChinese Network",
    values: {
      title: "Our Values",
      description: "The core principles that drive everything we do at UTChinese Network.",
      cultural: {
        title: "Cultural Exchange",
        description: "Fostering mutual understanding between Chinese and Western cultures."
      },
      commitment: {
        title: "Commitment",
        description: "Dedicated to excellence in everything we do."
      },
      innovation: {
        title: "Innovation",
        description: "Constantly exploring new ideas and approaches."
      }
    }
  },
  join: {
    title: 'Are You Ready to Join UTChinese?',
    intro: 'We\'re not a high-end, prestigious club - just a group of perfectionists who never compromise on the things we love. We invite all kinds of friends to join our team and find a sense of belonging in college during your spare time.',
    requirements: 'You don\'t need special skills or outstanding experiences. As long as you like us and are willing to pursue perfection with us, laughing through our youth together, our doors are always open to you!',
    sections: 'The following will introduce UTChinese\'s four business groups and their recruitment requirements. We welcome friends to click the link at the end to fill out the application questionnaire. We look forward to your joining us!',
    welcomeMembers: 'What kind of members are we looking for?',
    arts: {
      req1: 'Interested in culture and art, with curiosity and humanistic care',
      req2: 'Responsible for project operations, including but not limited to platform construction and content planning',
      req3: 'Good at communication and expression, with execution ability and responsibility'
    },
    career: {
      req1: 'Creative, with novel and bold ideas in the business workplace',
      req2: 'Pay attention to industry dynamics and hot current events, with insight and thinking ability',
      req3: 'Good at communication and expression, able to maintain contact with HR or corporate executives and develop long-term relationships',
      req4: 'Have the ability to solve problems and emergencies, and have execution ability',
      req5: 'Have certain pressure resistance and time management abilities, attend regular meetings and activities on time, and have a sense of responsibility',
      subgroup1: {
        title: 'Ace Career Fair',
        description: 'Ace Career Fair is the largest recruitment fair organized by University of Toronto students. We are committed to creating a win-win platform for companies and students, guiding overseas students to employment, promoting the connection between college students and company supply and demand, and facilitating companies to find suitable candidates.'
      },
      subgroup2: {
        title: 'Ace Firm Visit',
        description: 'After waiting for three long years of the pandemic, Ace Firm Visit is finally meeting with everyone again! In previous activities, we have led students to well-known companies such as Manulife and Bosch for on-site experience and exploration.'
      },
      subgroup3: {
        title: 'EXCITE Panel Talk',
        description: 'EXCITE Panel Talk is dedicated to providing a platform for peer-to-peer communication. Everyone\'s growth background is very different, and there is no success in the world that can be completely replicated, but we hope that every participant can generate new thinking from peers\' growth experiences.'
      }
    },
    operation: {
      req1: 'Love photography and be good at discovering interesting details in life',
      req2: 'Have the necessary photographic equipment',
      req3: 'Have the ability to shoot videos, process images, and edit videos',
      req4: 'Love computer technology',
      req5: 'Have a certain programming foundation, at least above CSC108 level',
      req6: 'Love negotiation and have certain negotiation skills',
      req7: 'Have strong understanding, communication, and coordination abilities, with team awareness',
      req8: 'Are careful and thorough, agile in thinking, with a strong sense of responsibility',
      subgroup1: {
        title: 'Design and Art',
        description: 'We believe that art, images, and design can provide people with better interactive experiences, and we hope to bring positive and effective energy to society through these methods.'
      },
      subgroup2: {
        title: 'Information Solutions',
        description: 'If you are a CS or Engineering major student and want to develop a software product, then at UTChinese, you have the opportunity to participate in the development of some practical tools or larger applications.'
      },
      subgroup3: {
        title: 'Sponsorship',
        description: 'We are the "investment promotion" department of UTChinese. We are responsible for coordinating the social relations between UTChinese and sponsoring institutions, maintaining communication and good cooperation with off-campus enterprises and businesses.'
      }
    },
    support: {
      req1: 'Have good literary literacy and grammatical sensitivity, with certain requirements for typesetting and proofreading',
      req2: 'Willing to accept the constantly changing nature of new media influenced by technology, dare to innovate and persist, and focus on readers',
      req3: 'Interested in self-media platform operation and creative tweet writing is a priority',
      req4: 'Serious and responsible, actively participate in activities, have certain execution ability and strong sense of responsibility',
      req5: 'Have strong communication skills and willingness to make new friends',
      req6: 'Have execution ability and sense of responsibility',
      req7: 'Love organizing club activities, and have strong team awareness and coordination ability',
      subgroup1: {
        title: 'Content Marketing',
        description: 'At UTChinese, there are no marketing experts; we are explorers, learners, and executors. We wrote the freshman manual, built a new media creation platform, held charity classical music concerts, and coordinated job fairs.'
      },
      subgroup2: {
        title: 'Human Resources',
        description: 'The HR department brings together the internal personnel of the club, organizes online and offline team building, so that everyone can eat well, drink well, play well, and get to know each other better.'
      }
    },
    form: {
      name: 'Your Name',
      namePlaceholder: 'Enter your name',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email',
      group: 'Interested Group',
      message: 'Why do you want to join?',
      messagePlaceholder: 'Tell us a bit about yourself and why you want to join',
      submit: 'Submit Application',
      title: 'UTChinese Network Application Form',
      description: 'Please fill out our official application form to join UTChinese Network. The form will open in a new tab or you can complete it directly below.',
      openForm: 'Open Form in New Tab'
    }
  },
  groups: {
    overview: {
      title: 'UTChinese Departments',
      description: 'UTChinese Network is comprised of four key departments that work together to create a vibrant community. From cultural events and career services to operational support and content creation, each department plays a vital role in our mission to connect Chinese culture with the UofT community.'
    },
    arts: {
      title: 'ARTS & CULTURE GROUP',
      description: 'The Arts & Culture Group is dedicated to conveying diverse Eastern and Western cultures through cultural activities. Here, with culture and art as our original intention, we have held charity New Year\'s concerts for 14 consecutive years, with total revenue exceeding 110,000 Canadian dollars. Among them, there are book salons that bring friends together through books, as well as summer-limited Live Houses. We believe these activities deserve to be seen by more people, so every UTChinese member opens a window to present quality content to everyone.'
    },
    career: {
      title: 'CAREER & ACADEMIC GROUP',
      description: 'The Career & Academic Group is dedicated to providing high-quality academic and workplace services to students, encouraging every college student and graduate to bravely break through information cocoons and explore the world as a whole. Here, you have the opportunity to face-to-face exchange with business elites and bigwigs from various industries, as well as the opportunity to meet like-minded friends for in-depth exchanges, and even the opportunity to experience your favorite industry in major companies. Join us, and together with us, we will discover opportunities, broaden horizons, and embrace the future.'
    },
    operation: {
      title: 'OPERATION GROUP',
      description: 'We believe that art, images, and design can provide people with better interactive experiences, and we hope to bring positive and effective energy to society through these methods.'
    },
    support: {
      title: 'SUPPORT GROUP',
      description: 'At UTChinese, there are no marketing experts; we are explorers, learners, and executors. We wrote the freshman manual, built a new media creation platform, held charity classical music concerts, coordinated job fairs, and even held events that compete with world-class brands. Although every promotion is a huge challenge, these are invaluable opportunities to step out of the ivory tower.'    
    }
  },
  contact: {
    title: 'Join the Community',
    address: 'Room 534, 21 Sussex Ave, Toronto, ON M5S 1J6',
    wechat: 'WeChat (Search for UTChinese in the official account)',
    xiaohongshu: 'Xiaohongshu',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    email: 'Email'
  },

  QinSociety: {
    title: 'UTChinese Network Qin Society Open Ceremony',
    description: 'UTChinese Qin Society Open Ceremony Successfully Concluded. First I would like to say "thank you" to everyone who showed up. Our Qin society successfully held its open ceremony elegant gathering on Nov 27, 2024.',
    title2: 'Qin Society Open Ceremony',
    performers: 'Our Performers: Yingxue Zhang, Peters Peng, and Atom Wang.',
    pieces: 'Pieces Performed in Chronological Order:《A Good Time》(Qin(Atom) Xiao(Yingxue)Duet),《Farewell at Yangguan Customs》(Peters),《Herons and Intentions》(Peters),《Flowing Streams》(Atom),《Mei Blossoms》(Yingxue),《Winter Snow》(Atom),《Fishing and Woodcutting - a Reflective Dialogue》(Yingxue),《Dragon Chant from Deep Sea》(Atom). Tea: Aged (10 years) Pu-erh.',
    pieces2: "The event started with a brief introduction about the instrument: Qin, followed by a tea break then music performance. It was a truly fun event! Unfortunately, it wasn't snowing after the song <winter snow> was played. The weather forecast was incorrect. Special thanks to Peters and Leslie for videos and photos, Jason for helping to setup, and Jessica and Amora for their marketing guidance, and of course, you for showing up.",
    pieces3: "Shout out to Jiamu Tea Space for sponsoring biodegradable tea cups for our tea!",
    members: 'Qin Society Performers',
    videoTitle: 'Qin Society Event Videos'
  },
  NYConcert: {
    title: 'UTChinese New Year Concert',
    description: "Music is a language without borders, and it is also the way we support children's education and development. Great music is silent, and great love leaves no trace. Let's spend the cold winter with music at the UTChinese New Year Concert.",
    title2: '2025 UTChinese New Year Charity Concert',
    description2: 'The UTChinese New Year Concert is an annual tradition that brings together students, alumni, and friends to enjoy a night of music and cultural performances. Experience the beauty of Chinese music and celebrate the Spring Festival with us!',
    title3: 'Past Events',
    description3: 'Since 2007, UT Chinese Network has held 14 New Year charity concerts.',
    date: 'Date: February 10, 2025',
    time: 'Time: 7:00 PM - 9:30 PM',
    location: 'Location: Isabel Bader Theatre, 93 Charles St W, Toronto',
    performances: 'Performances: Chinese orchestra, choir, dance, and more',
    tickets: 'Tickets: Free for UofT students (registration required)',
    howToJoin: 'Reserve your seat by registering online. All are welcome! For more details, visit our official WeChat or contact us',
    buyTickets: 'Buy Tickets',
    pastTitle1: '2025 New Year Charity Concert',
    pastDesc1: 'The 2025 UTChinese New Year Concert was a night to remember, featuring stunning performances and a warm community atmosphere.',
    pastTitle2: '2024 New Year Concert',
    pastDesc2: '《Huaxu》',
    pastTitle3: '2016 New Year Concert',
    pastDesc3: '《Ten Years A Concert》',
    pastDetail1: 'The 2025 UTChinese New Year Concert was a night to remember, featuring stunning performances and a warm community atmosphere. The event showcased the talents of our members and celebrated the rich cultural heritage of the Chinese community at UofT.',
    pastHot1: 'Hot: 1000+ attendees',
    pastDetail2: '《Huaxu》 is a musical piece that combines traditional Chinese instruments with modern elements, creating a unique and captivating sound. The performance was well-received by the audience, showcasing the creativity and talent of our musicians.',
    pastHot2: 'Hot: 800+ attendees', 
    pastDetail3: '《Ten Years A Concert》 was a special performance celebrating the 10th anniversary of the UTChinese New Year Concert. It featured a compilation of the best performances from previous years, highlighting the growth and evolution of our concert series.',
    pastHot3: 'Hot: 1200+ attendees',
    Introtitle: 'Introduction to the UTChinese New Year Concert',
    Introtext: "Music is a language without borders,and it is also our way of supporting children's education and development. Every year during the Chinese New Year, we use music to convey warmth in the snow and ice of Toronto. At the New Year's Concert, the noble pianist and elegant ballet take you to experience the soul resonance between masters and feel the dialogue between performers and composers across time and space. Whether it is classical and romantic works that have resounded for hundreds of years, or modern songs that are spontaneously sung by the audience, you can always find familiar touches here. From 2007 to the present, in the past thirteen years, we have raised more than 110,000 Canadian dollars (about 550,000 RMB), and donated all of them to charitable organizations such as UNICEF Canada (United Nations Children's Fund). Great sound is silent, and great love leaves no trace.",
    photoGallery: 'Our Memorable Moments',
  },
  
  events: {
    title: 'Exciting Events',
    subtitle: 'Explore the various activities organized by UTChinese, from academic lectures to cultural exchanges, from career development to social gatherings. Join us to experience the charm of Chinese culture, expand your horizons, and meet like-minded friends.',
    filters: {
      all: 'All Events',
      upcoming: 'Upcoming',
      ongoing: 'Ongoing',
      past: 'Past'
    },
    status: {
      past: 'Past',
      ongoing: 'Ongoing',
      upcoming: 'Upcoming'
    },
    featured: 'Featured Event',
    learnMore: 'Learn More',
    noEvents: 'No events match your criteria',
    loading: 'Loading events...',
    admin: {
      manage: 'Manage Events',
      edit: 'Edit Event',
      add: 'Add New Event'
    }
  }
};
  

// Chinese translations
const zhTranslations = {
  header: {
    about: '关于我们',
    join: '加入我们',
    events: '活动',
    QinSociety: '古琴会',
    NYConcert: '新年音乐会',
    contact: '联系方式',
    language: '语言',
    home: '首页',
    viewMore: '查看更多',
    darkMode: '夜间模式',
    lightMode: '日间模式'
  },
  home: {
    hero: {
      title: '多大中文',
      subtitle: '连接中国文化与多伦多大学社区',
      cta: '加入我们'
    },
    about: {
      title: '什么是多大中文?',
      content: '多大中文是一个致力于促进中国文化传播和文化交流的学生组织，为多伦多大学的学生提供了一个交流的平台。'
    },
    scroll: '向下滚动'
  },
  about: {
    title: '什么是多大中文?',
    story1: '有人说多大中文的精髓是情怀，连续十四年的慈善音乐会，为联合国儿童基金会带去数十万刀的捐赠。',
    story2: '起初，社团的大家想要办企业家论坛，结果很快就请到了俞敏洪、Roots的创始人、微软加拿大的CTO、可口可乐的全球副总裁。本羡慕他们手里已有大量资源，加入了才知道，他们是搜遍整个网络、找到各个企业家或者公司高管的联系方式，发出上百封邮件邀请，最终碰上那百分之一的运气。后来我也加入了他们。',
    story3: '循着这个路子，我们办起了Ace Career Fair。谁都没想到苹果、微软、五大行等都成为了我们的座上客。',
    story4: '之后，我们发现作为生活在加拿大的华人，有时想要介绍我们的祖国时, 却不知道该如何讲起。为了这个，多大中文的创始人们挖了史上最大的坑，木兰国际电影节。我们做到了通过电影的形式"让华人可以更好地讲述中国，让非华人全面客观地看到中国"。',
    story5: '我们一路收获好评，就连著名制片人耐安老师也表达了对我们的欣赏和赞美。在收获了无数的鼓励与支持后，我们更加相信我们做的种种事情真的是太有意义了！',
    quote: "我们不是高端大气上档次的社团，只是一群强迫症患者，对自己喜欢的事情从不将就。",
    authorName: "多大中文",
    values: {
      title: "我们的价值观",
      description: "推动多大中文一切工作的核心原则。",
      cultural: {
        title: "文化交流",
        description: "促进中西方文化之间的相互理解。"
      },
      commitment: {
        title: "追求卓越",
        description: "致力于把每一件事做到最好。"
      },
      innovation: {
        title: "创新思维",
        description: "不断探索新想法和新方法。"
      }
    }
  },
  join: {
    title: '你准备好加入多大中文了吗?',
    intro: '我们不是高端大气上档次的社团，只是一群强迫症患者，对自己喜欢的事情从不将就。我们诚邀各路小伙伴加入我们的团队，在课余时间找到大学的归属。',
    requirements: '你不必身怀绝技，也不必有出众的经历。只要你喜欢我们，愿意跟我们强迫症到底，一起笑傲青春，我们的大门永远为你敞开！',
    sections: '以下内容将介绍多大中文四个部门及其招新要求，欢迎小伙伴们点击文末链接填写报名问卷。我们期待你的加入！',
    welcomeMembers: '欢迎什么样的小伙伴？',
    arts: {
      req1: '对文化艺术感兴趣，怀有好奇心与人文关怀',
      req2: '负责项目的运营工作，包括但不限于平台建设、内容规划等',
      req3: '善于沟通和表达，具有执行能力和责任感'
    },
    career: {
      req1: '有创造力，在商业职场方面有新奇，大胆的想法',
      req2: '关注行业动态和热点时事，具备洞察力和思维能力',
      req3: '善于沟通表达，可以与HR或者企业高管保持联系，发展长期关系',
      req4: '有解决问题和突发情况的能力，有执行力',
      req5: '具备一定抗压能力和时间管理能力，按时参加例会和活动，有责任感',
      subgroup1: {
        title: 'Ace Career Fair',
        description: 'Ace Career Fair是由多伦多大学学生组织举办的本校规模最大招聘会。我们致力于为公司和学生创造一个双赢的平台，引导海外留学生就业，促进高校学生与公司供需对接，方便公司寻找到合适的岗位人选。'
      },
      subgroup2: {
        title: 'Ace Firm Visit',
        description: '在经历了疫情三年漫长的等待之后，Ace Firm Visit终于又和大家见面啦！在往届活动中，我们曾带领学生到Manulife、博世等知名企业进行实地体验与探索。'
      },
      subgroup3: {
        title: 'EXCITE Panel Talk',
        description: 'EXCITE Panel Talk致力于提供一个同龄人与同龄人交流的平台。每个人的成长背景大不相同，世界上也没有能完全复制的成功，但我们希望每一位参与者都能从同龄人的成长经历中产生新的思考。'
      }
    },
    operation: {
      req1: '热爱摄影、善于发现生活中有趣的细节',
      req2: '拥有必要的摄影器材',
      req3: '有视频拍摄、图片处理、视频剪辑的能力',
      req4: '热爱计算机技术',
      req5: '有一定编程的基础，至少CSC108以上水平',
      req6: '热爱谈判，拥有一定的谈判技巧',
      req7: '有较强的理解、沟通、协调能力，具备团队意识',
      req8: '认真细致，思维敏捷，具有较强的责任感',
      subgroup1: {
        title: 'Design and Art',
        description: '相信艺术、影像和设计能够给人更好的交互体验，希望通过这些方式来给这个社会带来积极且有效的能量。'
      },
      subgroup2: {
        title: 'Information Solutions',
        description: '如果你是CS或者Engineering专业的学生，并且想要开发一个软件产品，那么在多大中文，你有机会参与开发一些实用的工具或者规模大一些的应用程序。'
      },
      subgroup3: {
        title: 'Sponsorship',
        description: '我们是多大中文的"招商引资"部门，我们负责协调多大中文与赞助机构的社会关系，保持与校外企业和商家的沟通以及良好合作。'
      }
    },
    support: {
      req1: '具有较好的文学素养和语法敏感度，对排版和校对有一定要求',
      req2: '乐于接受新媒体受科技影响不断变革的性质，敢于创新并坚持，专注于读者',
      req3: '对自媒体平台运营和创作推文感兴趣优先',
      req4: '认真负责，积极参与活动，有一定的执行能力和较强的责任感',
      req5: '有较强的沟通能力，愿意结交新朋友',
      req6: '具有执行力和责任感',
      req7: '热爱组织社团活动，并有较强的团队意识和统筹能力',
      subgroup1: {
        title: 'Content Marketing',
        description: '在多大中文，没有 marketing 的专家，我们是探索者、学习者和执行者。我们撰写了新生手册、搭建了新媒体创作平台，举办了慈善古典音乐会，统筹了招聘会，甚至还会举办跟世界级品牌竞争的活动。虽然每一场宣传都是一次巨大的挑战，但这都是走出象牙塔，无比宝贵的机会。'
      },
      subgroup2: {
        title: 'Human Resources',
        description: 'HR 部门凝聚社团的内部人员，组织线上线下团建，让大家吃好喝好玩好的同时对彼此更加熟悉。'
      }
    },
    form: {
      name: '您的姓名',
      namePlaceholder: '请输入您的姓名',
      email: '电子邮箱',
      emailPlaceholder: '请输入您的电子邮箱',
      group: '感兴趣的小组',
      message: '为什么想要加入我们？',
      messagePlaceholder: '请简单介绍一下您自己以及为什么想要加入我们',
      submit: '提交申请',
      title: '多大中文招新报名表',
      description: '请填写我们的官方申请表以加入多大中文。表单将在新标签页中打开，或者您可以直接在下方完成。',
      openForm: '在新标签页中打开表单'
    }
  },
  groups: {
    overview: {
      title: '多大中文部门',
      description: '多大中文由四个关键部门组成，共同创建一个充满活力的社区。从文化活动和职业服务到运营支持和内容创作，每个部门在我们连接中国文化与多伦多大学社区的使命中都发挥着重要作用。'
    },
    arts: {
      title: '文化艺术部门',
      description: 'Arts & Culture Group 致力于通过文化类的活动，传递中西方多元文化。在这里，以文化艺术为初心，我们连续举办了14年的公益新年音乐晚会，总收入超11万加币。其中，有以书会友的读书沙龙，也有夏日限定的 Live House。我们相信这些活动值得被更多人看见，因此每一位多大中文人都推开了窗口，让优质的内容出现在大家面前。'
    },
    career: {
      title: '职业学术部门',
      description: 'Career & Academic Group 致力于为学生提供高质量的学术及职场类服务，鼓励每一位大学生及毕业生勇敢地突破信息茧房，摸索世界全貌。在这里，你有机会与各行各业的商业精英和大佬面对面交流，也有机会遇到和你志同道合的朋友深入交流，更有机会在各大公司体验自己热爱的行业。加入我们，和我们一起洞察机遇，拓宽视野，拥抱未来。'
    },
    operation: {
      title: '运营部门',
      description: '相信艺术、影像和设计能够给人更好的交互体验，希望通过这些方式来给这个社会带来积极且有效的能量。我们的团队包括摄影/视频、信息解决方案和赞助三个小组，致力于为社团提供全方位的运营支持。'
    },
    support: {
      title: '支持部门',
      description: '在多大中文，没有营销专家，我们是探索者、学习者和执行者。我们撰写了新生手册、搭建了新媒体创作平台，举办了慈善古典音乐会，统筹了招聘会，甚至还会举办跟世界级品牌竞争的活动。虽然每一场宣传都是一次巨大的挑战，但这都是走出象牙塔，无比宝贵的机会。'
    }
  },
  contact: {
    title: '加入社区',
    address: 'Room 534, 21 Sussex Ave, Toronto, ON M5S 1J6',
    wechat: '微信 (公众号搜索多大中文)',
    xiaohongshu: '小红书',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    email: '邮箱'
  },
  QinSociety: {
    title: '鼓琴乱白雪，秋逢江上春',
    description: '多大中文古琴会开社雅集于2024年11月27日圆满举办。首先感谢前来参加活动的大家。在2024年风和日丽没有下雪的小雪，我社成功举办了本社的开社雅集。',
    title2: '古琴会开社雅集',
    performers: '我们的表演者：张映雪 (Yingxue Zhang)，彭浩轩(Peters) 和 汪建策 (Atom)',
    pieces: '演奏曲目按时间顺序：《良宵引》(琴 (Atom)箫(Yingxue)二重奏)、《阳关三叠》(Peters)、《鹤汀凫渚》(Peters)、《流水》(Atom)、《梅花三弄》(Yingxue)、《冬雪》(Atom)、《渔樵问答》(Yingxue)、《龙吟水深》(Atom)。茶为陈皮(10年)普洱。',
    pieces2: "本次雅集开始先向大家介绍了古琴的相关有趣的小知识。在享用茶水之后 ，本次雅集以一首琴箫合奏的《良宵引》正式开始，又在《沧海龙吟》的龙吟阵阵中结束。幸甚至哉，歌以咏志！如果真有什么遗憾的话，就是弹完《白雪》之后，没有下雪吧。感谢浩轩和Leslie提供照片和视频 还有 Jason帮忙setup，以及幕后的Jessica和Amora，还有到场的诸位。",
    pieces3: "特别鸣谢嘉木茶室提供的环保功夫茶杯!",
    members: '古琴会表演者',
    videoTitle: '古琴会活动视频'
  },
  NYConcert: {
    title: '多大中文新年音乐会',
    description: '音乐是没有国界的语言，也是我们支持儿童教育和发展的方式。大音希声，大爱无痕。与多大中文新年音乐会一起走过有音乐相伴的寒冬。',
    title2: '2025多大中文新年慈善音乐会',
    description2: '多大中文新年慈善音乐会是一个年度传统活动，旨在汇聚学生、校友和朋友们，共同享受一晚音乐和文化表演的盛宴。体验中国音乐之美，与我们一起庆祝春节！',
    title3: '往期活动回顾',
    description3: '自2007年起，多大中文（UTChineseNetwork）已举办14场新年慈善音乐会',
    date: '日期：2024年2月10日',
    time: '时间：晚上7:00 - 9:30',
    location: '地点：Isabel Bader Theatre, 93 Charles St W, Toronto',
    performances: '表演：中乐团、合唱团、舞蹈等',
    tickets: '门票：多大学生免费（需注册）',
    howToJoin: '通过在线注册预留您的座位。欢迎所有人！更多详情，请访问我们的官方微信或联系我们',
    buyTickets: '购票入口',
    pastTitle1: '2025新年慈善音乐会',
    pastDesc1: '2025多大中文新年音乐会是一个难忘的夜晚，精彩的表演和温馨的社区氛围让人印象深刻。',
    pastTitle2: '2024新年音乐会',
    pastDesc2: '《花叙》',
    pastTitle3: '2016新年音乐会',
    pastDesc3: '《十年为一》',
    pastDetail1: '2025年新年音乐会盛况空前，观众反响热烈，节目精彩纷呈。',
    pastHot1:'热点回顾：2025年新年音乐会',
    pastDetail2: '2024年新年音乐会以《花叙》为主题，展现了中国传统文化的魅力。',
    pastHot2: '热点回顾：2024年新年音乐会',
    pastDetail3: '2016年新年音乐会《十年为一》庆祝了多大中文十周年，回顾了社团的成长历程。',
    pastHot3: '热点回顾：2016年新年音乐会',
    Introtitle: '音乐会引言',
    Introtext: "音乐是没有国界的语言，也是我们支持儿童教育和发展的方式。每年春节期间，我们用音乐传递温暖，陪伴多伦多的冰雪。新年音乐会中，琴棋书画、古典芭蕾带你感受大师间的心灵共鸣，体会演奏者与作曲家跨越时空的对话。无论是百年传唱的经典浪漫作品，还是观众自发合唱的现代歌曲，你总能在这里找到熟悉的感动。从2007年至今，过去的十三年里，我们筹集了超过11万加元（约55万人民币）的善款，全数捐赠给联合国儿童基金会等慈善机构。大音希声，大爱无痕。",
    photoGallery: '我们的回忆',
  },
  
  events: {
    title: '精彩活动',
    subtitle: '探索多大中文举办的各类活动，从学术讲座到文化交流，从职业发展到社交聚会。加入我们，体验中国文化的魅力，拓展您的视野，结交志同道合的朋友。',
    filters: {
      all: '全部活动',
      upcoming: '即将到来',
      ongoing: '进行中',
      past: '已结束'
    },
    status: {
      past: '已结束',
      ongoing: '进行中',
      upcoming: '即将开始'
    },
    featured: '精选活动',
    learnMore: '了解更多',
    noEvents: '当前没有符合条件的活动',
    loading: '加载中...',
    admin: {
      manage: '管理活动',
      edit: '编辑活动',
      add: '添加新活动'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      zh: { translation: zhTranslations }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 