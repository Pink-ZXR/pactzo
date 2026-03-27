// 工具库统一导出

export * from './wuxing';
export * from './matching';
export * from './pet-database';

// image-registry 和 image-registry-auto 有重名导出，单独导出
export { imageRegistry as imageRegistryManual, getImagePath as getImagePathManual, suggestImageUsage, scanImages } from './image-registry';
export { imageRegistry as imageRegistryAuto, getImagePath as getImagePathAuto } from './image-registry-auto';
