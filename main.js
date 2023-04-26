const fs = require('fs'); 
const path = require('path'); 

const remove = (dirPath) => {
  fs.readdirSync(dirPath).forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      remove(filePath);
    }
    let data = fs.readFileSync(filePath, 'utf-8');
    data = data.replace('[기밀]', '');
    fs.writeFileSync(filePath, data);

    const delWord = path.join(dirPath, file.replace('[기밀]', ''));
    fs.renameSync(filePath, delWord);
  });
};

remove(__dirname);
