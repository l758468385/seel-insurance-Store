
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// 计算文件的integrity
export const buildIntegrity = (filePath) => {
    const fileBuffer = fs.readFileSync(filePath);
    const hash = crypto.createHash('sha256');
    hash.update(fileBuffer);
    // 获取 Base64 编码的哈希值，并按 SRI 规范格式化
    return `sha256-${hash.digest('base64')}`;
};
export function parseArgv() {
    /** @type {Record<string, string>} */
    const args = {};
    process.argv.forEach(a => {
        const arg = a?.trim?.() ?? '';
        const [_, name, value] = /^\-\-([^\=\"]+)(?:\=\"?([^"]+)?\"?)?$/ig.exec(arg) ?? [];
        if (name) {
            args[name] = value ?? '';
        }
    })
    return args;
}
export const argv = parseArgv();
export function getArgv(name, required = true) {
    const val = argv[name] ?? '';
    if (required && val === '') {
        console.error(`必须带有 --${name}="" 参数`);
        return process.exit(1);
    }
    return val;
}

// 读取文件内容并保存到后端
const main = async () => {
    const file = getArgv('file');
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
        console.error(`${filePath} 不存在！`);
        return process.exit(1);
    }
    const integrity = buildIntegrity(filePath);
    // process.stdout.write(integrity);
    console.log(integrity);
};


if (path.resolve(import.meta.filename) === path.resolve(process.argv[1])) {
    // node 执行的入口js，是当前文件，才做命令行执行
    main();
}

