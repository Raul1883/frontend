// scripts/check-tailwind-classes.js
const fs = require('fs');
const path = require('path');

// Грубая проверка: ищем потенциально опасные динамические классы
function checkDynamicClasses() {
  const srcDir = './src';
  const files = getAllFiles(srcDir);
  const dangerousPattern = /className={`[^`]*\$\{[^}]*\}[^`]*`}/g;
  
  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const matches = content.match(dangerousPattern);
    
    if (matches) {
      console.warn(`⚠️ Найден динамический класс в ${file}:`);
      matches.forEach(m => console.warn(`   ${m}`));
    }
  });
}

checkDynamicClasses();