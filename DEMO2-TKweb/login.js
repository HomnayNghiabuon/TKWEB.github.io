var mssv=document.querySelector('#mssv');
var pas=document.querySelector('#pas');
var showerror= document.querySelector('#showerror');
var data_login;
var intToRoman = function(num) {
    const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
    const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
    const hrns = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
    const ths = ["", "M", "MM", "MMM"];
    return ths[Math.floor(num / 1000)] + hrns[Math.floor((num % 1000) / 100)] + tens[Math.floor((num % 100) / 10)] + ones[num % 10];
};
fetch('./data.json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        data_login=data;
    });

function check(){
    let x=0;
    for(let Obj of data_login){
        localStorage.foo=null;
        if(Obj.mssv===mssv.value) {
            if(Obj.pas===pas.value) {
                localStorage.foo = x;
                window.location.href="./home.html";
                return;
            }
            else {
                showerror.innerHTML="Mật khẩu không chính xác !!!";
                return;
            }
        } 
        x++;
    }
    showerror.innerHTML="Không tìm thấy thông tin tài khoản sinh viên !!!";
}

let score = function(x,y,fx){
    if(x===0) return '';
    else if(y!==null) {
        if(fx>=0) return y.toFixed(fx);
        else return y;
    }
    else {
        KQ='X';
        return 'V';
    }
}
function subprint(i){
    let ARR=data_login[localStorage.foo].diem[i];
    let STT=1;
    let DTB=0, TTC=0;
    let TK_4, TK_C, KQ='&#x2713';
    for(let a of ARR){
        let h='';
        let TK_10=Math.round((a.QT+a.Diem_thi)/2 * 10) / 10;
        if(a.STC!==0){
            if(a.QT===null||a.Diem_thi===null){
                TK_10=0;
                TC_C='F';
                KQ='X';
            }
        }
        if(TK_10<4.0) {
            TK_4=0.0;
            TK_C='F';
            KQ='X';
        }
        else if(TK_10<5.0) {
            TK_4=1.0;
            TK_C="D";
        }
        else if(TK_10<5.5) {
            TK_4=1.5;
            TK_C="D+";
        }
        else if(TK_10<6.5) {
            TK_4=2.0;
            TK_C="C";
        }
        else if(TK_10<7.0) {
            TK_4=2.5;
            TK_C="C+";
        }
        else if(TK_10<8.0) {
            TK_4=3.0;
            TK_C="B";
        }
        else if(TK_10<8.5) {
            TK_4=3.5;
            TK_C="B+";
        }
        else {
            TK_4=4.0;
            TK_C="A";
        }
        h=`
        <tr>
        <td>
            <p>${STT}</p>
        </td>
        <td>
            <p>${a.Ma_MH}</p>
        </td>
        <td>
            <p>${a.Nhom}</p>
        </td>
        <td>
            <p>${a.MH}</p>
        </td>
        <td>
            <p>${a.STC}</p>
        </td>
        <td>
            <p>${score(a.STC,a.QT,1)}</p>
        </td>
        <td>
            <p>${score(a.STC,a.Diem_thi,1)}</p>
        </td>
        <td>
            <p>${score(a.STC,TK_10,2)}</p>
        </td>
        <td>
            <p>${score(a.STC,TK_4,2)}</p>
        </td>
        <td>
            <p>${score(a.STC,TK_C,-1)}</p>
        </td>
        <td>
            <p>${a.STC!==0?KQ:""}</p>
        </td>
        `
        let e=document.getElementById(`bangdiem${String(i+1)}`);
        if(e!==null) e.innerHTML+=h;
        STT++;
        DTB+=TK_4*a.STC;
        TTC+=a.STC;
    }     
    let e=document.getElementById(`TC${String(i+1)}`);
    if(e!==null) e.innerHTML=`
        <p>Điểm trung bình học kì: ${(DTB/TTC).toFixed(2)}</p>
        <p>Số tín chỉ đạt học kì: ${TTC}</p>
    `;
}
function print(){
    let n=data_login[localStorage.foo].diem.length - 1;
    for(let i=n;i>=0;i--){
        let q=document.getElementById('main_cont');
        if(q!==null){
            q.innerHTML+=
            `
            <p id="HK${String(i+1)}" class="HK">Học kì ${intToRoman(i+1)}</p>
                        <table id="bangdiem${String(i+1)}">
                        <tr class="first-tr">
                        <td>
                            <p>Stt</p>
                        </td>
                        <td>
                            <p>Mã MH</p>
                        </td>
                        <td>
                            <p>Nhóm/tổ môn học</p>
                        </td>
                        <td>
                            <p>Tên môn học</p>
                        </td>
                        <td>
                            <p>Số tín chỉ</p>
                        </td>
                        <td>
                            <p>Quá trình</p>
                        </td>
                        <td>
                            <p>Điểm thi</p>
                        </td>
                        <td>
                            <p>Điểm TK (10)</p>
                        </td>
                        <td>
                            <p>Điểm TK (4)</p>
                        </td>
                        <td>
                            <p>Điểm TK (C)</p>
                        </td>
                        <td>
                            <p>KQ</p>
                        </td>
                    </tr>
                    </tr>
                        </table>
                        <div id="TC${String(i+1)}"></div>
                        <hr>
            `;
        }
        subprint(i);
    }
}
function diem(){
    setTimeout(function(){
    print();
   },50)
}
function subPrf(){
    let Obj = data_login[localStorage.foo];
    let prf_id=document.querySelector('#prf_id');
    let h='';
        h=
        `
                        <div class="thongtintaikhoan">
                            <ul class="list-group">
                                <li class="list-group-item"><span>Tài khoản: <b>${Obj.mssv}</b></span></li>
                                <li class="list-group-item"><span>Họ tên: <b>${Obj.name}</b></span></li>
                                <li class="list-group-item"><span>Email: <b>${Obj.email}</b></span></li>
                            </ul>
                        </div>
                        <div class="media">
                            <h5>Thông tin sinh viên</h5>
                            <div class="media-content">
                                <img src="${Obj.portrait}" alt="mainIcon">
                                <ul class="list-group">
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="infomation"><span>Mã SV: <b>${Obj.mssv}</b></span></div>
                                            <div class="infomation"><span>Họ tên: <b>${Obj.name}</b></span></div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="infomation"><span>Ngày sinh: <b>${Obj.dob}</b></span></div>
                                            <div class="infomation"><span>Giới tính: <b>${Obj.sx?"Nam":"Nữ"}</b></span></div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="infomation"><span>Lớp: <b>${Obj.class}</b></span></div>
                                            <div class="infomation"><span>Ngành: <b>${Obj.maj}</b></span></div>
                                        </div>
                                    </li>
                                    <li class="list-group-item">
                                        <div class="row">
                                            <div class="infomation"><span>Hệ đào tạo: <b>${Obj.ts}</b></span></div>
                                            <div class="infomation"><span>Nơi sinh: <b>${Obj.pob}</b></span></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
        `
    if(prf_id!==null){
        prf_id.innerHTML+=h;
    }
}
function prf(){
    setTimeout(function(){
        subPrf();
    },50)
}
function logout(){
    localStorage.foo=null;
    window.location.href="./index.html";
}
