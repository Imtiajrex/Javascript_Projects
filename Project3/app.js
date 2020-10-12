window.onload = ()=> {getAllImageData()};

const image_name = [];
let all_card_div = document.querySelectorAll(".card");
let getAllImageData = ()=>{
    all_card_div.forEach(element=>{
        image_name.push(element.textContent)
    })
}

let search_bar = document.querySelector(".search")
search_bar.onkeyup = e=>{
    let text = e.target.value
    image_name.forEach((element,index)=>{
        if(element.toUpperCase().includes(text.toUpperCase())){
            all_card_div[index].style.width = "200px"
            all_card_div[index].style.opacity = "1"
        }
        else{
            all_card_div[index].style.width = "0px"
            all_card_div[index].style.opacity = "0"
        }
    })
};