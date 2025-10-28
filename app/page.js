"use client"; // ブラウザ(クライアント)で動かすおまじない

import { useState, useEffect } from 'react'; // Reactの機能(Hooks)を読み込む

// HTMLにあった getWeatherIconName 関数をここに移動
function getWeatherIconName(code) {
  const iconMap = {
    0: 'sunny', 1: 'partly_cloudy_day', 2: 'partly_cloudy_day',
    3: 'cloudy', 45: 'foggy', 48: 'foggy',
    51: 'rainy', 53: 'rainy', 55: 'rainy',
    61: 'rainy', 63: 'rainy', 65: 'rainy',
    71: 'ac_unit', 73: 'ac_unit', 75: 'ac_unit',
    80: 'rainy', 81: 'rainy', 82: 'rainy',
    95: 'thunderstorm', 96: 'thunderstorm', 99: 'thunderstorm',
  };
  return iconMap[code] || 'cloud';
}

export default function Home() {
  // 天気データを保存するための「状態(state)」を準備
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyForecast, setDailyForecast] = useState(null);
  const [loading, setLoading] = useState(true); // ローディング中か
  const [error, setError] = useState(null); // エラーが出たか

  // ページが表示された時に1回だけAPI通信を実行する
  useEffect(() => {
    const lat = '33.59';
    const lon = '130.4017';
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,relative_humidity_2m_mean,precipitation_probability_max&timezone=Asia/Tokyo`;

    async function fetchWeather() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Open-Meteoから取得したデータ:', data);
        
        setCurrentWeather(data.current);
        setDailyForecast(data.daily);

      } catch (err) {
        console.error('天気データの取得に失敗しました:', err);
        setError(err.message);
      } finally {
        setLoading(false); // ローディング完了
      }
    }

    fetchWeather(); // 関数を実行
  }, []); // []が空なので、このuseEffectは最初の一回だけ実行される

  // ローディング中やエラー時の表示
  if (loading) {
    return <div className="text-white text-center p-10">読み込み中...</div>;
  }
  if (error) {
    return <div className="text-red-500 text-center p-10">エラー: {error}</div>;
  }
  if (!currentWeather || !dailyForecast) {
    return <div className="text-white text-center p-10">データを取得できませんでした。</div>;
  }

  // --- ここからHTML(JSX)部分 ---
  // <main> タグからは className を削除 (layout.jsで設定済みのため)
  return (
    <main>
      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
              <div className="@container">
                <div className="@[480px]:p-4">
                  <div
                    className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                    data-alt="A beautiful night view of Fukuoka with glowing city lights."
                    style={{ // styleの書き換え
                      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.6) 100%), url("https://showcase.city.fukuoka.lg.jp/admn/mrgt/images/2021/06/img1399.jpg")'
                    }}
                  >
                    <div className="flex flex-col gap-2 text-center">
                      <h1 className="text-white text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-7xl">Fukuoka</h1>
                      {/* データを埋め込む */}
                      <h2 id="current-temp" className="text-white text-lg font-normal leading-normal @[480px]:text-xl">
                        {Math.round(currentWeather.temperature_2m)}°C
                      </h2>
                    </div>
                    <div className="flex items-center justify-center gap-4 text-white">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">water_drop</span>
                        <span id="current-humidity" className="text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base">
                          湿度: {currentWeather.relative_humidity_2m}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-xl">umbrella</span>
                        <span id="current-precipitation" className="text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base">
                          {/* dailyの最初のデータ(今日)を使う */}
                          降水確率: {dailyForecast.precipitation_probability_max[0]}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* テーブルのラッパーに bg-background-dark/50 を適用 */}
              <div className="px-4 py-3 @container">
                <div className="flex overflow-hidden rounded-xl border border-white/20 bg-background-dark/50 backdrop-blur-sm">
                  <table className="flex-1">
                    <thead>
                      <tr className="bg-white/10">
                        {/* <th> (ヘッダー) に text-white を適用 */}
                        <th className="px-4 py-3 text-left text-white w-[150px] text-sm font-medium leading-normal">曜日</th>
                        <th className="px-4 py-3 text-center text-white w-14 text-sm font-medium leading-normal">天気</th>
                        <th className="px-4 py-3 text-left text-white w-[150px] text-sm font-medium leading-normal">最高/最低</th>
                        <th className="px-4 py-3 text-left text-white w-[150px] text-sm font-medium leading-normal">湿度</th>
                        <th className="px-4 py-3 text-left text-white w-[150px] text-sm font-medium leading-normal">降水確率</th>
                      </tr>
                    </thead>
                    {/* ハイドレーションエラーを避けるため、<tbody>の直後に{map}を配置 */}
                    <tbody id="forecast-table-body">{dailyForecast.time.slice(1).map((time, i) => {
                        const index = i + 1; // 元の配列のインデックス(1始まり)
                        const date = new Date(time);
                        const dayName = date.toLocaleDateString('ja-JP', { weekday: 'long' });
                        const iconName = getWeatherIconName(dailyForecast.weather_code[index]);
                        const highTemp = Math.round(dailyForecast.temperature_2m_max[index]);
                        const lowTemp = Math.round(dailyForecast.temperature_2m_min[index]);
                        const humidity = Math.round(dailyForecast.relative_humidity_2m_mean[index]);
                        const pop = dailyForecast.precipitation_probability_max[index];

                        // ループで生成する要素には一意な "key" が必要
                        return (
                          <tr key={time} className="border-t border-t-white/20">
                            {/* <td> (本文) に text-gray-300 を適用 */}
                            <td className="h-[72px] px-4 py-2 w-[150px] text-gray-300 text-sm font-normal leading-normal">{dayName}</td>
                            <td className="h-[72px] px-4 py-2 w-14 text-sm font-normal leading-normal text-center">
                              <span className="material-symbols-outlined text-primary text-2xl">{iconName}</span>
                            </td>
                            <td className="h-[72px] px-4 py-2 w-[150px] text-gray-300 text-sm font-normal leading-normal">{highTemp}°/{lowTemp}°</td>
                            <td className="h-[72px] px-4 py-2 w-[150px] text-gray-300 text-sm font-normal leading-normal">{humidity}%</td>
<td className="h-[72px] px-4 py-2 w-[150px] text-gray-300 text-sm font-normal leading-normal">{pop}%</td>
                          </tr>
                        );
                      })}</tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

