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
// 如果你不使用某个功能，可以把对应的 import 和下方的配置块一并删除
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
 * - 没标注“可改”的一般保持默认即可
 * - 标注“必改/可改”的按需要修改
 */
export default defineUserConfig({
  // 打包器（保持 vite 即可，除非你清楚要换）
  bundler: viteBundler(),

  // 页面生成来源匹配规则：留空表示不从 markdown 生成页面
  // 因为我们用 FileList 主题“挂载点”来渲染内容，而不是普通文档页
  pagePatterns: [],

  // 站点语言（影响默认文案、aria 标签等）
  lang: 'zh-CN',

  // 静态资源目录（/public 下的文件会映射到网站根路径）
  public: `./public`,

  // 网站标题（浏览器标签标题；颜色在 src/client/css/main.css 调）
  title: 'FList',

  // 网站描述（SEO 用，建议改成你站点的简介）【可改】
  description:
    'FList - 将 GitHub Releases 以类似网盘的形式展示在网页上，方便用户下载开源软件。 支持视频、音频、图片、PDF 等文件的在线预览。',

  // 页面 <head> 里的额外标签：网站图标
  // ❗不要删除 /logo.png；可以用自己的图片替换同名文件
  head: [['link', { rel: 'icon', href: '/logo.png' }]],

  /**
   * 资源预取（切页加速）
   * - true：站点小、文件不多（<~100 个）时建议开启，切页更快
   * - false：页面/文件非常多时关闭，避免首屏加载过重
   */
  shouldPrefetch: true,

  /**
   * 主题：FileList（核心：定义多个“挂载点”）
   * 每个对象就是一个“文件列表入口”
   * - mountPath：这个入口出现在网站的哪个 URL 路径
   * - analysis ：这个入口的数据来源与解析方式（必填，二选一或多选其一）
   *      - githubReleasesFilesAnalysis：把 GitHub Releases 当做文件源
   *      - githubReposAnalysis：把 GitHub 仓库文件当做文件源
   *      - giteeReleasesFilesAnalysis / giteeReposAnalysis：同上但来自 Gitee
   *      - huggingFaceDatasetsAnalysis：来自 Hugging Face Datasets
   *      - fileUrlTreeAnalysis：手动维护 “路径 => 直链” 的小型文件树
   * - downProxy（可选）：下载代理，用于加速/解决跨域，因部署平台而异
   */
  theme: FileList([
    // ========= 示例 1：把某个 GitHub 仓库的 Releases 暴露在 /KnapsackToGo4下载 =========
    {
      // 访问路径，例如：https://你的域名/KnapsackToGo4下载
      mountPath: "/KnapsackToGo4下载",

      // 数据源：GitHub Releases
      analysis: githubReleasesFilesAnalysis({
        // 仓库拥有者（必改）
        user: "jianjianai",
        // 仓库名（必改）
        repository: "KnapsackToGo4",

        // GitHub Token（强烈建议配置，否则公开仓库受限、私有仓库不可读）
        // 在部署环境里设置环境变量 githubToken 即可
        authorizationToken: process.env.githubToken,

        // 每页拉取的 tag 数量；理解为“展示最近多少个版本”【可改】
        per_page: 10,
      }),
      // 没有 downProxy 也能用；如果你部署在国内/CDN，需要下载加速可往下看其它示例
    },

    // ========= 示例 2：站点根路径 / 显示另一个 Releases 列表，并启用 Cloudflare 代理 =========
    {
      mountPath: "/",
      analysis: githubReleasesFilesAnalysis({
        user: "jianjianai",
        repository: "FList",
        authorizationToken: process.env.githubToken,
      }),

      /**
       * 下载代理（可选但推荐）
       * - 作用：加速下载 + 解决浏览器跨域（PDF/TXT/MD 在线预览常见的 CORS 问题）
       * - 选择：根据你的“部署平台”选择对应代理；
       *   * Cloudflare Pages：用 cloudflarePagesDownProxy()
       *   * Vercel：用 vercelDownProxy()
       *   * Netlify：用 netlifyDownProxy()
       * - 注意：如果不是对应平台部署，请删掉这个选项，否则会 404 或跨域失败
       */
      downProxy: cloudflarePagesDownProxy(),
    },

    // ========= 示例 3：手工维护一个小型“文件树”（几条直链就能用） =========
    {
      // 也挂在根路径，和上一个共存：它们会合并显示在同一个入口中
      mountPath: "/",

      // 直接维护 “路径 => 文件直链”，适合放少量演示/置顶文件
      analysis: fileUrlTreeAnalysis({
        "/test2/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/文件树测试/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
        "/文件树-测试视频1.mp4":
          "https://github.com/jianjianai/FList/releases/download/root/test.video.2.1080p.webm",
      }),

      // 如果这些直链在你那边下载很慢，也可以配代理（按你的部署平台选择）
      downProxy: cloudflarePagesDownProxy(),
      // 其它平台示例：
      // downProxy: vercelDownProxy(),
      // downProxy: netlifyDownProxy(),
    },

    // ========= 示例 4：Hugging Face Datasets =========
    {
      mountPath: "/huggingface测试",
      analysis: huggingFaceDatasetsAnalysis({
        // 维护者/组织名、数据集名、分支与路径（根据实际修改）
        userName: "Open-Orca",
        datasetsName: "OpenOrca",
        branchName: "main",
        path: "/",

        // 解析子目录的最大层级；层级很深时可适当调小【可改】
        maxDeep: 3,
      }),
    },

    // ========= 示例 5：Gitee Releases =========
    {
      mountPath: "/gitee测试/发行版",
      analysis: giteeReleasesFilesAnalysis({
        user: "jja8",
        repository: "flist-test",
        // 排序方向：desc=新到旧，asc=旧到新【可改】
        direction: "desc",
      }),
    },

    // ========= 示例 6：读取 Gitee 仓库文件树 =========
    {
      mountPath: "/gitee测试/仓库",
      analysis: giteeReposAnalysis({
        user: "jja8",
        repository: "flist-test",
      }),
    },

    // ========= 示例 7：读取 GitHub 仓库文件树 + 代理 =========
    {
      mountPath: "/ProgrammingVTuberLogos",
      analysis: githubReposAnalysis({
        user: "Aikoyori",
        repository: "ProgrammingVTuberLogos",
        authorizationToken: process.env.githubToken, // 私有/受限仓库需要 Token
      }),
      downProxy: cloudflarePagesDownProxy(),
    },

    // 你可以继续在这里追加更多挂载点：
    // {
    //   mountPath: "/你的路径",
    //   analysis: githubReleasesFilesAnalysis({ user: "你", repository: "你的仓库", authorizationToken: process.env.githubToken }),
    //   downProxy: vercelDownProxy(), // 或 netlifyDownProxy() / cloudflarePagesDownProxy()
    // },
  ]),
})
