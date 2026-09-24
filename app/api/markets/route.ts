import { MARKET_FEED_URL, MARKET_SOURCE_URL, parseMarketQuotes } from '@/lib/nikkei-markets';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const response = await fetch(MARKET_FEED_URL, { headers: { Accept: 'application/json' }, signal: AbortSignal.timeout(10000), next: { revalidate: 60 } });
    if (!response.ok) throw new Error('Market feed unavailable');
    const quotes = parseMarketQuotes(await response.json());
    if (quotes.every(quote => quote.value === null)) throw new Error('No quotes available');
    return Response.json({ quotes, checkedAt: new Date().toISOString(), sourceUrl: MARKET_SOURCE_URL }, { headers: { 'Cache-Control': 'public, max-age=30, s-maxage=60' } });
  } catch {
    return Response.json({ error: '市況データを取得できませんでした。' }, { status: 503, headers: { 'Cache-Control': 'no-store' } });
  }
}
