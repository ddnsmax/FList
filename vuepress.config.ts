import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress'

import { FileList } from './src/node/index.js'
import { fileUrlTreeAnalysis } from './src/node/analysis/fileUrlTreeAnalysis/index.js'
import { cloudflarePagesDownProxy } from './src/node/proxy/cloudflarePagesDownProxy/index.js'

/**
 * 统一用到的直链与“显示用元数据”
 * - size: 文件大小（字节）。未知就用 null（页面会显示“-”）
 * - mtime: 修改时间（ISO8601；例：2025-08-07T19:16:51+08:00）
 */
const isoUrl =
  'https://github.com/ddnsmax/cloud/releases/download/1.0/ubuntu-22.04.5-live-server-amd64.iso'
const commonMeta = {
  size: null, // 不知道大小时留 null，界面显示 “-”
  mtime: '2025-08-07T19:16:51+08:00', // 你可以改成文件真实时间
}

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
    {
      mountPath: '/',
      analysis: fileUrlTreeAnalysis({
        /**
         * 目录使用说明（以后照着追加）：
         * - 每个一级目录（如下 10 个）下都建议再建一个二级“测试文件夹/”
         * - 每个条目都可以写成 { url, size, mtime } 的对象：
         *      url  : 直链
         *      size : 字节（未知就用 null；前端显示“-”）
         *      mtime: ISO8601 时间字符串，页面会格式化显示为“修改时间”
         */

        // ===== 图片（图片类资源）=================================================
        '/图片/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/图片/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== 视频（视频类资源）=================================================
        '/视频/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/视频/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== 微信（与微信相关的资源/脚本/备份）=================================
        '/微信/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/微信/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== 游戏（游戏客户端/补丁/整合包等）===================================
        '/游戏/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/游戏/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== ipa软件（iOS 应用安装包 .ipa）====================================
        '/ipa软件/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/ipa软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== ipa插件（iOS 插件/越狱插件/描述文件等）=============================
        '/ipa插件/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/ipa插件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== 源码（源代码/脚本/工程压缩包等）===================================
        '/源码/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/源码/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== 安卓软件（Android apk/镜像/工具）=================================
        '/安卓软件/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/安卓软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== Mac软件（macOS dmg/pkg/app 压缩包等）==============================
        '/Mac软件/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/Mac软件/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },

        // ===== windows（Windows exe/msi/zip/iso 等）==============================
        '/windows/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
        '/windows/测试文件夹/ubuntu-22.04.5-live-server-amd64.iso': {
          url: isoUrl,
          ...commonMeta,
        },
      }),

      // 仅在你部署在 Cloudflare Pages 且需要 PDF/TXT 预览跨域/加速时保留；
      // 不是 CF Pages 就删掉以免 404
      downProxy: cloudflarePagesDownProxy(),
    },
  ]),
})
