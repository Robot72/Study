let outsideDiv = document.querySelector('.outside');
let insideDiv = document.querySelector('.inside');
let relatedTarget = '';
let target = '';

outsideDiv.addEventListener('mouseenter', (e) => {
    relatedTarget = e.relatedTarget.style.backgroundColor;
    target = e.target.style.backgroundColor;
    e.target.style.backgroundColor = 'red';
});

outsideDiv.addEventListener('mouseleave', (e) => {
    e.target.style.backgroundColor = target;
});
