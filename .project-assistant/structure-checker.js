#!/usr/bin/env node

/**
 * 项目结构检查器
 * 自动检查项目结构完整性、命名规范、导入路径
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');

// 必需的文件和目录
const REQUIRED_STRUCTURE = {
  directories: [
    'app',
    'app/test',
    'components',
    'components/ui',
    'components/illustrations',
    'lib',
    'hooks',
    'public',
    'app/experiments',  // 迭代开发目录
  ],
  files: [
    'package.json',
    'tsconfig.json',
    'next.config.ts',
    'app/globals.css',
    'app/layout.tsx',
    'app/page.tsx',
    'components/ui/index.ts',
    'components/illustrations/index.ts',
    'lib/wuxing.ts',
    'lib/matching.ts',
    'hooks/useTestStore.tsx',
  ]
};

// 命名规范检查
const NAMING_RULES = {
  components: {
    pattern: /^[A-Z][a-zA-Z0-9]*\.tsx$/,
    locations: ['components/ui', 'components/illustrations'],
    description: 'PascalCase (e.g., Button.tsx, Card.tsx)'
  },
  pages: {
    pattern: /^[a-z0-9-]+\/page\.tsx$/,
    locations: ['app', 'app/test'],
    description: 'kebab-case directory with page.tsx'
  },
  hooks: {
    pattern: /^use[A-Z][a-zA-Z0-9]*\.tsx$/,
    locations: ['hooks'],
    description: 'camelCase starting with "use" (e.g., useTestStore.tsx)'
  },
  utils: {
    pattern: /^[a-z][a-z0-9-]*\.ts$/,
    locations: ['lib'],
    description: 'camelCase or kebab-case (e.g., wuxing.ts, pet-matching.ts)'
  }
};

// 检查目录是否存在
function checkDirectories() {
  const missing = [];
  for (const dir of REQUIRED_STRUCTURE.directories) {
    const fullPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(fullPath)) {
      missing.push(dir);
    }
  }
  return missing;
}

// 检查文件是否存在
function checkFiles() {
  const missing = [];
  for (const file of REQUIRED_STRUCTURE.files) {
    const fullPath = path.join(PROJECT_ROOT, file);
    if (!fs.existsSync(fullPath)) {
      missing.push(file);
    }
  }
  return missing;
}

// 检查命名规范
function checkNaming() {
  const violations = [];
  
  // 排除 app 根目录文件（这些是 Next.js 特殊文件）
  const appRootFiles = ['layout.tsx', 'page.tsx', 'globals.css', 'favicon.ico'];
  
  for (const [type, rule] of Object.entries(NAMING_RULES)) {
    for (const location of rule.locations) {
      const fullPath = path.join(PROJECT_ROOT, location);
      if (!fs.existsSync(fullPath)) continue;
      
      const items = fs.readdirSync(fullPath, { withFileTypes: true });
      for (const item of items) {
        // 跳过 app 根目录的特殊文件
        if (location === 'app' && appRootFiles.includes(item.name)) {
          continue;
        }
        
        if (item.isDirectory() && location.includes('app')) {
          // 跳过 test 目录（它有 layout.tsx 和子路由）
          if (item.name === 'test') {
            continue; // test 目录使用 layout.tsx + 子路由，不需要 page.tsx
          }
          
          // experiments 目录检查 - 它使用 layout.tsx + 子路由，跳过根目录检查
          if (item.name === 'experiments') {
            continue;
          }
          
          // components 目录 - 是组件目录不是路由，不需要 page.tsx
          if (item.name === 'components') {
            continue;
          }
          
          // 检查 page.tsx 是否存在
          const pagePath = path.join(fullPath, item.name, 'page.tsx');
          if (!fs.existsSync(pagePath)) {
            violations.push({
              type: 'missing-page',
              path: `${location}/${item.name}`,
              message: `Directory ${item.name} is missing page.tsx`
            });
          }
        } else if (item.isFile() && !item.name.startsWith('index')) {
          // 跳过 layout.tsx 和 page.tsx 文件（Next.js 特殊文件）
          if (item.name === 'layout.tsx' || item.name === 'page.tsx') {
            continue;
          }
          
          if (!rule.pattern.test(item.name)) {
            violations.push({
              type: 'naming',
              file: `${location}/${item.name}`,
              expected: rule.description,
              actual: item.name
            });
          }
        }
      }
    }
  }
  
  return violations;
}

// 检查导入路径
function checkImports() {
  const issues = [];
  const srcDirs = ['app', 'components', 'lib', 'hooks'];
  
  for (const dir of srcDirs) {
    const fullPath = path.join(PROJECT_ROOT, dir);
    if (!fs.existsSync(fullPath)) continue;
    
    const files = getAllTsFiles(fullPath);
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const imports = content.match(/from ['"]([^'"]+)['"]/g) || [];
      
      for (const imp of imports) {
        const importPath = imp.match(/from ['"]([^'"]+)['"]/)?.[1];
        if (!importPath) continue;
        
        // 检查相对路径是否过多
        if (importPath.startsWith('../')) {
          const depth = (importPath.match(/\.\.\//g) || []).length;
          if (depth > 2) {
            issues.push({
              type: 'deep-import',
              file: path.relative(PROJECT_ROOT, file),
              import: importPath,
              suggestion: 'Consider using @/ alias instead'
            });
          }
        }
        
        // 检查是否可以使用 @/ 别名
        if (importPath.startsWith('./') && importPath.includes('/components/')) {
          issues.push({
            type: 'alias-opportunity',
            file: path.relative(PROJECT_ROOT, file),
            import: importPath,
            suggestion: `Use @/components/ instead of ${importPath}`
          });
        }
      }
    }
  }
  
  return issues;
}

// 获取所有 TS/TSX 文件
function getAllTsFiles(dir) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getAllTsFiles(fullPath));
    } else if (item.name.endsWith('.ts') || item.name.endsWith('.tsx')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

// 生成报告
function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    checks: {
      directories: checkDirectories(),
      files: checkFiles(),
      naming: checkNaming(),
      imports: checkImports()
    },
    summary: {
      totalIssues: 0,
      status: 'OK'
    }
  };
  
  report.summary.totalIssues = 
    report.checks.directories.length +
    report.checks.files.length +
    report.checks.naming.length +
    report.checks.imports.length;
  
  report.summary.status = report.summary.totalIssues === 0 ? 'OK' : 'NEEDS_ATTENTION';
  
  return report;
}

// 主函数
function main() {
  const report = generateReport();
  
  // 保存报告
  const reportPath = path.join(PROJECT_ROOT, '.project-assistant', 'last-check-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  // 输出结果
  console.log('\n=== 项目结构检查报告 ===\n');
  console.log(`时间: ${report.timestamp}`);
  console.log(`状态: ${report.summary.status === 'OK' ? '✅ 正常' : '⚠️ 需要关注'}`);
  console.log(`问题总数: ${report.summary.totalIssues}\n`);
  
  if (report.checks.directories.length > 0) {
    console.log('📁 缺失目录:');
    report.checks.directories.forEach(d => console.log(`  - ${d}`));
    console.log('');
  }
  
  if (report.checks.files.length > 0) {
    console.log('📄 缺失文件:');
    report.checks.files.forEach(f => console.log(`  - ${f}`));
    console.log('');
  }
  
  if (report.checks.naming.length > 0) {
    console.log('🏷️ 命名规范问题:');
    report.checks.naming.forEach(n => {
      console.log(`  - ${n.file || n.path}`);
      if (n.expected) console.log(`    期望: ${n.expected}`);
      if (n.message) console.log(`    ${n.message}`);
    });
    console.log('');
  }
  
  if (report.checks.imports.length > 0) {
    console.log('📥 导入路径建议:');
    report.checks.imports.forEach(i => {
      console.log(`  - ${i.file}`);
      console.log(`    当前: ${i.import}`);
      console.log(`    建议: ${i.suggestion}`);
    });
    console.log('');
  }
  
  if (report.summary.totalIssues === 0) {
    console.log('🎉 项目结构完整，所有检查通过！\n');
  } else {
    console.log(`⚠️ 发现 ${report.summary.totalIssues} 个问题，建议修复\n`);
  }
  
  return report.summary.status === 'OK' ? 0 : 1;
}

main();
