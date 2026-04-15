let state = {
    planId: 'M',
    planPrice: 4378,
    planData: '30GB',
    devicePrice: 38500,
    deviceName: 'Redmi Note 13 Pro+ 5G',
    paypayType: 'none', // none, regular, gold
    serviceType: 'none', // none, hikari, denki, family
    options: {
        calling: 0,
        warranty: false
    }
};

const BASE_PLANS = {
    'S': { price: 3058, data: '5GB' },
    'M': { price: 4378, data: '30GB' },
    'L': { price: 5148, data: '35GB' }
};

const DEVICES = {
    'Note13': { name: 'Redmi Note 13 Pro+ 5G', price: 38500 },
    'Redmi15': { name: 'Redmi 15 5G', price: 20500 },
    'Redmi14C': { name: 'Redmi 14C 5G', price: 17000 },
    'Note15': { name: 'Redmi Note 15 5G', price: 36800 }
};

const DISCOUNTS = {
    paypay: {
        none: 0,
        regular: 330,
        gold: 550
    },
    service: {
        none: 0,
        hikari: 1650,
        denki: 1100,
        family: 1100
    }
};

function init() {
    updateView();
}

function selectPlan(id) {
    state.planId = id;
    state.planPrice = BASE_PLANS[id].price;
    state.planData = BASE_PLANS[id].data;
    
    document.querySelectorAll('.plan-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`[data-plan="${id}"]`).classList.add('active');
    
    // Denki rule: S is excluded
    if (state.planId === 'S' && state.serviceType === 'denki') {
        state.serviceType = 'none';
        const denkiInput = document.querySelector('input[value="denki"]');
        if (denkiInput) denkiInput.checked = false;
        document.querySelector('input[value="none-service"]').checked = true;
    }
    
    updateView();
}

function selectDevice(id) {
    state.devicePrice = DEVICES[id].price;
    state.deviceName = DEVICES[id].name;
    
    document.querySelectorAll('.device-item').forEach(el => el.classList.remove('active'));
    document.querySelector(`[data-device="${id}"]`).classList.add('active');
    
    updateView();
}

function setPayPay(type) {
    state.paypayType = type;
    updateView();
}

function setService(type) {
    if (state.planId === 'S' && type === 'denki') {
        alert('プランSは「おうち割 でんきセット」の対象外です。');
        document.querySelector('input[value="none-service"]').checked = true;
        state.serviceType = 'none';
    } else {
        state.serviceType = type;
    }
    updateView();
}

function setCalling(price) {
    state.options.calling = price;
    updateView();
}

function toggleWarranty() {
    state.options.warranty = !state.options.warranty;
    updateView();
}

function calculate() {
    let monthly = state.planPrice;
    
    // PayPay Discount
    monthly -= DISCOUNTS.paypay[state.paypayType];
    
    // Service Discount (Mutually exclusive)
    monthly -= DISCOUNTS.service[state.serviceType];
    
    // Options
    monthly += state.options.calling;
    if (state.options.warranty) {
        monthly += 759;
    }
    
    const initial = monthly + state.devicePrice + 3850;
    
    return {
        monthly: Math.max(0, monthly),
        initial: initial
    };
}

function updateView() {
    const results = calculate();
    
    document.getElementById('monthly-total').innerText = results.monthly.toLocaleString();
    document.getElementById('initial-total').innerText = results.initial.toLocaleString();
    
    const breakdown = document.getElementById('breakdown');
    if (breakdown) {
        let html = `<li>基本料 (${state.planData}): ${state.planPrice.toLocaleString()}円</li>`;
        
        if (state.paypayType !== 'none') {
            const val = DISCOUNTS.paypay[state.paypayType];
            html += `<li class="discount">PayPayカード割: -${val}円</li>`;
        }
        
        if (state.serviceType !== 'none') {
            const labels = { 
                hikari: 'おうち割 光セット (A)', 
                denki: 'おうち割 でんきセット (E)', 
                family: '家族割引 (2回線目以降)' 
            };
            const val = DISCOUNTS.service[state.serviceType];
            html += `<li class="discount">${labels[state.serviceType]}: -${val}円</li>`;
        }
        
        if (state.options.calling > 0) {
            html += `<li>通話オプション: ${state.options.calling.toLocaleString()}円</li>`;
        }
        
        if (state.options.warranty) {
            html += `<li>故障安心パック: 759円</li>`;
        }
        
        breakdown.innerHTML = html;
    }
}

window.onload = init;
