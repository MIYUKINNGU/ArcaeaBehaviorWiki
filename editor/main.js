function onLoad() {
    const mainContents = document.getElementById('main');
    
    const df = document.createDocumentFragment();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const content = urlParams.has('content') ? urlParams.get('content') : "";
    const text = base64ToText(content);
    const doc = document.createElement('div');

    marked.use({ renderer: { code: appendClass } });
    marked.setOptions({ breaks: true });
    doc.innerHTML = marked.parse(text);

    df.appendChild(doc);
    mainContents.appendChild(df);

    hljs.highlightAll();
    mermaid.initialize({ securityLevel: 'loose', theme: 'neutral' });
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'));
}

onLoad();