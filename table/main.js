/**
 * MAIN
 * @returns {Promise<void>}
 */
async function main() {

    const mainContents = document.getElementById('main');
    const df = await makeDocumentFragment('main.md');
    mainContents.appendChild(df);

    hljs.highlightAll();
    mermaid.initialize({ securityLevel: 'loose', theme: 'neutral' });
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'));

}
main().catch(console.error);