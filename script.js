
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

// KINEMATIKA
function calculateGLB() {
    const velocity = parseFloat(document.getElementById('glb-velocity').value);
    const time = parseFloat(document.getElementById('glb-time').value);
    
    if (!velocity || !time) {
        showResult('glb-result', 'Masukkan nilai kecepatan dan waktu!', 'warning');
        return;
    }
    
    const distance = velocity * time;
    const distanceKm = distance / 1000;
    
    const result = `
        <strong>Hasil Perhitungan:</strong><br>
        Jarak tempuh: <strong>${formatNumber(distance)} meter</strong><br>
        atau <strong>${distanceKm.toFixed(2)} km</strong><br><br>
        <small>Rumus: Jarak = Kecepatan × Waktu</small>
    `;
    
    showResult('glb-result', result, 'success');
}

function calculateGLBB() {
    const v0 = parseFloat(document.getElementById('glbb-v0').value) || 0;
    const acceleration = parseFloat(document.getElementById('glbb-acceleration').value);
    const time = parseFloat(document.getElementById('glbb-time').value);
    
    if (!acceleration || !time) {
        showResult('glbb-result', 'Masukkan nilai percepatan dan waktu!', 'warning');
        return;
    }
    
    const vt = v0 + acceleration * time;
    const distance = v0 * time + 0.5 * acceleration * time * time;
    
    const result = `
        <strong>Hasil Perhitungan:</strong><br>
        Kecepatan akhir: <strong>${vt.toFixed(2)} m/s</strong><br>
        Jarak tempuh: <strong>${formatNumber(distance.toFixed(2))} meter</strong><br><br>
        <small>Rumus: vt = v0 + a×t, S = v0×t + ½×a×t²</small>
    `;
    
    showResult('glbb-result', result, 'success');
}

function convertSpeed() {
    const value = parseFloat(document.getElementById('speed-value').value);
    const from = document.getElementById('speed-from').value;
    const to = document.getElementById('speed-to').value;
    
    if (!value) {
        showResult('speed-result', 'Masukkan nilai kecepatan!', 'warning');
        return;
    }
    
    // Konversi ke m/s dulu
    let valueInMps;
    switch(from) {
        case 'm/s': valueInMps = value; break;
        case 'km/h': valueInMps = value / 3.6; break;
        case 'mph': valueInMps = value * 0.44704; break;
        case 'knot': valueInMps = value * 0.514444; break;
    }
    
    // Konversi dari m/s ke unit tujuan
    let result;
    switch(to) {
        case 'm/s': result = valueInMps; break;
        case 'km/h': result = valueInMps * 3.6; break;
        case 'mph': result = valueInMps * 2.23694; break;
        case 'knot': result = valueInMps * 1.94384; break;
    }
    
    const resultText = `
        <strong>Hasil Konversi:</strong><br>
        ${value} ${from} = <strong>${result.toFixed(2)} ${to}</strong>
    `;
    
    showResult('speed-result', resultText, 'info');
}

// ENERGI
function calculateKineticEnergy() {
    const mass = parseFloat(document.getElementById('ek-mass').value);
    const velocity = parseFloat(document.getElementById('ek-velocity').value);
    
    if (!mass || !velocity) {
        showResult('ek-result', 'Masukkan nilai massa dan kecepatan!', 'warning');
        return;
    }
    
    const energy = 0.5 * mass * velocity * velocity;
    
    const result = `
        <strong>Energi Kinetik:</strong><br>
        <strong>${formatNumber(energy.toFixed(2))} Joule</strong><br><br>
        <small>Rumus: EK = ½ × m × v²</small>
    `;
    
    showResult('ek-result', result, 'success');
}

function calculatePotentialEnergy() {
    const mass = parseFloat(document.getElementById('ep-mass').value);
    const height = parseFloat(document.getElementById('ep-height').value);
    
    if (!mass || !height) {
        showResult('ep-result', 'Masukkan nilai massa dan tinggi!', 'warning');
        return;
    }
    
    const g = 9.8; // gravitasi bumi
    const energy = mass * g * height;
    
    const result = `
        <strong>Energi Potensial:</strong><br>
        <strong>${formatNumber(energy.toFixed(2))} Joule</strong><br><br>
        <small>Rumus: EP = m × g × h</small>
    `;
    
    showResult('ep-result', result, 'success');
}

function calculatePower() {
    const voltage = parseFloat(document.getElementById('power-voltage').value);
    const current = parseFloat(document.getElementById('power-current').value);
    
    if (!voltage || !current) {
        showResult('power-result', 'Masukkan nilai tegangan dan arus!', 'warning');
        return;
    }
    
    const power = voltage * current;
    
    const result = `
        <strong>Daya Listrik:</strong><br>
        <strong>${formatNumber(power)} Watt</strong><br><br>
        <small>Rumus: P = V × I</small>
    `;
    
    showResult('power-result', result, 'success');
}

function calculateElectricityCost() {
    const power = parseFloat(document.getElementById('cost-power').value);
    const time = parseFloat(document.getElementById('cost-time').value);
    const rate = parseFloat(document.getElementById('cost-rate').value);
    
    if (!power || !time || !rate) {
        showResult('cost-result', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const energyKwh = (power * time) / 1000;
    const cost = energyKwh * rate;
    
    const result = `
        <strong>Biaya Listrik:</strong><br>
        Pemakaian: <strong>${energyKwh.toFixed(2)} kWh</strong><br>
        Biaya: <strong>Rp ${formatNumber(cost.toFixed(2))}</strong><br><br>
        <small>Perhitungan: (Daya × Waktu) ÷ 1000 × Tarif</small>
    `;
    
    showResult('cost-result', result, 'info');
}

// LISTRIK
function calculateOhmLaw() {
    const voltage = parseFloat(document.getElementById('ohm-voltage').value);
    const current = parseFloat(document.getElementById('ohm-current').value);
    const resistance = parseFloat(document.getElementById('ohm-resistance').value);
    
    let result;
    
    if (voltage && current) {
        // Hitung hambatan
        const R = voltage / current;
        result = `Hambatan: <strong>${R.toFixed(2)} Ω</strong>`;
    } else if (voltage && resistance) {
        // Hitung arus
        const I = voltage / resistance;
        result = `Arus: <strong>${I.toFixed(2)} A</strong>`;
    } else if (current && resistance) {
        // Hitung tegangan
        const V = current * resistance;
        result = `Tegangan: <strong>${V.toFixed(2)} V</strong>`;
    } else {
        showResult('ohm-result', 'Masukkan dua nilai untuk menghitung!', 'warning');
        return;
    }
    
    const fullResult = `
        <strong>Hukum Ohm:</strong><br>
        ${result}<br><br>
        <small>Rumus: V = I × R</small>
    `;
    
    showResult('ohm-result', fullResult, 'success');
}

function calculateElectricalEnergy() {
    const power = parseFloat(document.getElementById('energy-power').value);
    const time = parseFloat(document.getElementById('energy-time').value);
    
    if (!power || !time) {
        showResult('energy-result', 'Masukkan nilai daya dan waktu!', 'warning');
        return;
    }
    
    const energy = power * time; // Watt-jam
    const energyKwh = energy / 1000;
    
    const result = `
        <strong>Energi Listrik:</strong><br>
        <strong>${formatNumber(energy)} Wh</strong><br>
        atau <strong>${energyKwh.toFixed(3)} kWh</strong><br><br>
        <small>Rumus: Energi = Daya × Waktu</small>
    `;
    
    showResult('energy-result', result, 'success');
}

function calculateChargerCost() {
    const power = parseFloat(document.getElementById('charger-power').value);
    const time = parseFloat(document.getElementById('charger-time').value);
    const rate = parseFloat(document.getElementById('charger-rate').value);
    
    if (!power || !time || !rate) {
        showResult('charger-result', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const energyKwh = (power * time) / 1000;
    const cost = energyKwh * rate;
    const costPerMonth = cost * 30; // Asumsi charge setiap hari
    
    const result = `
        <strong>Biaya Charge HP:</strong><br>
        Per charge: <strong>Rp ${formatNumber(cost.toFixed(2))}</strong><br>
        Per bulan (30 hari): <strong>Rp ${formatNumber(costPerMonth.toFixed(2))}</strong><br><br>
        <small>Pemakaian: ${energyKwh.toFixed(4)} kWh per charge</small>
    `;
    
    showResult('charger-result', result, 'info');
}

// FLUIDA
function calculateHydrostaticPressure() {
    const density = parseFloat(document.getElementById('density-fluid').value);
    const depth = parseFloat(document.getElementById('depth-fluid').value);
    
    if (!density || !depth) {
        showResult('hydrostatic-result', 'Masukkan nilai massa jenis dan kedalaman!', 'warning');
        return;
    }
    
    const g = 9.8;
    const pressure = density * g * depth;
    
    const result = `
        <strong>Tekanan Hidrostatis:</strong><br>
        <strong>${formatNumber(pressure.toFixed(2))} Pascal</strong><br>
        atau <strong>${(pressure/1000).toFixed(2)} kPa</strong><br><br>
        <small>Rumus: P = ρ × g × h</small>
    `;
    
    showResult('hydrostatic-result', result, 'success');
}

function calculateFlowRate() {
    const volume = parseFloat(document.getElementById('volume-flow').value);
    const time = parseFloat(document.getElementById('time-flow').value);
    
    if (!volume || !time) {
        showResult('flow-result', 'Masukkan nilai volume dan waktu!', 'warning');
        return;
    }
    
    const flowRate = volume / time; // liter/detik
    const flowRateM3 = flowRate / 1000; // m³/detik
    
    const result = `
        <strong>Debit Air:</strong><br>
        <strong>${flowRate.toFixed(2)} liter/detik</strong><br>
        atau <strong>${flowRateM3.toFixed(6)} m³/detik</strong><br><br>
        <small>Rumus: Q = Volume ÷ Waktu</small>
    `;
    
    showResult('flow-result', result, 'success');
}

function calculateWaterCost() {
    const usage = parseFloat(document.getElementById('water-usage').value);
    const rate = parseFloat(document.getElementById('water-rate').value);
    
    if (!usage || !rate) {
        showResult('water-result', 'Masukkan nilai pemakaian dan tarif!', 'warning');
        return;
    }
    
    const cost = usage * rate;
    
    const result = `
        <strong>Biaya Air PDAM:</strong><br>
        Pemakaian: <strong>${usage} m³</strong><br>
        Biaya: <strong>Rp ${formatNumber(cost)}</strong><br><br>
        <small>Perhitungan: Pemakaian × Tarif per m³</small>
    `;
    
    showResult('water-result', result, 'info');
}

// TERMAL
function calculateHeat() {
    const mass = parseFloat(document.getElementById('heat-mass').value);
    const capacity = parseFloat(document.getElementById('heat-capacity').value);
    const deltaT = parseFloat(document.getElementById('heat-delta-t').value);
    
    if (!mass || !capacity || !deltaT) {
        showResult('heat-result', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const heat = mass * capacity * deltaT;
    const heatKcal = heat / 4184; // Konversi ke kalori
    
    const result = `
        <strong>Kalor yang Dibutuhkan:</strong><br>
        <strong>${formatNumber(heat.toFixed(2))} Joule</strong><br>
        atau <strong>${heatKcal.toFixed(2)} kkal</strong><br><br>
        <small>Rumus: Q = m × c × ΔT</small>
    `;
    
    showResult('heat-result', result, 'success');
}

function calculateBoilingCost() {
    const volume = parseFloat(document.getElementById('boil-volume').value);
    const tempInitial = parseFloat(document.getElementById('boil-temp-initial').value);
    const power = parseFloat(document.getElementById('boil-power').value);
    
    if (!volume || !tempInitial || !power) {
        showResult('boil-result', 'Masukkan semua nilai!', 'warning');
        return;
    }
    
    const tempFinal = 100; // Titik didih air
    const deltaT = tempFinal - tempInitial;
    const mass = volume; // 1 liter ≈ 1 kg
    const capacity = 4200; // Kalor jenis air
    
    const heatNeeded = mass * capacity * deltaT;
    const timeSeconds = heatNeeded / power;
    const timeMinutes = timeSeconds / 60;
    
    // Asumsi efisiensi 80% dan tarif listrik Rp 1500/kWh
    const energyKwh = (power * timeSeconds / 3600) / 1000;
    const cost = energyKwh * 1500;
    
    const result = `
        <strong>Memasak Air:</strong><br>
        Waktu yang dibutuhkan: <strong>${timeMinutes.toFixed(1)} menit</strong><br>
        Perkiraan biaya: <strong>Rp ${cost.toFixed(2)}</strong><br><br>
        <small>Asumsi: efisiensi 80%, tarif Rp 1500/kWh</small>
    `;
    
    showResult('boil-result', result, 'info');
}

function convertTemperature() {
    const value = parseFloat(document.getElementById('temp-value').value);
    const from = document.getElementById('temp-from').value;
    const to = document.getElementById('temp-to').value;
    
    if (!value) {
        showResult('temp-result', 'Masukkan nilai suhu!', 'warning');
        return;
    }
    
    let result;
    
    // Konversi ke Celsius dulu
    let valueInC;
    switch(from) {
        case 'celsius': valueInC = value; break;
        case 'fahrenheit': valueInC = (value - 32) * 5/9; break;
        case 'kelvin': valueInC = value - 273.15; break;
    }
    
    // Konversi dari Celsius ke unit tujuan
    switch(to) {
        case 'celsius': result = valueInC; break;
        case 'fahrenheit': result = (valueInC * 9/5) + 32; break;
        case 'kelvin': result = valueInC + 273.15; break;
    }
    
    const resultText = `
        <strong>Hasil Konversi:</strong><br>
        ${value}° ${from.charAt(0).toUpperCase()} = <strong>${result.toFixed(2)}° ${to.charAt(0).toUpperCase()}</strong>
    `;
    
    showResult('temp-result', resultText, 'info');
}

// MEKANIKA
function calculateForce() {
    const mass = parseFloat(document.getElementById('force-mass').value);
    const acceleration = parseFloat(document.getElementById('force-acceleration').value);
    
    if (!mass || !acceleration) {
        showResult('force-result', 'Masukkan nilai massa dan percepatan!', 'warning');
        return;
    }
    
    const force = mass * acceleration;
    
    const result = `
        <strong>Gaya:</strong><br>
        <strong>${formatNumber(force.toFixed(2))} Newton</strong><br><br>
        <small>Rumus: F = m × a</small>
    `;
    
    showResult('force-result', result, 'success');
}

function calculateWork() {
    const force = parseFloat(document.getElementById('work-force').value);
    const distance = parseFloat(document.getElementById('work-distance').value);
    
    if (!force || !distance) {
        showResult('work-result', 'Masukkan nilai gaya dan jarak!', 'warning');
        return;
    }
    
    const work = force * distance;
    
    const result = `
        <strong>Usaha:</strong><br>
        <strong>${formatNumber(work.toFixed(2))} Joule</strong><br><br>
        <small>Rumus: W = F × s</small>
    `;
    
    showResult('work-result', result, 'success');
}

function calculateMechanicalPower() {
    const work = parseFloat(document.getElementById('mech-power-work').value);
    const time = parseFloat(document.getElementById('mech-power-time').value);
    
    if (!work || !time) {
        showResult('mech-power-result', 'Masukkan nilai usaha dan waktu!', 'warning');
        return;
    }
    
    const power = work / time;
    
    const result = `
        <strong>Daya Mekanik:</strong><br>
        <strong>${formatNumber(power.toFixed(2))} Watt</strong><br><br>
        <small>Rumus: P = W ÷ t</small>
    `;
    
    showResult('mech-power-result', result, 'success');
}

function calculateMomentum() {
    const mass = parseFloat(document.getElementById('momentum-mass').value);
    const velocity = parseFloat(document.getElementById('momentum-velocity').value);
    
    if (!mass || !velocity) {
        showResult('momentum-result', 'Masukkan nilai massa dan kecepatan!', 'warning');
        return;
    }
    
    const momentum = mass * velocity;
    
    const result = `
        <strong>Momentum:</strong><br>
        <strong>${formatNumber(momentum.toFixed(2))} kg·m/s</strong><br><br>
        <small>Rumus: p = m × v</small>
    `;
    
    showResult('momentum-result', result, 'success');
}

// Helper function untuk menampilkan hasil
function showResult(elementId, message, type = 'info') {
    const element = document.getElementById(elementId);
    element.innerHTML = message;
    element.className = 'result ' + type;
}

// Initialize dengan contoh
document.addEventListener('DOMContentLoaded', function() {
    // Set nilai default untuk beberapa input
    document.getElementById('density-fluid').value = '1000';
    document.getElementById('heat-capacity').value = '4200';
    document.getElementById('boil-temp-initial').value = '25';
    document.getElementById('boil-power').value = '1000';
    document.getElementById('charger-power').value = '18';
    document.getElementById('charger-rate').value = '1500';
    document.getElementById('water-rate').value = '5000';
});