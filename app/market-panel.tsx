'use client';
import { useEffect, useState } from 'react';
import { MARKET_INSTRUMENTS, MARKET_SOURCE_URL, type MarketResponse } from '@/lib/nikkei-markets';
export default function MarketPanel() {
  const [data, setData] = useState<MarketResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let pending = false;
    async function refresh() {
      if (pending) return;
      pending = true;
      try {
        const response = await fetch('/api/markets', { cache: 'no-store', signal: controller.signal });
        if (!response.ok) throw new Error('Unavailable');
        const nextData = await response.json() as MarketResponse;
        if (!Array.isArray(nextData.quotes)) throw new Error('Invalid response');
        if (active) { setData(nextData); setFailed(false); }
      } catch { if (active) setFailed(true); }
      finally { pending = false; if (active) setLoading(false); }
    }
    void refresh();
    const timer = setInterval(refresh, 60000);
    return () => { active = false; controller.abort(); clearInterval(timer); };
  }, []);
  return <aside className="market-panel" aria-labelledby="market-heading">
    <div className="market-heading"><p className="eyebrow">MARKET SNAPSHOT</p><h2 id="market-heading">主要マーケット</h2><p>1分ごとに自動更新</p></div>
    <div className="market-quotes">{MARKET_INSTRUMENTS.map(instrument => {
      const quote = data?.quotes.find(q => q.id === instrument.id);
      return <section className="market-quote" key={instrument.id} aria-label={instrument.name}>
        <h3>{instrument.label}</h3><p className="market-name">{instrument.name}</p>
        <p className="market-value">{quote?.value ?? (loading ? '読み込み中…' : '—')}<span>{quote?.value ? '円' : ''}</span></p>
        {quote?.change !== null && quote?.change !== undefined && <p className={'market-change ' + quote.direction}>変動 {quote.change}{quote.changePercent !== null ? ` (${quote.changePercent}%)` : ''}</p>}
        <p className="market-time">{quote?.time ? `配信元：${quote.time}` : loading ? '日経から取得しています' : '現在取得できません'}</p>
      </section>;
    })}</div>
    {failed && <p className="market-notice" role="status">{data ? '更新に失敗しました。前回取得した値を表示しています。' : '取得できませんでした。次回更新をお待ちいただくか、日経のページをご確認ください。'}</p>}
    <div className="market-footer"><a href={MARKET_SOURCE_URL} target="_blank" rel="noopener noreferrer">出典：日経「世界の市況」 ↗</a><p>為替は配信元の売買気配値を表示。時刻は配信元の表記です。配信に遅れが生じる場合があります。</p>{data && <p>取得確認：{new Intl.DateTimeFormat('ja-JP', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo' }).format(new Date(data.checkedAt))} JST</p>}</div>
  </aside>;
}
