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
    // 保留 GitHub Releases 挂载
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

    // ========= 手工维护文件树：目录体系 + 已归类直链 =========
    {
      mountPath: "/",
      analysis: fileUrlTreeAnalysis({
        // 目录清单（空目录不会显示，添加文件后才会出现）：
        // /微信/   /游戏/   /ipa软件/   /ipa插件/
        // /源码/   /安卓软件/   /Mac软件/   /windows/
        // /图片/   /视频/

        // ipa 文件
        "/ipa软件/轻松签+-5.0.2.ipa":
          "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",

        // Windows 压缩包
        "/windows/hOkcfVzT.zip":
          "https://cloud.chenyong.eu.org/file/hOkcfVzT.zip",

        // 图片文件
        "/图片/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png":
          "https://cloud.993613.xyz/file/1755376083621_4442da504356e7c1c4fac635b1b5ea6c.png",

        // 视频示例
        "/视频/test2/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/视频/文件树测试/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/视频/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
      }),
      downProxy: cloudflarePagesDownProxy(),
    },

    // 其它演示挂载
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
