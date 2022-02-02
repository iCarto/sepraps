export function useCopyToClipboard() {
    let copytToClipBoard = textToCopy => {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textToCopy);
        } else {
            const el = document.createElement("textarea");
            el.value = textToCopy;
            document.body.appendChild(el);
            el.select();
            document.execCommand("copy");
            document.body.removeChild(el);
        }
    };

    return copytToClipBoard;
}
