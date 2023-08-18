let count=0;
let arr_slide=[
  "imgOU/Slide1.jpg",
  "imgOU/slide2.png",
  "imgOU/Slide3.jpg"
];
let arr_link=[
  "http://sdh.ou.edu.vn/news/view/836-tuyen-sinh-khoa-hoc-chung-chi-giang-day-anh-van-thieu-nhi---nam-2023---dot-1",
   "https://tuyensinh.ou.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2021",
   "http://vber.ou.edu.vn/"
];
$(document).ready(function(){
  $('#toggle').click(function () {
    $('.nav').slideToggle();
  })
})
function next(){
  count++;
  if(count==arr_slide.length) count=0;
  document.getElementById("hinh").src=arr_slide[count];
}
function prev(){
  count--;
  if(count<-0) count=arr_slide.length-1;
  document.getElementById("hinh").src=arr_slide[count];
}
function clickslide(){
  document.getElementById("lienkethinh").href=arr_link[count];
}
function nextanh(){
  document.getElementById("anhhoatdong").src=arr_hinh[count];
  document.getElementById("title_anhhoatdong").innerText=arr_title[count];
} 
setInterval("next()",4000);
