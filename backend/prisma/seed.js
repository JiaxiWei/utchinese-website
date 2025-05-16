const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const prisma = new PrismaClient();

async function main() {
  try {
    // Clear existing data
    await prisma.event.deleteMany({});
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
        link: 'https://utchinesenetwork.ca/ace'
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
        link: 'https://utchinesenetwork.ca/excite'
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
        link: 'https://utchinesenetwork.ca/ace-firm-visit'
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
      }
    ];

    for (const event of events) {
      await prisma.event.create({
        data: event,
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