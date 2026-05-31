# dataLayer contracts (Model A)

Fixtures in this repo are validated against contracts in the **tracking hub** — not copied into this repo.

**Hub repo:** [SimonAndreAsk/tracking](https://github.com/SimonAndreAsk/tracking)  
**Property:** `simonask-io` → `datalayer-contracts/extensions/simonask-io/`

## Local setup

Clone both repos as siblings:

```text
c:\Dev\
  tracking\
  simonask.io\
```

From this repo root:

```powershell
npm install
npm run validate:tracking
```

After you change contracts in `tracking`, run `git pull` there, then re-run validation here.

## Fixtures

Sample payloads the site should emit live under `tests/fixtures/datalayer/`. When you implement `dataLayer.push` in `nextjs-simonask.io/`, keep fixtures aligned with the hub contracts.

## CI

`.github/workflows/tracking-contracts.yml` checks out `SimonAndreAsk/tracking@main` and validates fixtures on every PR.
