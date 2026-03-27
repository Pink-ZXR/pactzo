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
  // 已有头像 (28种)
  'cat-british-shorthair': '/pets/avatars/cat-british-blue.png', // 复用蓝色英短
  'cat-american-shorthair': '/pets/avatars/cat-american-tabby.png', // 复用美短虎斑
  'cat-orange': '/pets/avatars/cat-chinese-orange.png', // 复用中华橘猫
  'cat-ragdoll': '/pets/avatars/cat-ragdoll.png',
  'cat-siamese': '/pets/avatars/cat-siamese.png',
  'cat-scottish-fold': '/pets/avatars/cat-scottish-fold.png',
  'cat-maine-coon': '/pets/avatars/cat-maine-coon.png',
  'cat-persian': '/pets/avatars/cat-persian.png',
  'cat-russian-blue': '/pets/avatars/cat-russian-blue.png',
  'cat-sphynx': '/pets/avatars/cat-sphynx.png',
  'cat-munchkin': '/pets/avatars/cat-munchkin.png',
  // 中华田园猫
  'cat-chinese-sanhua': '/pets/avatars/cat-chinese-sanhua.png',
  'cat-chinese-cow': '/pets/avatars/cat-chinese-cow.png',
  'cat-chinese-lihua': '/pets/avatars/cat-chinese-lihua.png',
  'cat-chinese-orange': '/pets/avatars/cat-chinese-orange.png',
  // 英短花色
  'cat-british-silver': '/pets/avatars/cat-british-silver.png',
  'cat-british-blue': '/pets/avatars/cat-british-blue.png',
  'cat-british-blue-white': '/pets/avatars/cat-british-blue-white.png',
  'cat-british-golden': '/pets/avatars/cat-british-golden.png',
  // 其他品种
  'cat-norwegian': '/pets/avatars/cat-norwegian.png',
  'cat-napoleon': '/pets/avatars/cat-napoleon.png',
  'cat-bengal': '/pets/avatars/cat-bengal.png',
  'cat-american-curl': '/pets/avatars/cat-american-curl.png',
  'cat-american-cheese': '/pets/avatars/cat-american-cheese.png',
  'cat-american-tabby': '/pets/avatars/cat-american-tabby.png',
  'cat-exotic': '/pets/avatars/cat-exotic.png',
  'cat-oriental': '/pets/avatars/cat-oriental.png',
  'cat-devon': '/pets/avatars/cat-devon.png',
  'cat-birman': '/pets/avatars/cat-birman.png',
  'cat-persian-chinchilla': '/pets/avatars/cat-persian-chinchilla.png',
  'cat-abyssinian': '/pets/avatars/cat-abyssinian.png',

  // ===== 狗狗 =====
  'dog-golden-retriever': '/pets/avatars/dog-golden-retriever.png',
  'dog-shiba': '/pets/avatars/dog-shiba.png',
  'dog-corgi': '/pets/avatars/dog-corgi.png',
  'dog-poodle': '/pets/avatars/dog-poodle.png',
  'dog-labrador': '/pets/avatars/dog-labrador.png',
  'dog-husky': '/pets/avatars/dog-husky.png',
  'dog-samoyed': '/pets/avatars/dog-samoyed.png',
  'dog-pomeranian': '/pets/avatars/dog-pomeranian.png',
  'dog-bichon': '/pets/avatars/dog-bichon.png',
  'dog-french-bulldog': '/pets/avatars/dog-french-bulldog.png',
  'dog-border-collie': '/pets/avatars/dog-border-collie.png',
  'dog-german-shepherd': '/pets/avatars/dog-german-shepherd.png',
  'dog-beagle': '/pets/avatars/dog-beagle.png',
  'dog-dachshund': '/pets/avatars/dog-dachshund.png',
  'dog-cocker-spaniel': '/pets/avatars/dog-cocker-spaniel.png',
  // 新增狗狗
  'dog-teddy': '/pets/avatars/dog-teddy.png',
  'dog-schnauzer': '/pets/avatars/dog-schnauzer.png',
  'dog-yorkshire': '/pets/avatars/dog-yorkshire.png',
  'dog-westie': '/pets/avatars/dog-westie.png',
  'dog-maltese': '/pets/avatars/dog-maltese.png',
  'dog-pug': '/pets/avatars/dog-pug.png',
  'dog-akita': '/pets/avatars/dog-akita.png',
  'dog-alaskan-malamute': '/pets/avatars/dog-alaskan-malamute.png',
  'dog-shetland-sheepdog': '/pets/avatars/dog-shetland-sheepdog.png',
  'dog-bedlington': '/pets/avatars/dog-bedlington.png',
  'dog-cavalier': '/pets/avatars/dog-cavalier.png',
  'dog-doberman': '/pets/avatars/dog-doberman.png',
  'dog-rottweiler': '/pets/avatars/dog-rottweiler.png',
  'dog-shih-tzu': '/pets/avatars/dog-shih-tzu.png',
  'dog-chinese-rural': '/pets/avatars/dog-chinese-rural.png',
  'dog-dachshund-long': '/pets/avatars/dog-dachshund-long.png',
  'dog-maltipoo': '/pets/avatars/dog-maltipoo.png',
  'dog-cockapoo': '/pets/avatars/dog-cockapoo.png',
  'dog-wire-fox-terrier': '/pets/avatars/dog-wire-fox-terrier.png',
  'dog-dachshund-short': '/pets/avatars/dog-dachshund-short.png',
  'dog-bulldog': '/pets/avatars/dog-bulldog.png',
  'dog-australian-shepherd': '/pets/avatars/dog-australian-shepherd.png',
  'dog-whippet': '/pets/avatars/dog-whippet.png',
  'dog-greyhound': '/pets/avatars/dog-greyhound.png',
  'dog-chihuahua': '/pets/avatars/dog-chihuahua.png',
  'dog-scottish-terrier': '/pets/avatars/dog-scottish-terrier.png',
  'dog-jack-russell': '/pets/avatars/dog-jack-russell.png',
  'dog-english-springer': '/pets/avatars/dog-english-springer.png',
  'dog-chinese-pastoral': '/pets/avatars/dog-chinese-pastoral.png',
  'dog-miniature-pinscher': '/pets/avatars/dog-miniature-pinscher.png',
  'dog-dalmatian': '/pets/avatars/dog-dalmatian.png',
  'dog-border-collie-merle': '/pets/avatars/dog-border-collie-merle.png',
  'dog-newfoundland': '/pets/avatars/dog-newfoundland.png',
  'dog-pharaoh-hound': '/pets/avatars/dog-pharaoh-hound.png',
  'dog-beagle-cn': '/pets/avatars/dog-beagle-cn.png',
  'dog-german-shorthaired': '/pets/avatars/dog-german-shorthaired.png',
  'dog-pitbull': '/pets/avatars/dog-pitbull.png',
  'dog-bull-terrier': '/pets/avatars/dog-bull-terrier.png',
  'dog-central-asian': '/pets/avatars/dog-central-asian.png',
  'dog-aussie-shepherd': '/pets/avatars/dog-aussie-shepherd.png',
  'dog-bernese': '/pets/avatars/dog-bernese.png',
  'dog-papillon': '/pets/avatars/dog-papillon.png',
  'dog-czech-wolfdog': '/pets/avatars/dog-czech-wolfdog.png',
  'dog-staffordshire': '/pets/avatars/dog-staffordshire.png',

  // ===== 兔子 =====
  'rabbit-holland-lop': '/pets/avatars/rabbit-holland-lop.png',
  'rabbit-dwarf': '/pets/avatars/rabbit-dwarf.png',
  'rabbit-dutch': '/pets/avatars/rabbit-dutch.png',
  // 复用现有兔子头像
  'rabbit-angora': '/pets/avatars/rabbit-dwarf.png', // 待补充
  'rabbit-flemish-giant': '/pets/avatars/rabbit-dutch.png', // 待补充
  'rabbit-himalayan': '/pets/avatars/rabbit-dwarf.png', // 待补充
  'rabbit-lionhead': '/pets/avatars/rabbit-holland-lop.png', // 待补充
  'rabbit-lop-english': '/pets/avatars/rabbit-holland-lop.png', // 待补充
  'rabbit-mini-lop': '/pets/avatars/rabbit-holland-lop.png', // 待补充
  'rabbit-rex': '/pets/avatars/rabbit-dutch.png', // 待补充

  // ===== 小宠 =====
  'small-hamster': '/pets/avatars/small-hamster.png',
  'small-hamster-syrian': '/pets/avatars/small-hamster-syrian.png',
  'small-hamster-winter-white': '/pets/avatars/small-hamster-winter-white.png',
  'small-hamster-pudding': '/pets/avatars/small-hamster-pudding.png',
  'small-hamster-silver-fox': '/pets/avatars/small-hamster-silver-fox.png',
  'small-hamster-rob-papa': '/pets/avatars/small-hamster-rob-papa.png',
  'small-hamster-rob-mama': '/pets/avatars/small-hamster-rob-mama.png',
  'small-fancy-rat': '/pets/avatars/small-fancy-rat.png',
  'small-rat': '/pets/avatars/small-rat.png',
  'small-mouse': '/pets/avatars/small-mouse.png',
  'small-gerbil': '/pets/avatars/small-gerbil.png',
  'small-guinea-pig': '/pets/avatars/small-guinea-pig.png',
  'small-chinchilla': '/pets/avatars/small-chinchilla.png',
  'small-squirrel': '/pets/avatars/small-squirrel.png',
  'small-african-hedgehog': '/pets/avatars/small-african-hedgehog.png',
  'small-hedgehog': '/pets/avatars/small-african-hedgehog.png', // 复用非洲迷你刺猬头像
  'small-sugar-glider': '/pets/avatars/small-sugar-glider.png',
  'small-ferret': '/pets/avatars/small-ferret.png',

  // ===== 鸟类 =====
  'bird-budgie': '/pets/avatars/bird-budgie.png',
  'bird-cockatiel': '/pets/avatars/bird-cockatiel.png',
  'bird-lovebird': '/pets/avatars/bird-lovebird.png',
  'bird-sun-conure': '/pets/avatars/bird-sun-conure.png',
  'bird-monk-parakeet': '/pets/avatars/bird-monk-parakeet.png',
  'bird-pacific-parrotlet': '/pets/avatars/bird-pacific-parrotlet.png',
  'bird-canary': '/pets/avatars/bird-canary.png',
  'bird-society-finch': '/pets/avatars/bird-society-finch.png',
  'bird-zebra-finch': '/pets/avatars/bird-zebra-finch.png',
  'bird-myna': '/pets/avatars/bird-myna.png',
  'bird-pearl-finch': '/pets/avatars/bird-pearl-finch.png',

  // ===== 爬宠 - 守宫 =====
  'reptile-leopard-gecko': '/pets/avatars/reptile-leopard-gecko.png',
  'reptile-crested-gecko': '/pets/avatars/reptile-crested-gecko.png',
  'reptile-fat-tail-gecko': '/pets/avatars/reptile-fat-tail-gecko.png',
  'reptile-day-gecko': '/pets/avatars/reptile-day-gecko.png',
  'reptile-giant-gecko': '/pets/avatars/reptile-giant-gecko.png',

  // ===== 爬宠 - 蜥蜴 =====
  'reptile-bearded-dragon': '/pets/avatars/reptile-bearded-dragon.png',
  'reptile-bearded-dragon-fire': '/pets/avatars/reptile-bearded-dragon-fire.png',
  'reptile-blue-tongue-skink': '/pets/avatars/reptile-blue-tongue-skink.png',
  'reptile-green-iguana': '/pets/avatars/reptile-green-iguana.png',
  'reptile-argentine-tegu': '/pets/avatars/reptile-argentine-tegu.png',
  'reptile-chameleon': '/pets/avatars/reptile-chameleon.png',
  'reptile-uromastyx': '/pets/avatars/reptile-uromastyx.png',

  // ===== 爬宠 - 蛇类 =====
  'reptile-ball-python': '/pets/avatars/reptile-ball-python.png',
  'reptile-ball-python-banana': '/pets/avatars/reptile-ball-python-banana.png',
  'reptile-ball-python-spider': '/pets/avatars/reptile-ball-python-spider.png',
  'reptile-corn-snake': '/pets/avatars/reptile-corn-snake.png',
  'reptile-corn-snake-albino': '/pets/avatars/reptile-corn-snake-albino.png',
  'reptile-corn-snake-blizzard': '/pets/avatars/reptile-corn-snake-blizzard.png',
  'reptile-king-snake': '/pets/avatars/reptile-king-snake.png',
  'reptile-milk-snake': '/pets/avatars/reptile-milk-snake.png',
  'reptile-hognose-snake': '/pets/avatars/reptile-hognose-snake.png',
  'reptile-gopher-snake': '/pets/avatars/reptile-gopher-snake.png',
  'reptile-garter-snake': '/pets/avatars/reptile-garter-snake.png',

  // ===== 新增品种 =====
  'reptile-california-king-snake': '/pets/avatars/reptile-california-king-snake.png',
  'reptile-grass-lizard': '/pets/avatars/reptile-grass-lizard.png',
  'reptile-african-fat-tail-gecko': '/pets/avatars/reptile-african-fat-tail-gecko.png',
  'reptile-turtle': '/pets/avatars/reptile-leopard-gecko.png', // 待补充乌龟头像，暂时复用守宫
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
