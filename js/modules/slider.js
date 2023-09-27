function slider({conteiner, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
    //slider

    const sliderBtnPrev = document.querySelector(prevArrow),
          sliderBtnNext = document.querySelector(nextArrow),
          sliderCounter = document.querySelector(totalCounter),
          slider = document.querySelector(conteiner),
          slides = document.querySelectorAll(slide),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width,
          dots = [];

    let current = 0,
        offset = 0; 

    sliderCounter.textContent = showCurrentValue(current);
    
    slidesField.style.width = 100 * slides.length + "%";
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(item => {
        item.style.width = width;
    })

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
    `;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
        box-sizing: content-box;
        flex: 0 1 auto;
        width: 30px;
        height: 6px;
        margin-right: 3px;
        margin-left: 3px;
        cursor: pointer;
        background-color: #fff;
        background-clip: padding-box;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        opacity: .5;
        transition: opacity .6s ease;
        `;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        dots.push(dot);
        indicators.append(dot)
    }

    function onlyNumbers(str){
        return +str.replace(/\D/g, '');
    }

    sliderBtnNext.addEventListener('click', () => {
        if(offset == onlyNumbers(width) * (slides.length - 1)){
            offset = 0;
            current = 0;
        } else {
            offset += onlyNumbers(width);
            current++;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        sliderCounter.textContent = showCurrentValue(current);

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[current].style.opacity = 1;
    });

    sliderBtnPrev.addEventListener('click', () => {
        if(offset == 0){
            offset = onlyNumbers(width) * (slides.length - 1);
            current = slides.length - 1;
        } else {
            offset -= onlyNumbers(width);
            current--;
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        sliderCounter.textContent = showCurrentValue(current);

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[current].style.opacity = 1;
    });

    function showCurrentValue(value){
        if (value < 9){
            return '0' + (value + 1);
        } else {
            return (value + 1);
        }
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            current = slideTo - 1;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            
            slidesField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '.5');
            dots[current].style.opacity = 1;

            sliderCounter.textContent = showCurrentValue(current);
        })
    })
}

export default slider;