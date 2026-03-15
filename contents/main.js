/**
 * MAIN
 * @returns {Promise<void>}
 */
async function main() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (!urlParams.has('id')) {
        window.location.href = '/ArcaeaBehaviorWiki/';
    }

    const id = urlParams.get('id');

    if (id.includes("../")) window.location.href = '/ArcaeaBehaviorWiki/';

    fetch("./"+id+".md", { method: 'HEAD' })
        .then(async response => {
            if (response.ok) {
                await parseContent("./"+id+".md");
            } else if (response.status === 404) {
                window.location.href = '/ArcaeaBehaviorWiki/';
            }
        })
        .catch(error => {
            window.location.href = '/ArcaeaBehaviorWiki/';
        });
}
main().catch(console.error);

async function parseContent(filename) {
    const mainContents = document.getElementById('main');
    const df = await makeDocumentFragment(filename);
    mainContents.appendChild(df);

    hljs.highlightAll();
    mermaid.initialize({ securityLevel: 'loose', theme: 'neutral' });
    mermaid.init(undefined, document.getElementsByClassName('language-mermaid'));
}