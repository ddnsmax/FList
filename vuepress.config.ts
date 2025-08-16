// --------------------------- 
// VuePress 站点配置（可直接修改版）
// ---------------------------

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

import { FileList } from './src/node/index.js'
import { githubReleasesFilesAnalysis } from "./src/node/analysis/githubReleasesFilesAnalysis/index.js";
import { cloudflarePagesDownProxy } from "./src/node/proxy/cloudflarePagesDownProxy/index.js";
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js";
import { huggingFaceDatasetsAnalysis } from "./src/node/analysis/huggingFaceDatasetsAnalysis/index.js";
import { vercelDownProxy } from './src/node/proxy/vercelDownProxy/index.js';
import { netlifyDownProxy } from './src/node/proxy/netlifyDownProxy/index.js';
import { giteeReleasesFilesAnalysis } from './src/node/analysis/giteeReleasesFilesAnalysis/index.js';
import { githubReposAnalysis } from './src/node/analysis/githubReposAnalysis/index.js';
import { giteeReposAnalysis } from './src/node/analysis/giteeReposAnalysis/index.js';

/**
 * 站点配置文件
 */
export default defineUserConfig({
  bundler: viteBundler(),
  pagePatterns: [],
  lang: 'zh-CN',
  public: `./public`,
  title: 'FList',
  description: 'FList - 将 GitHub Releases 以类似网盘的形式展示在网页上，方便用户下载开源软件。 支持视频、音频、图片、PDF 等文件的在线预览。',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  shouldPrefetch: true,

  theme: FileList([
    {
      mountPath: "/KnapsackToGo4下载",
      analysis: githubReleasesFilesAnalysis({
        user: "jianjianai",
        repository: "KnapsackToGo4",
        authorizationToken: process.env.githubToken,
        per_page: 10,
      }),
    },
    {
      mountPath: "/",
      analysis: githubReleasesFilesAnalysis({
        user: "jianjianai",
        repository: "FList",
        authorizationToken: process.env.githubToken,
      }),
      downProxy: cloudflarePagesDownProxy(),
    },

    // ========= 直链文件树（已清空旧的视频示例，按你的分类重建）=========
    {
      mountPath: "/",
      analysis: fileUrlTreeAnalysis({
        // 图片、视频单独目录（目前暂无具体文件，后续直接在此处追加即可）
        // "/图片/xxx.png": "https://example.com/xxx.png",
        // "/视频/xxx.mp4": "https://example.com/xxx.mp4",

        // 其余目录名称按你提供的截图：微信 / 游戏 / ipa软件 / ipa插件 / 源码 / 安卓软件 / Mac软件 / windows

        // ✅ iOS 安装包（ipa）——放到 /ipa软件
        "/ipa软件/轻松签+-5.0.2.ipa": "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",

        // （可选）如果你做了 OTA 安装页和清单，可以给一个安装入口
        // "/ipa软件/轻松签安装.html": "/install.html",

        // ✅ ZIP（暂按常见习惯归到 windows；若你希望换目录，只改左侧路径）
        "/windows/hOkcfVzT.zip": "https://cloud.chenyong.eu.org/file/hOkcfVzT.zip",

        // 下面这些目录先占位说明：等有文件时，按类型归到对应目录新增映射即可
        // "/微信/README.txt": "https://example.com/placeholder",       // 有需要再加
        // "/游戏/README.txt": "https://example.com/placeholder",
        // "/ipa插件/README.txt": "https://example.com/placeholder",
        // "/源码/README.txt": "https://example.com/placeholder",
        // "/安卓软件/README.txt": "https://example.com/placeholder",
        // "/Mac软件/README.txt": "https://example.com/placeholder",
      }),
      // 如果直链在你这边访问较慢或有跨域，保持代理；否则可以去掉
      downProxy: cloudflarePagesDownProxy(),
      // 其它平台示例：
      // downProxy: vercelDownProxy(),
      // downProxy: netlifyDownProxy(),
    },

    {
      mountPath: "/huggingface测试",
      analysis: huggingFaceDatasetsAnalysis({
        userName: "Open-Orca",
        datasetsName: "OpenOrca",
        branchName: "main",
        path: "/",
        maxDeep: 3
      }),
    },
    {
      mountPath: "/gitee测试/发行版",
      analysis: giteeReleasesFilesAnalysis({
        user: "jja8",
        repository: "flist-test",
        direction: "desc"
      })
    },
    {
      mountPath: "/gitee测试/仓库",
      analysis: giteeReposAnalysis({
        user: "jja8",
        repository: "flist-test"
      }),
    },
    {
      mountPath: "/ProgrammingVTuberLogos",
      analysis: githubReposAnalysis({
        user: "Aikoyori",
        repository: "ProgrammingVTuberLogos",
        authorizationToken: process.env.githubToken,
      }),
      downProxy: cloudflarePagesDownProxy()
    },
  ])
})
