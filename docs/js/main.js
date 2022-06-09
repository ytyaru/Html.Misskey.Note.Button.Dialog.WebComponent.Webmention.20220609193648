window.addEventListener('DOMContentLoaded', async (event) => {
    console.debug('DOMContentLoaded!!');
    try {
        window.mpurse.updateEmitter.removeAllListeners()
          .on('stateChanged', isUnlocked => console.log(isUnlocked))
          .on('addressChanged', address => console.log(address));
    } catch(e) { console.error(e) }
    document.querySelector(`toot-dialog`).addEventListener('toot', async(event) => {
        console.debug('トゥートしました！webmentionしましたが受信リクエストせずともトゥートJSONから作成して表示します。', event.detail);
        const html = new Comment().mastodonResToComment(event.detail.json)
        const comment = document.querySelector(`mention-section`).shadowRoot.querySelector(`#web-mention-comment`)
        comment.innerHTML = html + comment.innerHTML
    });
    document.querySelector(`misskey-note-dialog`).addEventListener('note', async(event) => {
        console.debug('note event: ノートしました！', event.detail);
        const html = new Comment().mastodonResToComment(event.detail.json.createdNote, event.detail.domain)
        const comment = document.querySelector(`mention-section`).shadowRoot.querySelector(`#web-mention-comment`)
        comment.innerHTML = html + comment.innerHTML
    });
});
window.addEventListener('beforeunload', (event) => {
    console.debug('beforeunload!!');
});

