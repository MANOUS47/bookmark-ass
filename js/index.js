var siteName = document.getElementById("bookmarkName");
var urlName = document.getElementById("bookmarkUrl");
var btnSubmit = document.getElementById("btnSubmit");
var AllBookmark = [];

if (localStorage.getItem("bookMarkValue") != null) {
  AllBookmark = JSON.parse(localStorage.getItem("bookMarkValue"));
  display(AllBookmark);
}

btnSubmit.addEventListener("click", function () {
  
  var urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  var urlRegexWWW = /^www\.[^\s/$.?#].[^\s]*$/i;

  var userUrl = urlName.value;
  if (urlRegexWWW.test(userUrl)) {
    userUrl = "http://" + userUrl;
  }

  if (urlRegex.test(userUrl)) {
    var siteNameRegex = /^[a-zA-Z ]+$/;
    if (siteNameRegex.test(siteName.value)) {
      var submit = {
        bookMarkName: siteName.value,
        bookMarkUrl: userUrl,
        id: Math.random() * 1000,
      };

      AllBookmark.push(submit);
      localStorage.setItem("bookMarkValue", JSON.stringify(AllBookmark));
      display(AllBookmark);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong.... Please enter valid data! ",
        
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong.... Please enter valid data! ",
     
    });
  }
});

function display(data) {
  var cartona = ``;

  for (var i = 0; i < data.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].bookMarkName}</td>
        <td>
          <a href="${data[i].bookMarkUrl}" target="_blank">
            <button class="btn btn-success btn-visit">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </a>
        </td>
        <td>
          <button class="btn btn-danger btn-delete pe-2" onclick="deleteData(${i})">
            <i class="fa-solid fa-trash-can"></i> Delete
          </button>
        </td>
      </tr>
    `;
  }
  document.getElementById("tableContent").innerHTML = cartona;
}

function deleteData(index) {
  AllBookmark.splice(index, 1);
  localStorage.setItem("bookMarkValue", JSON.stringify(AllBookmark));
  display(AllBookmark);
}
