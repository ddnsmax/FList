// --------------------------- 
// VuePress 站点配置（可直接修改版）
// 你主要会改两类东西：
// 1) 站点级别：标题、描述、是否预取等
// 2) 文件列表来源（FileList 主题的多个“挂载点”）
//    每个挂载点 = 一个 URL 路径 + 一种“数据源解析器(analysis)” + （可选）下载代理(downProxy)
// ---------------------------

import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

// 主题与数据源/代理的插件（保持不动，按需选用）
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
 * 站点级配置
 */
export default defineUserConfig({
  bundler: viteBundler(),
  pagePatterns: [],
  lang: 'zh-CN',
  public: `./public`,
  title: 'FList',
  description:
    'FList - 将 GitHub Releases 以类似网盘的形式展示在网页上，方便用户下载开源软件。 支持视频、音频、图片、PDF 等文件的在线预览。',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  shouldPrefetch: true,

  theme: FileList([
    // ========= 示例 1：GitHub Releases =========
    {
      mountPath: "/KnapsackToGo4下载",
      analysis: githubReleasesFilesAnalysis({
        user: "jianjianai",
        repository: "KnapsackToGo4",
        authorizationToken: process.env.githubToken,
        per_page: 10,
      }),
    },

    // ========= 示例 2：根路径 GitHub Releases + Cloudflare 代理 =========
    {
      mountPath: "/",
      analysis: githubReleasesFilesAnalysis({
        user: "jianjianai",
        repository: "FList",
        authorizationToken: process.env.githubToken,
      }),
      downProxy: cloudflarePagesDownProxy(),
    },

    // ========= 示例 3：手工直链文件树 =========
    {
      mountPath: "/",
      analysis: fileUrlTreeAnalysis({
        "/test2/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/文件树测试/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",

        // ✅ 之前的 ZIP
        "/hOkcfVzT.zip": "https://cloud.chenyong.eu.org/file/hOkcfVzT.zip",

        // ✅ 新增：轻松签 ipa 文件
        "/轻松签+-5.0.2.ipa": "https://cloud.chenyong.eu.org/file/Z045M1SD.octet-stream",
      }),
      downProxy: cloudflarePagesDownProxy(),
    },

    // ========= 示例 4：Hugging Face Datasets =========
    {
      mountPath: "/huggingface测试",
      analysis: huggingFaceDatasetsAnalysis({
        userName: "Open-Orca",
        datasetsName: "OpenOrca",
        branchName: "main",
        path: "/",
        maxDeep: 3,
      }),
    },

    // ========= 示例 5：Gitee Releases =========
    {
      mountPath: "/gitee测试/发行版",
      analysis: giteeReleasesFilesAnalysis({
        user: "jja8",
        repository: "flist-test",
        direction: "desc",
      }),
    },

    // ========= 示例 6：Gitee 仓库 =========
    {
      mountPath: "/gitee测试/仓库",
      analysis: giteeReposAnalysis({
        user: "jja8",
        repository: "flist-test",
      }),
    },

    // ========= 示例 7：GitHub 仓库文件树 + 代理 =========
    {
      mountPath: "/ProgrammingVTuberLogos",
      analysis: githubReposAnalysis({
        user: "Aikoyori",
        repository: "ProgrammingVTuberLogos",
        authorizationToken: process.env.githubToken,
      }),
      downProxy: cloudflarePagesDownProxy(),
    },
  ]),
})
