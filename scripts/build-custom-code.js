import path from 'path';
import fs from 'fs';
import { getArgv } from "./build-integrity.js";

export function buildCustomCode(entryJsUrl, jsIntegrity, codeTplFilePath) {
    const tpl = fs.readFileSync(codeTplFilePath, { encoding: 'utf-8' });
    return tpl.replace(/\$\{entryJsUrl\}/g, entryJsUrl).replace(/\$\{jsIntegrity\}/g, jsIntegrity);
};

const main = async () => {
    const jsUrl = getArgv('js-url');
    const jsIntegrity = getArgv('js-integrity');
    const codeTplFile = getArgv('custom-code-template');
    const codeSaveFile = getArgv('custom-code-out-file', false);
    const codeTplFilePath = path.resolve(process.cwd(), codeTplFile);
    if (fs.existsSync(!codeTplFilePath)) {
        console.error(`${codeTplFilePath} 不存在！`);
        return process.exit(1);
    }
    const code = buildCustomCode(jsUrl, jsIntegrity, codeTplFilePath);
    console.log("自定义代码:", code);
    if (codeSaveFile) {
        const codeSaveFilePath = path.resolve(process.cwd(), codeSaveFile);
        const codeSaveFileDir = path.dirname(codeSaveFilePath);
        if (!fs.existsSync(codeSaveFileDir)) {
            fs.mkdirSync(codeSaveFileDir, { recursive: true });
        }
        fs.writeFileSync(codeSaveFilePath, code, { encoding: 'utf-8' });
        console.log("自定义代码已保存:", codeSaveFilePath);
    }
};

if (path.resolve(import.meta.filename) === path.resolve(process.argv[1])) {
    // node 执行的入口js，是当前文件，才做命令行执行
    main();
}

