document.addEventListener('DOMContentLoaded', function () {
    const bookmarkNameInput = document.getElementById('companyName');
    const bookmarkDescriptionInput = document.getElementById('description');
    const bookmarkUrlInput = document.getElementById('bookmarkURL');
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
                description: bookmark.querySelector('p').innerText,
                url: bookmark.querySelector('a').href,
                rating: bookmark.querySelector('.rating-container select') ? bookmark.querySelector('.rating-container select').value : ''
            });
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    function loadBookmarks() {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarks.forEach(bookmark => {
            addBookmark(bookmark.name, bookmark.description, bookmark.url, bookmark.rating);
        });
    }

    function addBookmark(name, description, url, rating = '') {
        const li = document.createElement('li');
        const a = document.createElement('a');
        const p = document.createElement('p');
        const ratingContainer = document.createElement('div');
        const checkbox = document.createElement('input');
        const label = document.createElement('label');
        const select = document.createElement('select');
        const actions = document.createElement('div');

        a.href = url;
        a.innerText = name;
        a.target = '_blank';
        p.innerText = description;

        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${name}`;
        label.innerText = 'Avaliado?';
        label.htmlFor = checkbox.id;

        ratingContainer.classList.add('rating-container');
        ratingContainer.appendChild(select);

        for (let i = 1; i <= 5; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.innerText = i;
            if (i == rating) {
                option.selected = true;
            }
            select.appendChild(option);
        }

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                ratingContainer.style.display = 'block';
            } else {
                ratingContainer.style.display = 'none';
            }
        });

        actions.classList.add('actions');
        actions.appendChild(checkbox);
        actions.appendChild(label);
        actions.appendChild(ratingContainer);

        li.appendChild(a);
        li.appendChild(p);
        li.appendChild(actions);

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Excluir';
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
        const description = bookmarkDescriptionInput.value.trim();
        const url = bookmarkUrlInput.value.trim();
        if (name && description && isValidUrl(url)) {
            addBookmark(name, description, url);
            bookmarkNameInput.value = '';
            bookmarkDescriptionInput.value = '';
            bookmarkUrlInput.value = '';
            errorMessage.innerText = '';
        } else {
            errorMessage.innerText = 'Por favor, insira uma URL válida que comece com http:// ou https://.';
        }
    });

    loadBookmarks();
});
