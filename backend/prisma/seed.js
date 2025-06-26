const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.event.deleteMany({});
    await prisma.teamMember.deleteMany({});
    await prisma.adminConfig.deleteMany({});

    // Create default admin password
    const DEFAULT_ADMIN_PASSWORD = 'utchinese';
    const DEFAULT_PASSWORD_HASH = crypto.createHash('sha256').update(DEFAULT_ADMIN_PASSWORD).digest('hex');
    
    await prisma.adminConfig.create({
      data: {
        key: 'admin_password',
        value: DEFAULT_PASSWORD_HASH
      }
    });
    
    console.log('Admin password initialized successfully');

    // Add seed events with bilingual content
    const events = [
      {
        title_en: 'UNIC Case Competition',
        title_zh: 'UNIC案例分析大赛',
        description_en: 'Case Competition is a vague concept for a team that initially had only four people. We weren\'t fully confident, had no faculty support or resources, and no experience hosting similar events. All we had were hearts determined to make this event happen and succeed.',
        description_zh: 'Case Competition 对于一开始只有四个人的团队来说，是个很缥缈的概念。我们没有十足的把握，也没有任何faculty 的支持或资源，更没有任何主办类似活动的经验。我们所有的只是几颗强烈想把这样一个活动办成、办大的赤子之心。',
        imageUrl: '/uploads/events/UNICCaseCompetition.jpg',
        startDate: new Date('2023-11-15'),
        endDate: new Date('2023-11-20'),
        location_en: 'Room 534, 21 Sussex Ave, Toronto',
        location_zh: '多伦多萨塞克斯大道21号534室',
        status: 'past',
        featured: true,
      },
      {
        title_en: 'Ace Career Fair',
        title_zh: 'Ace招聘会',
        description_en: 'Creating platforms for you to find your dream jobs and realize your full career potential. Extraordinary job opportunities from amazing companies with amazing products and services, and exciting career options that you might not have even thought of.',
        description_zh: '为您提供寻找理想工作并发挥职业潜能的平台。来自拥有优质产品和服务的优秀公司的非凡工作机会，以及您可能从未想过的激动人心的职业选择。',
        imageUrl: '/uploads/events/AceCareerFair.jpg',
        startDate: new Date('2024-02-10'),
        endDate: new Date('2024-02-10'),
        location_en: 'Multi-Faith Centre (Koffler House)',
        location_zh: '多信仰中心（科夫勒楼）',
        status: 'past',
        featured: true,
      },
      {
        title_en: 'EXCITE Panel Talk',
        title_zh: 'EXCITE小组讨论',
        description_en: 'EXCITE Panel Talk is dedicated to providing a platform for peer-to-peer communication. Everyone\'s growth background is very different, and there is no success in the world that can be completely replicated, but EXCITE hopes that every participant can generate new thinking from peers\' growth experiences.',
        description_zh: 'EXCITE Panel Talk致力于提供一个同龄人与同龄人交流的平台。每个人的成长背景大不相同，世界上也没有能完全复制的成功，但EXCITE希望每一位参与者都能从同龄人的成长经历中产生新的思考和思路，发现校园之外无穷的可能。',
        imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
        startDate: new Date('2024-03-05'),
        endDate: new Date('2024-03-05'),
        location_en: 'Online',
        location_zh: '线上',
        status: 'past',
      },
      {
        title_en: 'New Year Concert',
        title_zh: '新年音乐会',
        description_en: 'Music is a language without borders and our way of supporting children\'s education and development. Great sound inspires, great love leaves no trace. Experience winter with music at UTChinese Network\'s New Year Concert.',
        description_zh: '音乐是没有国界的语言，也是我们支持儿童教育和发展的方式。大音希声，大爱无痕。与多大中文新年音乐会一起走过有音乐相伴的寒冬。',
        imageUrl: '/uploads/events/NewYearConcert.jpg',
        startDate: new Date('2024-01-20'),
        endDate: new Date('2024-01-20'),
        location_en: 'Isabel Bader Theatre',
        location_zh: '伊莎贝尔·巴德剧院',
        status: 'past',
        featured: true,
        link: 'https://www.youtube.com/watch?v=RX_vrxenzBM'
      },
      {
        title_en: 'Ace Firm Visit',
        title_zh: 'Ace企业参观',
        description_en: 'After a three-year-long wait due to the pandemic, Ace Firm Visit is finally meeting with everyone again! In previous events, we have led students to visit and explore renowned companies such as Manulife and Bosch. We are dedicated to creating opportunities for students to observe and communicate in famous enterprises across various industries, encouraging every student and graduate on their career path to bravely explore and break through themselves.',
        description_zh: '在经历了疫情三年漫长的等待之后，Ace Firm Visit终于又和大家见面啦！在往届活动中，我们曾带领学生到Manulife、博世等知名企业进行实地体验与探索。致力于为学生打造在各个领域著名企业中参观和交流的机会，并鼓励每一位在求职路上的在校学生及毕业生勇敢探索，突破自我。',
        imageUrl: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
        startDate: new Date('2024-04-15'),
        endDate: new Date('2024-04-15'),
        location_en: 'Various Company Locations',
        location_zh: '各公司地点',
        status: 'past',
        featured: false,
      },
      {
        title_en: 'UTChinese Network Qin Society Open Ceremony',
        title_zh: '多大中文琴社开幕典礼',
        description_en: 'UTChinese Qin Society Open Ceremony Successfully Concluded. First I would like to say "thank you" to everyone who showed up. Our Qin society successfully held its open ceremony elegant gathering on Nov 27, 2024.',
        description_zh: 'UTChinese琴社开幕典礼圆满结束。首先，我要对所有到场的人表示"感谢"。我们的琴社于2024年11月27日成功举办了开幕典礼雅集。',
        imageUrl: '/uploads/events/QinSocietyOpenCeremony.png',
        startDate: new Date('2024-11-27'),
        endDate: new Date('2024-11-27'),
        location_en: 'Hart House',
        location_zh: '哈特之家',
        status: 'past',
        featured: true,
        link: 'https://www.youtube.com/watch?v=8HbfgZVLNHM&t=3s'
      }
    ];

    for (const event of events) {
      await prisma.event.create({
        data: event,
      });
    }

    // Add team members
    const teamMembers = [
      // ARTS & CULTURE GROUP
      {
        name_en: 'Emily Chen',
        name_zh: '陈雨薇',
        department: 'ARTS & CULTURE GROUP',
        position_en: 'Director',
        position_zh: '总监',
        bio_en: 'Leading cultural events and artistic initiatives to bridge Eastern and Western cultures.',
        bio_zh: '负责领导文化活动和艺术倡议，架起东西方文化的桥梁。',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b002?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'emily.chen@example.com',
        order: 1,
      },
      {
        name_en: 'David Liu',
        name_zh: '刘思辰',
        department: 'ARTS & CULTURE GROUP',
        position_en: 'Event Coordinator',
        position_zh: '活动协调员',
        bio_en: 'Passionate about organizing cultural performances and community engagement.',
        bio_zh: '热衷于组织文化表演和社区参与活动。',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'david.liu@example.com',
        order: 2,
      },
      {
        name_en: 'Sophie Wang',
        name_zh: '王雪菲',
        department: 'ARTS & CULTURE GROUP',
        position_en: 'Music Coordinator',
        position_zh: '音乐协调员',
        bio_en: 'Coordinating our annual charity concert and musical events.',
        bio_zh: '协调我们的年度慈善音乐会和音乐活动。',
        avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'sophie.wang@example.com',
        order: 3,
      },

      // CAREER & ACADEMIC GROUP
      {
        name_en: 'Michael Zhang',
        name_zh: '张浩然',
        department: 'CAREER & ACADEMIC GROUP',
        position_en: 'Director',
        position_zh: '总监',
        bio_en: 'Connecting students with industry professionals and career opportunities.',
        bio_zh: '连接学生与行业专业人士和职业机会。',
        avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'michael.zhang@example.com',
        order: 4,
      },
      {
        name_en: 'Jessica Li',
        name_zh: '李佳怡',
        department: 'CAREER & ACADEMIC GROUP',
        position_en: 'Ace Committee Lead',
        position_zh: 'Ace委员会负责人',
        bio_en: 'Leading the Ace Career Fair and connecting students with dream companies.',
        bio_zh: '领导Ace招聘会，连接学生与梦想公司。',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'jessica.li@example.com',
        order: 5,
      },
      {
        name_en: 'Alex Chen',
        name_zh: '陈志远',
        department: 'CAREER & ACADEMIC GROUP',
        position_en: 'EXCITE Committee Lead',
        position_zh: 'EXCITE委员会负责人',
        bio_en: 'Organizing panel talks and peer-to-peer learning opportunities.',
        bio_zh: '组织小组讨论和同伴学习机会。',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'alex.chen@example.com',
        order: 6,
      },

      // OPERATION GROUP
      {
        name_en: 'Sarah Zhou',
        name_zh: '周思雨',
        department: 'OPERATION GROUP',
        position_en: 'Operations Director',
        position_zh: '运营总监',
        bio_en: 'Overseeing design, technology, and sponsorship operations.',
        bio_zh: '监督设计、技术和赞助运营。',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'sarah.zhou@example.com',
        order: 7,
      },
      {
        name_en: 'Kevin Wu',
        name_zh: '吴凯文',
        department: 'OPERATION GROUP',
        position_en: 'Lead Developer',
        position_zh: '首席开发工程师',
        bio_en: 'Building innovative technical solutions for the community.',
        bio_zh: '为社区构建创新的技术解决方案。',
        avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'kevin.wu@example.com',
        linkedin: 'https://linkedin.com/in/kevinwu',
        order: 8,
      },
      {
        name_en: 'Grace Liu',
        name_zh: '刘雨欣',
        department: 'OPERATION GROUP',
        position_en: 'Design Lead',
        position_zh: '设计负责人',
        bio_en: 'Creating visual identity and designing promotional materials.',
        bio_zh: '创建视觉形象和设计宣传材料。',
        avatarUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'grace.liu@example.com',
        order: 9,
      },
      {
        name_en: 'Ryan Kim',
        name_zh: '金润雨',
        department: 'OPERATION GROUP',
        position_en: 'Sponsorship Manager',
        position_zh: '赞助经理',
        bio_en: 'Building partnerships and managing sponsorship relationships.',
        bio_zh: '建立合作伙伴关系和管理赞助关系。',
        avatarUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'ryan.kim@example.com',
        order: 10,
      },

      // SUPPORT GROUP
      {
        name_en: 'Amanda Zhang',
        name_zh: '张晓雯',
        department: 'SUPPORT GROUP',
        position_en: 'Support Director',
        position_zh: '支持总监',
        bio_en: 'Leading content marketing and human resources initiatives.',
        bio_zh: '领导内容营销和人力资源倡议。',
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'amanda.zhang@example.com',
        order: 11,
      },
      {
        name_en: 'Tony Huang',
        name_zh: '黄志强',
        department: 'SUPPORT GROUP',
        position_en: 'Content Marketing Lead',
        position_zh: '内容营销负责人',
        bio_en: 'Managing social media presence and content creation strategies.',
        bio_zh: '管理社交媒体存在和内容创建策略。',
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'tony.huang@example.com',
        order: 12,
      },
      {
        name_en: 'Lisa Chen',
        name_zh: '陈丽莎',
        department: 'SUPPORT GROUP',
        position_en: 'HR Manager',
        position_zh: '人力资源经理',
        bio_en: 'Organizing team building activities and member engagement.',
        bio_zh: '组织团队建设活动和成员参与。',
        avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        email: 'lisa.chen@example.com',
        order: 13,
      },
    ];

    for (const member of teamMembers) {
      await prisma.teamMember.create({
        data: member,
      });
    }

    console.log('Database has been seeded!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 