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

// Persamaan Panas
function solveHeatEquation() {
    const L = parseFloat(document.getElementById('heat-L').value);
    const T = parseFloat(document.getElementById('heat-T').value);
    const alpha = parseFloat(document.getElementById('heat-alpha').value);
    const nx = parseInt(document.getElementById('heat-nx').value);
    
    // Simulasi perhitungan (dalam aplikasi nyata, ini akan memanggil backend)
    const dx = L / (nx - 1);
    const x = Array.from({length: nx}, (_, i) => i * dx);
    
    // Generate sample data untuk persamaan panas
    const timeSteps = 5;
    const data = [];
    
    for (let t = 0; t < timeSteps; t++) {
        const u = x.map(xi => {
            return Math.exp(-alpha * Math.PI * Math.PI * t * 0.2) * Math.sin(Math.PI * xi / L);
        });
        data.push({
            x: x,
            y: u,
            type: 'scatter',
            name: `t = ${(t * 0.2).toFixed(1)}`
        });
    }
    
    const layout = {
        title: 'Solusi Persamaan Panas 1D',
        xaxis: {title: 'Posisi (x)'},
        yaxis: {title: 'Temperatur (u)'},
        hovermode: 'closest'
    };
    
    Plotly.newPlot('heat-plot', data, layout);
}

// Persamaan Gelombang
function solveWaveEquation() {
    const L = parseFloat(document.getElementById('wave-L').value);
    const T = parseFloat(document.getElementById('wave-T').value);
    const c = parseFloat(document.getElementById('wave-c').value);
    const nx = parseInt(document.getElementById('wave-nx').value);
    
    const dx = L / (nx - 1);
    const x = Array.from({length: nx}, (_, i) => i * dx);
    
    // Generate sample data untuk persamaan gelombang
    const timeSteps = 5;
    const data = [];
    
    for (let t = 0; t < timeSteps; t++) {
        const u = x.map(xi => {
            return Math.sin(2 * Math.PI * (xi - c * t * 0.2) / L);
        });
        data.push({
            x: x,
            y: u,
            type: 'scatter',
            name: `t = ${(t * 0.2).toFixed(1)}`
        });
    }
    
    const layout = {
        title: 'Solusi Persamaan Gelombang 1D',
        xaxis: {title: 'Posisi (x)'},
        yaxis: {title: 'Amplitudo (u)'},
        hovermode: 'closest'
    };
    
    Plotly.newPlot('wave-plot', data, layout);
}

// Analisis Fourier
function performFourierAnalysis() {
    const freq1 = parseFloat(document.getElementById('freq1').value);
    const freq2 = parseFloat(document.getElementById('freq2').value);
    const noiseAmp = parseFloat(document.getElementById('noise-amp').value);
    const duration = parseFloat(document.getElementById('signal-duration').value);
    
    const dt = 0.01;
    const n = Math.floor(duration / dt);
    const t = Array.from({length: n}, (_, i) => i * dt);
    
    // Generate sinyal
    const signal = t.map(ti => {
        return Math.sin(2 * Math.PI * freq1 * ti) + 
               0.5 * Math.sin(2 * Math.PI * freq2 * ti) + 
               noiseAmp * (Math.random() - 0.5);
    });
    
    // Transformasi Fourier sederhana
    const frequencies = [];
    const magnitudes = [];
    
    const maxFreq = 50;
    for (let f = 0; f <= maxFreq; f += 0.1) {
        let real = 0;
        let imag = 0;
        
        for (let i = 0; i < n; i++) {
            const angle = 2 * Math.PI * f * t[i];
            real += signal[i] * Math.cos(angle);
            imag += signal[i] * Math.sin(angle);
        }
        
        const magnitude = Math.sqrt(real * real + imag * imag) / n;
        frequencies.push(f);
        magnitudes.push(magnitude);
    }
    
    // Plot sinyal asli dan spektrum frekuensi
    const signalPlot = {
        x: t,
        y: signal,
        type: 'scatter',
        name: 'Sinyal',
        xaxis: 'x',
        yaxis: 'y'
    };
    
    const spectrumPlot = {
        x: frequencies,
        y: magnitudes,
        type: 'scatter',
        name: 'Spektrum',
        xaxis: 'x2',
        yaxis: 'y2'
    };
    
    const layout = {
        title: 'Analisis Fourier - Sinyal dan Spektrum Frekuensi',
        grid: {
            rows: 2,
            columns: 1,
            pattern: 'independent'
        },
        xaxis: {title: 'Waktu (s)', domain: [0, 1]},
        yaxis: {title: 'Amplitudo', domain: [0.55, 1]},
        xaxis2: {title: 'Frekuensi (Hz)', domain: [0, 1]},
        yaxis2: {title: 'Magnitudo', domain: [0, 0.45]}
    };
    
    Plotly.newPlot('fourier-plot', [signalPlot, spectrumPlot], layout);
}

// Persamaan Poisson
function solvePoissonEquation() {
    const funcType = document.getElementById('poisson-func').value;
    const nElements = parseInt(document.getElementById('poisson-elements').value);
    const bcLeft = parseFloat(document.getElementById('bc-left').value);
    const bcRight = parseFloat(document.getElementById('bc-right').value);
    
    const nNodes = nElements + 1;
    const h = 1 / nElements;
    const nodes = Array.from({length: nNodes}, (_, i) => i * h);
    
    // Fungsi sumber berdasarkan pilihan
    let sourceFunc;
    switch(funcType) {
        case 'sin':
            sourceFunc = x => Math.sin(Math.PI * x);
            break;
        case 'cos':
            sourceFunc = x => Math.cos(2 * Math.PI * x);
            break;
        case 'poly':
            sourceFunc = x => x * (1 - x);
            break;
    }
    
    // Solusi numerik sederhana (metode finite difference)
    const solution = nodes.map(xi => {
        // Solusi analitik aproksimasi untuk demonstrasi
        switch(funcType) {
            case 'sin':
                return -Math.sin(Math.PI * xi) / (Math.PI * Math.PI) + 
                       bcLeft + (bcRight - bcLeft) * xi;
            case 'cos':
                return -Math.cos(2 * Math.PI * xi) / (4 * Math.PI * Math.PI) + 
                       bcLeft + (bcRight - bcLeft) * xi;
            case 'poly':
                return -xi*xi*xi/6 + xi*xi*xi*xi/12 + 
                       bcLeft + (bcRight - bcLeft + 1/6) * xi;
            default:
                return 0;
        }
    });
    
    const sourceValues = nodes.map(sourceFunc);
    
    const solutionPlot = {
        x: nodes,
        y: solution,
        type: 'scatter',
        name: 'Solusi u(x)',
        line: {color: 'blue', width: 3}
    };
    
    const sourcePlot = {
        x: nodes,
        y: sourceValues,
        type: 'scatter',
        name: 'Fungsi Sumber f(x)',
        line: {color: 'red', width: 2, dash: 'dash'},
        yaxis: 'y2'
    };
    
    const layout = {
        title: 'Solusi Persamaan Poisson 1D',
        xaxis: {title: 'Posisi (x)'},
        yaxis: {title: 'Solusi u(x)', side: 'left'},
        yaxis2: {
            title: 'Fungsi Sumber f(x)',
            side: 'right',
            overlaying: 'y'
        },
        hovermode: 'closest'
    };
    
    Plotly.newPlot('poisson-plot', [solutionPlot, sourcePlot], layout);
}

// Initialize dengan contoh pertama
document.addEventListener('DOMContentLoaded', function() {
    solveHeatEquation();
});