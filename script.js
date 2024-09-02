var tombolMenu = document.getElementsByClassName('tombol-menu')[0];
var menu = document.getElementsByClassName('menu')[0];

tombolMenu.onclick = function() {
    menu.classList.toggle('active');
}

menu.onclick = function() {
    menu.classList.toggle('active');
}

function toggleMenu(menuId) {
    var content = document.getElementById(menuId);
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
    } else {
        content.style.display = "none";
    }
}

// Fungsi untuk membuat elemen salju
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');

    // Ukuran salju secara acak
    const size = Math.random() * 10 + 5; 
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;

    // Posisi horizontal acak
    snowflake.style.left = `${Math.random() * window.innerWidth}px`;

    // Durasi animasi acak
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Durasi antara 2s dan 5s

    // Tambahkan salju ke elemen dengan class "snow"
    document.querySelector('.snow').appendChild(snowflake);

    // Hapus salju setelah animasinya selesai
    setTimeout(() => {
        snowflake.remove();
    }, 5000); // 5000ms = 5s
}

// Membuat salju baru setiap 100ms
setInterval(createSnowflake, 100);
