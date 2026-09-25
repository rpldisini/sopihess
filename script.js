// Total belanja
let totalBelanja = 0;

// Format angka menjadi Rupiah
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
}

// Ambil semua tombol produk
const tombolProduk = document.querySelectorAll(".card button");

// Ambil harga dari setiap produk
tombolProduk.forEach(function(button) {

    button.addEventListener("click", function() {

        // Mengambil harga dari <p>
        const card = button.parentElement;
        const hargaText = card.querySelector("p").innerText;

        // Menghilangkan "Rp" dan titik
        const harga = parseInt(
            hargaText.replace("Rp", "").replace(/\./g, "").trim()
        );

        // Menambahkan harga ke total
        totalBelanja += harga;

        // Menampilkan informasi transaksi
        tampilkanTransaksi();
    });

});


// Membuat bagian transaksi
function tampilkanTransaksi() {

    // Cek apakah transaksi sudah ada
    let transaksi = document.getElementById("transaksi");

    if (!transaksi) {

        transaksi = document.createElement("div");
        transaksi.id = "transaksi";
        transaksi.className = "transaksi";

        transaksi.innerHTML = `
            <h2>TRANSAKSI PEMBAYARAN</h2>

            <label>Total Belanja</label>
            <input 
                type="text" 
                id="total" 
                readonly
            >

            <label>Uang Masuk</label>
            <input 
                type="number" 
                id="uangMasuk"
                placeholder="Masukkan uang pembayaran"
            >

            <div class="hasil">
                <p>
                    <strong>Total:</strong>
                    <span id="totalText">Rp 0</span>
                </p>

                <p>
                    <strong>Uang Masuk:</strong>
                    <span id="uangText">Rp 0</span>
                </p>

                <p>
                    <strong>Kembalian:</strong>
                    <span id="kembalian">Rp 0</span>
                </p>
            </div>
        `;

        document.querySelector(".container")
            .insertAdjacentElement("afterend", transaksi);

        // Event ketika uang masuk diisi
        document
            .getElementById("uangMasuk")
            .addEventListener("input", hitungKembalian);
    }

    // Update total
    document.getElementById("total").value =
        formatRupiah(totalBelanja);

    document.getElementById("totalText").innerText =
        formatRupiah(totalBelanja);

    hitungKembalian();
}


// Menghitung kembalian
function hitungKembalian() {

    const uangInput = document.getElementById("uangMasuk");

    if (!uangInput) {
        return;
    }

    const uangMasuk = Number(uangInput.value) || 0;

    const kembalian = uangMasuk - totalBelanja;

    document.getElementById("uangText").innerText =
        formatRupiah(uangMasuk);

    const kembalianElement =
        document.getElementById("kembalian");

    if (kembalian >= 0) {

        kembalianElement.innerText =
            formatRupiah(kembalian);

        kembalianElement.style.color = "green";

    } else {

        kembalianElement.innerText =
            "Uang kurang " + formatRupiah(Math.abs(kembalian));

        kembalianElement.style.color = "red";
    }
}