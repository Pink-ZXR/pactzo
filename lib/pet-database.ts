/**
 * 宠物品种数据库
 * 
 * @context 测试版本 - 通用数据，支持9大类宠物
 * @version 3.0.0 - 五维匹配模型（新增外观维度）
 */

import type { WuxingElement, PetCategory } from '@/hooks/useTestStore';

// 外观属性类型
export type FurType = 'long' | 'short' | 'hairless' | 'feather' | 'scale' | 'shell' | 'wool' | 'quill' | 'none';
export type PetSize = 'tiny' | 'small' | 'medium' | 'large';

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
  // 外观属性（新增）
  furType: FurType;        // 毛发类型
  colorTags: string[];     // 颜色标签
  size: PetSize;           // 体型
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
  reptile: { name: '爬宠', icon: '🦎', desc: '佛系独特的存在' },
  fish: { name: '水族', icon: '🐟', desc: '治愈观赏的艺术' },
  amphibian: { name: '两栖', icon: '🐸', desc: '呆萌治愈的小生灵' },
  exotic: { name: '异宠', icon: '🦊', desc: '少见却令人着迷' },
};

/**
 * 品种数据库 - 9大类宠物
 */
export const PET_DATABASE: PetBreed[] = [
  // ===== 猫咪 (11种) =====
  {
    id: 'cat-british-shorthair',
    name: '英国短毛猫', nameEn: 'British Shorthair',
    category: 'cat', categoryName: '猫咪', wuxing: 'metal',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'short', colorTags: ['灰色', '蓝色'], size: 'medium',
    traits: ['独立', '安静', '适应力强', '温顺'],
    description: '英短性格温和稳定，不需要过多关注，非常适合忙碌的都市人。',
    emotionalTemplates: [
      '英短会成为你最安静的知己，在每个独处的时光里，不打扰便是最好的陪伴。',
      '它圆圆的眼睛注视着你，无需言语，便已是最好的默契。',
    ],
  },
  {
    id: 'cat-ragdoll',
    name: '布偶猫', nameEn: 'Ragdoll',
    category: 'cat', categoryName: '猫咪', wuxing: 'wood',
    schedule: 2, energy: 1, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'long', colorTags: ['白色', '棕色', '蓝色'], size: 'large',
    traits: ['温柔', '粘人', '亲人', '安静'],
    description: '布偶猫被称为"小狗猫"，喜欢跟随主人，性格温顺如布偶。',
    emotionalTemplates: [
      '布偶会成为你最温柔的倾听者，在每个疲惫的夜晚，静静陪在身边。',
      '它蓝色的眼睛像一汪深海，你可以把所有的心事都倾诉给它。',
    ],
  },
  {
    id: 'cat-orange',
    name: '橘猫', nameEn: 'Orange Tabby',
    category: 'cat', categoryName: '猫咪', wuxing: 'fire',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    furType: 'short', colorTags: ['橘黄', '斑纹'], size: 'medium',
    traits: ['活泼', '亲人', '贪吃', '聪明'],
    description: '橘猫以其开朗的性格和圆润的身材闻名，适应力强，是新手养猫的好选择。',
    emotionalTemplates: [
      '橘猫会用它的热情感染你的生活，让每一天都充满阳光和欢笑。',
      '看着它圆滚滚的身体，你会不自觉地嘴角上扬——这就是简单的幸福。',
    ],
  },
  {
    id: 'cat-siamese',
    name: '暹罗猫', nameEn: 'Siamese',
    category: 'cat', categoryName: '猫咪', wuxing: 'water',
    schedule: 2, energy: 2, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'short', colorTags: ['白色', '棕色', '黑色'], size: 'medium',
    traits: ['聪明', '话痨', '粘人', '好奇'],
    description: '暹罗猫是最会"说话"的猫咪，它们忠诚且依恋主人，如同一只小狗。',
    emotionalTemplates: [
      '暹罗会用它独特的嗓音与你对话，让你的生活从此不再寂静。',
      '它深邃的蓝眼睛里藏着神秘，就像你们注定相遇的缘分。',
    ],
  },
  {
    id: 'cat-american-shorthair',
    name: '美国短毛猫', nameEn: 'American Shorthair',
    category: 'cat', categoryName: '猫咪', wuxing: 'earth',
    schedule: 2, energy: 2, space: 1, stability: 3,
    companion: 2, attachment: 2, responsibility: 1,
    furType: 'short', colorTags: ['银色', '斑纹'], size: 'medium',
    traits: ['温顺', '健康', '好养', '友善'],
    description: '美短性格温和，身体健壮，适应力强，是最省心的家庭猫咪之一。',
    emotionalTemplates: [
      '美短会给你最踏实的陪伴，它的存在就像家的一部分，自然而温暖。',
      '简单的相处，就是最长久的幸福——美短深谙此道。',
    ],
  },
  {
    id: 'cat-scottish-fold',
    name: '苏格兰折耳猫', nameEn: 'Scottish Fold',
    category: 'cat', categoryName: '猫咪', wuxing: 'earth',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    furType: 'short', colorTags: ['灰色', '白色', '棕色'], size: 'medium',
    traits: ['温顺', '安静', '好奇', '甜美'],
    description: '折耳猫以其标志性的折耳和圆脸闻名，性格温顺甜美，喜欢安静陪伴。',
    emotionalTemplates: [
      '折耳猫会用它圆圆的大眼睛注视着你，像一个安静的守护者。',
      '那对小小的折耳，仿佛在说：我愿意低下头，只为更靠近你。',
    ],
  },
  {
    id: 'cat-maine-coon',
    name: '缅因猫', nameEn: 'Maine Coon',
    category: 'cat', categoryName: '猫咪', wuxing: 'wood',
    schedule: 2, energy: 2, space: 3, stability: 3,
    companion: 2, attachment: 2, responsibility: 3,
    furType: 'long', colorTags: ['棕色', '斑纹', '多彩'], size: 'large',
    traits: ['温柔巨人', '聪明', '独立', '忠诚'],
    description: '缅因猫是最大的家猫品种之一，被称为"温柔的巨人"，性格稳重又亲人。',
    emotionalTemplates: [
      '缅因猫会用它庞大的身躯给你最温暖的拥抱，让你感受被守护的安心。',
      '它威风凛凛的外表下，藏着一颗最柔软的心。',
    ],
  },
  {
    id: 'cat-persian',
    name: '波斯猫', nameEn: 'Persian',
    category: 'cat', categoryName: '猫咪', wuxing: 'metal',
    schedule: 2, energy: 1, space: 2, stability: 3,
    companion: 2, attachment: 2, responsibility: 3,
    furType: 'long', colorTags: ['白色', '灰色', '橘黄'], size: 'medium',
    traits: ['优雅', '安静', '温顺', '高贵'],
    description: '波斯猫是猫中贵族，优雅高贵，性格安静温和，需要定期梳毛护理。',
    emotionalTemplates: [
      '波斯猫会用它的优雅告诉你：生活值得被认真对待。',
      '梳理它长长的毛发时，你会发现慢下来的时光格外美好。',
    ],
  },
  {
    id: 'cat-russian-blue',
    name: '俄罗斯蓝猫', nameEn: 'Russian Blue',
    category: 'cat', categoryName: '猫咪', wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 3,
    companion: 2, attachment: 2, responsibility: 1,
    furType: 'short', colorTags: ['蓝色', '灰色'], size: 'medium',
    traits: ['优雅', '害羞', '忠诚', '安静'],
    description: '俄罗斯蓝猫有着独特的银蓝色毛发和翡翠绿眼睛，性格内敛但对主人忠诚。',
    emotionalTemplates: [
      '蓝猫会在你不经意间悄悄靠近，用它的方式告诉你：我在。',
      '它翡翠般的双眼里，藏着只属于你的温柔。',
    ],
  },
  {
    id: 'cat-sphynx',
    name: '无毛猫', nameEn: 'Sphynx',
    category: 'cat', categoryName: '猫咪', wuxing: 'fire',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 3,
    furType: 'hairless', colorTags: ['肤色', '灰色', '黑色'], size: 'medium',
    traits: ['粘人', '活泼', '聪明', '独特'],
    description: '无毛猫外表独特，性格极其粘人热情，喜欢钻被窝，是最像狗的猫。',
    emotionalTemplates: [
      '无毛猫会用它温热的身体紧贴着你，让你感受最直接的温暖。',
      '它独特的外表下，是一颗比任何猫都热烈的心。',
    ],
  },
  {
    id: 'cat-munchkin',
    name: '曼基康矮脚猫', nameEn: 'Munchkin',
    category: 'cat', categoryName: '猫咪', wuxing: 'earth',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    furType: 'short', colorTags: ['多彩', '斑纹'], size: 'small',
    traits: ['活泼', '好奇', '可爱', '友善'],
    description: '曼基康以其标志性的短腿闻名，性格活泼好奇，是社交媒体上的人气明星。',
    emotionalTemplates: [
      '曼基康会用它的小短腿追逐你的脚步，每一步都是对你的喜欢。',
      '看着它努力够高处的样子，你会明白：努力本身就是最可爱的事。',
    ],
  },

  // ===== 狗狗 (12种) =====
  {
    id: 'dog-golden-retriever',
    name: '金毛寻回犬', nameEn: 'Golden Retriever',
    category: 'dog', categoryName: '狗狗', wuxing: 'metal',
    schedule: 3, energy: 3, space: 3, stability: 3,
    companion: 3, attachment: 3, responsibility: 3,
    furType: 'long', colorTags: ['金色', '棕色'], size: 'large',
    traits: ['友善', '忠诚', '温顺', '聪明'],
    description: '金毛是最受欢迎的家庭犬之一，性格温顺友善，对人类充满热情。',
    emotionalTemplates: [
      '金毛会成为你最忠诚的伙伴，无论何时回家，它的尾巴总为你摇摆。',
      '它温暖的眼神告诉你：无论发生什么，我都在这里。',
    ],
  },
  {
    id: 'dog-shiba',
    name: '柴犬', nameEn: 'Shiba Inu',
    category: 'dog', categoryName: '狗狗', wuxing: 'wood',
    schedule: 3, energy: 2, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    furType: 'short', colorTags: ['橘黄', '白色'], size: 'medium',
    traits: ['独立', '忠诚', '倔强', '机警'],
    description: '柴犬有着狐狸般的外表和猫一样的独立性格，忠于主人但不过分粘人。',
    emotionalTemplates: [
      '柴犬会用它的方式爱你——不过分表达，却无比忠诚。',
      '它微笑的脸庞藏着一颗倔强又温暖的心，只为你一人敞开。',
    ],
  },
  {
    id: 'dog-corgi',
    name: '柯基', nameEn: 'Corgi',
    category: 'dog', categoryName: '狗狗', wuxing: 'earth',
    schedule: 3, energy: 2, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'short', colorTags: ['橘黄', '白色', '黑色'], size: 'medium',
    traits: ['活泼', '聪明', '粘人', '友善'],
    description: '柯基以其短腿和大屁股闻名，性格活泼开朗，非常适合公寓饲养。',
    emotionalTemplates: [
      '柯基会用它的小短腿追随你的每一步，让你永远不会感到孤单。',
      '看着它摇晃的屁股，再坏的心情也会烟消云散。',
    ],
  },
  {
    id: 'dog-poodle',
    name: '贵宾犬', nameEn: 'Poodle',
    category: 'dog', categoryName: '狗狗', wuxing: 'water',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'wool', colorTags: ['白色', '棕色', '黑色', '灰色'], size: 'small',
    traits: ['聪明', '活泼', '优雅', '亲人'],
    description: '贵宾犬智商极高，不掉毛，是最适合城市公寓的狗狗品种之一。',
    emotionalTemplates: [
      '贵宾会用它的聪明才智逗你开心，每天都有新惊喜。',
      '优雅的外表下，是一颗渴望被爱的真挚内心。',
    ],
  },
  {
    id: 'dog-labrador',
    name: '拉布拉多', nameEn: 'Labrador Retriever',
    category: 'dog', categoryName: '狗狗', wuxing: 'fire',
    schedule: 3, energy: 3, space: 3, stability: 3,
    companion: 3, attachment: 3, responsibility: 3,
    furType: 'short', colorTags: ['黑色', '棕色', '白色'], size: 'large',
    traits: ['友善', '温顺', '活泼', '忠诚'],
    description: '拉布拉多性格温和友善，是最受欢迎的导盲犬和家庭犬。',
    emotionalTemplates: [
      '拉布拉多会给你无条件的爱，让你体会到被完全信任的幸福。',
      '它的热情像阳光一样温暖，照亮你生活的每一个角落。',
    ],
  },
  {
    id: 'dog-husky',
    name: '哈士奇', nameEn: 'Siberian Husky',
    category: 'dog', categoryName: '狗狗', wuxing: 'water',
    schedule: 3, energy: 3, space: 3, stability: 2,
    companion: 2, attachment: 2, responsibility: 3,
    furType: 'long', colorTags: ['灰色', '白色', '黑色'], size: 'large',
    traits: ['活泼', '独立', '搞怪', '精力旺盛'],
    description: '哈士奇以其狼一般的外貌和搞笑的性格闻名，精力充沛，需要大量运动。',
    emotionalTemplates: [
      '哈士奇会用它无穷的精力和搞怪的表情，让你的生活永远充满欢笑。',
      '它蓝色的眼睛像冰雪世界的入口，带你进入一个充满冒险的旅程。',
    ],
  },
  {
    id: 'dog-samoyed',
    name: '萨摩耶', nameEn: 'Samoyed',
    category: 'dog', categoryName: '狗狗', wuxing: 'metal',
    schedule: 3, energy: 3, space: 3, stability: 2,
    companion: 3, attachment: 3, responsibility: 3,
    furType: 'long', colorTags: ['白色'], size: 'large',
    traits: ['微笑天使', '友善', '活泼', '粘人'],
    description: '萨摩耶被称为"微笑天使"，纯白的毛发和标志性的笑容让人无法抗拒。',
    emotionalTemplates: [
      '萨摩耶会用它的微笑融化你所有的坏心情，每一天都是阳光灿烂。',
      '它雪白的毛发像云朵一样，拥抱它就像拥抱了整个冬天的温暖。',
    ],
  },
  {
    id: 'dog-pomeranian',
    name: '博美', nameEn: 'Pomeranian',
    category: 'dog', categoryName: '狗狗', wuxing: 'fire',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'long', colorTags: ['橘黄', '白色', '棕色'], size: 'tiny',
    traits: ['活泼', '勇敢', '粘人', '机灵'],
    description: '博美虽然体型小巧，却有着大狗的勇气和自信，毛发蓬松如小狐狸。',
    emotionalTemplates: [
      '博美会用它小小的身体给你大大的爱，勇气和忠诚不分大小。',
      '它蓬松的毛球外表下，藏着一颗骄傲又深情的心。',
    ],
  },
  {
    id: 'dog-bichon',
    name: '比熊', nameEn: 'Bichon Frise',
    category: 'dog', categoryName: '狗狗', wuxing: 'metal',
    schedule: 2, energy: 2, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'wool', colorTags: ['白色'], size: 'small',
    traits: ['开朗', '粘人', '不掉毛', '可爱'],
    description: '比熊犬性格开朗，毛发雪白不掉毛，像一团行走的棉花糖。',
    emotionalTemplates: [
      '比熊会用它棉花糖般的拥抱，让你忘记所有的烦恼。',
      '它圆圆的黑眼睛里满是欢喜，看着你就是它最快乐的事。',
    ],
  },
  {
    id: 'dog-french-bulldog',
    name: '法国斗牛犬', nameEn: 'French Bulldog',
    category: 'dog', categoryName: '狗狗', wuxing: 'earth',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'short', colorTags: ['黑色', '白色', '棕色', '斑纹'], size: 'small',
    traits: ['温顺', '粘人', '安静', '憨厚'],
    description: '法斗性格温顺安静，运动需求低，蝙蝠耳和扁脸让它充满喜感。',
    emotionalTemplates: [
      '法斗会用它憨憨的表情和打呼噜的声音，给你最踏实的陪伴。',
      '它不需要跑很远，只想安静地窝在你身边——这就够了。',
    ],
  },
  {
    id: 'dog-border-collie',
    name: '边境牧羊犬', nameEn: 'Border Collie',
    category: 'dog', categoryName: '狗狗', wuxing: 'wood',
    schedule: 3, energy: 3, space: 3, stability: 2,
    companion: 3, attachment: 2, responsibility: 3,
    furType: 'long', colorTags: ['黑色', '白色'], size: 'large',
    traits: ['最聪明', '精力旺', '忠诚', '敏捷'],
    description: '边牧是公认智商最高的犬种，学习能力极强，需要大量运动和智力游戏。',
    emotionalTemplates: [
      '边牧会用它超凡的智慧和你心意相通，成为真正的灵魂伙伴。',
      '它的眼神里满是专注，当它注视你时，全世界只剩下你一个人。',
    ],
  },
  {
    id: 'dog-german-shepherd',
    name: '德国牧羊犬', nameEn: 'German Shepherd',
    category: 'dog', categoryName: '狗狗', wuxing: 'metal',
    schedule: 3, energy: 3, space: 3, stability: 3,
    companion: 3, attachment: 3, responsibility: 3,
    furType: 'short', colorTags: ['黑色', '棕色'], size: 'large',
    traits: ['忠诚', '勇敢', '聪明', '可靠'],
    description: '德牧是最全能的工作犬，忠诚勇敢，是最可靠的守护者和家庭伙伴。',
    emotionalTemplates: [
      '德牧会成为你最坚实的后盾，它的忠诚是这个世界上最纯粹的信任。',
      '有它在身边，你永远不用害怕——因为它会替你勇敢。',
    ],
  },

  // ===== 兔子 (5种) =====
  {
    id: 'rabbit-holland-lop',
    name: '荷兰垂耳兔', nameEn: 'Holland Lop',
    category: 'rabbit', categoryName: '兔子', wuxing: 'wood',
    schedule: 2, energy: 1, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    furType: 'short', colorTags: ['白色', '棕色', '灰色'], size: 'small',
    traits: ['温顺', '亲人', '可爱', '安静'],
    description: '垂耳兔以其下垂的耳朵和温顺的性格著称，是最受欢迎的宠物兔品种之一。',
    emotionalTemplates: [
      '垂耳兔会用它柔软的毛发和安静的陪伴，治愈你所有的疲惫。',
      '那对下垂的耳朵像在说：我听着呢，慢慢讲给我听吧。',
    ],
  },
  {
    id: 'rabbit-lionhead',
    name: '狮子兔', nameEn: 'Lionhead Rabbit',
    category: 'rabbit', categoryName: '兔子', wuxing: 'metal',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'long', colorTags: ['棕色', '白色', '灰色'], size: 'small',
    traits: ['独立', '安静', '可爱', '好养'],
    description: '狮子兔因头部的鬃毛像狮子而得名，性格独立安静，适合新手饲养。',
    emotionalTemplates: [
      '狮子兔会安静地陪在你身边，不打扰却无比治愈。',
      '它小小的身体里藏着一颗独立的灵魂，你们会成为最好的室友。',
    ],
  },
  {
    id: 'rabbit-dwarf',
    name: '侏儒兔', nameEn: 'Netherland Dwarf',
    category: 'rabbit', categoryName: '兔子', wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    furType: 'short', colorTags: ['多彩'], size: 'tiny',
    traits: ['机灵', '活泼', '小巧', '好奇'],
    description: '侏儒兔是最小的宠物兔品种之一，性格活泼好奇，虽然体型迷你但精力不小。',
    emotionalTemplates: [
      '侏儒兔小小的身体里装满了好奇，会让你的生活充满惊喜。',
      '看着它探索世界的样子，你会想起生活中那些被遗忘的美好。',
    ],
  },
  {
    id: 'rabbit-angora',
    name: '安哥拉兔', nameEn: 'Angora Rabbit',
    category: 'rabbit', categoryName: '兔子', wuxing: 'metal',
    schedule: 2, energy: 1, space: 2, stability: 3,
    companion: 2, attachment: 2, responsibility: 3,
    furType: 'long', colorTags: ['白色', '灰色'], size: 'medium',
    traits: ['优雅', '温顺', '毛发华丽', '安静'],
    description: '安哥拉兔拥有极其华丽的长毛，像一团飘逸的云朵，需要精心打理。',
    emotionalTemplates: [
      '安哥拉兔会用它如云朵般的毛发，为你编织一个柔软的梦。',
      '照顾它的过程，就是学会用心对待美好事物的过程。',
    ],
  },
  {
    id: 'rabbit-rex',
    name: '迷你雷克斯兔', nameEn: 'Mini Rex',
    category: 'rabbit', categoryName: '兔子', wuxing: 'earth',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    furType: 'short', colorTags: ['棕色', '黑色', '白色'], size: 'small',
    traits: ['丝绒触感', '温顺', '好奇', '亲人'],
    description: '迷你雷克斯拥有天鹅绒般的独特毛发触感，性格温和亲人，体型适中。',
    emotionalTemplates: [
      '摸到雷克斯那丝绒般的毛发时，你会明白什么叫"触手可及的幸福"。',
      '它用柔软回应你的每一次抚摸，这是最朴素的温柔。',
    ],
  },

  // ===== 小宠 (6种) =====
  {
    id: 'small-hamster',
    name: '仓鼠', nameEn: 'Hamster',
    category: 'small', categoryName: '小宠', wuxing: 'earth',
    schedule: 1, energy: 1, space: 1, stability: 1,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'short', colorTags: ['白色', '棕色', '灰色'], size: 'tiny',
    traits: ['独立', '夜行', '可爱', '好养'],
    description: '仓鼠是最适合新手的小宠，空间需求小，照顾简单，适合学生和上班族。',
    emotionalTemplates: [
      '仓鼠会在夜晚的寂静中陪伴你，它的小世界里有着大大的快乐。',
      '看着它塞满颊囊的样子，你会被这份认真生活的态度治愈。',
    ],
  },
  {
    id: 'small-guinea-pig',
    name: '豚鼠', nameEn: 'Guinea Pig',
    category: 'small', categoryName: '小宠', wuxing: 'earth',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    furType: 'short', colorTags: ['棕色', '白色', '多彩'], size: 'small',
    traits: ['温顺', '亲人', '爱叫', '友善'],
    description: '豚鼠性格温顺，会用叫声表达情绪，喜欢群居，是很好的陪伴宠物。',
    emotionalTemplates: [
      '豚鼠会用它独特的叫声欢迎你回家，让你感受到被期待的温暖。',
      '它软软的身体和温柔的眼神，会融化你所有的疲惫。',
    ],
  },
  {
    id: 'small-chinchilla',
    name: '龙猫', nameEn: 'Chinchilla',
    category: 'small', categoryName: '小宠', wuxing: 'metal',
    schedule: 1, energy: 2, space: 2, stability: 3,
    companion: 2, attachment: 2, responsibility: 2,
    furType: 'wool', colorTags: ['灰色', '白色'], size: 'small',
    traits: ['活泼', '胆小', '柔软', '可爱'],
    description: '龙猫有着世界上最柔软的毛发，性格活泼但胆小，需要稳定的环境。',
    emotionalTemplates: [
      '龙猫会用它云朵般的毛发和跳跃的身影，为你编织一个童话。',
      '当它终于愿意在你手心安睡，你会明白什么是被信任的幸福。',
    ],
  },
  {
    id: 'small-hedgehog',
    name: '刺猬', nameEn: 'Hedgehog',
    category: 'small', categoryName: '小宠', wuxing: 'metal',
    schedule: 1, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'quill', colorTags: ['棕色', '白色'], size: 'tiny',
    traits: ['独立', '夜行', '独特', '胆小'],
    description: '刺猬是独特的异宠选择，外表带刺内心柔软，适合喜欢独特宠物的人。',
    emotionalTemplates: [
      '刺猬教会你：即使带着刺，也值得被温柔以待。',
      '当它对你放下防备，你会看到那颗柔软的心。',
    ],
  },
  {
    id: 'small-squirrel',
    name: '魔王松鼠', nameEn: 'Prevost Squirrel',
    category: 'small', categoryName: '小宠', wuxing: 'wood',
    schedule: 3, energy: 3, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    furType: 'short', colorTags: ['棕色', '灰色'], size: 'small',
    traits: ['活泼', '机灵', '好动', '聪明'],
    description: '魔王松鼠精力充沛，动作敏捷，从小养起可以非常亲人，是活力满满的小伙伴。',
    emotionalTemplates: [
      '松鼠会用它灵巧的身影和闪亮的眼睛，为你的生活注入无限活力。',
      '看着它在你肩头跳跃，你会觉得自己拥有了整座森林。',
    ],
  },
  {
    id: 'small-ferret',
    name: '雪貂', nameEn: 'Ferret',
    category: 'small', categoryName: '小宠', wuxing: 'water',
    schedule: 2, energy: 3, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'short', colorTags: ['白色', '棕色', '黑色'], size: 'small',
    traits: ['活泼', '粘人', '好奇', '爱玩'],
    description: '雪貂性格极其活泼好动，好奇心强，喜欢和人互动，像一只永远长不大的小猫。',
    emotionalTemplates: [
      '雪貂会用它无穷的好奇心带你重新发现生活的乐趣。',
      '它柔软的身体钻进你怀里时，整个世界都变得柔软了。',
    ],
  },

  // ===== 鸟类 (6种) =====
  {
    id: 'bird-budgie',
    name: '虎皮鹦鹉', nameEn: 'Budgerigar',
    category: 'bird', categoryName: '鸟类', wuxing: 'wood',
    schedule: 3, energy: 2, space: 1, stability: 2,
    companion: 2, attachment: 2, responsibility: 1,
    furType: 'feather', colorTags: ['绿色', '蓝色', '黄色'], size: 'tiny',
    traits: ['活泼', '会说话', '好养', '聪明'],
    description: '虎皮鹦鹉是最受欢迎的入门鸟类，可以学说话，性格活泼，易于饲养。',
    emotionalTemplates: [
      '虎皮会学会叫你的名字，让回家变成一件期待的事。',
      '它的歌声会成为你生活的背景音乐，轻快而美好。',
    ],
  },
  {
    id: 'bird-cockatiel',
    name: '玄凤鹦鹉', nameEn: 'Cockatiel',
    category: 'bird', categoryName: '鸟类', wuxing: 'fire',
    schedule: 3, energy: 2, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'feather', colorTags: ['灰色', '黄色', '白色'], size: 'small',
    traits: ['温柔', '粘人', '会唱', '亲人'],
    description: '玄凤是最温柔的鹦鹉之一，喜欢依偎在主人身边，会学口哨和简单的歌曲。',
    emotionalTemplates: [
      '玄凤会用它的小脑袋蹭你的脸颊，让你感受什么是纯粹的爱。',
      '当它为你歌唱时，整个世界都变得温柔起来。',
    ],
  },
  {
    id: 'bird-lovebird',
    name: '牡丹鹦鹉', nameEn: 'Lovebird',
    category: 'bird', categoryName: '鸟类', wuxing: 'fire',
    schedule: 3, energy: 2, space: 1, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'feather', colorTags: ['绿色', '红色', '黄色', '多彩'], size: 'tiny',
    traits: ['活泼', '粘人', '色彩艳丽', '好奇'],
    description: '牡丹鹦鹉因成双成对的习性得名，颜色艳丽，性格活泼好动。',
    emotionalTemplates: [
      '牡丹会用它鲜艳的羽毛点亮你的生活，每一天都色彩斑斓。',
      '它对你的依恋像它的名字一样，是最美的承诺。',
    ],
  },
  {
    id: 'bird-canary',
    name: '金丝雀', nameEn: 'Canary',
    category: 'bird', categoryName: '鸟类', wuxing: 'metal',
    schedule: 3, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'feather', colorTags: ['黄色', '橘黄'], size: 'tiny',
    traits: ['歌声优美', '独立', '优雅', '好养'],
    description: '金丝雀以悠扬的歌声闻名，性格独立，不需要过多互动，是纯观赏型鸟类。',
    emotionalTemplates: [
      '金丝雀会用它的歌声为你的生活配上最美的旋律。',
      '它的存在就像一首诗，不需要解读，只需感受美。',
    ],
  },
  {
    id: 'bird-african-grey',
    name: '非洲灰鹦鹉', nameEn: 'African Grey Parrot',
    category: 'bird', categoryName: '鸟类', wuxing: 'water',
    schedule: 3, energy: 2, space: 2, stability: 3,
    companion: 3, attachment: 3, responsibility: 3,
    furType: 'feather', colorTags: ['灰色', '红色'], size: 'medium',
    traits: ['极聪明', '会对话', '敏感', '忠诚'],
    description: '灰鹦鹉是鸟类中智商最高的，可以学会上百个词语进行真正的对话，情感丰富。',
    emotionalTemplates: [
      '灰鹦鹉会成为你真正的对话伙伴，它的智慧会让你惊叹生命的奇迹。',
      '当它用你的语言说出"你好"时，那不只是模仿，是它在回应你。',
    ],
  },
  {
    id: 'bird-finch',
    name: '十姐妹', nameEn: 'Society Finch',
    category: 'bird', categoryName: '鸟类', wuxing: 'earth',
    schedule: 3, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'feather', colorTags: ['棕色', '白色'], size: 'tiny',
    traits: ['群居', '安静', '好养', '温顺'],
    description: '十姐妹是最温顺的小型鸟类之一，喜欢群居，叫声轻柔，非常适合新手。',
    emotionalTemplates: [
      '十姐妹会用它们轻柔的呢喃，为你的空间增添一份生动。',
      '看着它们依偎在一起的样子，你会懂得什么是简单的幸福。',
    ],
  },

  // ===== 爬宠 (6种) =====
  {
    id: 'reptile-turtle',
    name: '乌龟', nameEn: 'Turtle',
    category: 'reptile', categoryName: '爬宠', wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 3,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'shell', colorTags: ['绿色', '棕色'], size: 'small',
    traits: ['长寿', '安静', '独立', '省心'],
    description: '乌龟是最省心的宠物之一，寿命长，不需要太多互动，适合忙碌的人。',
    emotionalTemplates: [
      '乌龟会教你慢下来，在忙碌的生活中找到自己的节奏。',
      '它安静地陪伴可能比你想象的更长久——这是一份跨越时间的承诺。',
    ],
  },
  {
    id: 'reptile-leopard-gecko',
    name: '豹纹守宫', nameEn: 'Leopard Gecko',
    category: 'reptile', categoryName: '爬宠', wuxing: 'earth',
    schedule: 1, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'scale', colorTags: ['黄色', '斑纹'], size: 'small',
    traits: ['温顺', '夜行', '好养', '独特'],
    description: '豹纹守宫是最适合新手的爬宠，性格温顺，颜色漂亮，易于饲养。',
    emotionalTemplates: [
      '守宫会用它独特的方式陪伴你，让你发现另一种生命的美。',
      '它的存在会让你成为朋友圈里最独特的那个人。',
    ],
  },
  {
    id: 'reptile-bearded-dragon',
    name: '鬃狮蜥', nameEn: 'Bearded Dragon',
    category: 'reptile', categoryName: '爬宠', wuxing: 'fire',
    schedule: 3, energy: 1, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 2,
    furType: 'scale', colorTags: ['棕色', '橘黄'], size: 'medium',
    traits: ['温顺', '亲人', '独特', '日行'],
    description: '鬃狮蜥是最亲人的爬宠之一，喜欢被抚摸，是爬宠中的"小狗"。',
    emotionalTemplates: [
      '鬃狮蜥会打破你对爬宠的偏见，它的温顺会让你惊喜。',
      '当它舒服地趴在你手上晒太阳，你会明白：被信任是最珍贵的礼物。',
    ],
  },
  {
    id: 'reptile-ball-python',
    name: '球蟒', nameEn: 'Ball Python',
    category: 'reptile', categoryName: '爬宠', wuxing: 'water',
    schedule: 1, energy: 1, space: 2, stability: 3,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'scale', colorTags: ['棕色', '黑色', '斑纹'], size: 'medium',
    traits: ['温顺', '独立', '独特', '神秘'],
    description: '球蟒是最温顺的蛇类之一，胆小时会缩成球状，适合喜欢独特宠物的人。',
    emotionalTemplates: [
      '球蟒会用它独特的美丽和安静，为你的生活增添一份神秘。',
      '养一条蛇，是在学习与不同的生命和谐相处的智慧。',
    ],
  },
  {
    id: 'reptile-corn-snake',
    name: '玉米蛇', nameEn: 'Corn Snake',
    category: 'reptile', categoryName: '爬宠', wuxing: 'fire',
    schedule: 1, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'scale', colorTags: ['橘黄', '红色', '斑纹'], size: 'medium',
    traits: ['温顺', '好养', '花纹美', '入门级'],
    description: '玉米蛇是最适合入门的蛇类，性格温顺，花纹漂亮，照料简单。',
    emotionalTemplates: [
      '玉米蛇会用它绚丽的花纹告诉你：美丽有千种形态。',
      '它安静地缠绕在你手臂上时，你会感受到一种独特的信任。',
    ],
  },
  {
    id: 'reptile-king-snake',
    name: '王蛇', nameEn: 'King Snake',
    category: 'reptile', categoryName: '爬宠', wuxing: 'metal',
    schedule: 2, energy: 1, space: 2, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'scale', colorTags: ['黑色', '白色', '红色', '多彩'], size: 'medium',
    traits: ['色彩鲜艳', '温和', '适应力强', '独特'],
    description: '王蛇颜色鲜艳夺目，性格温和好养，是蛇类爱好者的热门选择。',
    emotionalTemplates: [
      '王蛇用它斑斓的色彩，诠释着自然界最大胆的审美。',
      '它的名字里有"王"，它的气场配得上这个称号。',
    ],
  },

  // ===== 水族 (6种) =====
  {
    id: 'fish-goldfish',
    name: '金鱼', nameEn: 'Goldfish',
    category: 'fish', categoryName: '水族', wuxing: 'metal',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'none', colorTags: ['红色', '金色', '白色'], size: 'small',
    traits: ['吉祥', '好养', '观赏', '治愈'],
    description: '金鱼是最传统的观赏鱼，寓意吉祥，色彩绚丽，养护简单。',
    emotionalTemplates: [
      '金鱼会在水中为你舞蹈，每一次摆尾都是一首无声的诗。',
      '看着它们悠游自在，你的心也会慢慢平静下来。',
    ],
  },
  {
    id: 'fish-betta',
    name: '斗鱼', nameEn: 'Betta Fish',
    category: 'fish', categoryName: '水族', wuxing: 'fire',
    schedule: 2, energy: 1, space: 1, stability: 1,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'none', colorTags: ['红色', '蓝色', '多彩'], size: 'tiny',
    traits: ['华丽', '独居', '好养', '个性'],
    description: '斗鱼以其绚丽的颜色和飘逸的鳍著称，适合独养，是桌面宠物的绝佳选择。',
    emotionalTemplates: [
      '斗鱼会用它华丽的舞姿，成为你桌面上最美的风景。',
      '它独自绽放的美丽，会提醒你：独处也可以很精彩。',
    ],
  },
  {
    id: 'fish-tropical',
    name: '热带鱼', nameEn: 'Tropical Fish',
    category: 'fish', categoryName: '水族', wuxing: 'water',
    schedule: 2, energy: 1, space: 2, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'none', colorTags: ['多彩'], size: 'tiny',
    traits: ['缤纷', '群游', '观赏', '治愈'],
    description: '热带鱼种类繁多，颜色缤纷，适合打造一个小型水族生态系统。',
    emotionalTemplates: [
      '热带鱼会在你的家中创造一片海洋，那是你专属的治愈空间。',
      '看着它们穿梭在水草间，一天的疲惫都会随水波散去。',
    ],
  },
  {
    id: 'fish-shrimp',
    name: '观赏虾', nameEn: 'Ornamental Shrimp',
    category: 'fish', categoryName: '水族', wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'none', colorTags: ['红色', '白色', '多彩'], size: 'tiny',
    traits: ['可爱', '勤劳', '观赏', '独特'],
    description: '观赏虾以其独特的外形和有趣的行为受到欢迎，可以和水草缸完美搭配。',
    emotionalTemplates: [
      '观赏虾会用它们勤劳的身影，让你感受微观世界的奇妙。',
      '看着它们认真生活的样子，你会被这份专注打动。',
    ],
  },
  {
    id: 'fish-koi',
    name: '锦鲤', nameEn: 'Koi',
    category: 'fish', categoryName: '水族', wuxing: 'metal',
    schedule: 2, energy: 1, space: 3, stability: 3,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'none', colorTags: ['红色', '白色', '金色', '多彩'], size: 'large',
    traits: ['吉祥', '长寿', '优雅', '大气'],
    description: '锦鲤是最高贵的观赏鱼之一，寓意吉祥如意，寿命可达数十年。',
    emotionalTemplates: [
      '锦鲤在水中游弋的姿态，是东方美学最优雅的诠释。',
      '养一池锦鲤，是在家中安放一片活的水墨画。',
    ],
  },
  {
    id: 'fish-coral-tank',
    name: '珊瑚生态缸', nameEn: 'Coral Reef Tank',
    category: 'fish', categoryName: '水族', wuxing: 'water',
    schedule: 2, energy: 1, space: 2, stability: 3,
    companion: 1, attachment: 1, responsibility: 3,
    furType: 'none', colorTags: ['多彩'], size: 'medium',
    traits: ['绚丽', '生态', '治愈', '进阶'],
    description: '珊瑚生态缸是水族爱好者的终极追求，打造一个微型海洋生态系统。',
    emotionalTemplates: [
      '珊瑚缸是你在家中养的一片海——每次凝视都是一次深海潜行。',
      '维护它的过程就像经营一个小世界，你会从中找到创造的快乐。',
    ],
  },

  // ===== 两栖 (4种) =====
  {
    id: 'amphibian-horned-frog',
    name: '角蛙', nameEn: 'Horned Frog',
    category: 'amphibian', categoryName: '两栖', wuxing: 'earth',
    schedule: 1, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'none', colorTags: ['绿色', '棕色', '多彩'], size: 'small',
    traits: ['呆萌', '省心', '吃货', '独特'],
    description: '角蛙因圆滚滚的体型和呆萌的表情走红，养护简单，被称为"招财蛙"。',
    emotionalTemplates: [
      '角蛙会用它圆鼓鼓的身体和无辜的表情，成为你最治愈的桌面伙伴。',
      '它只需要安静地待着，就足以让你嘴角上扬。',
    ],
  },
  {
    id: 'amphibian-axolotl',
    name: '六角恐龙', nameEn: 'Axolotl',
    category: 'amphibian', categoryName: '两栖', wuxing: 'water',
    schedule: 2, energy: 1, space: 1, stability: 3,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'none', colorTags: ['粉色', '白色', '黑色'], size: 'small',
    traits: ['呆萌', '再生能力', '独特', '水生'],
    description: '六角恐龙（美西钝口螈）以其永远微笑的脸和神奇的再生能力爆红网络。',
    emotionalTemplates: [
      '六角恐龙永恒的微笑会提醒你：保持快乐，是一种了不起的能力。',
      '它粉嫩的外鳃像小天使的翅膀，在水中为你轻轻舞动。',
    ],
  },
  {
    id: 'amphibian-tree-frog',
    name: '树蛙', nameEn: 'Tree Frog',
    category: 'amphibian', categoryName: '两栖', wuxing: 'wood',
    schedule: 1, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 2,
    furType: 'none', colorTags: ['绿色', '红色', '蓝色'], size: 'tiny',
    traits: ['色彩绚丽', '安静', '观赏', '热带感'],
    description: '树蛙颜色鲜艳独特，配合热带雨林生态缸，是最具观赏性的两栖宠物。',
    emotionalTemplates: [
      '树蛙鲜艳的色彩，是大自然最大胆的配色方案。',
      '为它打造一座雨林缸，就是在桌上种下了一片热带森林。',
    ],
  },
  {
    id: 'amphibian-fire-belly-newt',
    name: '东方蝾螈', nameEn: 'Fire Belly Newt',
    category: 'amphibian', categoryName: '两栖', wuxing: 'fire',
    schedule: 2, energy: 1, space: 1, stability: 2,
    companion: 1, attachment: 1, responsibility: 1,
    furType: 'none', colorTags: ['黑色', '橘黄', '红色'], size: 'tiny',
    traits: ['好养', '独特', '安静', '长寿'],
    description: '东方蝾螈腹部鲜艳，背部暗色，养护简单，寿命可达十年以上。',
    emotionalTemplates: [
      '蝾螈安静地游弋在水中，像一个来自远古的小精灵。',
      '它不急不缓的生活节奏，会让你重新审视"慢"的意义。',
    ],
  },

  // ===== 异宠 (4种) =====
  {
    id: 'exotic-mini-pig',
    name: '迷你猪', nameEn: 'Mini Pig',
    category: 'exotic', categoryName: '异宠', wuxing: 'earth',
    schedule: 3, energy: 2, space: 2, stability: 2,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'short', colorTags: ['粉色', '黑色', '白色', '斑纹'], size: 'medium',
    traits: ['聪明', '粘人', '爱干净', '社交'],
    description: '迷你猪智商极高（比狗还聪明），性格亲人爱撒娇，可以学会各种指令。',
    emotionalTemplates: [
      '迷你猪会用它超乎想象的聪明和撒娇，颠覆你对"猪"的所有偏见。',
      '当它哼着鼻音跑向你时，你会明白什么叫"真香"。',
    ],
  },
  {
    id: 'exotic-alpaca',
    name: '羊驼', nameEn: 'Alpaca',
    category: 'exotic', categoryName: '异宠', wuxing: 'earth',
    schedule: 3, energy: 2, space: 3, stability: 3,
    companion: 2, attachment: 2, responsibility: 3,
    furType: 'wool', colorTags: ['白色', '棕色', '黑色'], size: 'large',
    traits: ['温顺', '治愈', '呆萌', '社群性'],
    description: '羊驼以其呆萌的表情和柔软的毛发闻名，性格温顺，是近年最火的治愈系异宠。',
    emotionalTemplates: [
      '羊驼会用它标志性的呆萌表情，治愈你所有的焦虑和不安。',
      '它柔软的毛发和温和的眼神，就是世界上最好的减压器。',
    ],
  },
  {
    id: 'exotic-sugar-glider',
    name: '蜜袋鼯', nameEn: 'Sugar Glider',
    category: 'exotic', categoryName: '异宠', wuxing: 'wood',
    schedule: 1, energy: 2, space: 2, stability: 3,
    companion: 3, attachment: 3, responsibility: 2,
    furType: 'short', colorTags: ['灰色', '白色'], size: 'tiny',
    traits: ['粘人', '夜行', '会滑翔', '社群性'],
    description: '蜜袋鼯可以从高处滑翔，极其粘人，认主后喜欢待在主人口袋里。',
    emotionalTemplates: [
      '蜜袋鼯会从高处滑翔到你身上，用最特别的方式告诉你：我信任你。',
      '它小小的身体窝在你口袋里时，你会感到一种被依赖的幸福。',
    ],
  },
  {
    id: 'exotic-fox',
    name: '宠物狐狸', nameEn: 'Domesticated Fox',
    category: 'exotic', categoryName: '异宠', wuxing: 'fire',
    schedule: 1, energy: 2, space: 2, stability: 2,
    companion: 2, attachment: 2, responsibility: 3,
    furType: 'long', colorTags: ['白色', '红色', '银色'], size: 'medium',
    traits: ['聪明', '独立', '灵动', '神秘'],
    description: '宠物狐狸（如耳廓狐）外形精致，性格介于猫狗之间，聪明好奇。',
    emotionalTemplates: [
      '狐狸会用它灵动的眼神和优雅的身姿，让你感受野性与温柔的交融。',
      '小王子说得对：你驯养了它，它就是你独一无二的狐狸。',
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
