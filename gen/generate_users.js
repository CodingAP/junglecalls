import fs from 'fs';
import path from 'path';

let filename = path.join(path.resolve(), 'users.csv');
let data = 'username,password,picture_url,description,status,public\n';
for (let i = 0; i < 10000; i++) {
    let employeeName = `employee${i.toString().padStart(4, '0')}`;
    data += `${employeeName},default,https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png,working...,"never stop the work, never stop the grind",true\n`;
}

fs.writeFileSync(filename, data);