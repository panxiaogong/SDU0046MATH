# MathBlog 站点骨架

这个项目现在分成两部分：

- `D:\MATHBLOG\WebCode`
  站点框架、模板、样式、前端脚本、Python 构建脚本都放在这里。
- `D:\MATHBLOG\PostCode`
  站点内容放在这里，文章和页面统一用 LaTeX 编写。

## 目录约定

```text
MATHBLOG/
├─ WebCode/
│  ├─ assets/
│  ├─ templates/
│  ├─ build.py
│  └─ config.yml
└─ PostCode/
   ├─ pages/
   ├─ posts/
   └─ assets/
```

## 如何构建

在 `D:\MATHBLOG` 下运行：

```powershell
python .\WebCode\build.py
```

构建结果会输出到：

```text
D:\MATHBLOG\WebCode\dist
```

如果你想本地预览：

```powershell
python .\WebCode\build.py --serve --port 8000
```

然后访问 `http://127.0.0.1:8000`。

## 内容写法

### 1. 页面与文章来源

- 首页：`PostCode/pages/home.tex`
- 普通页面：`PostCode/pages/*.tex`
- 文章：`PostCode/posts/**/*.tex`

### 2. 推荐元数据写法

在 `.tex` 文件最前面使用注释元数据：

```tex
% title: 文章标题
% slug: notes/my-first-post
% date: 2026-06-07
% summary: 一段简短摘要
% tags: LaTeX, 数学, 网站
```

### 3. 当前支持的 LaTeX 结构

- 标题：`\section`、`\subsection`、`\subsubsection`、`\paragraph`
- 列表：`itemize`、`enumerate`
- 公式：
  行内公式 `$...$`、`\(...\)`
  块级公式 `\[...\]`、`$$...$$`、`align`、`equation` 等常见环境
- 强调：`\textbf`、`\textit`、`\emph`、`\underline`、`\texttt`
- 链接：`\href{url}{text}`、`\url{url}`
- 引用环境：`quote`
- 说明块：`definition`、`theorem`、`lemma`、`corollary`、`proposition`、`example`、`remark`、`proof`
- 插图：`figure` + `\includegraphics` + `\caption`
- 代码块：`verbatim`
- 正文内目录：`\tableofcontents`

## 关于公式渲染

这个版本的链路是：

1. Python 脚本把 LaTeX 的文档结构转换成 HTML。
2. 页面里的数学公式由 MathJax 在浏览器端排版。

这样做的好处是：

- 你可以继续直接写 LaTeX。
- 数学公式显示效果稳定。
- 不再依赖旧站那套 Markdown 渲染流程。

## 图片资源

推荐把图片放在 `PostCode/assets/` 下，然后在 LaTeX 中这样引用：

```tex
\begin{figure}
\includegraphics[width=0.72\textwidth]{assets/sample-geometry.svg}
\caption{示意图}
\end{figure}
```

构建时会自动复制到站点输出目录。

## 注意

这不是完整 TeX 引擎级别的“全量 LaTeX 转 HTML”，而是一个面向数学博客/学术长文场景的、可维护的静态站点生成器。

如果你后面要支持更复杂的内容，比如：

- 自动编号引用 `\ref`
- 表格 `tabular`
- 定理统一编号体系
- BibTeX 参考文献

我们可以在这个骨架上继续扩展。
