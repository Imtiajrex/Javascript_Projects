//read Json file
var read_json = function () {
  fetch("./image_info.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      show_image_data(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

read_json();

var image_data = [];
//Get Download History
var download_history = [];
if (localStorage.getItem("download_history") != null) {
  download_history = localStorage.getItem("download_history").split(",");
}
//Get Browse History
var browse_history = [];
if (localStorage.getItem("browse_history") != null) {
  browse_history = localStorage.getItem("browse_history").split(",");
}

//loop through the json data
var show_image_data = function (data) {
  //get image wrapper
  var image_wrapper = document.querySelector(".images-wrapper");
  //image element
  var image_elements = `
        <div class="image-body">
            <img class="img" src="" alt="Girrafe" />
        </div>
        <div class="image-footer">
            <a class="image-name">Girrafe In the Sky!</a>
        </div>
    `;

  image_data = Object.entries(data); //adding image
  image_data.forEach((element, index) => {
    var image = element[1]["image"];
    var name = element[1]["name"];
    //create image div
    var image_div = document.createElement("div");
    image_div.classList.add("image");
    //add image elements to image div
    image_div.innerHTML = image_elements;

    //select img tag to change image src
    var image_src = image_div.querySelector(".img");
    image_src.src = image;

    //select <a> tag to change image Name
    var image_text = image_div.querySelector(".image-name");
    image_text.innerHTML = name;
    image_wrapper.appendChild(image_div);
    image_div.onclick = function () {
      image_zoom_modal(image, index);
      addBrowseHistory(index); //add browse history
    };
  });
  //update download and browse history
  updateBrowseHistory();
  updateDownloadHistory();

  function image_zoom_modal(src, index) {
    var zoomed_image_modal = document.querySelector(".image-modal"); //select image modal
    zoomed_image_modal.style.transform = "scale(1)"; //show the modal
    var zoomed_image = document.querySelector(".zoomed-image"); //get zoomed image element
    zoomed_image.src = src; //change zoomed image src
    var download_btn = document.querySelector(".download-btn"); //get download button
    //download_btn.href = src;//add image link for downloading
    download_btn.removeEventListener("click", addDownloadHistory);
    download_btn.onclick = function () {
      addDownloadHistory(index); //add downloaded history
    };
  }
  //Add Download History
  function addDownloadHistory(id) {
    download_history.push(id);
    // Store
    localStorage.setItem("download_history", download_history.toString()); //save data on browser local storage
    updateDownloadHistory();
  }
  //Add Browse History
  function addBrowseHistory(id) {
    console.log(browse_history.includes(id));
    if (browse_history.indexOf(id) == -1) {
      browse_history.push(id);
    }
    localStorage.setItem("browse_history", browse_history.toString()); //save data on browser local storage
    updateBrowseHistory();
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    var zoomed_image_modal = document.querySelector(".image-modal");
    if (event.target == zoomed_image_modal) {
      zoomed_image_modal.style.transform = "scale(0)";
    }
  };

  function updateBrowseHistory() {
    var browse_wrapper = document.querySelector(".browse-wrapper");
    //image element
    var browse_elements = `
        <div class="browse-body">
            <img class="browse-img" src="" />
        </div>
    `;
    browse_wrapper.innerHTML = "";
    browse_history.forEach(function (element) {
      var browse = document.createElement("div");
      browse.classList.add("browse");
      browse.innerHTML = browse_elements;
      browse.querySelector(".browse-img").src = image_data[element][1]["image"];
      browse_wrapper.appendChild(browse);
    });
  }
  function updateDownloadHistory() {
    var download_wrapper = document.querySelector(".download-wrapper");
    //image element
    var download_elements = `
        <div class="download-body">
            <img class="download-img" src="" />
        </div>
    `;
    download_wrapper.innerHTML = "";
    download_history.forEach(function (element) {
      var download = document.createElement("div");
      download.classList.add("download");
      download.innerHTML = download_elements;
      download.querySelector(".download-img").src =
        image_data[element][1]["image"];
      download_wrapper.appendChild(download);
    });
  }
};
