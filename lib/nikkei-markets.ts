export const MARKET_SOURCE_URL = 'https://www.nikkei.com/marketdata/global-overview/';
export const MARKET_FEED_URL = 'https://www.nikkei.com/marketdata/api/global-overview/indicatorValue/?indexes=NK225&currencies=USDJPY%2CEURJPY%2CUSDCNY';
export const MARKET_INSTRUMENTS = [
  { id: 'USDJPY', label: 'USD/JPY', name: '米ドル／円', unit: '円', group: 'currencies', code: 'XJPY/7' },
  { id: 'EURJPY', label: 'EUR/JPY', name: 'ユーロ／円', unit: '円', group: 'currencies', code: 'XEURJPY/7' },
  { id: 'USDCNY', label: 'USD/CNY', name: '米ドル／人民元', unit: '人民元', group: 'currencies', code: 'XCNY/TLTL' },
  { id: 'NK225', label: '日経平均', name: '日経平均株価', unit: '円', group: 'indexes', code: 'N101/T' },
] as const;
export type MarketQuote = { id: string; label: string; name: string; value: string | null; time: string | null; change: string | null; changePercent: string | null; direction: 'up' | 'down' | 'flat'; };
export type MarketResponse = { quotes: MarketQuote[]; checkedAt: string; sourceUrl: string };
const record = (v: unknown): Record<string, unknown> => v !== null && typeof v === 'object' && !Array.isArray(v) ? v as Record<string, unknown> : {};
const numberText = (v: unknown) => typeof v === 'string' && /^[+-]?\d+(?:,\d{3})*(?:\.\d+)?$/.test(v) ? v : null;
export function parseMarketQuotes(payload: unknown): MarketQuote[] {
  const data = record(payload);
  return MARKET_INSTRUMENTS.map(instrument => {
    const rows = data[instrument.group];
    const row = record(Array.isArray(rows) ? rows.find(v => record(v).code === instrument.code) : null);
    const value = row.canShow === true && typeof row.value === 'string' && /^\d+(?:,\d{3})*(?:\.\d+)?(?:-\d+(?:,\d{3})*(?:\.\d+)?)?$/.test(row.value) ? row.value : null;
    const validTime = typeof row.time === 'string' && row.time.length < 80 && /\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{2}/.test(row.time);
    const available = value !== null && validTime;
    const change = available ? numberText(row.diff) : null;
    const percent = available ? numberText(row.diffPercent) : null;
    const signed = (v: string | null) => v !== null && row.sign === '+' && !/^[+-]/.test(v) ? '+' + v : v;
    return { id: instrument.id, label: instrument.label, name: instrument.name, value: available ? value : null, time: available ? row.time as string : null, change: signed(change), changePercent: signed(percent), direction: change !== null && Number(change.replaceAll(',', '')) > 0 ? 'up' : change !== null && Number(change.replaceAll(',', '')) < 0 ? 'down' : 'flat' };
  });
}
