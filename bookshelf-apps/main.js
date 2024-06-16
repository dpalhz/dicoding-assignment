const RENDER_EVENT = 'render-event';
let book = [];
let DONE_READ = false;
const STORAGE_KEY = 'BOOK_LIST';


// membuat id untuk setiap buku
function generateId() {
    return +new Date();
  }

// const SAVED_EVENT = 'saved-todo';
function checkForStorage() { //checking function, to check Storage is available
    return typeof (Storage) !== 'undefined';
  }

const inputBookIsComplete = document.getElementById('inputBookIsComplete');

inputBookIsComplete.addEventListener('click',function(){
    DONE_READ = true;
})

// document.addEventListener(SAVED_EVENT, () => {
//     console.log('Data berhasil di simpan.');
//   });

// Fungsi ini digunakan untuk memeriksa apakah localStorage didukung oleh browser atau tidak 
 function isStorageExist() /* boolean */ {
    if (typeof (Storage) === undefined) {
        alert('Browser kamu tidak mendukung local storage');
        return false;
    }
    return true;
    }
    
    /**
     * Fungsi ini digunakan untuk menyimpan data ke localStorage
     * berdasarkan KEY yang sudah ditetapkan sebelumnya.
     */
    function saveData() {
    if (isStorageExist()) {
        const parsed /* string */ = JSON.stringify(book);
        localStorage.setItem(STORAGE_KEY, parsed);
        // document.dispatchEvent(new Event(SAVED_EVENT));
    }
    }
    
    /**
     * Fungsi ini digunakan untuk memuat data dari localStorage
     * Dan memasukkan data hasil parsing ke variabel {@see todos}
     */
    function loadDataFromStorage() {
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);
    
    if (data !== null) {
        for (const bookItem of data) {
        book.push(bookItem);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT)); //--> membangkitkan custom event
    }

// funsgi untuk membuat objek buku dari data yang di inputkan
function submitEvent(){
    const judul = document.getElementById('inputBookTitle').value;
    const penulis = document.getElementById('inputBookAuthor').value;
    const tahun = document.getElementById('inputBookYear').value;
    const id = generateId();

    const newBook = {
        id: id,
        title: judul,
        author: penulis,
        year: tahun,
        isComplete: DONE_READ,
    };
    book.push(newBook);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}

// fungsi untuk menemukan buku yang cocok
function findBook(idBook) {
    for (const BookItem of book) {
      if (BookItem.id === idBook) {
        return BookItem;
      }
    }
    return null;
  }

// fungsi untuk mengembalikan nilai index pada array book (menyimpan data objek buku-buku)
function findBookIndex(idBook) {
for (const index in book) {
    if (book[index].id === idBook) {
    return index;
    }
}
return -1;
}

// fungsi untuk menambahkan buku kedaftar buku sudah dibaca
function addBookTolistBookisRead(idBook /* HTMLELement */) {
    const toTarget = findBook(idBook);
  
    if (toTarget == null) return;
  
    toTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
    
  }

// fungsi untuk menghapus data sebuah objek buku
function removeBookFromBookList(idBook /* HTMLELement */) {
    const toTarget = findBookIndex(idBook);

    if (toTarget === -1) return;

    book.splice(toTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

}

// fungsi untuk mengganti rak, dari buku sudah dibaca menjadi --> buku belum selesai dibaca
function undoBookFromListBookIsRead(idBook /* HTMLELement */) {
    const toTarget = findBook(idBook);
    if (toTarget == null) return;


    toTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();

}

// fungsi untuk membuat element html yang dibutuhkan
function makeBookList(obj){
    const {id,title,author,year,isComplete} = obj;

    const textTitle = document.createElement('h3');
    textTitle.innerText = title;

    const authorText = document.createElement('p');
    authorText.innerText = 'Penulis: ' + author;

    const yearText = document.createElement('p');
    yearText.innerText = 'Tahun: '+ year;

    const containerButton = document.createElement('div');
    containerButton.classList.add('action')

    const articleContainer = document.createElement('article');
    articleContainer.classList.add('book_item');
    articleContainer.appendChild(textTitle);
    articleContainer.appendChild(authorText);
    articleContainer.appendChild(yearText);
    articleContainer.appendChild(containerButton);

    if(isComplete){
        const button1 = document.createElement('button');
        button1.classList.add('green')
        button1.innerText = 'Belum selesai dibaca'
        button1.addEventListener('click',function(){
            undoBookFromListBookIsRead(id);
        })
        containerButton.appendChild(button1);
        
    }else{
        const button1 = document.createElement('button');
        button1.classList.add('green')
        button1.innerText = 'Selesai dibaca'
        button1.addEventListener('click', function(){
            addBookTolistBookisRead(id);
        })
        containerButton.appendChild(button1);
    }

    const removeButton = document.createElement('button');
    removeButton.classList.add('red');
    removeButton.innerText = 'Hapus buku'
    removeButton.addEventListener('click',function(){
        removeBookFromBookList(id);
    })

    const editButton = document.createElement('button');
    editButton.classList.add('yellow');
    editButton.setAttribute('id','editBuku');
    editButton.innerText = 'Edit Buku'
    editButton.addEventListener('click',function(){
        editBuku(id)
        const popUp = document.getElementById('edit');   
        popUp.classList.add('show');
    })
    containerButton.appendChild(removeButton);
    containerButton.appendChild(editButton);

    return articleContainer;
}

// event ketika reload terjadi
document.addEventListener('DOMContentLoaded', function () {

    if (isStorageExist()) {
        loadDataFromStorage();
      }
  });

// event untuk custom event
document.addEventListener(RENDER_EVENT, function () {
    const listBook = document.getElementById('incompleteBookshelfList');
    const listBookIsRead = document.getElementById('completeBookshelfList');
    
    // clearing list item
    listBook.innerHTML = '';
    listBookIsRead.innerHTML = '';

    for (const Abook of book){
        const readElement = makeBookList(Abook);
        if(Abook.isComplete){
            listBookIsRead.append(readElement);
        }else{
            listBook.append(readElement);
        }
    }
  })


// fungsi untuk fitur searchSubmit (mencari data buku berdasarkan nama)
// pada bagian ini, program di-set bersifat case-insensitive
function FindBookTitle(){
    const searchBookTitle = document.getElementById('searchBookTitle').value.toUpperCase();
    let cntr = false;

    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY); // mengambil data dari localStorage
    let dataBook = JSON.parse(serializedData);
    
    const newList = []
    if(searchBookTitle !==''){ // kondisi ketika title string kosong ('')
        for (const Abook of dataBook){
            let title = Abook.title.toUpperCase();
            const cnt = title.includes(searchBookTitle);
            if(cnt){
                newList.push(Abook);
                cntr = true;
            }
        }
        if(!cntr){
            alert('Buku tidak ditemukan!') // --> penambahan fitur kondisi jika buku tidak ditemukan,(input string (lengh>0))
        }
        book = newList;

    }else{
        book = dataBook;
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
}


// form event memasukan buku ke Rak
const searchSubmit = document.getElementById('searchBook');
searchSubmit.addEventListener('submit', function (event) {
    event.preventDefault();
    FindBookTitle()
  
});
// form event mencari buku
const submitForm = document.getElementById('inputBook');
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        submitEvent();
    });

// form event mencari buku
const editSubmit = document.getElementById('inputEditBook');
    editSubmit.addEventListener('submit', function (event) {
        event.preventDefault();
        editEvent();
        const popUp = document.getElementById('edit');   
        popUp.classList.remove('show');
    });

function getItemById(data, id) {
    var i, len;
    for (i = 0, len = data.length; i < len; i += 1) {
        if(id === data[i].id) {
            return data[i];
        }
    }

    return undefined;
}
    
// fungsi unutuk menghilangkan PopUp
const kembali = document.getElementById('kembali');
kembali.addEventListener('click',function(){
    const popUp = document.getElementById('edit');   
    popUp.classList.remove('show');
})



// popUp element taking
const editBookTitle = document.getElementById('editBookTitle');
const editBookAuthor = document.getElementById('editBookAuthor');
const editBookYear = document.getElementById('editBookYear');
const editBookIsComplete = document.getElementById('editBookIsComplete');
let idInfo = null;

function editBuku(id){
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY); // mengambil data dari localStorage
    let dataBook = JSON.parse(serializedData);

    for (buku of book){
        if(buku.id === id){
            idInfo = buku.id;
            editBookTitle.value = buku.title;
            editBookAuthor.value = buku.author;
            editBookYear.value = buku.year;
            if(buku.isComplete == true){
                editBookIsComplete.checked = true;
            }else{
                editBookIsComplete.checked = false;
            }

        }
    }
}

// fungsi untuk merubah isi DOM di localStorage
function editEvent(){
    const serializedData /* string */ = localStorage.getItem(STORAGE_KEY); // mengambil data dari localStorage
    let dataBook = JSON.parse(serializedData);

    for (buku of dataBook){
        if(buku.id == idInfo){
            buku.title = editBookTitle.value;
            buku.author = editBookAuthor.value;
            buku.year = editBookYear.value;
            buku.isComplete = editBookIsComplete.checked;
            alert("Info Buku berhasil diperbarui");
        }
    }
    book = dataBook;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
}
