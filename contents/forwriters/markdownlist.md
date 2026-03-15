# このサイトで使えるMarkdown記法の簡易一覧
###### Author: [MIYUKINNGU](https://x.com/Scr_MIYUKINNGU2)

## そもそもの話
Markdownへの変換はMarked.jsを使用しています。
そのため全てMarked.jsの仕様に従います。
(Markdown 1.0, CommonMark 0.31, GitHub Flavored Markdown 0.29の仕様)
が、MathJaxを導入しているのでLaTeXも記述可能です。

## 見出し
```markdown
# a
## a
### a
#### a
##### a
###### a
```
※H6まで可能です
## 強調
```markdown
**BOLD**
```
## 斜体
```markdown
*ITALIC*
```
## 下線
```markdown
__UNDERLINE__
```
## 消し線
```markdown
~~DELETE~~
```
## ハイパーリンク
```markdown
[テキスト](リンク)
```
## 画像
```markdown
![画像タイトル](画像へのリンク)
```
※このサイトのデータ等のアップロードはすべて`/ArcaeaBehaviorWiki/contents/記事名/assets/`下に配置されます。
## コードスパン
```markdown
`code`
あるいは
``code``
```
## コードブロック
    ```
    code
    ```
## 数式(ブロック)
```
$$
数式
$$
```
## 数式(インライン)
```
$数式$
```
## 水平線
```markdown
text

---

text
```
(空行を前後に入れる必要があります)
## 引用
```markdown
> text
```
## テーブル
```markdown
| a | b | c |
|:--|:-:|--:|
| A | B | C |
| D | E | F |
```
※各列が:--で左揃え、:-:で中央ぞろえ、--:で右揃えになります。
## リスト
### 連番あり
```markdown
1. a
2. b
3. c
```
### 連番なし
```markdown
* a
* b
* c
```
## エスケープ
Markdownとして変換されてしまうコードを`\`で阻止できます。
```markdown
\# test
```
## 折り畳み
```markdown
&lt;details&gt;&lt;summary&gt;hoge&lt;/summary&gt;

test
&lt;/details&gt;
```

## 最後に
他にも様々な仕様がありますが、それについては下記3つの仕様を参照してください
- Markdown 1.0
- CommonMark 0.31
- GitHub Flavored Markdown 0.29

また、mermaidを使用した図の挿入も可能です。