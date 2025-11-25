// Tab Navigation
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Format number dengan pemisah ribuan
function formatNumber(num) {
    return new Intl.NumberFormat('id-ID').format(num);
}

// ========== GERAK ==========
function hitungGLB() {
    const kecepatan = parseFloat(document.getElementById('glb-kecepatan').value);
    const waktu = parseFloat(document.getElementById('glb-waktu').value);
    
    if (!kecepatan || !waktu) {
        tampilkanHasil('glb-hasil', 'Masukkan nilai kecepatan dan waktu!', 'warning');
        return;
    }
    
    const jarak = kecepatan * waktu;
    
    const hasil = `
        <strong>Hasil Perhitungan GLB:</strong><br>
        Jarak = Kecepatan × Waktu<br>
        Jarak = ${kecepatan} m/s × ${waktu} s<br>
        <strong>Jarak = ${formatNumber(jarak)} meter</strong><br><br>
        <small>Benda bergerak dengan kecepatan tetap</small>
    `;
    
    tampilkanHasil('glb-hasil', hasil, 'success');
}

function hitungGLBB() {
    const vo = parseFloat(document.getElementById('glbb-vo').value) || 0;
    const percepatan = parseFloat(document.getElementById('glbb-percepatan').value);
    const waktu = parseFloat(document.getElementById('glbb-waktu').value);
    
    if (!percepatan || !waktu) {
        tampilkanHasil('glbb-hasil', 'Masukkan nilai percepatan dan waktu!', 'warning');
        return;
    }
    
    const vt = vo + percepatan * waktu;
    const jarak = vo * waktu + 0.5 * percepatan * waktu * waktu;
    
    const hasil = `
        <strong>Hasil Perhitungan GLBB:</strong><br>
        Kecepatan akhir: vt = v₀ + a×t<br>
        vt = ${vo} + ${percepatan}×${waktu}<br>
        <strong>vt = ${vt.toFixed(2)} m/s</strong><br><br>
        Jarak: S = v₀×t + ½×a×t²<br>
        S = ${vo}×${waktu} + ½×${percepatan}×${waktu}²<br>
        <strong>S = ${formatNumber(jarak.toFixed(2))} meter</strong>
    `;
    
    tampilkanHasil('glbb-hasil', hasil, 'success');
}

function hitungKecepatanRata() {
    const jarak = parseFloat(document.getElementById('avg-jarak').value);
    const waktu = parseFloat(document.getElementById('avg-waktu').value);
    
    if (!jarak || !waktu) {
        tampilkanHasil('avg-hasil', 'Masukkan nilai jarak dan waktu!', 'warning');
        return;
    }
    
    const kecepatan = jarak / waktu;
    
    const hasil = `
        <strong>Kecepatan Rata-rata:</strong><br>
        v = Jarak ÷ Waktu<br>
        v = ${jarak} m ÷ ${waktu} s<br>
        <strong>v = ${kecepatan.toFixed(2)} m/s</strong><br><br>
        <small>Kecepatan konstan sepanjang perjalanan</small>
    `;
    
    tampilkanHasil('avg-hasil', hasil, 'success');
}

function konversiKecepatan() {
    const nilai = parseFloat(document.getElementById('konv-nilai').value);
    const dari = document.getElementById('konv-dari').value;
    const ke = document.getElementById('konv-ke').value;
    
    if (!nilai) {
        tampilkanHasil('konv-hasil', 'Masukkan nilai kecepatan!', 'warning');
        return;
    }
    
    // Konversi ke m/s dulu
    let nilaiDalamMps;
    switch(dari) {
        case 'km/jam': nilaiDalamMps = nilai / 3.6; break;
        case 'm/s': nilaiDalamMps = nilai; break;
        case 'm/menit': nilaiDalamMps = nilai / 60; break;
    }
    
    // Konversi dari m/s ke unit tujuan
    let hasil;
    switch(ke) {
        case 'km/jam': hasil = nilaiDalamMps * 3.6; break;
        case 'm/s': hasil = nilaiDalamMps; break;
        case 'm/menit': hasil = nilaiDalamMps * 60; break;
    }
    
    const hasilText = `
        <strong>Hasil Konversi:</strong><br>
        ${nilai} ${dari} = <strong>${hasil.toFixed(2)} ${ke}</strong><br><br>
        <small>1 km/jam = 1000 m / 3600 s = 0.2778 m/s</small>
    `;
    
    tampilkanHasil('konv-hasil', hasilText, 'info');
}

// ========== PESAWAT SEDERHANA ==========
function hitungTuas() {
    const beban = parseFloat(document.getElementById('tuas-beban').value);
    const lenganBeban = parseFloat(document.getElementById('tuas-lb').value);
    const lenganKuasa = parseFloat(document.getElementById('tuas-lk').value);
    
    if (!beban || !lenganBeban || !lenganKuasa) {
        tampilkanHasil('tuas-hasil', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const kuasa = (beban * lenganBeban) / lenganKuasa;
    const keuntunganMekanis = lenganKuasa / lenganBeban;
    
    const hasil = `
        <strong>Tuas/Pengungkit:</strong><br>
        Kuasa = (Beban × Lb) ÷ Lk<br>
        Kuasa = (${beban} × ${lenganBeban}) ÷ ${lenganKuasa}<br>
        <strong>Kuasa = ${kuasa.toFixed(2)} N</strong><br><br>
        Keuntungan Mekanis = Lk ÷ Lb<br>
        KM = ${lenganKuasa} ÷ ${lenganBeban}<br>
        <strong>KM = ${keuntunganMekanis.toFixed(2)}</strong>
    `;
    
    tampilkanHasil('tuas-hasil', hasil, 'success');
}

function hitungBidangMiring() {
    const beban = parseFloat(document.getElementById('bidang-beban').value);
    const panjang = parseFloat(document.getElementById('bidang-panjang').value);
    const tinggi = parseFloat(document.getElementById('bidang-tinggi').value);
    
    if (!beban || !panjang || !tinggi) {
        tampilkanHasil('bidang-hasil', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const kuasa = (beban * tinggi) / panjang;
    const keuntunganMekanis = panjang / tinggi;
    
    const hasil = `
        <strong>Bidang Miring:</strong><br>
        Kuasa = (Beban × Tinggi) ÷ Panjang<br>
        Kuasa = (${beban} × ${tinggi}) ÷ ${panjang}<br>
        <strong>Kuasa = ${kuasa.toFixed(2)} N</strong><br><br>
        Keuntungan Mekanis = Panjang ÷ Tinggi<br>
        KM = ${panjang} ÷ ${tinggi}<br>
        <strong>KM = ${keuntunganMekanis.toFixed(2)}</strong>
    `;
    
    tampilkanHasil('bidang-hasil', hasil, 'success');
}

function hitungKatrol() {
    const jenis = document.getElementById('katrol-jenis').value;
    const beban = parseFloat(document.getElementById('katrol-beban').value);
    
    if (!beban) {
        tampilkanHasil('katrol-hasil', 'Masukkan nilai beban!', 'warning');
        return;
    }
    
    let kuasa, keuntunganMekanis, deskripsi;
    
    switch(jenis) {
        case 'tunggal':
            kuasa = beban;
            keuntunganMekanis = 1;
            deskripsi = "Katrol tunggal tetap - hanya mengubah arah gaya";
            break;
        case 'ganda':
            kuasa = beban / 2;
            keuntunganMekanis = 2;
            deskripsi = "Katrol ganda - sistem katrol tetap dan bergerak";
            break;
        case 'bergerak':
            kuasa = beban / 2;
            keuntunganMekanis = 2;
            deskripsi = "Katrol bergerak - menghemat gaya";
            break;
    }
    
    const hasil = `
        <strong>Katrol ${jenis}:</strong><br>
        <strong>Kuasa = ${kuasa.toFixed(2)} N</strong><br>
        <strong>Keuntungan Mekanis = ${keuntunganMekanis}</strong><br><br>
        <small>${deskripsi}</small>
    `;
    
    tampilkanHasil('katrol-hasil', hasil, 'success');
}

function hitungRodaBerporos() {
    const gaya = parseFloat(document.getElementById('roda-gaya').value);
    const jariRoda = parseFloat(document.getElementById('roda-jari').value);
    const jariPoros = parseFloat(document.getElementById('roda-poros').value);
    
    if (!gaya || !jariRoda || !jariPoros) {
        tampilkanHasil('roda-hasil', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const keuntunganMekanis = jariRoda / jariPoros;
    const bebanMaksimal = gaya * keuntunganMekanis;
    
    const hasil = `
        <strong>Roda Berporos:</strong><br>
        Keuntungan Mekanis = R roda ÷ R poros<br>
        KM = ${jariRoda} ÷ ${jariPoros}<br>
        <strong>KM = ${keuntunganMekanis.toFixed(2)}</strong><br><br>
        Beban maksimal = Gaya × KM<br>
        Beban = ${gaya} × ${keuntunganMekanis.toFixed(2)}<br>
        <strong>Beban = ${bebanMaksimal.toFixed(2)} N</strong>
    `;
    
    tampilkanHasil('roda-hasil', hasil, 'success');
}

// ========== HUKUM NEWTON ==========
function hitungHukum1Newton() {
    const massa = parseFloat(document.getElementById('newton1-massa').value);
    const keadaan = document.getElementById('newton1-keadaan').value;
    
    if (!massa) {
        tampilkanHasil('newton1-hasil', 'Masukkan nilai massa!', 'warning');
        return;
    }
    
    let hasil;
    if (keadaan === 'diam') {
        hasil = `
            <strong>Hukum I Newton (Kelembaman):</strong><br>
            Benda diam akan tetap diam unless ada gaya luar yang bekerja<br>
            <strong>ΣF = 0</strong><br><br>
            <small>Benda mempertahankan keadaan diamnya</small>
        `;
    } else {
        hasil = `
            <strong>Hukum I Newton (Kelembaman):</strong><br>
            Benda bergerak akan tetap bergerak lurus beraturan unless ada gaya luar<br>
            <strong>ΣF = 0</strong><br><br>
            <small>Benda mempertahankan keadaan geraknya</small>
        `;
    }
    
    tampilkanHasil('newton1-hasil', hasil, 'info');
}

function hitungHukum2Newton() {
    const massa = parseFloat(document.getElementById('newton2-massa').value);
    const percepatan = parseFloat(document.getElementById('newton2-percepatan').value);
    
    if (!massa || !percepatan) {
        tampilkanHasil('newton2-hasil', 'Masukkan nilai massa dan percepatan!', 'warning');
        return;
    }
    
    const gaya = massa * percepatan;
    
    const hasil = `
        <strong>Hukum II Newton:</strong><br>
        F = m × a<br>
        F = ${massa} kg × ${percepatan} m/s²<br>
        <strong>F = ${gaya.toFixed(2)} Newton</strong><br><br>
        <small>Percepatan sebanding dengan gaya dan berbanding terbalik dengan massa</small>
    `;
    
    tampilkanHasil('newton2-hasil', hasil, 'success');
}

function hitungHukum3Newton() {
    const aksi = parseFloat(document.getElementById('newton3-aksi').value);
    
    if (!aksi) {
        tampilkanHasil('newton3-hasil', 'Masukkan nilai gaya aksi!', 'warning');
        return;
    }
    
    const reaksi = aksi; // Besar sama, arah berlawanan
    
    const hasil = `
        <strong>Hukum III Newton (Aksi-Reaksi):</strong><br>
        F aksi = - F reaksi<br>
        <strong>Gaya reaksi = ${reaksi} N</strong><br><br>
        <small>Besar gaya aksi dan reaksi sama, arahnya berlawanan</small>
    `;
    
    tampilkanHasil('newton3-hasil', hasil, 'info');
}

function hitungGayaGesek() {
    const massa = parseFloat(document.getElementById('gesek-massa').value);
    const koefisien = parseFloat(document.getElementById('gesek-koefisien').value);
    
    if (!massa || !koefisien) {
        tampilkanHasil('gesek-hasil', 'Masukkan nilai massa dan koefisien gesek!', 'warning');
        return;
    }
    
    const gayaNormal = massa * 9.8; // g = 9.8 m/s²
    const gayaGesek = koefisien * gayaNormal;
    
    const hasil = `
        <strong>Gaya Gesek:</strong><br>
        f = μ × N<br>
        N = m × g = ${massa} × 9.8 = ${gayaNormal.toFixed(2)} N<br>
        f = ${koefisien} × ${gayaNormal.toFixed(2)}<br>
        <strong>f = ${gayaGesek.toFixed(2)} N</strong><br><br>
        <small>Gaya gesek menghambat gerakan benda</small>
    `;
    
    tampilkanHasil('gesek-hasil', hasil, 'success');
}

// ========== ENERGI ==========
function hitungEnergiKinetik() {
    const massa = parseFloat(document.getElementById('ek-massa').value);
    const kecepatan = parseFloat(document.getElementById('ek-kecepatan').value);
    
    if (!massa || !kecepatan) {
        tampilkanHasil('ek-hasil', 'Masukkan nilai massa dan kecepatan!', 'warning');
        return;
    }
    
    const energi = 0.5 * massa * kecepatan * kecepatan;
    
    const hasil = `
        <strong>Energi Kinetik:</strong><br>
        EK = ½ × m × v²<br>
        EK = ½ × ${massa} × ${kecepatan}²<br>
        <strong>EK = ${formatNumber(energi.toFixed(2))} Joule</strong><br><br>
        <small>Energi karena benda bergerak</small>
    `;
    
    tampilkanHasil('ek-hasil', hasil, 'success');
}

function hitungEnergiPotensial() {
    const massa = parseFloat(document.getElementById('ep-massa').value);
    const tinggi = parseFloat(document.getElementById('ep-tinggi').value);
    
    if (!massa || !tinggi) {
        tampilkanHasil('ep-hasil', 'Masukkan nilai massa dan tinggi!', 'warning');
        return;
    }
    
    const g = 9.8;
    const energi = massa * g * tinggi;
    
    const hasil = `
        <strong>Energi Potensial:</strong><br>
        EP = m × g × h<br>
        EP = ${massa} × 9.8 × ${tinggi}<br>
        <strong>EP = ${formatNumber(energi.toFixed(2))} Joule</strong><br><br>
        <small>Energi karena posisi benda</small>
    `;
    
    tampilkanHasil('ep-hasil', hasil, 'success');
}

function hitungUsaha() {
    const gaya = parseFloat(document.getElementById('usaha-gaya').value);
    const jarak = parseFloat(document.getElementById('usaha-jarak').value);
    
    if (!gaya || !jarak) {
        tampilkanHasil('usaha-hasil', 'Masukkan nilai gaya dan jarak!', 'warning');
        return;
    }
    
    const usaha = gaya * jarak;
    
    const hasil = `
        <strong>Usaha:</strong><br>
        W = F × s<br>
        W = ${gaya} N × ${jarak} m<br>
        <strong>W = ${formatNumber(usaha)} Joule</strong><br><br>
        <small>Usaha = Gaya × Perpindahan</small>
    `;
    
    tampilkanHasil('usaha-hasil', hasil, 'success');
}

function hitungDaya() {
    const usaha = parseFloat(document.getElementById('daya-usaha').value);
    const waktu = parseFloat(document.getElementById('daya-waktu').value);
    
    if (!usaha || !waktu) {
        tampilkanHasil('daya-hasil', 'Masukkan nilai usaha dan waktu!', 'warning');
        return;
    }
    
    const daya = usaha / waktu;
    
    const hasil = `
        <strong>Daya:</strong><br>
        P = W ÷ t<br>
        P = ${usaha} J ÷ ${waktu} s<br>
        <strong>P = ${daya.toFixed(2)} Watt</strong><br><br>
        <small>Daya = Usaha per satuan waktu</small>
    `;
    
    tampilkanHasil('daya-hasil', hasil, 'success');
}

// ========== LISTRIK ==========
function hitungHukumOhm() {
    const tegangan = parseFloat(document.getElementById('ohm-tegangan').value);
    const arus = parseFloat(document.getElementById('ohm-arus').value);
    const hambatan = parseFloat(document.getElementById('ohm-hambatan').value);
    
    let hasil;
    
    if (tegangan && arus) {
        // Hitung hambatan
        const R = tegangan / arus;
        hasil = `Hambatan: V ÷ I = ${tegangan} ÷ ${arus} = <strong>${R.toFixed(2)} Ω</strong>`;
    } else if (tegangan && hambatan) {
        // Hitung arus
        const I = tegangan / hambatan;
        hasil = `Arus: V ÷ R = ${tegangan} ÷ ${hambatan} = <strong>${I.toFixed(2)} A</strong>`;
    } else if (arus && hambatan) {
        // Hitung tegangan
        const V = arus * hambatan;
        hasil = `Tegangan: I × R = ${arus} × ${hambatan} = <strong>${V.toFixed(2)} V</strong>`;
    } else {
        tampilkanHasil('ohm-hasil', 'Masukkan dua nilai untuk menghitung!', 'warning');
        return;
    }
    
    const fullHasil = `
        <strong>Hukum Ohm:</strong><br>
        V = I × R<br>
        ${hasil}<br><br>
        <small>Tegangan sebanding dengan arus dan hambatan</small>
    `;
    
    tampilkanHasil('ohm-hasil', fullHasil, 'success');
}

function hitungDayaListrik() {
    const tegangan = parseFloat(document.getElementById('dayalistrik-tegangan').value);
    const arus = parseFloat(document.getElementById('dayalistrik-arus').value);
    
    if (!tegangan || !arus) {
        tampilkanHasil('dayalistrik-hasil', 'Masukkan nilai tegangan dan arus!', 'warning');
        return;
    }
    
    const daya = tegangan * arus;
    
    const hasil = `
        <strong>Daya Listrik:</strong><br>
        P = V × I<br>
        P = ${tegangan} V × ${arus} A<br>
        <strong>P = ${daya} Watt</strong><br><br>
        <small>Daya listrik = Tegangan × Arus</small>
    `;
    
    tampilkanHasil('dayalistrik-hasil', hasil, 'success');
}

function hitungEnergiListrik() {
    const daya = parseFloat(document.getElementById('energilistrik-daya').value);
    const waktu = parseFloat(document.getElementById('energilistrik-waktu').value);
    
    if (!daya || !waktu) {
        tampilkanHasil('energilistrik-hasil', 'Masukkan nilai daya dan waktu!', 'warning');
        return;
    }
    
    const energi = daya * waktu; // Watt-jam
    const energiKwh = energi / 1000;
    
    const hasil = `
        <strong>Energi Listrik:</strong><br>
        E = P × t<br>
        E = ${daya} W × ${waktu} jam<br>
        <strong>E = ${energi} Wh</strong><br>
        atau <strong>${energiKwh.toFixed(3)} kWh</strong><br><br>
        <small>1 kWh = 1000 Watt selama 1 jam</small>
    `;
    
    tampilkanHasil('energilistrik-hasil', hasil, 'success');
}

function hitungRangkaian() {
    const jenis = document.getElementById('rangkaian-jenis').value;
    const r1 = parseFloat(document.getElementById('rangkaian-r1').value);
    const r2 = parseFloat(document.getElementById('rangkaian-r2').value);
    
    if (!r1 || !r2) {
        tampilkanHasil('rangkaian-hasil', 'Masukkan nilai hambatan!', 'warning');
        return;
    }
    
    let hambatanTotal, rumus;
    
    if (jenis === 'seri') {
        hambatanTotal = r1 + r2;
        rumus = `R total = R₁ + R₂ = ${r1} + ${r2}`;
    } else {
        hambatanTotal = (r1 * r2) / (r1 + r2);
        rumus = `R total = (R₁ × R₂) ÷ (R₁ + R₂) = (${r1} × ${r2}) ÷ (${r1} + ${r2})`;
    }
    
    const hasil = `
        <strong>Rangkaian ${jenis.toUpperCase()}:</strong><br>
        ${rumus}<br>
        <strong>R total = ${hambatanTotal.toFixed(2)} Ω</strong><br><br>
        <small>Rangkaian ${jenis} - ${jenis === 'seri' ? 'arus sama' : 'tegangan sama'}</small>
    `;
    
    tampilkanHasil('rangkaian-hasil', hasil, 'success');
}

// ========== ZAT & TEKANAN ==========
function hitungMassaJenis() {
    const massa = parseFloat(document.getElementById('massa-massa').value);
    const volume = parseFloat(document.getElementById('massa-volume').value);
    
    if (!massa || !volume) {
        tampilkanHasil('massa-hasil', 'Masukkan nilai massa dan volume!', 'warning');
        return;
    }
    
    const massaJenis = massa / volume;
    
    const hasil = `
        <strong>Massa Jenis:</strong><br>
        ρ = m ÷ V<br>
        ρ = ${massa} kg ÷ ${volume} m³<br>
        <strong>ρ = ${massaJenis.toFixed(2)} kg/m³</strong><br><br>
        <small>Massa jenis = Massa per satuan volume</small>
    `;
    
    tampilkanHasil('massa-hasil', hasil, 'success');
}

function hitungTekananHidrostatis() {
    const massaJenis = parseFloat(document.getElementById('tekanan-massa-jenis').value);
    const kedalaman = parseFloat(document.getElementById('tekanan-kedalaman').value);
    
    if (!massaJenis || !kedalaman) {
        tampilkanHasil('tekanan-hasil', 'Masukkan nilai massa jenis dan kedalaman!', 'warning');
        return;
    }
    
    const g = 9.8;
    const tekanan = massaJenis * g * kedalaman;
    
    const hasil = `
        <strong>Tekanan Hidrostatis:</strong><br>
        P = ρ × g × h<br>
        P = ${massaJenis} × 9.8 × ${kedalaman}<br>
        <strong>P = ${tekanan.toFixed(2)} Pascal</strong><br><br>
        <small>Tekanan dalam fluida karena berat fluida itu sendiri</small>
    `;
    
    tampilkanHasil('tekanan-hasil', hasil, 'success');
}

function hitungTekananZatPadat() {
    const gaya = parseFloat(document.getElementById('tekanan-gaya').value);
    const luas = parseFloat(document.getElementById('tekanan-luas').value);
    
    if (!gaya || !luas) {
        tampilkanHasil('tekananpadat-hasil', 'Masukkan nilai gaya dan luas!', 'warning');
        return;
    }
    
    const tekanan = gaya / luas;
    
    const hasil = `
        <strong>Tekanan Zat Padat:</strong><br>
        P = F ÷ A<br>
        P = ${gaya} N ÷ ${luas} m²<br>
        <strong>P = ${tekanan.toFixed(2)} Pascal</strong><br><br>
        <small>Tekanan = Gaya per satuan luas</small>
    `;
    
    tampilkanHasil('tekananpadat-hasil', hasil, 'success');
}

function hitungPemuaian() {
    const panjangAwal = parseFloat(document.getElementById('muai-panjang').value);
    const koefisien = parseFloat(document.getElementById('muai-koefisien').value);
    const deltaSuhu = parseFloat(document.getElementById('muai-suhu').value);
    
    if (!panjangAwal || !koefisien || !deltaSuhu) {
        tampilkanHasil('muai-hasil', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const deltaPanjang = panjangAwal * koefisien * deltaSuhu;
    const panjangAkhir = panjangAwal + deltaPanjang;
    
    const hasil = `
        <strong>Pemuaian Panjang:</strong><br>
        ΔL = L₀ × α × ΔT<br>
        ΔL = ${panjangAwal} × ${koefisien} × ${deltaSuhu}<br>
        <strong>ΔL = ${deltaPanjang.toFixed(6)} meter</strong><br><br>
        Panjang akhir = ${panjangAwal} + ${deltaPanjang.toFixed(6)}<br>
        <strong>L = ${panjangAkhir.toFixed(6)} meter</strong>
    `;
    
    tampilkanHasil('muai-hasil', hasil, 'success');
}

// Helper function untuk menampilkan hasil
function tampilkanHasil(elementId, pesan, tipe = 'info') {
    const element = document.getElementById(elementId);
    element.innerHTML = pesan;
    element.className = 'result ' + tipe;
}

// Initialize dengan nilai default
document.addEventListener('DOMContentLoaded', function() {
    // Set nilai default untuk beberapa input
    document.getElementById('tekanan-massa-jenis').value = '1000'; // Air
    document.getElementById('muai-koefisien').value = '0.000012'; // Besi
});