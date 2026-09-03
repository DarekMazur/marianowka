export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const response = await globalThis.fetch(
      'https://auto.nerdistry.pl/webhook/0a9819d0-4928-44d7-b2fe-f36fceed4d44',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: event.body,
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://marianowka-admin.netlify.app',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
