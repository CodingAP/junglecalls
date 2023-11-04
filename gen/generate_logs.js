import fs from 'fs';
import path from 'path';

let dir = path.resolve();

let ceoMessage = 'ceo-man-123: do you have the flag?';
let employeeMessage = ['uh idk lemme check', 'hold on, i will check!', 'maybe, maybe not...', 'perhap'];
let employeeNo = 'sadly, i do not...';
for (let i = 0; i < 10000; i++) {
    let employeeName = `employee${i.toString().padStart(4, '0') }`
    let data = '';

    let interactions = Math.floor(Math.random() * 100);
    for (let j = 0; j < interactions; j++) {
        data += ceoMessage + '\n';
        data += `${employeeName}: ${employeeMessage[Math.floor(Math.random() * employeeMessage.length)]}\n`;
    }
    data += ceoMessage + '\n';
    data += `${employeeName}: ${employeeNo}\n`;

    fs.writeFileSync(path.join(dir, 'user_messages', `ceo-man-123!${employeeName}.log`), data);
    console.log(`Generated ${employeeName}`);
}