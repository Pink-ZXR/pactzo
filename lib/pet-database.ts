/**
 * 宠物品种数据库
 * 
 * @context 测试版本 - 通用数据，支持7大类宠物
 * @version 2.0.0 - 四维匹配模型
 */

import type { WuxingElement, PetCategory } from '@/hooks/useTestStore';

export interface PetBreed {
  id: string;
  name: string;
  nameEn: string;
  category: PetCategory;
  categoryName: string;
  wuxing: WuxingElement;
  // 四维匹配参数 (1-3)
  schedule: number;      // 作息匹配（1=夜行, 2=灵活, 3=日行）
  energy: number;        // 精力需求（1=低, 2=中, 3=高）
  space: number;         // 空间需求（1=小, 2=中, 3=大）
  stability: number;     // 稳定性需求（1=可变, 2=适应, 3=稳定）
  companion: number;     // 互动需求（1=独立, 2=适度, 3=依赖）
  attachment: number;    // 依赖程度（1=冷淡, 2=适中, 3=粘人）
  responsibility: number; // 照顾难度（1=简单, 2=适中, 3=高）
  // 展示信息
  traits: string[];
  description: string;
  emotionalTemplates: string[];
}

// 宠物大类信息
export const PET_CATEGORIES: Record<PetCategory, { name: string; icon: string; desc: string }> = {
  cat: { name: '猫咪', icon: '🐱', desc: '独立优雅的小精灵' },
  dog: { name: '狗狗', icon: '🐕', desc: '忠诚热情的伙伴' },
  rabbit: { name: '兔子', icon: '🐰', desc: '安静可爱的小天使' },
  small: { name: '小宠', icon: '🐹', desc: '小巧迷人的萌物' },
  bird: { name: '鸟类', icon: '🐦', desc: '灵动有趣的朋友' },
  reptile: { name: '爬宠', icon: '🐢', desc: '佛系独特的存在' },
  fish: { name: '水族', icon: '🐟', desc: '治愈观赏的艺术' },
};

/**
 * 品种数据库 - 7大类宠物
 */
export const PET_DATABASE: PetBreed[] = [
  // ===== 猫咪 =====
  {
    id: 'cat-british-shorthair',
    name: '英国短毛猫',
    nameEn: 'British Shorthair',
    category: 'cat',
    categoryName: '猫咪',
    wuxing: 'metal',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    traits: ['独立', '安静', '适应力强', '温顺'],
    description: '英短性格温和稳定，不需要过多关注，非常适合忙碌的都市人。',
    emotionalTemplates: [
      '英短会成为你最安静的知己，在每个独处的时光里，不打扰便是最好的陪伴。',
      '它圆圆的眼睛注视着你，无需言语，便已是最好的默契。',
    ],
  },
  {
    id: 'cat-ragdoll',
    name: '布偶猫',
    nameEn: 'Ragdoll',
    category: 'cat',
    categoryName: '猫咪',
    wuxing: 'wood',
    schedule: 2, energy: 1, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    traits: ['温柔', '粘人', '亲人', '安静'],
    description: '布偶猫被称为"小狗猫"，喜欢跟随主人，性格温顺如布偶。',
    emotionalTemplates: [
      '布偶会成为你最温柔的倾听者，在每个疲惫的夜晚，静静陪在身边。',
      '它蓝色的眼睛像一汪深海，你可以把所有的心事都倾诉给它。',
    ],
  },
  {
    id: 'cat-orange',
    name: '橘猫',
    nameEn: 'Orange Tabby',
    category: 'cat',
    categoryName: '猫咪',
    wuxing: 'fire',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    traits: ['活泼', '亲人', '贪吃', '聪明'],
    description: '橘猫以其开朗的性格和圆润的身材闻名，适应力强，是新手养猫的好选择。',
    emotionalTemplates: [
      '橘猫会用它的热情感染你的生活，让每一天都充满阳光和欢笑。',
      '看着它圆滚滚的身体，你会不自觉地嘴角上扬——这就是简单的幸福。',
    ],
  },
  {
    id: 'cat-siamese',
    name: '暹罗猫',
    nameEn: 'Siamese',
    category: 'cat',
    categoryName: '猫咪',
    wuxing: 'water',
    schedule: 2, energy: 2, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    traits: ['聪明', '话痨', '粘人', '好奇'],
    description: '暹罗猫是最会"说话"的猫咪，它们忠诚且依恋主人，如同一只小狗。',
    emotionalTemplates: [
      '暹罗会用它独特的嗓音与你对话，让你的生活从此不再寂静。',
      '它深邃的蓝眼睛里藏着神秘，就像你们注定相遇的缘分。',
    ],
  },
  {
    id: 'cat-american-shorthair',
    name: '美国短毛猫',
    nameEn: 'American Shorthair',
    category: 'cat',
    categoryName: '猫咪',
    wuxing: 'earth',
    schedule: 2, energy: 2, space: 1, stability: 3,
    companion: 2, attachment: 2, responsibility: 1,
    traits: ['温顺', '健康', '好养', '友善'],
    description: '美短性格温和，身体健壮，适应力强，是最省心的家庭猫咪之一。',
    emotionalTemplates: [
      '美短会给你最踏实的陪伴，它的存在就像家的一部分，自然而温暖。',
      '简单的相处，就是最长久的幸福——美短深谙此道。',
    ],
  },

  // ===== 狗狗 =====
  {
    id: 'dog-golden-retriever',
    name: '金毛寻回犬',
    nameEn: 'Golden Retriever',
    category: 'dog',
    categoryName: '狗狗',
    wuxing: 'metal',
    schedule: 3, energy: 3, space: 3, stability: 3,
    companion: 3, attachment: 3, responsibility: 3,
    traits: ['友善', '忠诚', '温顺', '聪明'],
    description: '金毛是最受欢迎的家庭犬之一，性格温顺友善，对人类充满热情。',
    emotionalTemplates: [
      '金毛会成为你最忠诚的伙伴，无论何时回家，它的尾巴总为你摇摆。',
      '它温暖的眼神告诉你：无论发生什么，我都在这里。',
    ],
  },
  {
    id: 'dog-shiba',
    name: '柴犬',
    nameEn: 'Shiba Inu',
    category: 'dog',
    categoryName: '狗狗',
    wuxing: 'wood',
    schedule: 3, energy: 2, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    traits: ['独立', '忠诚', '倔强', '机警'],
    description: '柴犬有着狐狸般的外表和猫一样的独立性格，忠于主人但不过分粘人。',
    emotionalTemplates: [
      '柴犬会用它的方式爱你——不过分表达，却无比忠诚。',
      '它微笑的脸庞藏着一颗倔强又温暖的心，只为你一人敞开。',
    ],
  },
  {
    id: 'dog-corgi',
    name: '柯基',
    nameEn: 'Corgi',
    category: 'dog',
    categoryName: '狗狗',
    wuxing: 'earth',
    schedule: 3, energy: 2, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    traits: ['活泼', '聪明', '粘人', '友善'],
    description: '柯基以其短腿和大屁股闻名，性格活泼开朗，非常适合公寓饲养。',
    emotionalTemplates: [
      '柯基会用它的小短腿追随你的每一步，让你永远不会感到孤单。',
      '看着它摇晃的屁股，再坏的心情也会烟消云散。',
    ],
  },
  {
    id: 'dog-poodle',
    name: '贵宾犬',
    nameEn: 'Poodle',
    category: 'dog',
    categoryName: '狗狗',
    wuxing: 'water',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    traits: ['聪明', '活泼', '优雅', '亲人'],
    description: '贵宾犬智商极高，不掉毛，是最适合城市公寓的狗狗品种之一。',
    emotionalTemplates: [
      '贵宾会用它的聪明才智逗你开心，每天都有新惊喜。',
      '优雅的外表下，是一颗渴望被爱的真挚内心。',
    ],
  },
  {
    id: 'dog-labrador',
    name: '拉布拉多',
    nameEn: 'Labrador Retriever',
    category: 'dog',
    categoryName: '狗狗',
    wuxing: 'fire',
    schedule: 3, energy: 3, space: 3, stability: 3,
    companion: 3, attachment: 3, responsibility: 3,
    traits: ['友善', '温顺', '活泼', '忠诚'],
    description: '拉布拉多性格温和友善，是最受欢迎的导盲犬和家庭犬。',
    emotionalTemplates: [
      '拉布拉多会给你无条件的爱，让你体会到被完全信任的幸福。',
      '它的热情像阳光一样温暖，照亮你生活的每一个角落。',
    ],
  },

  // ===== 兔子 =====
  {
    id: 'rabbit-holland-lop',
    name: '荷兰垂耳兔',
    nameEn: 'Holland Lop',
    category: 'rabbit',
    categoryName: '兔子',
    wuxing: 'wood',
    schedule: 2, energy: 1, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    traits: ['温顺', '亲人', '可爱', '安静'],
    description: '垂耳兔以其下垂的耳朵和温顺的性格著称，是最受欢迎的宠物兔品种之一。',
    emotionalTemplates: [
      '垂耳兔会用它柔软的毛发和安静的陪伴，治愈你所有的疲惫。',
      '那对下垂的耳朵像在说：我听着呢，慢慢讲给我听吧。',
    ],
  },
  {
    id: 'rabbit-lionhead',
    name: '狮子兔',
    nameEn: 'Lionhead Rabbit',
    category: 'rabbit',
    categoryName: '兔子',
    wuxing: 'metal',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    traits: ['独立', '安静', '可爱', '好养'],
    description: '狮子兔因头部的鬃毛像狮子而得名，性格独立安静，适合新手饲养。',
    emotionalTemplates: [
      '狮子兔会安静地陪在你身边，不打扰却无比治愈。',
      '它小小的身体里藏着一颗独立的灵魂，你们会成为最好的室友。',
    ],
  },
  {
    id: 'rabbit-dwarf',
    name: '侏儒兔',
    nameEn: 'Netherland Dwarf',
    category: 'rabbit',
    categoryName: '兔子',
    wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    traits: ['机灵', '活泼', '小巧', '好奇'],
    description: '侏儒兔是最小的宠物兔品种之一，性格活泼好奇，虽然体型迷你但精力不小。',
    emotionalTemplates: [
      '侏儒兔小小的身体里装满了好奇，会让你的生活充满惊喜。',
      '看着它探索世界的样子，你会想起生活中那些被遗忘的美好。',
    ],
  },

  // ===== 小宠 =====
  {
    id: 'small-hamster',
    name: '仓鼠',
    nameEn: 'Hamster',
    category: 'small',
    categoryName: '小宠',
    wuxing: 'earth',
    schedule: 1, energy: 1, space: 1, stability: 1,
    companion: 1, attachment: 1, responsibility: 1,
    traits: ['独立', '夜行', '可爱', '好养'],
    description: '仓鼠是最适合新手的小宠，空间需求小，照顾简单，适合学生和上班族。',
    emotionalTemplates: [
      '仓鼠会在夜晚的寂静中陪伴你，它的小世界里有着大大的快乐。',
      '看着它塞满颊囊的样子，你会被这份认真生活的态度治愈。',
    ],
  },
  {
    id: 'small-guinea-pig',
    name: '豚鼠',
    nameEn: 'Guinea Pig',
    category: 'small',
    categoryName: '小宠',
    wuxing: 'earth',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    traits: ['温顺', '亲人', '爱叫', '友善'],
    description: '豚鼠性格温顺，会用叫声表达情绪，喜欢群居，是很好的陪伴宠物。',
    emotionalTemplates: [
      '豚鼠会用它独特的叫声欢迎你回家，让你感受到被期待的温暖。',
      '它软软的身体和温柔的眼神，会融化你所有的疲惫。',
    ],
  },
  {
    id: 'small-chinchilla',
    name: '龙猫',
    nameEn: 'Chinchilla',
    category: 'small',
    categoryName: '小宠',
    wuxing: 'metal',
    schedule: 1, energy: 2, space: 2, stability: 3,
    companion: 2, attachment: 2, responsibility: 2,
    traits: ['活泼', '胆小', '柔软', '可爱'],
    description: '龙猫有着世界上最柔软的毛发，性格活泼但胆小，需要稳定的环境。',
    emotionalTemplates: [
      '龙猫会用它云朵般的毛发和跳跃的身影，为你编织一个童话。',
      '当它终于愿意在你手心安睡，你会明白什么是被信任的幸福。',
    ],
  },
  {
    id: 'small-hedgehog',
    name: '刺猬',
    nameEn: 'Hedgehog',
    category: 'small',
    categoryName: '小宠',
    wuxing: 'metal',
    schedule: 1, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    traits: ['独立', '夜行', '独特', '胆小'],
    description: '刺猬是独特的异宠选择，外表带刺内心柔软，适合喜欢独特宠物的人。',
    emotionalTemplates: [
      '刺猬教会你：即使带着刺，也值得被温柔以待。',
      '当它对你放下防备，你会看到那颗柔软的心。',
    ],
  },

  // ===== 鸟类 =====
  {
    id: 'bird-budgie',
    name: '虎皮鹦鹉',
    nameEn: 'Budgerigar',
    category: 'bird',
    categoryName: '鸟类',
    wuxing: 'wood',
    schedule: 3, energy: 2, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    traits: ['活泼', '会说话', '好养', '聪明'],
    description: '虎皮鹦鹉是最受欢迎的入门鸟类，可以学说话，性格活泼，易于饲养。',
    emotionalTemplates: [
      '虎皮会学会叫你的名字，让回家变成一件期待的事。',
      '它的歌声会成为你生活的背景音乐，轻快而美好。',
    ],
  },
  {
    id: 'bird-cockatiel',
    name: '玄凤鹦鹉',
    nameEn: 'Cockatiel',
    category: 'bird',
    categoryName: '鸟类',
    wuxing: 'fire',
    schedule: 3, energy: 2, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    traits: ['温柔', '粘人', '会唱', '亲人'],
    description: '玄凤是最温柔的鹦鹉之一，喜欢依偎在主人身边，会学口哨和简单的歌曲。',
    emotionalTemplates: [
      '玄凤会用它的小脑袋蹭你的脸颊，让你感受什么是纯粹的爱。',
      '当它为你歌唱时，整个世界都变得温柔起来。',
    ],
  },
  {
    id: 'bird-lovebird',
    name: '牡丹鹦鹉',
    nameEn: 'Lovebird',
    category: 'bird',
    categoryName: '鸟类',
    wuxing: 'fire',
    schedule: 3, energy: 2, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    traits: ['活泼', '粘人', '色彩艳丽', '好奇'],
    description: '牡丹鹦鹉因成双成对的习性得名，颜色艳丽，性格活泼好动。',
    emotionalTemplates: [
      '牡丹会用它鲜艳的羽毛点亮你的生活，每一天都色彩斑斓。',
      '它对你的依恋像它的名字一样，是最美的承诺。',
    ],
  },
  {
    id: 'bird-canary',
    name: '金丝雀',
    nameEn: 'Canary',
    category: 'bird',
    categoryName: '鸟类',
    wuxing: 'metal',
    schedule: 3, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    traits: ['歌声优美', '独立', '优雅', '好养'],
    description: '金丝雀以悠扬的歌声闻名，性格独立，不需要过多互动，是纯观赏型鸟类。',
    emotionalTemplates: [
      '金丝雀会用它的歌声为你的生活配上最美的旋律。',
      '它的存在就像一首诗，不需要解读，只需感受美。',
    ],
  },

  // ===== 爬宠 =====
  {
    id: 'reptile-turtle',
    name: '乌龟',
    nameEn: 'Turtle',
    category: 'reptile',
    categoryName: '爬宠',
    wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 3,
    companion: 1, attachment: 1, responsibility: 1,
    traits: ['长寿', '安静', '独立', '省心'],
    description: '乌龟是最省心的宠物之一，寿命长，不需要太多互动，适合忙碌的人。',
    emotionalTemplates: [
      '乌龟会教你慢下来，在忙碌的生活中找到自己的节奏。',
      '它安静地陪伴可能比你想象的更长久——这是一份跨越时间的承诺。',
    ],
  },
  {
    id: 'reptile-leopard-gecko',
    name: '豹纹守宫',
    nameEn: 'Leopard Gecko',
    category: 'reptile',
    categoryName: '爬宠',
    wuxing: 'earth',
    schedule: 1, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    traits: ['温顺', '夜行', '好养', '独特'],
    description: '豹纹守宫是最适合新手的爬宠，性格温顺，颜色漂亮，易于饲养。',
    emotionalTemplates: [
      '守宫会用它独特的方式陪伴你，让你发现另一种生命的美。',
      '它的存在会让你成为朋友圈里最独特的那个人。',
    ],
  },
  {
    id: 'reptile-bearded-dragon',
    name: '鬃狮蜥',
    nameEn: 'Bearded Dragon',
    category: 'reptile',
    categoryName: '爬宠',
    wuxing: 'fire',
    schedule: 3, energy: 1, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    traits: ['温顺', '亲人', '独特', '日行'],
    description: '鬃狮蜥是最亲人的爬宠之一，喜欢被抚摸，是爬宠中的"小狗"。',
    emotionalTemplates: [
      '鬃狮蜥会打破你对爬宠的偏见，它的温顺会让你惊喜。',
      '当它舒服地趴在你手上晒太阳，你会明白：被信任是最珍贵的礼物。',
    ],
  },
  {
    id: 'reptile-ball-python',
    name: '球蟒',
    nameEn: 'Ball Python',
    category: 'reptile',
    categoryName: '爬宠',
    wuxing: 'water',
    schedule: 1, energy: 1, space: 2, stability: 3,
    companion: 1, attachment: 1, responsibility: 2,
    traits: ['温顺', '独立', '独特', '神秘'],
    description: '球蟒是最温顺的蛇类之一，胆小时会缩成球状，适合喜欢独特宠物的人。',
    emotionalTemplates: [
      '球蟒会用它独特的美丽和安静，为你的生活增添一份神秘。',
      '养一条蛇，是在学习与不同的生命和谐相处的智慧。',
    ],
  },

  // ===== 水族 =====
  {
    id: 'fish-goldfish',
    name: '金鱼',
    nameEn: 'Goldfish',
    category: 'fish',
    categoryName: '水族',
    wuxing: 'metal',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    traits: ['吉祥', '好养', '观赏', '治愈'],
    description: '金鱼是最传统的观赏鱼，寓意吉祥，色彩绚丽，养护简单。',
    emotionalTemplates: [
      '金鱼会在水中为你舞蹈，每一次摆尾都是一首无声的诗。',
      '看着它们悠游自在，你的心也会慢慢平静下来。',
    ],
  },
  {
    id: 'fish-betta',
    name: '斗鱼',
    nameEn: 'Betta Fish',
    category: 'fish',
    categoryName: '水族',
    wuxing: 'fire',
    schedule: 2, energy: 1, space: 1, stability: 1,
    companion: 1, attachment: 1, responsibility: 1,
    traits: ['华丽', '独居', '好养', '个性'],
    description: '斗鱼以其绚丽的颜色和飘逸的鳍著称，适合独养，是桌面宠物的绝佳选择。',
    emotionalTemplates: [
      '斗鱼会用它华丽的舞姿，成为你桌面上最美的风景。',
      '它独自绽放的美丽，会提醒你：独处也可以很精彩。',
    ],
  },
  {
    id: 'fish-tropical',
    name: '热带鱼',
    nameEn: 'Tropical Fish',
    category: 'fish',
    categoryName: '水族',
    wuxing: 'water',
    schedule: 2, energy: 1, space: 2, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    traits: ['缤纷', '群游', '观赏', '治愈'],
    description: '热带鱼种类繁多，颜色缤纷，适合打造一个小型水族生态系统。',
    emotionalTemplates: [
      '热带鱼会在你的家中创造一片海洋，那是你专属的治愈空间。',
      '看着它们穿梭在水草间，一天的疲惫都会随水波散去。',
    ],
  },
  {
    id: 'fish-shrimp',
    name: '观赏虾',
    nameEn: 'Ornamental Shrimp',
    category: 'fish',
    categoryName: '水族',
    wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    traits: ['可爱', '勤劳', '观赏', '独特'],
    description: '观赏虾以其独特的外形和有趣的行为受到欢迎，可以和水草缸完美搭配。',
    emotionalTemplates: [
      '观赏虾会用它们勤劳的身影，让你感受微观世界的奇妙。',
      '看着它们认真生活的样子，你会被这份专注打动。',
    ],
  },
];

/**
 * 按类型获取品种
 */
export function getBreedsByCategory(category: PetCategory): PetBreed[] {
  return PET_DATABASE.filter((breed) => breed.category === category);
}

/**
 * 按ID获取品种
 */
export function getBreedById(id: string): PetBreed | undefined {
  return PET_DATABASE.find((breed) => breed.id === id);
}

/**
 * 获取所有品种
 */
export function getAllBreeds(): PetBreed[] {
  return PET_DATABASE;
}

/**
 * 获取所有类别
 */
export function getAllCategories(): PetCategory[] {
  return Object.keys(PET_CATEGORIES) as PetCategory[];
}
