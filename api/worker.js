export const config = {
  runtime: 'edge',
};

const KEYS = [
  process.env.TMDB_KEY_1,
  process.env.TMDB_KEY_2
].filter(key => key);

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');
  const queryStr = searchParams.get('query') || '';

  if (!path) {
    return new Response(JSON.stringify({ error: 'Missing path' }), { 
      status: 400, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  const params = new URLSearchParams(queryStr);
  let response = null;

  for (const key of KEYS) {
    if (!key) continue;
    params.set('api_key', key);
    const tmdbUrl = `https://api.themoviedb.org/3/${path}?${params.toString()}`;
    
    response = await fetch(tmdbUrl, {
      headers: { 'Accept': 'application/json' },
    });

    if (response.status !== 401 && response.status !== 429) {
      break; 
    }
  }

  if (!response) {
    return new Response(JSON.stringify({ error: 'No valid API keys configured' }), { 
      status: 500, 
      headers: { 'Content-Type': 'application/json' } 
    });
  }

  const data = await response.text();
  const headers = {
    'Content-Type': response.headers.get('Content-Type') || 'application/json',
  };

  if (response.ok) {
    headers['Cache-Control'] = 'public, max-age=60, s-maxage=60';
  }

  return new Response(data, {
    status: response.status,
    headers,
  });
}
