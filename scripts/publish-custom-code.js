import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { getArgv } from "./build-integrity.js";

const generateHMAC = (message, secretKey) => {
    return crypto.createHmac('sha256', secretKey).update(message).digest('hex');
};
const sendCustomCode = async (code, customCodeApi, secretKey) => {
    const timestamp = Date.now().toString();
    const message = `code=${code}&timestamp=${timestamp}`;
    const hmac = generateHMAC(message, secretKey);

    const postData = { code, timestamp, hmac };

    try {
        const response = await fetch(`${customCodeApi}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.text();
        console.log('Response:', responseData);
        return responseData;
    } catch (error) {
        console.error('网络出错:', error);
        process.exit(1);
    }
};

const main = async () => {
    const customCodeFile = getArgv('custom-code-file');
    const customCodeApi = getArgv('custom-code-api');
    const secretKey = getArgv('secret-key');
    const customCodeFilePath = path.resolve(process.cwd(), customCodeFile);
    if (!fs.existsSync(customCodeFilePath)) {
        console.error(`${customCodeFilePath} 不存在`);
        process.exit(1);
    }
    const customCode = fs.readFileSync(customCodeFilePath, { encoding: 'utf-8' });
    console.log("自定义代码:", customCode);
    if (!customCode) {
        console.error(`${customCodeFilePath} 内容为空`);
        process.exit(1);
    }
    await sendCustomCode(customCode, customCodeApi, secretKey);
};

if (path.resolve(import.meta.filename) === path.resolve(process.argv[1])) {
    // node 执行的入口js，是当前文件，才做命令行执行
    main();
}