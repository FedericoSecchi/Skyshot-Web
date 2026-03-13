# DNS configuration for skyshot.space (Namecheap)

Configure these records in your Namecheap domain dashboard so that **skyshot.space** and **www.skyshot.space** point to GitHub Pages.

## Steps

1. Log in to [Namecheap](https://www.namecheap.com/) and open **Domain List**.
2. Click **Manage** next to **skyshot.space**.
3. Go to **Advanced DNS**.
4. Add or update the following records.

## Records

| Type  | Host | Value                    | TTL  |
|-------|------|--------------------------|------|
| A     | @    | 185.199.108.153          | Auto |
| A     | @    | 185.199.109.153          | Auto |
| A     | @    | 185.199.110.153          | Auto |
| A     | @    | 185.199.111.153          | Auto |
| CNAME | www  | federicosecchi.github.io | Auto |

- **@** = root domain (skyshot.space).
- **www** = www.skyshot.space.
- The four A records are GitHub Pages IPs for custom domains.
- The CNAME record points **www** to your GitHub Pages site.

## After saving DNS

- Propagation can take from a few minutes up to 48 hours.
- In the GitHub repo: **Settings → Pages → Custom domain**: set **skyshot.space** and enable **Enforce HTTPS** once DNS is active.
