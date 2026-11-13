
// Array of Object
let barang = [
    {id: 1, nama: "Buku", harga: 10000, stok: 5},
    {id: 2, nama: "Pensil", harga: 3000, stok: 5},
    {id: 3, nama: "Pulpen", harga: 5000, stok: 5},
    {id: 4, nama: "Tas", harga: 50000, stok: 3},
    {id: 5, nama: "Penghapus", harga: 2000, stok: 5},
    {id: 6, nama: "Penggaris", harga: 4000, stok: 5}
];

let keranjang = [];


function tampilProduk() {

    let tempat = document.getElementById("produk");
    tempat.replaceChildren();

    for (let i = 0; i < barang.length; i++) {

        let kotak = document.createElement("div");
        kotak.className = "produk";

        let nama = document.createTextNode(barang[i].nama);
        let harga = document.createTextNode(" - Rp" + barang[i].harga);
        let stok = document.createTextNode(" - Stok: " + barang[i].stok);

        let tombol = document.createElement("button");
        tombol.appendChild(document.createTextNode("Tambah"));

        tombol.onclick = function() {
            tambah(i);
        };

        kotak.appendChild(nama);
        kotak.appendChild(harga);
        kotak.appendChild(stok);
        kotak.appendChild(document.createElement("br"));
        kotak.appendChild(tombol);

        tempat.appendChild(kotak);
    }
}


// Menambahkan produk ke keranjang
function tambah(i) {

    if (barang[i].stok <= 0) {
        alert("Stok habis!");
        return;
    }

    barang[i].stok--;

    keranjang.push(barang[i]);

    $("#isi").append(
        "<p>" + barang[i].nama + " - Rp" + barang[i].harga +
        " <button class='hapus'>Hapus</button></p>"
    );

    hitung();
    tampilProduk();

    $("#keranjang").fadeIn();
}


// Menghitung jumlah dan total harga
function hitung() {

    let total = 0;

    for (let i = 0; i < keranjang.length; i++) {
        total += keranjang[i].harga;
    }

    $("#jumlah").text("Jumlah: " + keranjang.length);
    $("#total").text("Total: Rp" + total);
}


$(document).ready(function() {

    tampilProduk();


    // Menghapus item
    $("#isi").on("click", ".hapus", function() {

        if (confirm("Hapus produk ini?")) {

            let nama = $(this).parent().text().split(" - ")[0];

            let index = keranjang.findIndex(x => x.nama === nama);

            if (index !== -1) {
                keranjang[index].stok++;
                keranjang.splice(index, 1);
            }

            $(this).parent().fadeOut(300, function() {
                $(this).remove();
            });

            hitung();
            tampilProduk();
        }
    });


    // Mengosongkan keranjang
    $("#kosongkan").click(function() {

        if (confirm("Kosongkan keranjang?")) {

            for (let i = 0; i < keranjang.length; i++) {
                keranjang[i].stok++;
            }

            keranjang = [];

            $("#isi").empty();

            hitung();
            tampilProduk();
        }
    });


    // Membuka dan menutup keranjang
    $("#lihat").click(function() {
        $("#keranjang").fadeToggle();
    });


    // Checkout
    $("#checkout").click(function() {

        if (keranjang.length === 0) {
            alert("Keranjang kosong!");
            return;
        }

        let nama = prompt("Masukkan nama pembeli:");

        if (nama === null || nama.trim() === "") {
            return;
        }

        let daftar = "";

        for (let i = 0; i < keranjang.length; i++) {
            daftar += "<p>" + keranjang[i].nama + "</p>";
        }

        $("#hasil").html(
            "<h3>Ringkasan Pesanan</h3>" +
            "Nama: " + nama +
            daftar +
            $("#total").text()
        );
    });

});
