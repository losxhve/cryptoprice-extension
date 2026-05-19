// Background service worker - 定时刷新缓存价格
chrome.runtime.onInstalled.addListener(() => {
  console.log('CryptoPrice installed');
  // 每小时更新一次价格缓存
  chrome.alarms.create('refreshPrices', { periodInMinutes: 10 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'refreshPrices') {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple,dogecoin,cardano,polkadot,avalanche-2,chainlink,polygon,tron,litecoin,arbitrum,optimism,sui&vs_currencies=usd&include_24hr_change=true')
      .then(r => r.json())
      .then(data => {
        chrome.storage.local.set({ cachedPrices: data, lastUpdate: Date.now() });
      })
      .catch(() => {});
  }
});
