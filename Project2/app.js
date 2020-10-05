//get color picker
let color_picker1 = document.getElementById("1st_color")
let color_picker2 = document.getElementById("2nd_color")
//get bg wrapper
bg_wrapper = document.querySelector(".wrapper")

//Two color Variables
let color1 = "#85FFBD";
let color2 = "#FFFB7D"
//color picker 1 on change function
color_picker1.onchange = (event)=>{
    color1 = event.target.value;
    updateColor();
}

//color picker 2 on change function
color_picker2.onchange = (event)=>{
    color2 = event.target.value
    updateColor();
}

//color names get
let color_name1 = document.querySelector(".color_name1")
let color_name2 = document.querySelector(".color_name2")

let updateColor = ()=>{
    bg_wrapper.style.backgroundColor = color1;
    bg_wrapper.style.backgroundImage = "linear-gradient(90deg, "+color1+","+color2+")"

    color_name1.innerHTML = color1;
    color_name2.innerHTML = color2;
}