import { viteBundler } from '@vuepress/bundler-vite' 
import { defineUserConfig } from 'vuepress'

import { FileList } from './src/node/index.js'
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js"
import { cloudflarePagesDownProxy } from "./src/node/proxy/cloudflarePagesDownProxy/index.js"

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
      mountPath: "/",
      analysis: fileUrlTreeAnalysis({
        // 统一结构：每个一级目录下，仅有一个二级目录“测试文件夹”，里面只放同一文件
        "/图片/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/视频/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/微信/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/游戏/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/ipa软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/ipa插件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/源码/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/安卓软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/Mac软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
        "/windows/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso":
          "https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso",
      }),
      // 仅在 Cloudflare Pages 部署且需要跨域/加速时保留
      downProxy: cloudflarePagesDownProxy(),
    },
  ])
})
