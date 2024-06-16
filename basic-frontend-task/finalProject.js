// nav bar
const toggle = document.querySelector('.togle input');
const nav = document.querySelector('nav ul');

// event to show slide list of nav
toggle.addEventListener('click', function(){
    nav.classList.toggle('slide');
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener(
    "click", () => {
        nav.classList.remove('slide')
    }
))

// skill

function lstskill(x){
    document.getElementById('list-skill').innerHTML = x;
}

function addexp(x){
    document.getElementById('exp').innerHTML = x;
}
const expr = { // text to inform the experience of mine
    python : "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>"+
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>",

    java : "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>"+
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>",

    html : "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>"+
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>",

    css : "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p><p>Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>"+
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>",

    js : "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>"+
    "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>",

    english : "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas voluptatem eos deserunt, temporibus repudiandae, sunt corrupti dolor natus quis est, explicabo harum vero. Eligendi, delectus dolor! Repudiandae possimus nulla alias?</p>",

}
// just for a title popup information
const skill = {
    python : "Python Experience",
    java : "Java Experience",
    html : "HTML Experience",
    css : "CSS Experience",
    js : "JavaScript Experience",
    english : "English Experience"
};

// making variable with const
const more = document.getElementById('one')
const popUpCnt = document.getElementById('modal_cont');
const close = document.getElementById('close');

let  = "";

const btnskill = document.querySelectorAll(".button");

//make event to all button on skill information
btnskill.forEach(n => n.addEventListener(
    "click", () => {
        if (n.classList.contains("button-one")){
            addexp(expr.python);
            lstskill(skill.python);
        }else if (n.classList.contains("button-two")){
            addexp(expr.java);
            lstskill(skill.java);
        }else if (n.classList.contains("button-three")){
            addexp(expr.html);
            lstskill(skill.html);
        }else if (n.classList.contains("button-four")){
            addexp(expr.css);
            lstskill(skill.css);
        }else if (n.classList.contains("button-five")){
            addexp(expr.js);
            lstskill(skill.js);
        }else if (n.classList.contains("button-six")){
            addexp(expr.english);
            lstskill(skill.english);
        }
        popUpCnt.classList.add('show');
    }
))
// event for condition without class 'show' (with remove class "show")
close.addEventListener('click',() =>{
    popUpCnt.classList.remove('show');

});