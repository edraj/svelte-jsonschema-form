import fs, { readFileSync, writeFileSync } from "fs";

// Fix svelte-check issue with sveltestrap
function fixSCforSS() {
    const root = "./dist/controls";
    fs.readdirSync(root).forEach(file => {
        if (file.endsWith(".d.ts")) {
            const file_path = `${root}/${file}`;
            let ts = readFileSync(file_path, {encoding: "utf8"});

            const aloneLF = /\n(?!\r)/g;
            ts = ts.replace(aloneLF, '\r\n');

            // use the new `SvelteComponent` interface
            ts = ts.replaceAll('SvelteComponentTyped', 'SvelteComponent');

            // use normal export, not default, otherwise we need to move inside the interface all the top-level imports
            ts = ts.replaceAll('export default class', 'export class');

            // wrap the interface in a `module`
            ts = `declare module 'sveltestrap' {\r\n` + ts + `\r\n}\r\n`;

            // replace `events` and `slots` with `any`
            ts = ts.replaceAll(`{ default: {} }`, 'any');
            ts = ts.replaceAll(`{},`, 'any,');
            ts = ts.replaceAll(`{}>`, 'any>');

            // add `class?` as attribute to all the components
            ts = ts.replaceAll(`}\r\n\r\nexport class`, `class?: string;\r\n}\r\n\r\nexport class`);
            writeFileSync(file_path, ts);
        }
    })
}
fixSCforSS() 