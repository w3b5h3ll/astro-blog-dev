// src/data/thoughts.js

// 注意：在这个纯 JS 数据文件中，不需要 import { date } from "astro:schema";
// 除非你在做类型检查，否则通常可以删掉那行 import

export default [
    {
        date: "2025-12-08T13:20:00",
        content: "tput cnorm恢复命令行光标",
    },
    {
        date: "2025-12-06T18:11:00",
        content: "Tailscale 打洞真不错啊，远程ssh不是很卡。必须使用IPv6，这样可以直连，负责就会触发中继，延迟20ms",
    },
    {
        date: "2025-12-04T15:54:00",
        content: "Android Studio 上，DDMS的Hiearchy Viewer的后继者： Layout Inspector, 用于布局查看",

    },
    {
        date: "2025-12-04T15:43:00",
        content: "PDF Diff工具找了找，Adobe Acrobat好用一点，可以只分析内容，选择性忽略某些区域",
    },
    {
        date: "2025-12-04T15:16:00",
        content: "Vim Tips: 跳转行首: Home键 or 命令模式下 ^, 跳转行尾: End键 or 命令模式下 $",
    },
    {
        // 修正点1：日期加 '0'，变为标准格式 2025-12-02
        date: "2025-12-02T10:25:00",
        content: "x86 Pwn ENV: pwndocker https://github.com/skysider/pwndocker",
    },
    // 修正点2：删除了这里的空对象 {},
];
