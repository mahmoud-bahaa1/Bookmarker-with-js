let bookmarkNameInput = document.getElementById('bookmarkName');
let bookmarkLinkInput = document.getElementById('bookmarkLink');

let siteList ;

if(localStorage.getItem("siteData")!==null){
  siteList = JSON.parse(localStorage.getItem("siteData")) 
  display();
}
 
else(
siteList = []
)


function addSite() {
    if(nameValid() && linkValid() ){
        var site = {
            name: bookmarkNameInput.value,
            link: bookmarkLinkInput.value,
        };
        siteList.push(site);
        localStorage.setItem( "siteData",JSON.stringify(siteList) )
        display();
        clrForm();
    }
   
}

function clrForm() {
    bookmarkNameInput.value = null;
    bookmarkLinkInput.value = null;
}

function display() {
    var cartona = '';

    for (let i = 0; i < siteList.length; i++) {
        cartona += `
              <tr>
          <td>${i}</td>
          <td>${siteList[i].name}</td>              
          <td class="">
            <button class="btn btn-success"  onclick="window.location.href='${siteList[i].link}'" data-index="0">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </td>
          <td>
            <button class="btn btn-danger ms-5" onclick="deleteSite(${i})" data-index="0">
              <i class="fa-solid fa-trash-can"></i>
              Delete
            </button>
          </td>
      </tr>
        `;
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

function deleteSite(index){
siteList.splice(index , 1 )
display();
localStorage.setItem( "siteData",JSON.stringify(siteList) )
}

function nameValid() {
    var nameRegex = /^[a-zA-Z]{2,15}$/; 
    var nameInput = bookmarkNameInput.value;
    if (nameRegex.test(nameInput)) {
        bookmarkNameInput.classList.add("is-valid");
        bookmarkNameInput.classList.remove("is-invalid");
        return true;
    } else {
        bookmarkNameInput.classList.add("is-invalid");
        bookmarkNameInput.classList.remove("is-valid");
        return false;
    }
}
function linkValid(){
    var linkRegex = /^(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=/?]*)$/; // Correct regex
    var linkInput = bookmarkLinkInput.value;
    if (linkRegex.test(linkInput)) {
        bookmarkLinkInput.classList.add("is-valid");
        bookmarkLinkInput.classList.remove("is-invalid");
        return true;
    } else {
        bookmarkLinkInput.classList.add("is-invalid");
        bookmarkLinkInput.classList.remove("is-valid");
        return false;
    }
}