document.addEventListener('DOMContentLoaded', function () {
    const bookmarkNameInput = document.getElementById('bookmark-name');
    const bookmarkUrlInput = document.getElementById('bookmark-url');
    const addBookmarkButton = document.getElementById('add-bookmark');
    const bookmarksList = document.getElementById('bookmarks');
    const errorMessage = document.getElementById('error-message');

    function isValidUrl(url) {
        const pattern = new RegExp('^(https?:\\/\\/)', 'i');
        return pattern.test(url);
    }

    function saveBookmarks() {
        const bookmarks = [];
        document.querySelectorAll('#bookmarks li').forEach(bookmark => {
            bookmarks.push({
                name: bookmark.querySelector('a').innerText,
                url: bookmark.querySelector('a').href
            });
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function loadBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.forEach(bookmark => {
            addBookmark(bookmark.name, bookmark.url);
        });
    }

    function addBookmark(name, url) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.innerText = name;
        a.target = '_blank';
        li.appendChild(a);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            li.remove();
            saveBookmarks();
        });
        li.appendChild(deleteButton);
        bookmarksList.appendChild(li);
        saveBookmarks();
    }

    addBookmarkButton.addEventListener('click', function () {
        const name = bookmarkNameInput.value.trim();
        const url = bookmarkUrlInput.value.trim();
        if (name && isValidUrl(url)) {
            addBookmark(name, url);
            bookmarkNameInput.value = '';
            bookmarkUrlInput.value = '';
            errorMessage.innerText = '';
        } else {
            errorMessage.innerText = 'Por favor, insira uma URL válida que comece com http:// ou https://.';
        }
    });

    loadBookmarks();
});
