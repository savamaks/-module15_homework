const button = document.querySelector('.button')
const buttonImgs = document.querySelectorAll('.img')


button.addEventListener('click',()=> {
    buttonImgs.forEach(img => {
        img.classList.toggle('active')
    });
    
})