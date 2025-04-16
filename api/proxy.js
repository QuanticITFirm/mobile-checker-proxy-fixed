export default async function handler(req, res) {
  const { url } = req.query;

  if (!url || !url.startsWith('http')) {
    return res.status(400).send("Invalid URL format.");
  }

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Mobile/15E148 Safari/604.1',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.google.com/'
      }
    });

    if (!response.ok) {
      return res.status(500).send("Failed to fetch the webpage.");
    }

    const html = await response.text();
    res.setHeader("Content-Type", "text/html");
    res.send(html);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).send("Error fetching content.");
  }
}