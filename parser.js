/**
 * メインコンテンツの DocumentFragment を生成
 * @param filename ファイル名
 * @returns {Promise<DocumentFragment>}
 */
async function makeDocumentFragment(filename) {

    const df = document.createDocumentFragment();
    const text = await importTextFile(filename);
    const doc = document.createElement('div');

    marked.use({ renderer: { code: appendClass } });
    marked.setOptions({ breaks: true });
    doc.innerHTML = marked.parse(text);

    df.appendChild(doc);
    return df;

}

/**
 * テキストファイルをインポート
 * @param filename ファイル名
 * @returns {Promise<string>} テキスト
 */
async function importTextFile(filename) {

    const file = await fetch(filename);
    return await file.text();

}

/**
 * コードエリアへ Class を追加
 * @param code コードの種類
 * @returns {string} 変換後の HTML
 */
function appendClass(code) {

    if (code.lang === 'mermaid' || code.lang === 'Mermaid') {
        return '<pre class="language-mermaid no-highlight">' + code.text + '</pre>';
    } else if (code.lang === undefined || code.lang === "") {
        return '<pre><code class="no-highlight">' + code.text + '</code></pre>';
    } else {
        return '<pre><code class="language-' + code.lang + '">' + code.text + '</code></pre>';
    }

}