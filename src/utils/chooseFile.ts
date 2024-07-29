import sleep from "./sleep";

const CLEANUP_DELAY = 1_000;
const AWAIT_DELAY = 1_000;

const waitForResume = () => new Promise<void>((res) => {
    const handler = () => {
        document.removeEventListener('mousemove', handler);
        document.removeEventListener('touchmove', handler);
        res();
    };
    sleep(AWAIT_DELAY).then(() => {
        document.addEventListener('mousemove', handler);
        document.addEventListener('touchmove', handler);
    });
});

/**
 * Opens a file chooser dialog and allows the user to select a file.
 *
 * @param [accept] - Optional file type filter. Can be a comma-separated list of MIME types or file extensions.
 * @returns A promise that resolves with the selected file or null if the selection was canceled.
 */
export const chooseFile = (accept?: string) => new Promise<File | null>((res) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file')
    input.style.display = "none";
    if (accept) {
        input.accept = accept;
    }
    document.body.appendChild(input);
    let isCanceled = true;
    input.onchange = () => {
        if (document.body.contains(input)) {
            document.body.removeChild(input);
        }
        isCanceled = false;
        const files = input.files;
        if (!files?.length) {
          return;
        }
        res(files[0])
        input.value = '';
    }
    waitForResume().then(() => {
        setTimeout(() => {
            if (isCanceled) {
                if (document.body.contains(input)) {
                    document.body.removeChild(input);
                }
                res(null);
            }
        }, CLEANUP_DELAY)
    });
    input.click();
});

export default chooseFile;
