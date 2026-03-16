let base64text = "";
let noescapebs64text = "";
let flag = false;
document.getElementById("editor").addEventListener('input', (e) => {
    base64text = textToBase64(e.target.value);
    noescapebs64text = btoa(unescape(encodeURIComponent(e.target.value)))
    flag = true;
});

window.setInterval(() => {
    if (flag) {
        document.getElementById('preview').contentDocument.location.replace('./preview.html?content='+base64text);
        flag = false
    }
}, 1000);

document.getElementById('download').addEventListener('click', () => {
    const output = document.getElementById('editor').value;
    const filename = document.getElementById("fileName").value;
    if (filename) {
        downloadAsFile(output, filename+".md");
    } else {
        downloadAsFile(output, "download.md");
    }
});

function downloadAsFile(text, filename) {
    const blob = new Blob([text], { type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}