import { hslToRgb } from './colorConverter.ts';

// 测试红色 (h=0, s=100, l=50) 应该输出 #ff0000
const testHsl = { h: 0, s: 100, l: 50 };
const resultRgb = hslToRgb(testHsl);
console.log('Test 1 - Red (h=0, s=100, l=50):');
console.log('Input HSL:', testHsl);
console.log('Output RGB:', resultRgb);
console.log('Expected RGB:', { r: 255, g: 0, b: 0 });

// 测试其他高饱和度颜色
const testColors = [
  { name: 'Green', h: 120, s: 100, l: 50 },
  { name: 'Blue', h: 240, s: 100, l: 50 },
  { name: 'Yellow', h: 60, s: 100, l: 50 },
  { name: 'Magenta', h: 300, s: 100, l: 50 },
  { name: 'Cyan', h: 180, s: 100, l: 50 }
];

console.log('\nTesting other high-saturation colors:');
testColors.forEach(test => {
  const result = hslToRgb(test);
  console.log(`${test.name} (h=${test.h}, s=${test.s}, l=${test.l}):`, result);
});