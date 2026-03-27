/**
 * 宠物头像映射表
 * 
 * @description 独立于宠物数据库的头像映射，便于灵活管理和渐进式添加
 * @version 1.0.0
 * 
 * 使用方式：
 * import { getPetAvatar } from '@/lib/pet-avatars';
 * const avatar = getPetAvatar('cat-british-shorthair');
 */

/**
 * 宠物头像映射表
 * key: 宠物 ID（与 pet-database.ts 中的 id 对应）
 * value: 头像图片路径
 */
export const PET_AVATARS: Record<string, string> = {
  // ===== 猫咪 =====
  'cat-british-shorthair': '/pets/avatars/cat-british-shorthair.png',
  'cat-ragdoll': '/pets/avatars/cat-ragdoll.png',
  'cat-orange': '/pets/avatars/cat-orange.png',
  'cat-siamese': '/pets/avatars/cat-siamese.png',
  'cat-american-shorthair': '/pets/avatars/cat-american-shorthair.png',
  'cat-scottish-fold': '/pets/avatars/cat-scottish-fold.png',
  'cat-maine-coon': '/pets/avatars/cat-maine-coon.png',
  'cat-persian': '/pets/avatars/cat-persian.png',
  'cat-russian-blue': '/pets/avatars/cat-russian-blue.png',
  'cat-sphynx': '/pets/avatars/cat-sphynx.png',
  'cat-munchkin': '/pets/avatars/cat-munchkin.png',

  // ===== 狗狗 =====
  'dog-golden-retriever': '/pets/avatars/dog-golden-retriever.png',
  'dog-shiba': '/pets/avatars/dog-shiba.png',
  'dog-corgi': '/pets/avatars/dog-corgi.png',
  'dog-poodle': '/pets/avatars/dog-poodle.png',
  'dog-labrador': '/pets/avatars/dog-labrador.png',
  'dog-husky': '/pets/avatars/dog-husky.jpg',
  'dog-samoyed': '/pets/avatars/dog-samoyed.png',
  'dog-pomeranian': '/pets/avatars/dog-pomeranian.png',
  'dog-bichon': '/pets/avatars/dog-bichon.png',
  'dog-french-bulldog': '/pets/avatars/dog-french-bulldog.png',
  'dog-border-collie': '/pets/avatars/dog-border-collie.png',
  'dog-german-shepherd': '/pets/avatars/dog-german-shepherd.png',
  'dog-beagle': '/pets/avatars/dog-beagle.png',
  'dog-dachshund': '/pets/avatars/dog-dachshund.png',
  'dog-cocker-spaniel': '/pets/avatars/dog-cocker-spaniel.png',

  // ===== 兔子 =====
  'rabbit-holland-lop': '/pets/avatars/rabbit-holland-lop.png',
  'rabbit-lionhead': '/pets/avatars/rabbit-lionhead.png',
  'rabbit-dwarf': '/pets/avatars/rabbit-dwarf.png',
  'rabbit-angora': '/pets/avatars/rabbit-angora.png',
  'rabbit-rex': '/pets/avatars/rabbit-rex.png',

  // ===== 小宠 =====
  'small-hamster': '/pets/avatars/small-hamster.png',
  'small-guinea-pig': '/pets/avatars/small-guinea-pig.png',
  'small-chinchilla': '/pets/avatars/small-chinchilla.png',
  'small-hedgehog': '/pets/avatars/small-hedgehog.png',
  'small-squirrel': '/pets/avatars/small-squirrel.png',
  'small-ferret': '/pets/avatars/small-ferret.png',

  // ===== 鸟类 =====
  'bird-budgie': '/pets/avatars/bird-budgie.png',
  'bird-cockatiel': '/pets/avatars/bird-cockatiel.png',
  'bird-lovebird': '/pets/avatars/bird-lovebird.png',
  'bird-canary': '/pets/avatars/bird-canary.png',
  'bird-african-grey': '/pets/avatars/bird-african-grey.png',
  'bird-finch': '/pets/avatars/bird-finch.png',

  // ===== 爬宠 =====
  'reptile-turtle': '/pets/avatars/reptile-turtle.png',
  'reptile-leopard-gecko': '/pets/avatars/reptile-leopard-gecko.png',
  'reptile-bearded-dragon': '/pets/avatars/reptile-bearded-dragon.png',
  'reptile-ball-python': '/pets/avatars/reptile-ball-python.png',
  'reptile-corn-snake': '/pets/avatars/reptile-corn-snake.png',
  'reptile-king-snake': '/pets/avatars/reptile-king-snake.png',

  // ===== 水族 =====
  'fish-goldfish': '/pets/avatars/fish-goldfish.png',
  'fish-betta': '/pets/avatars/fish-betta.png',
  'fish-tropical': '/pets/avatars/fish-tropical.png',
  'fish-shrimp': '/pets/avatars/fish-shrimp.png',
  'fish-koi': '/pets/avatars/fish-koi.png',
  'fish-coral-tank': '/pets/avatars/fish-coral-tank.png',

  // ===== 两栖 =====
  'amphibian-horned-frog': '/pets/avatars/amphibian-horned-frog.png',
  'amphibian-axolotl': '/pets/avatars/amphibian-axolotl.png',
  'amphibian-tree-frog': '/pets/avatars/amphibian-tree-frog.png',
  'amphibian-fire-belly-newt': '/pets/avatars/amphibian-fire-belly-newt.png',

  // ===== 异宠 =====
  'exotic-mini-pig': '/pets/avatars/exotic-mini-pig.png',
  'exotic-alpaca': '/pets/avatars/exotic-alpaca.png',
  'exotic-sugar-glider': '/pets/avatars/exotic-sugar-glider.png',
  'exotic-fox': '/pets/avatars/exotic-fox.png',
};

/** 默认头像（宠物头像未配置时使用） */
export const DEFAULT_AVATAR = '/pets/avatars/default-pet.png';

/**
 * 获取宠物头像路径
 * @param breedId 宠物品种 ID
 * @returns 头像路径（如果未配置则返回默认头像）
 */
export function getPetAvatar(breedId: string): string {
  return PET_AVATARS[breedId] || DEFAULT_AVATAR;
}

/**
 * 检查宠物是否有配置头像
 * @param breedId 宠物品种 ID
 * @returns 是否有配置头像
 */
export function hasPetAvatar(breedId: string): boolean {
  return breedId in PET_AVATARS;
}

export default PET_AVATARS;
