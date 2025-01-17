// console.log('shohan');

// const fileInput = document.querySelector('.file-input'),
// filterOptions = document.querySelectorAll('.filter button');
// filterName = document.querySelector('.filter-info .name')
// filterSlider = document.querySelector('.slider input');
// filterValue = document.querySelector('.filter-info .value');
// previewImg = document.querySelector('.preview-img img');
// chooseImgBtn = document.querySelector('.choose-img');

// // show selected image
// // console.log(fileInput, chooseImgBtn); // Check if these are not null
// const loadImage=()=>{
//   let file = fileInput.files[0];
//   if(!file) return;
//   // console.log(file);
//   previewImg.src = URL.createObjectURL(file);
//   // previewImg.addEventListener('load', ()=>{
//   //   document.querySelector('.container').classList.remove('disable');
//   // });
// }
// // filter options
// filterOptions.forEach(option=>{
//   option.addEventListener('click', ()=>{
//     document.querySelector('.filter .active').classList.remove('active');
//     option.classList.add('active');
//     filterName.innerText =  option.innerText;
//   });
// });

// const updateFilter = () => {
//   console.log(filterSlider.value);
//   filterValue.innerText = `${filterSlider.value}%`;
// }


// fileInput.addEventListener('change', loadImage);
// filterSlider.addEventListener('input', updateFilter);
// chooseImgBtn.addEventListener('click', () => fileInput.click());


console.log('shohan');

const fileInput = document.querySelector('.file-input'),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector('.filter-info .name'),
filterSlider = document.querySelector('.slider input'),
// rotateOptions = document.querySelectorAll('rotate .options button');
filterValue = document.querySelector('.filter-info .value'),
previewImg = document.querySelector('.preview-img img'),
chooseImgBtn = document.querySelector('.choose-img');

console.log({
  fileInput,
  filterOptions,
  filterName,
  filterSlider,
  filterValue,
  previewImg,
  chooseImgBtn
});

let brightness = 100, saturation =100, inversion=0, grayscale=0;
let rotate = 0, flipHorizontal = 1, flipVertical =1;

 const applyFilters =() => {
  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
 }

// Show selected image
const loadImage = () => {
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener('load', () => {
    document.querySelector('.container').classList.remove('disable');
  });
};

// Filter options
filterOptions.forEach(option => {
  option.addEventListener('click', () => {
    document.querySelector('.filter .active').classList.remove('active');
    option.classList.add('active');
    filterName.innerText = option.innerText;

    if(option.id === 'brightness'){
      filterSlider.max ='200';
      filterSlider.value =brightness;
      filterValue.innerText = `${brightness}%`;
    } else if(option.id === 'saturation'){
      filterSlider.max ='200';
      filterSlider.value =saturation;
      filterValue.innerText = `${saturation}%`;
    }else if(option.id === 'inversion'){
      filterSlider.max ='100';
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else{
      filterSlider.max ='100';
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});


const updateFilter = () => {
  console.log(filterSlider.value);
  filterValue.innerText = `${filterSlider.value}%`;
  const selectedFilter = document.querySelector('.filter .active');
  if(selectedFilter.id === 'brightness'){
    brightness = filterSlider.value;
  } else if(selectedFilter.id === 'saturation'){
    saturation = filterSlider.value;
  }else if(selectedFilter.id === 'inversion'){
    inversion = filterSlider.value;
  }else{
    grayscale = filterSlider.value;
  }
  applyFilters();
};

// rotateOptions.forEach(option => {
//   option.addEventListener('click', ()=>{
//     console.log(option);
//   });
// });

function rotateOptions (element){
  // console.log(element);
  if(element.id === 'left'){
    rotate -=90;
  }else if(element.id === 'right'){
    rotate +=90;
  }else if(element.id === 'horizontal'){
    flipHorizontal = flipHorizontal===1? -1:1;
  }else{
    flipVertical = flipVertical===1? -1:1;
  }
  applyFilters();
}

const resetFilter=()=>{
  brightness=100; saturation=100; inversion=0; grayscale=0;
  rotate =0; flipHorizontal=1; flipVertical=1;
  applyFilters();
}

  const saveImg =() =>{
    console.log('saved');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;

    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`
    ctx.translate(canvas.width/2,canvas.height/2);
    if(rotate !==0){
      ctx.rotate(rotate*Math.PI/180);
    }
    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImg, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
    // document.body.appendChild(canvas);
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
  }

fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
// resetFilterButton.addEventListener('click', resetFilter);
chooseImgBtn.addEventListener('click', () => fileInput.click());


console.log('sohan');